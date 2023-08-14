'use client';

import React, { useState, useEffect, Fragment } from 'react';
import DebitOption from './DebitOption';
import PayUOption from './PayUOption';
import { useNavContext } from '@/context/NavigationContext';
import MwebCheckbox from '../ui/mwebCheckbox/MwebCheckbox';
import MwebCard from '../ui/mwebCard/MwebCard';
import { iOrderSummaryCardDetails } from '../ui/mwebCard/CardStyles';
import Jumpotron from '../checkout/Jumpotron';
import MwebBottomSheet from '../ui/mwebBottomSheet/MwebBottomSheet';
import {IGeneralCheckout, getGeneralCheckoutContent} from '@/services/GeneralCheckoutService';

import {useClientJourney} from "@/context/ClientJourneyContext";
import {AnalyticsService} from "@/services/analyticsService";
import {IOrder, IOrderForm} from "@/services/order.service";
import {IShoppingCartSession} from "@/services/shoppingCartSessionService";
import runEcommerceTracking from '@/services/ecommerceTrackingService';

const PAYMENT_OPTIONS: { name: string; selected: boolean }[] = [
	// { name: 'Credit / Debit Card', selected: false },
	{ name: 'Debit', selected: true },
];

const TC: { text: string; selected: boolean }[] = [
	{
		selected: false,
		text: `<div className="text-left text-mwTextParaSmall">I have read and agree to the <span class="inline text-mwPrimary-900 text-mwTextParaSmallSemi">Terms & Conditions</span>
		and<span class="inline text-mwPrimary-900 text-mwTextParaSmallSemi"> Debit Order Mandate</span>
	  </div>`,
	},
	{ text: `<div className="text-left text-mwTextParaSmall">I agree to the promotional offer credit check</div>`, selected: false },
];


