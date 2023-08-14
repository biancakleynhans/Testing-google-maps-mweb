'use client';

import React, {useEffect, useState} from 'react';

import Jumpotron from '@/components/checkout/Jumpotron';
import {FaCheck} from 'react-icons/fa';

import RegisterPanel from '@/components/auth/RegisterPanel';
import SecurityVerification from '@/components/auth/SecurityVerification';
import LoginActionPanel from '@/components/auth/LoginActionPanel';
import CommunicationPreference from '@/components/checkout/CommunicationPreference';

import {useNavContext} from '@/context/NavigationContext';
import MwebInput from '@/components/ui/MwebInput/MwebInput';
import MwebCard from '@/components/ui/mwebCard/MwebCard';
import {iOrderSummaryCardDetails} from '@/components/ui/mwebCard/CardStyles';
import MwebBottomSheet from '@/components/ui/mwebBottomSheet/MwebBottomSheet';
import {getGeneralCheckoutContent, IGeneralCheckout} from '@/services/GeneralCheckoutService';
import {Lead} from '@/services/lead.class';
import {IShoppingCartSession, IShoppingCartSessionUpdate, ShoppingCartSessionService} from '@/services/shoppingCartSessionService';
import {TillSlipService} from '@/services/tillSlipService';
import {usePathname} from 'next/navigation';
import {useCoverage} from '@/context/CoverageContext';
import {IAddressObject} from '@/models/Coverage';
import {useInternetServiceProviders} from '@/context/InternetServiceProvidersContent';
import {GetCoverageDataToShoppingCart} from '@/utils/Coverage';
//
const personalDetailsInitialValues = {
	name: '',
	surname: '',
	id_number: '',
	email: '',
	contact_number: '',
	alternative_contact_number: '',
};

export class User {
	name: string | undefined;
	surname: string | undefined;
	id_number: string | undefined;
	email: string | undefined;
	contact_number: number | undefined;
	alternative_contact_number: string | undefined;
}

