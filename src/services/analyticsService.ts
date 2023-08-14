import {IShoppingCartSession} from '@/services/shoppingCartSessionService';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const pageview = (url: string) => {
	// @ts-ignore
	window['dataLayer'].push({
		event: 'pageview',
		page: url,
	});
};
export interface IGoogleAnalyticsDataLayer {
	event: string;
	pageType: string;
	userType: string;
	userId: string;
	CategoryId: string;
	ProductCategory: string;
	ProductType: string;
	ProductName: string;
	ProductCode: string;
	PromoCode: string;
}

export interface IEcommerceActionField {
	step: string;
	option: string;
}
export interface IEcommerceProduct {
	name: string;
	id: string;
	price: string;
	brand: string;
	category: string;
	productCode: string;
	promoCode: string;
	variant: string;
	quantity: number;
}

export interface IEcommerceCheckout {
	actionField: IEcommerceActionField;
	products: IEcommerceProduct[];
}

export interface IEcommerce {
	checkout: IEcommerceCheckout;
}

export interface IEcommerceDataLayer {
	event: string;
	ecommerce: IEcommerce;
}

export interface IImpressionProduct {
	id: string;
	promoCode: string;
	name: string;
	category: string;
	list: string;
	position: number;
}

export interface IItemList {
	item_id: string;
	item_name: string;
	item_brand: string;
	item_category: string;
	price: number;
	item_promoCode: string;
	index: number;
	quantity: number;
	item_position: number;
}

export interface IItem {
	selected?: boolean;
	brand?: string;
	category?: string;
	dealPromoCodecategory?: string;
	promoCodeCategory?: string;
	productCode?: string;
	productName?: string;
	subcategory?: string;
	productPrice?: number;
	productDisplayName?: string;
	name?: string;
	providerName?: string;
	promoCode?: string;
	productRate?: number;
	promotionalText?: string;
	price?: number;
	productType?: string;
	friendlyName?: string;
	infrastructureProvider?: string;
	variant?: string;
	quantity?: number;
}
export class AnalyticsService {
	pushItemViewGA4Tracking(item: IItem) {
		const dataLayer = {
			event: 'view_item',
			ecommerce: {
				items: [
					{
						item_id: item.productCode,
						item_name: item.productName,
						item_brand: item.providerName,
						item_category: item.category,
						price: item.productPrice,
						quantity: 1,
					},
				],
			},
		};
		// @ts-ignore
		window['dataLayer'].push({ecommerce: null});
		// @ts-ignore
		window['dataLayer'].push(dataLayer);
	}

	pushAddToCartGA4Tracking(item: any) {
		let cnt = 0;
		const dataLayer = {
			event: 'add_to_cart',
			ecommerce: {
				currency: 'ZAR',
				value: item.price,
				items: [
					{
						item_id: item.productCode,
						item_name: item.name || item.productName,
						index: cnt,
						item_category: item.promoCode || item.promoCodeCategory,
						price: item.price || item.productPrice,
						quantity: 1,
					},
				],
			},
		};
		// @ts-ignore
		window['dataLayer']?.push(dataLayer);
	}

	pushRemoveProductFromCartGA4Tracking(item: any) {
		let cnt = 0;
		const dataLayer = {
			event: 'remove_from_cart',
			ecommerce: {
				currency: 'ZAR',
				value: item.price,
				items: [
					{
						item_id: item.productCode,
						item_name: item.name || item.productName,
						index: cnt,
						item_category: item.promoCode || item.promoCodeCategory,
						price: item.price || item.productPrice || item.productPrice,
						quantity: 1,
					},
				],
			},
		};
		// @ts-ignore
		window['dataLayer']?.push(dataLayer);
	}

