'use client';

import React, {useState, useEffect} from 'react';
import {confirmationPageData} from '@/components/OrderConfirmation/OrderConfirmationPageMockData';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import {useClientJourney} from "@/context/ClientJourneyContext";
import {AnalyticsService} from "@/services/analyticsService";
import { IGeneralCheckout, getGeneralCheckoutContent } from '@/services/GeneralCheckoutService';
import {getGeneralBannerContent, IGeneralBanner} from '@/services/MobileBannerService';
import MobileAppBanner from '@/components/OrderConfirmation/MobileBanner';
import runEcommerceTracking from "@/services/ecommerceTrackingService";

export default function OrderConfirmation() {
	const item = confirmationPageData[0]; // Access the first item in the array

	const { recommendedVasProducts, selectedProduct, selectedRouter, orderCharges } =
		useClientJourney();
	// Run Google Analytics
	const [orderNumber, setOrderNumber] = useState('')
	runEcommerceTracking('purchase')

	const [orderData, setOrderData] = useState('') as any
	useEffect(() => {
		const item = JSON.parse(localStorage.getItem('orderResponse') as any)
		console.log('item##', item)
		if (item) {
			setOrderData(item)
		}
	}, [])

	// const orderData : any = JSON.parse(localStorage?.getItem("orderResponse") || '') ;
	useEffect(() => {
		if (orderData) {
			const orderNumber = orderData.orderNumber?.toLowerCase().replace("x", " ");
			setOrderNumber(orderNumber)
		}
	}, )


	// console.log('data:', confirmationPageData[0])
	const [generalCheckoutContent, setGeneralCheckoutContent] = useState<IGeneralCheckout>();

	useEffect (() => {
		getGeneralCheckoutContent().then((data) => {
			setGeneralCheckoutContent(data[0])
		})
	},[])

	return (
		<>
			<MwebSliceContainer sectionId='order-confirmation-page' bgColor='bg-white'>
				<div className='w-full flex flex-col py-14 px-4 lg:py-24 lg:px-[182px]'>
					<div className='flex flex-col justify-center items-center w-full gap-y-10'>
						{/* Header */}
						<div className='text-mwGrey-900 flex text-center text-mwTextMobileH1Bold lg:text-mwTextDeskH1Bold'>{generalCheckoutContent?.generalCheckoutOrderConfirmationPageHeading}</div>
						{/* text */}

						<div className='w-full text-mwTextParaBase lg:text-mwTextParaXLarge text-center   text-mwGrey-600'>
							{item.order_number_text}
							<span className='text-mwTextParaXLargeSemi'> {orderNumber}</span>
						</div>

						<div className='w-full lg:text-mwTextParaBase text-mwTextParaSmall text-center  text-mwGrey-600'>{generalCheckoutContent?.generalCheckoutOrderConfirmationThanksText}</div>

						{/* ACTION BUTTON */}
						<div className='hidden lg:flex'>
							<MwebButton size='large' btnText={generalCheckoutContent?.generalCheckoutOrderConfirmationTrackOrderCtaText || ''} hasIcon={false} isDisabled={false} onClickFunction={() => {}} color={'primary'} />
						</div>
						<div className='lg:hidden flex'>
							<MwebButton size='medium' btnText={generalCheckoutContent?.generalCheckoutOrderConfirmationTrackOrderCtaText || ''} hasIcon={false} isDisabled={false} onClickFunction={() => {}} color={'primary'} />
						</div>
					</div>
				</div>
			</MwebSliceContainer>
			<div className='flex'>
			<MobileAppBanner/>
			</div>
			
		</>
	);
}
