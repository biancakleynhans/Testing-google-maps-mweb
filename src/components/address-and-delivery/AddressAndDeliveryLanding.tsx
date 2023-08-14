'use client';

// Import React and useState hook for state management
import React, { useEffect, useState } from 'react';

// Import components and libraries
import Jumpotron from '@/components/checkout/Jumpotron';

import FreeStanding from '@/components/address-and-delivery/FreeStanding';

import MwebSliceContainer from '@/components/shared/MwebSliceContainer';

import { IGeneralCheckout, getGeneralCheckoutContent } from '@/services/GeneralCheckoutService';
import { useNavContext } from '@/context/NavigationContext';
import { iOrderSummaryCardDetails } from '@/components/ui/mwebCard/CardStyles';
import MwebRadioButton from '@/components/ui/mwebRadioButton/MwebRadioButton';
import MwebBottomSheet from '@/components/ui/mwebBottomSheet/MwebBottomSheet';
import MwebCard from '@/components/ui/mwebCard/MwebCard';
import ApartmentOrComplex from '@/components/address-and-delivery/ApartmentOrComplex';
import Estate from '@/components/address-and-delivery/Estate';
import DeliveryToDifferentAddress from '@/components/address-and-delivery/DeliveryToDifferentAddress';
import {useClientJourney} from '@/context/ClientJourneyContext';
import {AnalyticsService} from '@/services/analyticsService';
import runEcommerceTracking from '@/services/ecommerceTrackingService';
import {IOrder} from "@/services/order.service";
import {IShoppingCartSession} from "@/services/shoppingCartSessionService";
const Options = [
    { label: 'Free standing house', value: 'Free standing house' },
    { label: 'Apartment / Complex', value: 'Apartment / Complex' },
    { label: 'Estate', selected: false, value: 'Estate' },
]

