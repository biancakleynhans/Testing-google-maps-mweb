import {IShoppingCartSession, IShoppingCartSessionUpdate, ShoppingCartSessionService} from '@/services/shoppingCartSessionService';
import {TillSlipService} from '@/services/tillSlipService';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {useCoverage} from '@/context/CoverageContext';
import {useNavContext} from '@/context/NavigationContext';
import {IAddressObject} from '@/models/Coverage';
import {useInternetServiceProviders} from '@/context/InternetServiceProvidersContent';
import {GetCoverageDataToShoppingCart} from '@/utils/Coverage';

export interface IOrderForm {
	captureRequirements: ICaptureRequirements;
	requiresExternalPayment: boolean;
	order: IOrder;
	terms: ITerm[];
	errors: any[];
	links: any[];
}
export interface ICaptureRequirements {
	accountUse: string;
	accountStatus: string;
	accountType: string;
	partnerCodeRequired: boolean;
	partnerCodeName: string;
	validationErrorsRequired: boolean;
	hasDeliveryItem: boolean;
	coverageCheckRequired: boolean;
	creditCheckRequired: boolean;
	ricaCheckRequired: boolean;
	directDebitSetupRequired: boolean;
	installationAddressRequired: boolean;
	acceptTermsAndConditions: boolean;
	otpRequired: boolean;
	missingCustomerInfo: any[];
	userParameters: ICaptureRequirementsUserParameter[];
	upgradeableContracts: IUpgradeableContract[];
}
export interface IOrder {
	title: string;
	firstName: string;
	lastName: string;
	companyName: string;
	vatNumber: string;
	registrationNumber: string;
	idNumber: string;
	idType: string;
	emailAddress: string;
	homeNumber: string;
	workNumber: string;
	mobileNumber: string;
	alternateContactNumber: string;
	addresses: IOrderAddress[];
	bankName: string;
	bankAccountNumber: string;
	bankAccountType: string;
	bankBranchCode: string;
	bankAccountHolderName: string;
	debitOrderDate: string;
	termsAccepted: boolean;
	coverageCheckAccepted: boolean;
	creditCheckAccepted: boolean;
	ricaCheckAccepted: boolean;
	deliveryRequired: boolean;
	isUpgrade: boolean;
	contractIdToUpgrade: number;
	userParameters: IOrderUserParameter[];
	quote: IQuote;
	products: Product[];
	created: string;
	otpVerification: IOtp;
	voucherCode: string;
	partnerCode: string;
	discountDescription: string;
}
export interface ITerm {
	name: string;
	html: string;
	pdf: null | string;
}
export interface ICaptureRequirementsUserParameter {
	productCode: string;
	serviceParamId: number;
	serviceParamName: string;
	serviceName: string;
	serviceId: number;
	dataType: string;
	inputType: string;
	required: boolean;
	order: number;
	selectUri: null;
}
export interface IUpgradeableContract {
	id: number;
	name: string;
}
export interface IOrderAddress {
	type: string;
	streetNumber: string;
	streetName: string;
	unitDesc: string;
	suburb: string;
	city: string;
	province: string;
	postalCode: string;
	instruction: string;
	buildingType: string;

	// additional fields for the estates and complexes
	unitNumber?: string;
	buildingName?: string;
	buildingFloor?: string;
	complexName?: string;
	estateName?: string;
	estateUnitStreetNumber?: string;
	estateUnitStreetName?: string;
	coordinates: ICustomerAccountCoordinates;

	// For Companies
	companyName?: string;
}
export interface IOrderUserParameter {
	line: number;
	serviceId: number;
	serviceParamId: number;
	serviceParamValue: string;
}
export interface IQuote {
	id: number;
	ref: string;
	created: string;
}
export interface Product {
	promoCode: string;
	productCode: string;
	primary: boolean;
	saleType: string;
	parentContractId: number;
	isPrimary: boolean;
	serviceTypeIds: any;
}
export interface IOtp {
	otp: string;
	otpRef: string;
}
export enum ADDRESS_TYPE {
	physical = <any>'physical',
	installation = <any>'installation',
	delivery = <any>'delivery',
}
export interface ICustomerAccountCoordinates {
	lon?: string;
	lat?: string;
	status?: string;
}
let orderFormData: IOrderForm;
function saveOrderFormState() {
	localStorage.setItem('osuOrderForm', JSON.stringify(orderFormData));
}
function retrieveOrderFormState() {
	return localStorage.getItem('osuOrderForm') ?? '';
}
function initialiseOrderForm() {
	if (!orderFormData) {
		orderFormData = JSON.parse(retrieveOrderFormState());
	}
}
function setOrderForm(orderForm: IOrderForm): IOrderForm {
	orderFormData = orderForm;

	// Reference the object from the session
	// saveOrderFormState();

	return orderFormData;
}
function getOrderAddressInstance(): IOrderAddress {
	return {
		type: '',
		streetNumber: '',
		streetName: '',
		unitDesc: '',
		suburb: '',
		city: '',
		province: '',
		postalCode: '',
		instruction: '',
		buildingType: '',
		coordinates: {
			lat: '',
			lon: '',
		},
	};
}

