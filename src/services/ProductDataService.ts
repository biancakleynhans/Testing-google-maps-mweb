import {CampaignCategory, CampaignChannel, IProduct} from '@/models/Products';
import {getCampaigns, getProductsForCampaign} from './CampaignService';

function sortLteProductsUncappedAndPrice(p1: IProduct, p2: IProduct) {
	const p1Capped = p1.cappedStatus === 'Capped';
	const p2Capped = p2.cappedStatus === 'Capped';

	const p1Price = p1.productPrice !== null ? p1.productPrice : 0;
	const p2Price = p2.productPrice !== null ? p2.productPrice : 0;

	if (p1Capped && p2Capped) {
		// If BOTH CAPPED sort by price descending
		return p1Price - p2Price;
	} else if (!p1Capped && !p2Capped) {
		// If BOTH UNCAPPED sort by price ascending
		return p2Price - p1Price;
	} else {
		// sort UNCAPPED before CAPPED
		if (p1Capped) {
			return 1;
		} else {
			return -1;
		}
	}
}

export async function getAllProducts() {
	let fibre = {category: CampaignCategory.FIBRE, channel: CampaignChannel.ALL_CUSTOMERS, subcategories: []};
	let lte = {category: CampaignCategory.LTE, channel: CampaignChannel.ALL_CUSTOMERS, subcategories: []};

	const FibreCampaigns = await getCampaigns(fibre);
	const FibreproductPromises = FibreCampaigns.filter((c) => c.isStandardCampaign || c.isDefaultCampaign).map((c) => getProductsForCampaign(c, 'fibre'));
	const FibreProductResponses = await Promise.all(FibreproductPromises);
	const FibreProducts = FibreProductResponses.flatMap((r) => r);

	// console.log('%c CAMPAINS FIBRE: ', 'color:lime', FibreCampaigns);
	// console.log('%c PRODUCTS FIBRE: ', 'color:lime', FibreProducts);

	const LteCampaigns = await getCampaigns(lte);
	const LteProductPromises = LteCampaigns.map((c) => getProductsForCampaign(c, 'lte'));
	const LteroductResponses = await Promise.all(LteProductPromises);
	const LteProducts = LteroductResponses.flatMap((r) => r).sort(sortLteProductsUncappedAndPrice);

	// console.log('%c CAMPAINS LTE: ', 'color:lightseagreen', LteCampaigns);
	// console.log('%c PRODUCTS LTE: ', 'color:lightseagreen', LteProducts);

	return {fibre: FibreProducts, lte: LteProducts};
}
