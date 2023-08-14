import {useEffect, useState} from 'react';
import useCheckoutProcess from '@/hooks/useCheckoutProcess';
import {useClientJourney} from '@/context/ClientJourneyContext';
import {AnalyticsService} from '@/services/analyticsService';

export default function runEcommerceTracking(type: string) {
	const [productsGroup, setProductsGroup] = useState<any[]>([]);
	const [ranOnce, setRanOnce] = useState(false);
	const {routersFromSession, vasProductsFromSession, tillSlipCharges, primaryProductFromSession, removeProductFromShoppingCart} = useCheckoutProcess();
	const {recommendedVasProducts, selectedProduct, selectedRouter, orderCharges} = useClientJourney();
	const analyticsService = new AnalyticsService();
	useEffect(() => {
		// Build products
		let productItems: any[] = [];

		let productsGroupAPI: any = [
			{
				id: '1019isus',
				productsGroupName: 'Connectivity Solution',
				productsItems: [],
			},
		];
		// pack all selected fibre products
		if (primaryProductFromSession) {
			productItems.push({
				id: '109190181',
				productName: primaryProductFromSession.productName,
				productPrice: primaryProductFromSession.productPrice,
				isMonthly: primaryProductFromSession.productChargePeriod === 'Monthly', // boolean
				isOnceOff: false,
				promotionalText: primaryProductFromSession.highlight1,
				promoCode: primaryProductFromSession.promoCode,
				productCode: primaryProductFromSession.productCode,
			});
		}

		// pack all selected routers
		if (routersFromSession) {
			routersFromSession.forEach((router: any) => {
				productItems.push({
					id: router.id,
					productName: router.name,
					productPrice: router.price,
					isMonthly: false, // TODO
					isOnceOff: false,
					promotionalText: 'You saved  R600',
					promoCode: router.promoCode,
					productCode: router.productCode,
				});
			});
		}

		// pack all selected recommended products
		if (vasProductsFromSession) {
			vasProductsFromSession.forEach((vasProduct: any) => {
				productItems.push({
					id: vasProduct.id,
					productName: vasProduct.name,
					productPrice: vasProduct.price,
					isMonthly: false, // TODO
					isOnceOff: false,
					promotionalText: 'You saved  R600',
					promoCode: vasProduct.promoCode,
					productCode: vasProduct.productCode,
				});
			});
		}
		// analyticsService.pushViewCartGA4Tracking(productItems);

		// update productGroup List
		productsGroupAPI[0].productsItems = productItems;
		if (productItems.length > 0 && !ranOnce) {
			if (type === 'address/delivery') {
				analyticsService.pushAddShippingInfoGA4Tracking(productsGroupAPI[0]?.productsItems);
			}
			if (type === 'payment') {
				analyticsService.pushAddPaymentInfoGA4Tracking(productsGroupAPI[0]?.productsItems);
			}
			if (type === 'purchase') {
				analyticsService.pushPurchaseGA4Tracking(productsGroupAPI[0]?.productsItems);
			}
			setRanOnce(true);
		}
		//
		setProductsGroup(productsGroupAPI);
	}, [recommendedVasProducts, selectedProduct, routersFromSession, vasProductsFromSession, primaryProductFromSession]);
}
