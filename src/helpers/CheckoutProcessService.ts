import RouterService from '@/helpers/RouterService';
import {IShoppingCartSession} from '@/services/shoppingCartSessionService';

interface ITillSlipCharge {
	monthlyCharges: string;
	onceOffCharges: string;
	deliveryAndInstallationCharge: string;
}

/**
 */
async function getProductsFromPortalSession(portalShoppingCartSession: IShoppingCartSession) {
	let product = null;
	let routersFromSession: any[] = [];
	let vasProductsFromSession: any[] = [];

	// Order Charges
	let tillSlipCharges: ITillSlipCharge = {
		monthlyCharges: '',
		onceOffCharges: '',
		deliveryAndInstallationCharge: '',
	};

	if (portalShoppingCartSession && portalShoppingCartSession.primaryProductCode) {
		// Get all added products from the portal session
		const allAddedProducts = portalShoppingCartSession.shoppingCart?.shoppingCart[0].products ?? [];

		// Find primary product ideally this should come from session storage
		let productEndPoint = `${process.env.NEXT_PUBLIC_PRODUCT_DETAIL_URL}/${portalShoppingCartSession?.primaryPromoCode}/${portalShoppingCartSession?.primaryProductCode}?includeComprehensiveDetails=true`;
		const productDataRes = await fetch(productEndPoint, {method: 'GET'});
		const productData = await productDataRes.json();
		const result = productData['result'];
		const promoCodeDeals = result?.promocode_deals || {deals: []};
		const promoCodeDetails = result?.promocode_details;

		product = result?.product;
		// We did note that this product is missing promoCode
		product['promoCode'] = portalShoppingCartSession.primaryPromoCode;
		product['productCode'] = portalShoppingCartSession.primaryProductCode;
		product['productDisplayName'] = product.friendlyName;
		product['productPrice'] = product.productRate;

		/* Get router options */
		const allRouterOptions: any[] =
			RouterService.buildRouterOptions({
				promoCodeDeals,
				promoCodeDetails,
				product,
			}) ?? [];

		const promoDeals = promoCodeDeals?.deals?.filter((p: any) => p.minProductsRequiredOSU == 0 && !p.dealDescription.toLowerCase().includes('router')) ?? [];
		const allRecommendedProducts = promoDeals?.flatMap(RouterService.Utilities.mapProductsfromPromo) ?? [];
		//

		// Loop over all added in shopping cart basket and grab the relevant product from routers and vas

		allAddedProducts.forEach((addedProduct: any) => {
			// is added product a router
			const addedRouterProduct = allRouterOptions.find((routerOption) => routerOption.productCode === addedProduct.productCode);
			if (addedRouterProduct) {
				routersFromSession.push(addedRouterProduct);
			}

			// is added product a vas
			const addedVasProduct = allRecommendedProducts?.find((vasProduct: any) => vasProduct?.productCode === addedProduct?.productCode);
			if (addedVasProduct) {
				vasProductsFromSession.push(addedVasProduct);
			}
		});

		// Get TillSlip information
		if (portalShoppingCartSession.tillSlipData) {
			const chargeSections = portalShoppingCartSession.tillSlipData.chargeSections;
			// Get Monthly charges
			const reccurringCharges = chargeSections.find((chargeLine: any) => {
				const isRecurringChargeLine = chargeLine.chargeTypeSection.toLowerCase() === 'Recurring Charges'.toLocaleLowerCase();

				return isRecurringChargeLine;
			});
			const reccurringTotalCharge = reccurringCharges.totalChargeLines?.find((chargeAmount: any) => {
				const doesAmountIncludeVat = chargeAmount.totalChargeDescription.toLocaleLowerCase() === 'Total (Incl. VAT)'.toLowerCase();

				return doesAmountIncludeVat;
			});
			// Get Once-Off Charges
			const onceOffCharges = chargeSections.find((chargeLine: any) => {
				const isRecurringChargeLine = chargeLine.chargeTypeSection.toLowerCase() === 'Once-off Charges'.toLowerCase();

				return isRecurringChargeLine;
			});
			const onceOffTotalCharge = onceOffCharges?.totalChargeLines?.find((chargeAmount: any) => {
				const doesAmountIncludeVat = chargeAmount.totalChargeDescription.toLocaleLowerCase() === 'Total (Incl. VAT)'.toLowerCase();

				return doesAmountIncludeVat;
			});

			// Update till slip state
			tillSlipCharges = {
				monthlyCharges: reccurringTotalCharge.totalChargeAmount?.toUpperCase(),
				onceOffCharges: onceOffTotalCharge?.totalChargeAmount?.toUpperCase(),
				deliveryAndInstallationCharge: 'FREE',
			};
		}
	}

	return {
		productFromSession: product,
		routersFromSession: routersFromSession,
		vasProductsFromSession: vasProductsFromSession,
		tillSlipCharges: tillSlipCharges,
	};
}

const checkoutHelper = {
	getProductsFromPortalSession,
};

export default checkoutHelper;
export type {ITillSlipCharge};
