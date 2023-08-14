import {ICampaign, IGetCampaignsParams, IProduct} from '@/models/Products';
import {fetchFromServer} from '@/utils/Fetching';
import {convertResponseItemToCampaign, convertResponseItemToProduct, convertResponseItemToPromo} from '@/utils/Conversions';

export async function getProductsForCampaign(campaign: ICampaign, providerType: 'fibre' | 'lte') {
	let products: IProduct[] = [];
	let url = `${process.env.NEXT_PUBLIC_BAAS_BASE_URL}proxy/marketing/products/promos/${campaign.promocodes.join(',')}?sellable_online=true`;

	let response = await fetchFromServer(url);
	let data = await response.json();

	for (const item of data) {
		try {
			const promo = convertResponseItemToPromo(item);

			if (!promo) {
				continue;
			}

			for (const productItem of item.products) {
				try {
					let product = convertResponseItemToProduct(productItem, promo, campaign, providerType);
					// console.log('%c Product', 'color:hotpink', product);

					if (product) {
						products.push(product);
					}
				} catch (productError) {
					console.error(`error processing product for fibre promo code ${promo.promoCode}`, productError);
				}
			}
		} catch (promoError) {
			console.error(`error processing fibre promo code ${item?.promoCode}`, promoError);
		}
	}

	return products;
}

export async function getCampaigns({category, channel, subcategories}: IGetCampaignsParams): Promise<ICampaign[]> {
	let url = `${process.env.NEXT_PUBLIC_BAAS_BASE_URL}proxy/marketing/campaigns/${category}?channels=${channel}&visibility=public`;
	let campaigns: ICampaign[] = [];

	if (subcategories) {
		url = `${url}&subcategories=${subcategories.join(',')}`;
	}

	const response = await fetchFromServer(url);
	const {campaigns: data, errors} = await response.json();

	if (errors) {
		return campaigns;
	}

	if (response.ok) {
		if (!Array.isArray(data)) {
			console.log('No Campaign Data');
			return Promise.reject('response data is not an array of campaigns');
		}

		for (const item of data) {
			let campaign = convertResponseItemToCampaign(item);

			if (campaign) {
				campaigns.push(campaign);
			}
		}

		return campaigns;
	} else {
		const error = new Error(errors?.map((e: any) => e.message).join('\n') ?? 'unknown');
		return Promise.reject(error);
	}
}