//
interface IPersonalDetails {
	name: string;
	surname: string;
	id_number: string;
	email: string;
	contact_number: string;
	alternative_contact_number: string;
}
export default function YourDetailsLanding() {
	const {handleCurrActiveStep, handleIsNextActive, isNextActive} = useNavContext();
	const [details, setPersonalDetails] = useState<IPersonalDetails>(personalDetailsInitialValues);
	const [disabled, SetDisabled] = useState<boolean>(true);
	const [isFormValid, setIsFormValidated] = useState<boolean>(false);
	let lead: Lead;
	let user: IPersonalDetails;
	const [isContinueClicked, setIsContinueClicked] = useState(false);
	const [customerLead, setCustomerLead] = useState<any>(null);

	const [generalCheckoutContent, setGeneralCheckoutContent] = useState<IGeneralCheckout>();

	useEffect(() => {
		getGeneralCheckoutContent().then((data) => {
			setGeneralCheckoutContent(data[0]);
		});
	}, []);
	const [portalShoppingCartSession, setPortalShoppingCartSession] = useState<IShoppingCartSession | null>(null);
	const pageUrl = usePathname();
	const {currentCoverageObj, statusType, providerType} = useCoverage();
	const {servicesFromCoverage} = useInternetServiceProviders();
	const detailsBtnCta = generalCheckoutContent?.generalCheckoutYourDetailsCtaText || '';

	const [isUserVerified, setIsUserVerified] = useState<boolean>(false); // For demo purposes only
	const [isSecurityVerificationOpen, setIsSecurityVerificationOpen] = useState<boolean>(false);
	//
	const handleOnContinuetoAddressAndPayment = () => {
		// submitOrder([]);
		processLeadAndOrderForm();
		// submitOrder([])
		// if (isUserVerified) {
		//     // handleCurrActiveStep('next');
		//     //handleCurrActiveStep('next');
		// }
		//handleCurrActiveStep('next');
	};

	const onHandleChange = (key: any, value: any) => {
		setPersonalDetails({...details, [key]: value});
	};

	useEffect(() => {
		setIsFormValidated(validateForm(details));
	}, [details]);

	// If no input errors then  enable  Continue button
	function validateForm(form: any) {
		let isValid = true;
		Object.entries(details).forEach((entry) => {
			const [key, value] = entry;
			if (value.length === 0) {
				isValid = false;
			}
		});
		return isValid;
	}

	async function processLeadAndOrderForm() {
		lead = new Lead();
		user = details;
		lead.title = 'Mr';
		lead.firstName = user.name;
		lead.lastName = user.surname;
		lead.mobileNumber = user.contact_number;
		lead.emailAddress = user.email;
		const apiProxyUrl = `${process.env.NEXT_PUBLIC_APIGW_BAAS_PROXY_URL}/customer/accounts`;
		const responseData = fetch(apiProxyUrl, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(lead),
		});
		await responseData
			.then((response) => {
				return response.json();
			})
			.then((lead) => {
				setCustomerLead(lead);
				return createAsyncOrder();
			});
	}
	const handleOnSecurityVerificationClose = () => {
		setIsSecurityVerificationOpen(false);
		setIsUserVerified(true);
	};

	// control whether should we show Personal Details or Login Component
	const [isLoginDisplay, setIsLoginDisplay] = useState<boolean>(false);

	// when Register is clicked, go back to Personal Details State
	const handleOnRegisterClick = () => {
		setIsLoginDisplay(false);
	};

	function onSubmit(form: any) {
		validateForm(form);
	}

	function isHoneyPotEmpty(form: any) {
		let isEmpty = false;

		if (form._hp == null || form._hp === '') {
			isEmpty = true;
		}
		return isEmpty;
	}

	async function createOrder(username: string, redirectDelay: number = 1000) {
		// AuthenticationService.getJwtCookie();
		const session: string = localStorage.getItem('portalShoppingCartSession') || '';
		const shoppingCart = JSON.parse(session).shoppingCart;
		const apiProxyUrl = `${process.env.NEXT_PUBLIC_APIGW_BAAS_PROXY_URL}/sales/shoppingcart/orderform/`;
		const finalCart = {
			currentQuoteId: null,
			shoppingCart: shoppingCart?.shoppingCart,
		};

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const responseData = fetch(apiProxyUrl, {
			method: 'POST',
			headers: headers,
			credentials: 'include',
			body: JSON.stringify(finalCart),
		});
		await responseData
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				return response;
			});
	}
	async function createAsyncOrder() {
		const apiProxyUrl = `${process.env.NEXT_PUBLIC_APIGW_BAAS_PROXY_URL}/sales/shoppingcart/orderform/`;
		const session: string = localStorage.getItem('portalShoppingCartSession') || '';
		const shoppingCart = JSON.parse(session).shoppingCart;
		const finalCart = {
			currentQuoteId: null,
			shoppingCart: shoppingCart.shoppingCart,
		};
		const responseData = fetch(apiProxyUrl, {
			body: JSON.stringify(finalCart),
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
			},
			method: 'POST',
			cache: 'no-cache',
		});

		await responseData
			.then((response) => {
				return response.json();
			})
			.then(async (response) => {
				if (response) {
					response.order.alternateContactNumber = details.alternative_contact_number;
					response.order.idNumber = details.id_number;
					response.order.idType = 'RSA ID Number';
					response.order.mobileNumber = details.contact_number;
					const portalShoppingCartSessionKey = localStorage.getItem('portalShoppingCartSession') || ''; // ask localStorage for portalShoppingCartSession
					if (portalShoppingCartSessionKey !== '') {
						// Grab the portal shopping cart session from the local storage
						const portalShoppingCartSessionFromStorage: IShoppingCartSession = JSON.parse(portalShoppingCartSessionKey); // convert shopping cart session to object
						setPortalShoppingCartSession(portalShoppingCartSessionFromStorage);
						const tillSlipData = await TillSlipService.getTillSlip(portalShoppingCartSessionFromStorage.shoppingCart);
						const sessionUpdate: IShoppingCartSessionUpdate = {
							addressSearch: GetCoverageDataToShoppingCart(),
							id: portalShoppingCartSession?.id ?? 91,
							userIdentifier: portalShoppingCartSession?.userIdentifier ?? '',
							shoppingCart: portalShoppingCartSessionFromStorage.shoppingCart,
							tillSlipData: tillSlipData,
							orderFormData: response,
							currentCheckoutStep: pageUrl ?? '',
						};
						const updatedSession = await ShoppingCartSessionService.setShoppingCartSession(sessionUpdate);
						if (updatedSession) {
							localStorage.setItem('portalShoppingCartSession', JSON.stringify(updatedSession));
							handleCurrActiveStep('next');
							handleCurrActiveStep('next');
						}
					}
				}
				return response;
			});
	}

	useEffect(() => {
		// createOrder('', )
		// checkCellNumber('0680927681')
	});

	useEffect(() => {
		if (!isFormValid) {
			handleIsNextActive(false);
			SetDisabled(true);
		} else {
			handleIsNextActive(true);
			SetDisabled(false);
		}
	}, [isFormValid]);

	return (
		<div className='flex flex-col'>
			{/** Heading */}
			<Jumpotron heading={generalCheckoutContent?.generalCheckoutYourDetailsPageHeading || ''} />

			<section className='flex flex-row justify-center md:gap-12 px-4' data-testid=''>
				{/** * Personal Details and Communication Preference **/}
				<div className='max-w-[592px] w-full'>
					{isLoginDisplay ? (
						<RegisterPanel handleOnClick={handleOnRegisterClick} />
					) : (
						<div>
							{/** Personal Details */}

							<section className='rounded-2xl bg-white flex flex-col px-4 py-6 md:p-6 space-y-4 md:space-y-6'>
								<section className='flex flex-col justify-start items-start'>
									<div className='text-mwTextParaBaseSemi md:text-mwTextParaXLargeSemi  text-mwGrey-900 text-left pb-1 md:pb-2'>
										{generalCheckoutContent?.generalCheckoutYourDetailsRegisterHeading}
									</div>
									<div className='text-mwTextParaSmall md:text-mwTextParaBase text-mwGrey-600 text-left'>{generalCheckoutContent?.generalCheckoutYourDetailsRegisterSummary}</div>
								</section>

								<LoginActionPanel
									handleOnClick={() => {
										setIsLoginDisplay(true);
									}}
								/>

								<div className='flex flex-col space-y-4'>
									<MwebInput
										id='name'
										iconPostion=''
										showIcon={false}
										type='text'
										subType='name'
										isDisabled={false}
										placeHolderText=''
										helperText=''
										labelText='Name'
										inputValue={details.name}
										handleChange={(val) => {
											onHandleChange('name', val);
										}}
										errorText={details.name.length === 0 ? 'This field is required' : ''}
									/>
									<MwebInput
										id='surname'
										iconPostion=''
										showIcon={false}
										type='text'
										subType='name'
										isDisabled={false}
										placeHolderText=''
										helperText=''
										labelText='Surname'
										inputValue={details.surname}
										handleChange={(val) => onHandleChange('surname', val)}
										errorText={details.surname.length === 0 ? 'This field is required' : ''}
									/>
									<MwebInput
										id='id_number'
										iconPostion=''
										showIcon={false}
										type='text'
										subType='id'
										isDisabled={false}
										placeHolderText=''
										helperText=''
										labelText='ID Number'
										inputValue={details.id_number}
										handleChange={(val) => onHandleChange('id_number', val)}
										errorText={details.id_number.length === 0 ? 'This field is required' : ''}
									/>
									<MwebInput
										id='email'
										iconPostion=''
										showIcon={false}
										type='email'
										isDisabled={false}
										placeHolderText=''
										helperText=''
										labelText='Email Address'
										inputValue={details.email}
										handleChange={(val) => onHandleChange('email', val)}
										errorText={details.email.length === 0 ? 'This field is required' : ''}
									/>
									<MwebInput
										id='contact_number'
										iconPostion=''
										showIcon={false}
										type='text'
										subType='phone'
										isDisabled={false}
										placeHolderText=''
										helperText=''
										labelText='Contact Number'
										inputValue={details.contact_number}
										handleChange={(val) => onHandleChange('contact_number', val)}
										errorText={details.contact_number.length === 0 ? 'This field is required' : ''}
									/>
									<MwebInput
										id='alternative_contact_number'
										iconPostion=''
										showIcon={false}
										type='text'
										subType='phone'
										isDisabled={false}
										placeHolderText=''
										helperText=''
										labelText='Alternative Contact Number'
										inputValue={details.alternative_contact_number}
										handleChange={(val) => onHandleChange('alternative_contact_number', val)}
										errorText={''}
									/>
								</div>

								{isUserVerified && (
									<div className='flex justify-start items-center gap-6 px-4 py-2 bg-[#bfbfbf]'>
										<div className='flex justify-start items-center  gap-2'>
											<FaCheck className='w-4 h-4' />
											<div className='flex justify-start  gap-2.5'>
												<p className='text-sm text-left text-black'>Your details have successfully been verified</p>
											</div>
										</div>
									</div>
								)}
							</section>

							<div className='rounded-2xl my-4 bg-white md:mt-10'>
								<CommunicationPreference />
							</div>
						</div>
					)}
				</div>

				{/** * Order Summary Component * */}
				<div className='max-w-[362px] w-full hidden md:block '>
					<MwebCard
						onClickCallback={() => handleOnContinuetoAddressAndPayment()}
						type='order-summary'
						size='large'
						cardDetails={
							{
								btnLabel: detailsBtnCta,
								bgColor: 'bg-white',
								orderDetails: {
									deliveryInstalation: 'FREE',
									monthly: 499,
									onceOff: 0,
								},
								editAction: () => handleCurrActiveStep('back'),
								hasVoucher: false,
								isDisabled: disabled,
								showEdit: true,
								hasIcon: true,
								iconProps: {
									variant: 'basic',
									color: 'text-white',
									icon: 'lock',
									size: 20,
									iconPosition: 'left',
								},
							} as iOrderSummaryCardDetails
						}
					/>
				</div>
				{/* STICKY SLIP FOR MOBILE */}
				<MwebBottomSheet
					handleOnProceedBtnClick={() => handleCurrActiveStep('next')}
					monthly={499}
					onceOff={0}
					deliveryInstalation={0}
					buttonText={detailsBtnCta}
					items={2}
					IsProceedDisabled={disabled}
					editAction={() => handleCurrActiveStep('back')}
				/>
			</section>

			{isSecurityVerificationOpen && <SecurityVerification isOpen={isSecurityVerificationOpen} onClose={handleOnSecurityVerificationClose} />}
		</div>
	);
}