export default function PaymentLandingScreen() {
	const { handleCurrActiveStep } = useNavContext();
	const [paymentOptions, setPaymentOptions] = useState<{ name: string; selected: boolean }[]>(PAYMENT_OPTIONS);
	const [TandC, setTandC] = useState<{ text: string; selected: boolean }[]>(TC);
	const [canProceed, setCanProceed] = useState<boolean>(false);
	const [generalCheckoutContent, setGeneralCheckoutContent] = useState<IGeneralCheckout>();
	const [portalShoppingCartSessionKey, setPortalShoppingCartSessionKey] = useState('')
	const [orderPassed, setOrderPassed] = useState(false)
	const [cannotContinue, setCannotContinue] = useState(false)
	const [ranOnce, setRanOnce] = useState(false)
	useEffect(() => {
		const item = localStorage.getItem('portalShoppingCartSession')
		if (item) {
			setPortalShoppingCartSessionKey(item)
		}
	}, [])
	const [proceedCheckout, setProceedCheckout] = useState(false)
	let  order: IOrder;
	let orderForm:IOrderForm;
	// const portalShoppingCartSessionKey = localStorage?.getItem('portalShoppingCartSession') ??  ''; // ask localStorage for portalShoppingCartSession
	if (portalShoppingCartSessionKey !== '') {
		const portalShoppingCartSessionFromStorage: IShoppingCartSession = JSON.parse(portalShoppingCartSessionKey); // convert shopping cart session to object
		// setPortalShoppingCartSession(portalShoppingCartSessionFromStorage);
		orderForm = portalShoppingCartSessionFromStorage.orderFormData
		order = orderForm?.order
	}
	useEffect (() => {
		getGeneralCheckoutContent().then((data) => {
			setGeneralCheckoutContent(data[0])
		});
	},[])
	const paymentPageCtaBtn = generalCheckoutContent?.generalCheckoutPaymentCtaText || ''
	function handleSelectedChoice(choiceName: string) {
		let arr: { name: string; selected: boolean }[] = [];

		paymentOptions.forEach((entry) => {
			if (entry.name === choiceName) {
				entry.selected = true;
				arr.push(entry);
			} else {
				entry.selected = false;
				arr.push(entry);
			}
		});


		setPaymentOptions(arr);
		checkCanProceed();
	}
	// Run Google Tracking
	runEcommerceTracking('payment');

	const { recommendedVasProducts, selectedProduct, selectedRouter, orderCharges } =
		useClientJourney();
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
		analyticsService.pushAddPaymentInfoGA4Tracking(productItems);

	}, [recommendedVasProducts, selectedProduct, selectedRouter]);

	function handleSelectedTC(newState: string, selectedIndex: number) {
		const tempTC = TandC;
		tempTC[selectedIndex].selected = newState === 'checked';

		setTandC(tempTC);
		checkCanProceed();

		// let arr: { text: string; selected: boolean }[] = [];
		//
		// TandC.forEach((entry) => {
		//   if (entry.text === choiceName) {
		//     entry.selected = !entry.selected;
		//     arr.push(entry);
		//   } else {
		//     arr.push(entry);
		//   }
		// });
		//
		// setTandC(arr);
	}

	function checkCanProceed() {
		let proceed = false;
		let verifyTerms = false;
		let verifyPaymentOptions = false;

		// Check that all Terms are accepted
		verifyTerms = TandC.every((t) => t.selected);

		// Check if at least one Payment Option is selected
		verifyPaymentOptions = !!paymentOptions.find((p) => p.selected);

		// Set canProceed

		console.log('order', order)
		console.log('paymentOptions', paymentOptions)
		proceed = verifyTerms && verifyPaymentOptions;
		setCanProceed(proceed);
	}
   function cleanApiJsonStringRequestData(requestData: any) {

		return JSON.stringify(requestData).replace('&', '\\u0026');
	}
	// useEffect(() => {
	// 	const item =  (localStorage.getItem('orderResponse') ?? "")
	// 	if (item.length > 0) {
	// 		const orderResponse = JSON.parse(item)
	// 		setOrderPassed(true)
	// 		if (orderPassed && orderResponse.orderNumber) {
	// 			setCanContinue(true)
	// 		}
	// 	}
	// }, [canContinue, orderPassed, ranOnce])
	async function Proceed() {
		let selected = paymentOptions.filter((x) => x.selected)[0];
		// console.log('%c Proceed to check via option ', 'color:lime', selected);
		setProceedCheckout(true)
		setRanOnce(true)
		if (ranOnce) {
			setProceedCheckout(false)
		}
	  setTimeout(() => {
		  const item =  (localStorage.getItem('orderResponse') ?? "")
		  if (item.length > 0) {
			  const orderResponse = JSON.parse(item)
			  setOrderPassed(true)
			  if (orderResponse.orderNumber) {
				  handleCurrActiveStep('next');
			  }
		  }
	  }, 4000)
	  console.error('Cannot process this order for this product')


	}

	const DisplayTC = () => {
		return (
			<div className='w-full bg-white rounded-2xl flex flex-col flex-wrap justify-start items-start p-4 md:p-6 '>
				<div className='text-mwTextParaBaseSemi md:text-mwTextParaXLargeSemi text-left text-mwGrey-900 pb-4 md:pb-6'>{generalCheckoutContent?.generalCheckoutPaymentTermsHeading}</div>

				{TandC.map((tc, i) => (
					<div key={i} className='mb-4 md:mb-6'>
						<MwebCheckbox
							isChecked={tc.selected}
							disabled={false}
							label={tc.text}
							onStateChange={(newState, selectedKey) => handleSelectedTC(newState, selectedKey)}
							selectedKey={i}
						/>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className='flex flex-col'>

			<Jumpotron heading={generalCheckoutContent?.generalCheckoutPaymentPageHeading || ''}/>
			<div className='flex flex-row justify-center md:gap-12 px-4'>
				{/* LEFT COLUMN */}
				<div className='max-w-[592px] w-full flex flex-col gap-4 md:gap-6'>
					<section className='rounded-2xl bg-white flex flex-col py-6 pb-0 md:pb-0 md:py-6'>
						<section className='flex flex-col justify-start items-start px-4 md:px-6'>
							<div className='text-mwTextParaBaseSemi md:text-mwTextParaXLargeSemi  text-mwGrey-900 text-left pb-1 md:pb-2'>
								{generalCheckoutContent?.generalCheckoutPaymentOptionMainHeading}
							</div>
							<div className='text-mwTextParaSmall md:text-mwTextParaBase text-mwGrey-600 text-left mb-4 md:mb-6'>
								{generalCheckoutContent?.generalCheckoutPaymentOptionMainSummary}
							</div>
						</section>

						{paymentOptions.map((choice, index) => (
								<Fragment key={index}>
									{choice.name === 'Credit / Debit Card' ? (
										<PayUOption handleIsSelected={(choice) => handleSelectedChoice(choice)} isSelected={choice.selected} />
									) : (
										<DebitOption handleIsSelected={(choice) => handleSelectedChoice(choice)} isSelected={choice.selected} canProceedCheckout={proceedCheckout}/>
									)}
								</Fragment>
							))}

						{!orderPassed??
						<div>
							<p className='text-center text-red-500'>Order could not be processed at the moment. Please try another product</p>
						</div>}

					</section>
						<DisplayTC />
				</div>
				{/* RIGHT COLUMN */}
				<div className='max-w-[362px] w-full hidden md:block'>
				<MwebCard
							type='order-summary'
							onClickCallback={() => Proceed()}
							size='large'
							cardDetails={
								{
									showEdit: true,
									editAction: () => { },
									bgColor: 'bg-white',
									btnLabel: paymentPageCtaBtn,
									hasIcon: true,
									iconProps: { size: 20, color: '', icon: 'lock', iconPosition: 'left', variant: 'basic' },
									hasVoucher: false,
									isDisabled: !canProceed,
									orderDetails: { deliveryInstalation: 'FREE', monthly: 499, onceOff: 0 },
								} as iOrderSummaryCardDetails
							}
						/>
				</div>
			</div>
		    <MwebBottomSheet
                        handleOnProceedBtnClick={() =>  Proceed()}
                        monthly={499}
                        onceOff={0}
                        deliveryInstalation={0}
                        buttonText={generalCheckoutContent?.generalCheckoutPaymentCtaText || ''}
                        items={2}
                        IsProceedDisabled={ !canProceed}
                        editAction={() =>{}} />

		</div>
	);
}