	pushViewCartGA4Tracking(itemList: IItem[]) {
		// @ts-ignore
		window['dataLayer']?.push({ecommerce: null});
		const products: IItemList[] = [];
		let cnt = 0;
		let sum = 0;

		for (const item of itemList) {
			const product: IItemList = <IItemList>{};

			if (item.productCode != null) {
				product.item_id = item.productCode;
			}
			if (item.productName != null) {
				product.item_name = item.productName;
			}
			if (item.productPrice != null) {
				product.price = item.productPrice;
			}
			if (item.promotionalText != null) {
				product.item_category = item.promotionalText;
			}
			product.index = cnt;
			product.quantity = 1;
			// if (item.providerName != null) {
			//     product.item_brand = item.providerName
			// }

			sum += product.price;

			products.push(product);

			cnt++;
		}

		const dataLayer = {
			event: 'view_cart',
			ecommerce: {
				currency: 'ZAR',
				value: sum,
				items: products,
			},
		};
		// @ts-ignore
		window['dataLayer']?.push(dataLayer);
	}

	pushViewItemListGA4Tracking(itemList: IItem[]) {
		// @ts-ignore
		window['dataLayer']?.push({ecommerce: null});
		const products: IItemList[] = [];
		let cnt = 0;

		for (const item of itemList) {
			const product: IItemList = <IItemList>{};

			if (item.productCode != null) {
				product.item_id = item.productCode;
			}
			if (item.productName != null) {
				product.item_name = item.productName;
			}
			if (item.name && !item.productName) {
				product.item_name = item.name;
			}
			if (item.productPrice != null) {
				product.price = item.productPrice;
			}
			if (item.price != null && !item.productPrice) {
				product.price = item.price;
			}
			if (item.category != null) {
				product.item_category = item.category;
			}
			if (item.dealPromoCodecategory != null && !item.category) {
				product.item_category = item.dealPromoCodecategory;
			}
			if (item.promoCodeCategory && !item.dealPromoCodecategory && !item.category) {
				product.item_category = item.promoCodeCategory;
			}
			product.index = cnt;
			product.quantity = 1;
			// if (item.providerName != null) {
			//     product.item_brand = item.providerName
			// }

			products.push(product);

			cnt++;
		}

		const dataLayer = {
			event: 'view_item_list',
			ecommerce: {
				items: products,
			},
		};
		// @ts-ignore
		window['dataLayer']?.push(dataLayer);
	}

	pushItemSelectGA4Tracking(item: any) {
		let cnt = 0;
		const dataLayer = {
			event: 'select_item',
			ecommerce: {
				items: [
					{
						item_id: item.productCode,
						item_name: item.productName || item.header,
						price: item.productPrice || item.price,
						item_category: item.promoCodeCategory || item.promoCode,
						index: cnt,
						quantity: 1,
					},
				],
			},
		};
		// @ts-ignore
		window['dataLayer'].push({ecommerce: null});
		// @ts-ignore
		window['dataLayer'].push(dataLayer);
	}

	pushBeginCheckoutGA4Tracking(itemList: IItem[]) {
		// @ts-ignore
		window['dataLayer']?.push({ecommerce: null});
		const products: IItemList[] = [];
		let cnt = 0;
		let sum = 0;

		for (const item of itemList) {
			const product: IItemList = <IItemList>{};

			if (item.productCode != null) {
				product.item_id = item.productCode;
			}
			if (item.productName != null) {
				product.item_name = item.productName;
			}
			if (item.productPrice != null) {
				product.price = item.productPrice;
			}
			if (item.promotionalText != null) {
				product.item_category = item.promotionalText;
			}
			product.index = cnt;
			product.quantity = 1;
			// if (item.providerName != null) {
			//     product.item_brand = item.providerName
			// }

			sum += product.price;
			products.push(product);

			cnt++;
		}

		const dataLayer = {
			event: 'begin_checkout',
			ecommerce: {
				currency: 'ZAR',
				value: sum,
				coupon: '',
				items: products,
			},
		};
		// @ts-ignore
		window['dataLayer']?.push(dataLayer);
	}