async function updateSession(order: IOrder, response: any) {
	const {currentCoverageObj, statusType, providerType} = useCoverage();
	const {servicesFromCoverage} = useInternetServiceProviders();

	const [portalShoppingCartSession, setPortalShoppingCartSession] = useState<IShoppingCartSession | null>(null);
	let orderForm: IOrderForm;
	const portalShoppingCartSessionKey = localStorage.getItem('portalShoppingCartSession') || ''; // ask localStorage for portalShoppingCartSession
	if (portalShoppingCartSessionKey !== '') {
		const portalShoppingCartSessionFromStorage: IShoppingCartSession = JSON.parse(portalShoppingCartSessionKey); // convert shopping cart session to object
		// setPortalShoppingCartSession(portalShoppingCartSessionFromStorage);
		orderForm = portalShoppingCartSessionFromStorage.orderFormData;
		order = orderForm?.order;
		portalShoppingCartSessionFromStorage.orderNumber = response.orderNumber;
		portalShoppingCartSessionFromStorage.completed = true;
		portalShoppingCartSessionFromStorage.orderSubmittedTime = response.created;
		const tillSlipData = await TillSlipService.getTillSlip(portalShoppingCartSessionFromStorage.shoppingCart);
		const finalBasket = tillSlipData.basket;
		const sessionUpdate: IShoppingCartSessionUpdate = {
			addressSearch: GetCoverageDataToShoppingCart(),
			id: portalShoppingCartSession?.id ?? 91,
			userIdentifier: portalShoppingCartSession?.userIdentifier ?? '',
			shoppingCart: finalBasket,
			tillSlipData: tillSlipData,
			orderFormData: orderForm,
			currentCheckoutStep: '/checkout/payment',
		};
		const updatedSession = await ShoppingCartSessionService.setShoppingCartSession(sessionUpdate);
		if (updatedSession) {
			localStorage.setItem('portalShoppingCartSession', JSON.stringify(updatedSession));
		}
	}
}
async function processOrder(order: IOrder) {
	const {handleCurrActiveStep} = useNavContext();
	const apiProxyUrl = `${process.env.NEXT_PUBLIC_APIGW_BAAS_PROXY_URL}/sales/orders`;
	const responseData = fetch(apiProxyUrl, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(order),
	});

	await responseData
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			localStorage.setItem('orderResponse', JSON.stringify(response));
			if (response.orderNumber) {
				// handleCurrActiveStep('next');
			}
			// updateSession(order, response)
		});
}
function setFibreServiceParameters(order: IOrder, customer: any): IOrder {
	if (order.userParameters !== undefined && order.userParameters.length > 0) {
		for (const objService of order.userParameters) {
			// fibre - octotel API address requirements
			if (objService.serviceParamId === 564018) {
				objService.serviceParamValue = order?.bankAccountHolderName ? order?.bankAccountHolderName : '';
			}
			if (objService.serviceParamId === 564019) {
				objService.serviceParamValue = order?.alternateContactNumber ? order?.alternateContactNumber : order?.mobileNumber;
			}
			if (objService.serviceParamId === 564020) {
				objService.serviceParamValue = order?.emailAddress ? order?.emailAddress : '';
			}
			if (objService.serviceParamId === 564021) {
				objService.serviceParamValue = order?.alternateContactNumber ? order?.alternateContactNumber : order?.mobileNumber;
			}
			if (objService.serviceParamId === 564025) {
				const octotelApiLocationDataFromStorage = localStorage.getItem('octotelApiLocationResult') ?? '';
				if (octotelApiLocationDataFromStorage) {
					const octotelApiLocationResult = JSON.parse(octotelApiLocationDataFromStorage);
					objService.serviceParamValue = octotelApiLocationResult?.locationIdentifier ? octotelApiLocationResult?.locationIdentifier : '';
				}
			}
			// End: fibre - octotel API address requirements
			// fibre - email notification
			if (objService.serviceParamId === 558004) {
				objService.serviceParamValue = order.emailAddress;
			}
			// fibre - mobile notification
			if (objService.serviceParamId === 558007) {
				objService.serviceParamValue = order.mobileNumber;
			}
			// fibre - Installation Street Number
			if (objService.serviceParamId === 558100) {
				objService.serviceParamValue = customer['installationstreetnumber'];
			}

			// fibre - Installation Street Name
			if (objService.serviceParamId === 558101) {
				objService.serviceParamValue = customer['installationstreetname'];
			}

			// fibre - Installation Suburb
			if (objService.serviceParamId === 558102) {
				objService.serviceParamValue = customer['installationSuburb'];
			}

			// fibre - Installation Town
			if (objService.serviceParamId === 558103) {
				objService.serviceParamValue = customer['installationTown'];
			}

			// fibre - Installation Province
			if (objService.serviceParamId === 558104) {
				objService.serviceParamValue = customer['installationProvince'];
			}

			// fibre - Installation Street Code
			if (objService.serviceParamId === 558105) {
				objService.serviceParamValue = customer['installationPostalCode'];
			}

			// fibre - work telephone number
			if (objService.serviceParamId === 558106) {
				objService.serviceParamValue = order.mobileNumber;
			}

			// fibre - service number
			if (objService.serviceParamId === 558107) {
				objService.serviceParamValue = customer['vendorref'] ? customer['vendorref'] : '999999';

				// objService.serviceParamValue = customer['vendorref'];
			}

			if (objService.serviceParamId === 558114) {
				objService.serviceParamValue = '';
			}

			// Payment Collection Day
			if (objService.serviceParamId === 583015) {
				objService.serviceParamValue = customer['debitOrderDate'];
			}
		}
	}
	return order;
}

export const OrderService = {
	setOrderForm: setOrderForm,
	processOrder: processOrder,
	getOrderAddress: getOrderAddressInstance(),
	setFibreServiceParameters: setFibreServiceParameters,
};