// Define functional component AddressAndDelivery
export default function AddressAndDeliveryLanding() {
	const {currActiveStep, handleCurrActiveStep, handleIsNextActive, isNextActive} = useNavContext();
	const [selectedOption, selectOption] = useState<string>('Free standing house');
	const [isFormValid, setIsFormValidated] = useState<boolean>(false);
	const [isAddressValid, setIsAddressValidated] = useState<boolean>(true);
	const [disabled, SetDisabled] = useState<boolean>(true);
    const [portalShoppingCartSession, setPortalShoppingCartSession] = useState<IShoppingCartSession | null>(null);

	const [generalCheckoutContent, setGetGeneralCheckoutContent] = useState<IGeneralCheckout>();

	useEffect(() => {
		getGeneralCheckoutContent().then((data) => {
			setGetGeneralCheckoutContent(data[0]);
		});
	}, []);
	//
	const [isDeliveryToDifferentAddress, setIsDeliveryToDifferentAddress] = useState<boolean>(false);

	// Run Google Analytics

	runEcommerceTracking('address/delivery');

	// react to delivery and product address selection changes
	function handleDeliveryChange() {
		setIsDeliveryToDifferentAddress((state) => {
			if (state) {
				setIsAddressValidated(true);
				// handleIsNextActive(false)
			}
			return !state;
		});
	}

	const {recommendedVasProducts, selectedProduct, selectedRouter, orderCharges} = useClientJourney();
	//
	useEffect(() => {
		// Build products

		let productItems: any[] = [];

		// pack all selected fibre products

		if (selectedProduct) {
			productItems.push({
				id: '',
				productName: selectedProduct.productName,
				productPrice: selectedProduct.productPrice,
				productCode: selectedProduct.productCode,
				subcategory: selectedProduct.promoCodeCategory,
			});
		}

		// pack all selected routers
		if (selectedRouter) {
			productItems.push({
				id: '',
				productName: selectedRouter.name,
				productPrice: selectedRouter.price,
				productCode: selectedRouter.productCode,
				promoCode: selectedRouter.promoCode,
			});
		}

		// pack all selected recommended products
		if (recommendedVasProducts) {
			// map all recommended products to fit the required interface
			const recommendedProducts = recommendedVasProducts.map((item: any, index: number) => {
				return {
					id: index,
					productName: item.name,
					productPrice: item.price,
					productCode: item.productCode,
					subcategory: item.subcategory,
				};
			});

			// update page products list
			productItems = [...productItems, ...recommendedProducts];
		}
		const analyticsService = new AnalyticsService();
		analyticsService.pushAddShippingInfoGA4Tracking(productItems);
	}, [recommendedVasProducts, selectedProduct, selectedRouter]);

	useEffect(() => {
		if (!isAddressValid || !isFormValid) {
			handleIsNextActive(false);
			SetDisabled(true);
		} else {
			handleIsNextActive(true);
			SetDisabled(false);
		}
	}, [isAddressValid, isFormValid]);
	//
	return (
		<div className='flex flex-col w-full'>
			{/** Heading */}
			<Jumpotron heading={generalCheckoutContent?.generalCheckoutAddressDeliveryPageHeading || ''} />

			<section className='flex flex-row justify-center lg:gap-12 px-4' data-testid=''>
				{/** PRODUCT ADDRESS */}
				<div className='max-w-[592px] w-full'>
					<section className='rounded-2xl bg-white flex flex-col py-6 pb-0'>
						<section className='flex flex-col justify-start items-start'>
							<div className='lg:px-6   px-4 text-mwTextParaBaseSemi lg:text-mwTextParaXLargeSemi  text-mwGrey-900 text-left pb-1 lg:pb-2'>
								{generalCheckoutContent?.generalCheckoutAddressProductAddressHeading}
							</div>
							<div className='lg:px-6 px-4 lg:pb-6 pb-4 text-mwTextParaSmall lg:text-mwTextParaBase text-mwGrey-600 text-left'>
								{generalCheckoutContent?.generalCheckoutAddressProductAddressSummary}
							</div>
						</section>

						<div className='flex flex-col space-y-4'>
							<div className='flex flex-col'>
								{Options.map((option, index) => {
									return (
										<div className={`${selectedOption === option.value ? 'p-4 lg:p-6 pt-0 lg:pt-0' : ''} border-t  border-t-mwPrimary-50 flex flex-col`} key={index}>
											<div className={`hidden md:flex ${selectedOption === option.value ? '-ml-6' : ''}`}>
												<MwebRadioButton
													id={`${option.value.trim().replace(' ', '-')}-${index}`}
													disabled={false}
													isSelected={selectedOption === option.value}
													handleOnChange={(isSelected) => (isSelected ? selectOption(option.value) : null)}
													label={option.label}
													variant={'standard'}
													size={'large'}
												/>
											</div>
											<div className={`flex md:hidden ${selectedOption === option.value ? '-ml-4' : ''}`}>
												<MwebRadioButton
													id={`${option.value.trim().replace(' ', '-')}-${index}`}
													disabled={false}
													isSelected={selectedOption === option.value}
													handleOnChange={(isSelected) => (isSelected ? selectOption(option.value) : null)}
													label={option.label}
													variant={'standard'}
													size={'small'}
												/>
											</div>
											{(() => {
												if (selectedOption === option.value) {
													switch (selectedOption) {
														case 'Free standing house':
															return <FreeStanding updateValidationState={(value) => setIsFormValidated(value)} />;

														case 'Apartment / Complex':
															return <ApartmentOrComplex updateValidationState={(value) => setIsFormValidated(value)} />;
														case 'Estate':
															return <Estate updateValidationState={(value) => setIsFormValidated(value)} />;

														default:
															break;
													}
												}
											})()}
										</div>
									);
								})}
							</div>
						</div>
					</section>

					{/** Delivery address */}
					<div className='rounded-2xl  my-4 bg-white lg:mt-10 flex flex-col'>
						<section className='flex flex-col justify-start items-start  px-4 py-6 lg:p-6'>
							<div className='text-mwTextParaBaseSemi lg:text-mwTextParaXLargeSemi  text-mwGrey-900 text-left pb-1 lg:pb-2'>
								{generalCheckoutContent?.generalCheckoutAddressDeliveryAddressHeading}
							</div>
							<div className='text-mwTextParaSmall lg:text-mwTextParaBase text-mwGrey-600 text-left'>{generalCheckoutContent?.generalCheckoutAddressDeliveryAddressSummary}</div>
						</section>
						<div className='flex flex-col space-y-4'>
							<div className='flex flex-col'>
								<div className='border-t border-t-mwPrimary-50 flex flex-col'>
									<div className={`hidden md:flex`}>
										<MwebRadioButton
											id={'sameAddress'}
											disabled={false}
											isSelected={!isDeliveryToDifferentAddress}
											handleOnChange={handleDeliveryChange}
											label={'Same as product address'}
											variant={'standard'}
											size={'large'}
										/>
									</div>
									<div className={`flex md:hidden`}>
										<MwebRadioButton
											id={'sameAddress'}
											disabled={false}
											isSelected={!isDeliveryToDifferentAddress}
											handleOnChange={handleDeliveryChange}
											label={'Same as product address'}
											variant={'standard'}
											size={'small'}
										/>
									</div>
								</div>
								<div className={`px-4 md:px-6 ${isDeliveryToDifferentAddress ? 'pt-0 pb-4 md:pb-6' : 'pb-0'} border-t flex flex-col`}>
									<div className={`hidden md:flex -ml-6`}>
										<MwebRadioButton
											id={'differentAddress'}
											disabled={false}
											isSelected={isDeliveryToDifferentAddress}
											handleOnChange={handleDeliveryChange}
											label={'Deliver to a different address'}
											variant={'standard'}
											size={'large'}
										/>
									</div>
									<div className={`flex md:hidden -ml-4`}>
										<MwebRadioButton
											id={'differentAddress'}
											disabled={false}
											isSelected={isDeliveryToDifferentAddress}
											handleOnChange={handleDeliveryChange}
											label={'Deliver to a different address'}
											variant={'standard'}
											size={'small'}
										/>
									</div>

									{isDeliveryToDifferentAddress && <DeliveryToDifferentAddress onHandleStateChange={(value) => setIsAddressValidated(value)} />}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/** * Order Summary Component * */}
				<div className='max-w-[362px] w-full hidden lg:block '>
					<MwebCard
						onClickCallback={() => handleCurrActiveStep('next')}
						type='order-summary'
						size='large'
						cardDetails={
							{
								btnLabel: generalCheckoutContent?.generalCheckoutAddressDeliveryCtaText ?? 'Continue',
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
					buttonText={generalCheckoutContent?.generalCheckoutAddressDeliveryCtaText ?? 'Continue'}
					items={2}
					IsProceedDisabled={disabled}
					editAction={() => handleCurrActiveStep('back')}
				/>
			</section>
		</div>
	);
}