	pushAddShippingInfoGA4Tracking(itemList: IItem[]) {
		// @ts-ignore
		window['dataLayer']?.push({ecommerce: null});
		const products: IItemList[] = [];
		let cnt = 0;
		let sum = 0;

		for (const item of itemList) {
			const product: IItemList = <IItemList>{};

			if (item.productCode != null) {
				product.item_id = item.productCode;
			}
			if (item.productName != null) {
				product.item_name = item.productName;
			}
			if (item.productPrice != null) {
				product.price = item.productPrice;
			}
			if (item.subcategory != null) {
				product.item_category = item.subcategory;
			}
			product.index = cnt;
			product.quantity = 1;
			// if (item.providerName != null) {
			//     product.item_brand = item.providerName
			// }

			sum += product.price;

			products.push(product);

			cnt++;
		}

		const dataLayer = {
			event: 'add_shipping_info',
			ecommerce: {
				currency: 'ZAR',
				value: sum,
				shipping_tier: '',
				items: products,
			},
		};
		// @ts-ignore
		window['dataLayer']?.push(dataLayer);
	}

	pushAddPaymentInfoGA4Tracking(itemList: IItem[]) {
		// @ts-ignore
		window['dataLayer']?.push({ecommerce: null});
		const products: IItemList[] = [];
		let cnt = 0;
		let sum = 0;

		for (const item of itemList) {
			const product: IItemList = <IItemList>{};

			if (item.productCode != null) {
				product.item_id = item.productCode;
			}
			if (item.productCode != null) {
				product.item_id = item.productCode;
			}
			if (item.productName != null) {
				product.item_name = item.productName;
			}
			if (item.productPrice != null) {
				product.price = item.productPrice;
			}
			if (item.subcategory != null) {
				product.item_category = item.subcategory;
			}
			product.index = cnt;
			product.quantity = 1;
			// if (item.providerName != null) {
			//     product.item_brand = item.providerName
			// }

			sum += product.price;

			products.push(product);

			cnt++;
		}

		const dataLayer = {
			event: 'add_payment_info',
			ecommerce: {
				currency: 'ZAR',
				value: sum,
				payment_type: 'payU/Credit Card',
				items: products,
			},
		};
		// @ts-ignore
		window['dataLayer']?.push(dataLayer);
	}

	pushPurchaseGA4Tracking(itemList: IItem[]) {
		// @ts-ignore
		window['dataLayer']?.push({ecommerce: null});
		const portalShoppingCartSessionKey = localStorage.getItem('portalShoppingCartSession') || ''; // ask localStorage for portalShoppingCartSession
		const session: IShoppingCartSession = JSON.parse(portalShoppingCartSessionKey);
		const tillSlipData = session.tillSlipData.chargeSections[0];
		const chargeLines = tillSlipData.totalChargeLines;
		const products: IItemList[] = [];
		let cnt = 0;
		let sum = 0;

		for (const item of itemList) {
			const product: IItemList = <IItemList>{};

			if (item.productCode != null) {
				product.item_id = item.productCode;
			}
			if (item.productCode != null) {
				product.item_id = item.productCode;
			}
			if (item.productName != null) {
				product.item_name = item.productName;
			}
			if (item.productPrice != null) {
				product.price = item.productPrice;
			}
			if (item.subcategory != null) {
				product.item_category = item.subcategory;
			}
			product.index = cnt;
			product.quantity = 1;
			// if (item.providerName != null) {
			//     product.item_brand = item.providerName
			// }

			sum += product.price;

			products.push(product);

			cnt++;
		}

		const dataLayer = {
			event: 'purchase',
			ecommerce: {
				transaction_id: '',
				affiliation: 'MWEB Portal',
				currency: 'ZAR',
				value: sum,
				tax: chargeLines[1].totalChargeAmount,
				shipping: '',
				payment_type: 'payU/ Credit Card',
				items: products,
			},
		};
		// @ts-ignore
		window['dataLayer']?.push(dataLayer);
	}
}
