import React, {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {useClientJourney} from '@/context/ClientJourneyContext';
import {AnalyticsService} from '@/services/analyticsService';
import {useNavContext} from '@/context/NavigationContext';
import MwebSliceContainer from '../shared/MwebSliceContainer';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';
import Footer from '@/components/footer';
import useCheckoutProcess from '@/hooks/useCheckoutProcess';
import {NavigationHeaderTypes} from '@/constants/NavJourneySets';

export default function ProgressionFooter() {
	const {currActiveStep, isNextActive, handleCurrActiveStep, handleIsNextActive} = useNavContext();
	const {selectedProduct, selectedRouter, selectedVasProduct} = useClientJourney();
	const {routersFromSession, vasProductsFromSession, tillSlipCharges, primaryProductFromSession, removeProductFromShoppingCart} = useCheckoutProcess();

	const path = usePathname();
	const analyticsService = new AnalyticsService();

	const [isNextLabel, setIsNextLabel] = useState<string>('Next');
	const [footerColor, setFooterColor] = useState<string>('bg-white');

	function generateGoogleTrackingForRouters() {
		//Get the shopping cart session from local storage
		setTimeout(() => {
			const session: string = localStorage.getItem('portalShoppingCartSession') || '';
			const productsFromSession = JSON.parse(session).shoppingCart.shoppingCart[0];
			const routerInSession = productsFromSession.products.find((p: {productCode: string}) => p.productCode.toLowerCase().includes('router'));
			const defaultRouter = routersFromSession?.find((p) => p.productCode.toLowerCase().includes('router'));
			const addedRouter = selectedRouter?.productCode === routerInSession?.productCode;
			if (defaultRouter && !selectedRouter) {
				analyticsService.pushAddToCartGA4Tracking(defaultRouter);
			} else if (addedRouter && selectedRouter) {
				analyticsService.pushAddToCartGA4Tracking(selectedRouter);
			}
		}, 2000);
	}

	// vas addons page needs next button to be skip or next depending on selected vas or not
	useEffect(() => {
		if (path?.includes('add-ons')) {
			console.log('%c ADD ONS ROUTE check VAS Products', 'color:pink', selectedVasProduct);

			if (selectedVasProduct) {
				if (selectedVasProduct?.length === 0) {
					setIsNextLabel('Skip');
					handleIsNextActive(true);
				} else {
					let selectedValue: boolean = selectedVasProduct?.filter((x) => x.selected).length === 0;
					setIsNextLabel(selectedValue ? 'Skip' : 'Next');
				}
			} else {
				setIsNextLabel('Skip');
				handleIsNextActive(true);
			}
		}
		// not add ons page
		else {
			setIsNextLabel('Next');
		}
	}, [path, selectedVasProduct]);

	// Check currActiveStep.headerType to set color (check out one color, rest are white )
	useEffect(() => {
		// console.log('%c Nav type', 'color:lightseagreen', currActiveStep.headerType, path);
		// check out
		if (currActiveStep.headerType === NavigationHeaderTypes.ConnectivityPhase2) {
			setFooterColor('bg-mwBlueGrey-25');
		}
		// Normal NOT checkout
		else {
			setFooterColor('bg-white');
		}
	}, [currActiveStep.headerType]);

	function handleProgressionBtnNext() {
		// console.log('%c Next BTN Clicked ', 'color:yellow');
		const selectedVasProd = selectedVasProduct.find((p) => p.selected);
		if (path?.includes('confirm-location') && selectedProduct) {
			analyticsService.pushAddToCartGA4Tracking(selectedProduct);
		}
		if (path?.includes('router-selection')) {
			generateGoogleTrackingForRouters();
		}
		if (path?.includes('add-ons') && selectedVasProd) {
			analyticsService.pushAddToCartGA4Tracking(selectedVasProd);
		}
		handleCurrActiveStep('next');
	}

	const TopButtonFooter = () => {
		return (
			<div className='w-full py-6 lg:py-8 flex flex-row justify-between items-center'>
				{/* Back */}
				<div className='min-w-[160px] lg:min-w-[225px]'>
					<div className='hidden lg:flex'>
						<MwebButton isFullWidth color='secondary-dark' size='large' btnText='Back' hasIcon={false} isDisabled={false} onClickFunction={() => handleCurrActiveStep('back')} />
					</div>
					<div className='lg:hidden flex'>
						<MwebButton isFullWidth color='secondary-dark' size='medium' btnText='Back' hasIcon={false} isDisabled={false} onClickFunction={() => handleCurrActiveStep('back')} />
					</div>
				</div>

				{/* Next  */}
				<div className='min-w-[160px] lg:min-w-[225px]'>
					<div className='hidden lg:flex'>
						<MwebButton
							isFullWidth
							color='primary'
							size='large'
							btnText={isNextLabel}
							hasIcon={false}
							isDisabled={!isNextActive}
							onClickFunction={() => handleProgressionBtnNext()}
						/>
					</div>
					<div className='lg:hidden flex'>
						<MwebButton
							isFullWidth
							color='primary'
							size='medium'
							btnText={isNextLabel}
							hasIcon={false}
							isDisabled={!isNextActive}
							onClickFunction={() => handleProgressionBtnNext()}
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<MwebSliceContainer sectionId='' bgColor={footerColor}>
				<div className='w-full px-4 md:px-[15px] desktop:px-20'>
					<div className='w-full h-[1px] bg-mwGrey-400 opacity-25' />
				</div>
				<Footer variant={'condensed'} bgColor={footerColor} />
			</MwebSliceContainer>

			{currActiveStep.headerType === NavigationHeaderTypes.ConnectivityPhase2 ? (
				<>
					<div className={`clear-both h-[146px] md:hidden ${footerColor}`}></div>
				</>
			) : (
				<>
					<div className={`clear-both h-[104px] lg:h-[124px]`}></div>
					<MwebSliceContainer sectionId='' bgColor='bg-mwBlueGrey-25 fixed inset-x-0 bottom-0'>
						<div className='w-full px-4 md:px-[15px] desktop:px-20'>
							<TopButtonFooter />
						</div>
					</MwebSliceContainer>
				</>
			)}
		</>
	);
}
