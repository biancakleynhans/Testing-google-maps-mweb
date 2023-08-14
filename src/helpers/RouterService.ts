// Utilities
const Utilities = {
	mapProductsfromPromo: (pc: any) => {
		//
		const x = pc.promoProducts.map((p: any) => {
			
			// build router options  list item
			const name = p.friendlyName ? p.friendlyName : p.productName;
			const price = p.productRate;
			const displayPrice = p.displayPrice;
			const discount = p.productDiscountAmount;
			const productCode = p.productCode;
			const promoCode = pc.dealPromoCode;
			const subcategory = p.subcategory;
			const onceOffCharge = p.onceOffCharge;
			const dealPromoCodecategory = 'to-be-computed';
			const summary = p.summary;
			const highlights = p.highlights;
			const productDescriptionAlternative = p?.productDescriptionAlternative;
			const fullHighlights = 'to-be-computed';
			const image = 'to-be-computed';
			const isAddedToCart = false;
			const chargePeriod = p.chargePeriod;
			const minimumContractMonths = p.minimumContractMonths;
			const tagLine = p.tagLine;

			return {
				name,
				price,
				image,
				discount,
				summary,
				tagLine,
				highlights,
				subcategory,
				displayPrice,
				promoCode,
				productCode,
				fullHighlights,
				onceOffCharge,
				chargePeriod,
				isAddedToCart,
				dealPromoCodecategory,
				minimumContractMonths,
				productDescriptionAlternative,
			};
		});

		return x;
	},
};

/**
 *
 */
interface Props {
	promoCodeDeals: any;
	promoCodeDetails: any;
	product: any;
}

function buildRouterOptions(props: Props): any[] {
	const {promoCodeDeals, promoCodeDetails, product} = props;

	//
	let routerOptions: any[] = [];

	// Check for Mandatory Devices : filter out deals based on description contains "router" and minProductsRequiredOSU===1
	const mandatoryDeviceDeals = promoCodeDeals?.deals?.find((p: any) => p.dealDescription.toLowerCase().includes('router') && p.minProductsRequiredOSU === 1);
	const mandatoryDeviceCount = mandatoryDeviceDeals && mandatoryDeviceDeals.promoProducts.length > 0 ? mandatoryDeviceDeals.promoProducts.length : null;

	//  Do we need to force add a non-mandatory device
	//  But only if there are no mandatory devices
	// AND don't auto-add for Switch Promo
	let index = 0;
	const _fsForceNoMandatoryDevice = true;

	if (_fsForceNoMandatoryDevice && !mandatoryDeviceCount) {
		// remove No Router select option
		const promoDeals = promoCodeDeals?.deals?.filter((p: any) => p.minProductsRequiredOSU === 0);

		const optionalProducts = promoDeals?.flatMap(Utilities.mapProductsfromPromo) ?? [];

		optionalProducts?.forEach((optionProduct: any) => {
			if (optionProduct.name.toLowerCase().includes('router')) {
				

				index++;

				optionProduct.id = index;
				optionProduct.title = product.name;
				optionProduct.tagLine = product.tagLine,
				optionProduct.image = 'To-be-computed';
				optionProduct.primaryProductCode = product.productCode;
				optionProduct.primaryPromoCode = promoCodeDetails.promoCode;
				optionProduct.isMandatoryRouterOption = false;
				optionProduct.chargePeriod = product.chargePeriod

				// tillSlipKey = TillSlipService.buildTillSlipKey(optionProduct);
				// optionProduct.tillSlipKey = tillSlipKey;

				routerOptions.push(optionProduct);
			}
		});
	}

	/**
	 *
	 */
	if (mandatoryDeviceCount && mandatoryDeviceCount > 0) {
		const x = '';

		console.log('we have mandatory devices count > 0');
	}

	return routerOptions;
}

const RouterService = {
	buildRouterOptions: buildRouterOptions,
	Utilities: Utilities,
};

export default RouterService;
