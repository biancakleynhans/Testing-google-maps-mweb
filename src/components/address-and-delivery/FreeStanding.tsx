'use client';
import {useState, useEffect} from 'react';

import * as yup from 'yup';
import {useFormik} from 'formik';
import MwebInput from '@/components/ui/MwebInput/MwebInput';
import {IOrder, IOrderAddress, IOrderForm, OrderService} from '@/services/order.service';
import {IShoppingCartSession, IShoppingCartSessionUpdate, ShoppingCartSessionService} from '@/services/shoppingCartSessionService';
import {TillSlipService} from '@/services/tillSlipService';
import {providerJourneyStatus, useCoverage} from '@/context/CoverageContext';
import {usePathname} from 'next/navigation';
import {useInternetServiceProviders} from '@/context/InternetServiceProvidersContent';
import {IAddressObject} from '@/models/Coverage';
import {GetCoverageDataToShoppingCart} from '@/utils/Coverage';

//
interface IProps {
	updateValidationState: (value: boolean) => void;
}

//
interface IAddressDetails {
	streetAddress: string;
	city: string;
	province: string;
	postalCode: string;
}
//
const initialValues = {
	streetAddress: '',
	city: '',
	province: '',
	postalCode: '',
};
export default function FreeStanding({updateValidationState}: IProps) {
	const [addressDetails, setFormData] = useState<IAddressDetails>(initialValues);
	const [portalShoppingCartSessionKey, setPortalShoppingCartSessionKey] = useState([]) as any;
	const [canContinue, setCanContinue] = useState(false);

	useEffect(() => {
		const item = JSON.parse(localStorage.getItem('portalShoppingCartSession') ?? ' ');
		if (item) {
			orderForm = portalShoppingCartSessionKey.orderFormData;
			order = orderForm?.order;
			setPortalShoppingCartSessionKey(item);
			if (portalShoppingCartSessionKey) {
				setCanContinue(true);
			}
		}
	}, []);

	const onHandleChange = (key: any, value: any) => {
		setFormData({...addressDetails, [key]: value});
	};

	const pageUrl = usePathname();
	const {currentCoverageObj, providerType, statusType} = useCoverage();
	const {servicesFromCoverage} = useInternetServiceProviders();
	const customer: any = {};
	let order: IOrder;
	let orderForm: IOrderForm;
	// const portalShoppingCartSessionKey = localStorage?.getItem('portalShoppingCartSession') || ''; // ask localStorage for portalShoppingCartSession
	if (portalShoppingCartSessionKey !== '') {
		console.log('portalShoppingCartSessionKeyn', portalShoppingCartSessionKey);
		// const portalShoppingCartSessionFromStorage: IShoppingCartSession = portalShoppingCartSessionKey; // convert shopping cart session to object
		// setPortalShoppingCartSession(portalShoppingCartSessionFromStorage);
		orderForm = portalShoppingCartSessionKey.orderFormData;
		console.log('orderForm', orderForm);
		order = orderForm?.order;
		console.log('orderData', order);
	}

	useEffect(() => {
		updateValidationState(validateForm());
		if (addressDetails) {
			submitOrder();
		}
	}, [addressDetails]);

	// Handle the change in the selected province
	function handleSelectProvinceChange(event: string) {
		setFormData({...addressDetails, ['province']: event as string});
	}
	const [portalShoppingCartSession, setPortalShoppingCartSession] = useState<IShoppingCartSession | null>(null);

	function newCustomerAddressInputIssueFix(customerObject: any): void {
		if (customerObject) {
			customerObject['streetNumber'] = customerObject['streetNumber']?.replace(/\s+/g, '');
			customerObject['streetnumber'] = customerObject['streetnumber']?.replace(/\s+/g, '');
			customerObject['installationstreetnumber'] = customerObject['streetNumber']?.replace(/\s+/g, '');
			customerObject['deliverystreetnumber'] = customerObject['deliverystreetnumber']?.replace(/\s+/g, '');
			customerObject['delstreetnumber'] = customerObject['delstreetnumber']?.replace(/\s+/g, '');
			customerObject['residentialstreetnumber'] = customerObject['residentialstreetnumber']?.replace(/\s+/g, '');
			customerObject['buildingFloor'] = customerObject['buildingFloor']?.replace(/\s+/g, '');
			customerObject['estatehousestreetnumber'] = customerObject['estatehousestreetnumber']?.replace(/\s+/g, '');
			customerObject['delestateapartmentcomplexstreetnumber'] = customerObject['delestateapartmentcomplexstreetnumber']?.replace(/\s+/g, '');
			customerObject['buildingFloor'] = customerObject['buildingFloor']?.replace(/\s+/g, '');
		}
	}

	async function submitOrder() {
		const session: IShoppingCartSession = portalShoppingCartSessionKey;
		const searchedAddressInfo = session !== null && session?.addressSearch?.addressObject.address_components;
		if (canContinue && session && searchedAddressInfo) {
			const searchedAddressCoordinates = session?.addressSearch?.addressObject.geometry;
			const lat = searchedAddressCoordinates?.location?.lat;
			const lon = searchedAddressCoordinates?.location?.lng;
			const coordinates = {
				lat: lat,
				lon: lon,
			};
			newCustomerAddressInputIssueFix(customer);
			const instAddres2: IOrderAddress = OrderService.getOrderAddress;
			const installationAddress: IOrderAddress | undefined = order?.addresses.find((p) => p.type === 'installation');
			const deliveryAddress: IOrderAddress | undefined = order?.addresses.find((p) => p.type === 'delivery');
			console.log('order.addresses', order.addresses);
			if (order.addresses) {
				const addresses = order.addresses;
				addresses.map((address, i) => {
					address.coordinates = coordinates;
				});
			}
			let streetNumber = searchedAddressInfo.filter((s: any) => s.types[0].includes('street_number'))[0] ?? ' ';
			let streetName = searchedAddressInfo.filter((s: any) => s.types[0].includes('route'))[0] ?? ' ';
			let suburb = searchedAddressInfo.filter((s: any) => s.types[0].includes('sublocality_level_2'))[0] ?? ' ';
			let town = searchedAddressInfo.filter((s: any) => s.types[0].includes('locality'))[0] ?? ' ';
			let province = searchedAddressInfo.filter((s: any) => s.types[0].includes('administrative_area_level_1'))[0] ?? ' ';
			let postalCode = searchedAddressInfo.filter((s: any) => s.types[0].includes('postal_code'))[0] ?? ' ';
			let isOpenserveGeneric = false;
			searchedAddressInfo.filter((address: any) => {
				customer['installationstreetnumber'] = streetNumber.long_name;
				customer['installationstreetname'] = streetName.long_name;
				customer['installationSuburb'] = suburb.long_name;
				customer['installationTown'] = town.long_name;
				customer['installationProvince'] = province.long_name;
				customer['installationPostalCode'] = postalCode.long_name;
				customer['deliverystreetnumber'] = streetNumber.long_name;
				customer['delstreetnumber'] = streetNumber.long_name;
				customer['streetNumber'] = streetNumber.long_name;
				customer['streetnumber'] = streetNumber.long_name;
			});

			if (orderForm.captureRequirements.installationAddressRequired) {
				console.log('matcheing', portalShoppingCartSessionKey.primaryProductCode);
				/* Set Installation address for non-Telkom provider */
				instAddres2.streetNumber = customer['installationstreetnumber'];
				instAddres2.streetName = customer['installationstreetname'];

				if (customer['installationaddress2']) {
					instAddres2.unitDesc = customer['installationaddress2'];
				} else {
					instAddres2.unitDesc = '';
				}
				if (deliveryAddress && installationAddress) {
					deliveryAddress.suburb = customer['installationSuburb'];
					deliveryAddress.province = customer['installationProvince'];
					deliveryAddress.postalCode = customer['installationPostalCode'];
					deliveryAddress.city = customer['installationTown'];
					deliveryAddress.type = 'delivery';
					deliveryAddress.buildingType = 'BUILDING_TYPE_FREESTANDING';

					// Additional Addresses
					deliveryAddress.streetNumber = customer['installationstreetnumber'];
					deliveryAddress.streetName = customer['installationstreetname'];
					deliveryAddress.unitNumber = undefined;
					deliveryAddress.buildingName = undefined;
					deliveryAddress.buildingFloor = undefined;
					deliveryAddress.complexName = undefined;
					deliveryAddress.estateName = undefined;
					deliveryAddress.estateUnitStreetNumber = undefined;
					deliveryAddress.estateUnitStreetName = undefined;
					deliveryAddress.companyName = undefined;

					installationAddress.suburb = customer['installationSuburb'];
					installationAddress.province = customer['installationProvince'];
					installationAddress.postalCode = customer['installationPostalCode'];
					installationAddress.city = customer['installationTown'];
					installationAddress.type = 'installation';
					installationAddress.buildingType = 'BUILDING_TYPE_FREESTANDING';

					// Additional Addresses
					installationAddress.streetNumber = customer['installationstreetnumber'];
					installationAddress.streetName = customer['installationstreetname'];
					installationAddress.unitNumber = undefined;
					installationAddress.buildingName = undefined;
					installationAddress.buildingFloor = undefined;
					installationAddress.complexName = undefined;
					installationAddress.estateName = undefined;
					installationAddress.estateUnitStreetNumber = undefined;
					installationAddress.estateUnitStreetName = undefined;
					installationAddress.companyName = undefined;

					/* Set Fibre Physical Address for Fibre */
					const fibrePhysicalAddress: IOrderAddress = OrderService.getOrderAddress;
					fibrePhysicalAddress.streetNumber = customer['installationstreetnumber'];
					fibrePhysicalAddress.streetName = customer['installationstreetname'];

					if (customer['installationaddress2']) {
						fibrePhysicalAddress.unitDesc = customer['installationaddress2'];
					} else {
						fibrePhysicalAddress.unitDesc = '';
					}

					fibrePhysicalAddress.suburb = customer['installationSuburb'];
					fibrePhysicalAddress.province = customer['installationProvince'];
					fibrePhysicalAddress.postalCode = customer['installationPostalCode'];
					fibrePhysicalAddress.city = customer['installationTown'];
					fibrePhysicalAddress.type = 'physical';
					fibrePhysicalAddress.buildingType = 'BUILDING_TYPE_FREESTANDING';

					OrderService.setFibreServiceParameters(order, customer);
					// const portalShoppingCartSessionKey = localStorage?.getItem('portalShoppingCartSession') || ''; // ask localStorage for portalShoppingCartSession
					const portalShoppingCartSessionFromStorage: IShoppingCartSession = portalShoppingCartSessionKey; // convert shopping cart session to object
					const tillSlipData = await TillSlipService.getTillSlip(portalShoppingCartSessionFromStorage.shoppingCart);
					const finalBasket = tillSlipData.basket;

					order.products = finalBasket.shoppingCart[0].products;
					const sessionUpdate: IShoppingCartSessionUpdate = {
						addressSearch: GetCoverageDataToShoppingCart(),
						id: portalShoppingCartSession?.id ?? 91,
						userIdentifier: portalShoppingCartSession?.userIdentifier ?? '',
						shoppingCart: finalBasket,
						tillSlipData: tillSlipData,
						orderFormData: orderForm,
						currentCheckoutStep: pageUrl ?? '',
					};
					const updatedSession = await ShoppingCartSessionService.setShoppingCartSession(sessionUpdate);
					if (updatedSession) {
						localStorage?.setItem('portalShoppingCartSession', JSON.stringify(updatedSession));
					}
				}
			} else {
				if (portalShoppingCartSessionKey.primaryProductCode.toLowerCase().includes('telkom')) {
					console.log('matcheing', portalShoppingCartSessionKey.primaryProductCode);
					const installationAddress: IOrderAddress | undefined = order?.addresses.find((p) => p.type === 'installation');
					const deliveryAddress: IOrderAddress | undefined = order.addresses.find((p) => p.type === 'delivery');
					if (installationAddress && deliveryAddress) {
						installationAddress.suburb = customer['installationSuburb'];
						installationAddress.province = customer['installationProvince'];
						installationAddress.postalCode = customer['installationPostalCode'];
						installationAddress.city = customer['installationTown'];
						installationAddress.type = 'installation';
						installationAddress.buildingType = 'BUILDING_TYPE_FREESTANDING';

						// Additional Addresses
						installationAddress.streetNumber = customer['installationstreetnumber'];
						installationAddress.streetName = customer['installationstreetname'];
						installationAddress.unitNumber = undefined;
						installationAddress.buildingName = undefined;
						installationAddress.buildingFloor = undefined;
						installationAddress.complexName = undefined;
						installationAddress.estateName = undefined;
						installationAddress.estateUnitStreetNumber = undefined;
						installationAddress.estateUnitStreetName = undefined;
						installationAddress.companyName = undefined;

						deliveryAddress.suburb = customer['installationSuburb'];
						deliveryAddress.province = customer['installationProvince'];
						deliveryAddress.postalCode = customer['installationPostalCode'];
						deliveryAddress.city = customer['installationTown'];
						deliveryAddress.type = 'delivery';
						deliveryAddress.buildingType = 'BUILDING_TYPE_FREESTANDING';

						// Additional Addresses
						deliveryAddress.streetNumber = customer['installationstreetnumber'];
						deliveryAddress.streetName = customer['installationstreetname'];
						deliveryAddress.unitNumber = undefined;
						deliveryAddress.buildingName = undefined;
						deliveryAddress.buildingFloor = undefined;
						deliveryAddress.complexName = undefined;
						deliveryAddress.estateName = undefined;
						deliveryAddress.estateUnitStreetNumber = undefined;
						deliveryAddress.estateUnitStreetName = undefined;
						deliveryAddress.companyName = undefined;
					}
					OrderService.setFibreServiceParameters(order, customer);
				}
				const deliveryAddress: IOrderAddress | undefined = order.addresses.find((p) => p.type === 'delivery');
				if (deliveryAddress) {
					deliveryAddress.suburb = customer['installationSuburb'];
					deliveryAddress.province = customer['installationProvince'];
					deliveryAddress.postalCode = customer['installationPostalCode'];
					deliveryAddress.city = customer['installationTown'];
					deliveryAddress.type = 'delivery';
					deliveryAddress.buildingType = 'BUILDING_TYPE_FREESTANDING';

					// Additional Addresses
					deliveryAddress.streetNumber = customer['installationstreetnumber'];
					deliveryAddress.streetName = customer['installationstreetname'];
					deliveryAddress.unitNumber = undefined;
					deliveryAddress.buildingName = undefined;
					deliveryAddress.buildingFloor = undefined;
					deliveryAddress.complexName = undefined;
					deliveryAddress.estateName = undefined;
					deliveryAddress.estateUnitStreetNumber = undefined;
					deliveryAddress.estateUnitStreetName = undefined;
					deliveryAddress.companyName = undefined;
				}
				/* Set LTE Physical Address */
				const ltePhysicalAddress: IOrderAddress = OrderService.getOrderAddress;
				ltePhysicalAddress.streetNumber = customer['installationstreetnumber'];
				ltePhysicalAddress.streetName = customer['installationstreetname'];

				if (customer['installationaddress2']) {
					ltePhysicalAddress.unitDesc = customer['installationaddress2'];
				} else {
					ltePhysicalAddress.unitDesc = '';
				}
				ltePhysicalAddress.suburb = customer['installationSuburb'];
				ltePhysicalAddress.province = customer['installationProvince'];
				ltePhysicalAddress.postalCode = customer['installationPostalCode'];
				ltePhysicalAddress.city = customer['installationTown'];
				ltePhysicalAddress.type = 'physical';
				ltePhysicalAddress.buildingType = 'BUILDING_TYPE_FREESTANDING';

				// Additional Addresses
				ltePhysicalAddress.streetNumber = customer['streetnumber'];
				ltePhysicalAddress.unitNumber = undefined;
				ltePhysicalAddress.buildingName = undefined;
				ltePhysicalAddress.buildingFloor = undefined;
				ltePhysicalAddress.complexName = undefined;
				ltePhysicalAddress.estateName = undefined;
				ltePhysicalAddress.estateUnitStreetNumber = customer['estateUnitStreetNumber'];
				ltePhysicalAddress.estateUnitStreetName = customer['estateUnitStreetName'];
				ltePhysicalAddress.companyName = customer['companyName'];

				// const portalShoppingCartSessionKey = localStorage?.getItem('portalShoppingCartSession') || ''; // ask localStorage for portalShoppingCartSession
				const portalShoppingCartSessionFromStorage: IShoppingCartSession = portalShoppingCartSessionKey; // convert shopping cart session to object
				const tillSlipData = await TillSlipService.getTillSlip(portalShoppingCartSessionFromStorage.shoppingCart);
				const finalBasket = tillSlipData.basket;

				order.products = finalBasket.shoppingCart[0].products;

				const sessionUpdate: IShoppingCartSessionUpdate = {
					addressSearch: GetCoverageDataToShoppingCart(),
					id: portalShoppingCartSession?.id ?? 91,
					userIdentifier: portalShoppingCartSession?.userIdentifier ?? '',
					shoppingCart: finalBasket,
					tillSlipData: tillSlipData,
					orderFormData: orderForm,
					currentCheckoutStep: pageUrl ?? '',
				};
				const updatedSession = await ShoppingCartSessionService.setShoppingCartSession(sessionUpdate);
				if (updatedSession) {
					localStorage?.setItem('portalShoppingCartSession', JSON.stringify(updatedSession));
				}
			}
		}
	}

	// If no input errors then  enable  Continue button

	const validateForm = () => {
		let isValid = true;
		Object.entries(addressDetails).forEach((entry) => {
			const [key, value] = entry;
			if (value.length === 0) {
				isValid = false;
			}
		});
		return isValid;
	};
	return (
		<div className='flex flex-col gap-4'>
			<MwebInput
				id={`free-standing-street-address`}
				labelText='Street Address'
				iconPostion=''
				showIcon={false}
				type='text'
				isDisabled={false}
				placeHolderText=''
				inputValue={addressDetails.streetAddress}
				handleChange={(value) => onHandleChange('streetAddress', value)}
				errorText={addressDetails.streetAddress.length === 0 ? 'This field is required' : ''}
				helperText={''}
			/>

			<section className='grid grid-cols-3 gap-4'>
				<div className='col-span-3 md:col-span-1'>
					<MwebInput
						id={`free-standing-city`}
						labelText='City'
						iconPostion=''
						showIcon={false}
						type='text'
						isDisabled={false}
						placeHolderText=''
						inputValue={addressDetails.city}
						handleChange={(value) => onHandleChange('city', value)}
						errorText={addressDetails.city.length < 1 ? 'This field is required' : ''}
						helperText={''}
					/>
				</div>
				<div className='col-span-3 md:col-span-1'>
					<MwebInput
						id={`free-standing-province`}
						options={[
							{
								value: '',
								label: '',
							},
							{
								value: 'Western Cape',
								label: 'Western Cape',
							},
							{
								value: 'Gauteng',
								label: 'Gauteng',
							},
							{
								value: 'Northern Cape',
								label: 'Northern Cape',
							},
						]}
						errorText={''}
						helperText={''}
						labelText='Province'
						placeHolderText=''
						type='select'
						isFullWidth
						inputValue={addressDetails.province}
						showIcon={false}
						isDisabled={false}
						handleChange={(e) => handleSelectProvinceChange(e)}
					/>
				</div>
				<div className='col-span-3 md:col-span-1'>
					<MwebInput
						id={`free-standing-postal-code`}
						labelText='Postal Code'
						iconPostion=''
						showIcon={false}
						type='text'
						isDisabled={false}
						placeHolderText=''
						inputValue={addressDetails.postalCode}
						handleChange={(value) => onHandleChange('postalCode', value)}
						errorText={addressDetails.postalCode.length === 0 ? 'This field is required' : ''}
						helperText={''}
					/>
				</div>
			</section>
		</div>
	);
}
