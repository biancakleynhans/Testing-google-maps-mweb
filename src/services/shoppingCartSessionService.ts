import {IUserDataSearchedAddress} from '@/models/Coverage';
import {fetchFromClient} from '@/utils/Fetching';

const APIGW_BASE_URL = process.env.NEXT_PUBLIC_APIGW_BASE_URL || '';

interface IShoppingCartSession {
	id: number;
	addressSearchMade: boolean;
	addressSearch: IUserDataSearchedAddress | null;
	userIdentifier: string;
	masterAccountId: string;
	shoppingCart: IShoppingCart;
	orderNumber: string;
	completed: boolean;
	tillSlipData: any;
	orderFormData: any;
	primaryProductCode: string;
	primaryPromoCode: string;
	primaryProductCategory: string;
	primaryProductSubCategory: string;
	orderSubmittedTime: Date;
	currentCheckoutStep: string;
	totalCartValue: number;
	createdAt: Date;
	updatedAt: Date;
}

interface IShoppingCartSessionUpdate {
	addressSearchMade?: boolean;
	addressSearch?: IUserDataSearchedAddress | null;
	id: number;
	userIdentifier: string;
	shoppingCart?: IShoppingCart;
	orderNumber?: string;
	completed?: boolean;
	tillSlipData?: any;
	orderFormData?: any;
	orderSubmittedTime?: Date;
	currentCheckoutStep?: string;
}

interface IBasketLineItem {
	parentContractId: number;
	primary: boolean;
	saleType: string;
	productCode: string;
	promoCode: string;
}

interface IShoppingCartProduct {
	promoCode: string;
	productCode: string;
	primary: boolean;
	saleType: string;
	parentContractId: number;
	subSaleType?: string;
	metadata?: object;
}

interface IShoppingCartProducts {
	products: Array<IShoppingCartProduct>;
}

interface IShoppingCart {
	currentQuoteId: string;
	shoppingCart: Array<IShoppingCartProducts>;
	promoVoucher?: string;
}

const createUniqueUserIdentifier = (): string => {
	return crypto.randomUUID();
};

const getShoppingCartSession = async (userIdentifier: string): Promise<IShoppingCartSession> => {
	const response = await fetchFromClient(`${APIGW_BASE_URL}/portal_services/rest/shopping/cart/${userIdentifier}`);
	const shoppingCartSessionData = await response.json();
	const shoppingCartSession: IShoppingCartSession = shoppingCartSessionData.result;

	return shoppingCartSession;
};

const setShoppingCartSession = async (sessionData: IShoppingCartSessionUpdate): Promise<IShoppingCartSession> => {
	console.log('setShoppingCartSession', sessionData);

	const headers = {'Content-Type': 'application/json', Accept: '*/*'};
	const response = await fetch(`${APIGW_BASE_URL}/portal_services/rest/shopping/cart`, {
		method: 'POST',
		headers: headers,
		// credentials: 'include',
		body: JSON.stringify(sessionData),
	});

	if (!response.ok) {
		const error = await response.text();
		console.error(JSON.stringify(sessionData));
		console.error(error);
		throw new Error(`HTTP Error ${response.status}: ${error}`);
	}

	const data = await response.json();
	return data.result;
};

const isProductInBasket = (productCode: any, basket: any): boolean => {
	const matchedProduct = basket.shoppingCart[0].products.find((p: IShoppingCartProduct) => p.productCode === productCode);

	return !!matchedProduct;
};

const addRecommendedProductToCart = (recommendedProduct: any, basket: any) => {
	if (!isProductInBasket(recommendedProduct, basket)) {
		const tempBasket = basket;

		const productToAdd: IBasketLineItem = {
			parentContractId: 0,
			primary: false,
			saleType: 'New',
			productCode: recommendedProduct.productCode,
			promoCode: recommendedProduct.promoCode,
		};

		if (productToAdd && tempBasket) {
			// Add router to Shopping Cart
			tempBasket.shoppingCart[0].products.push(productToAdd);
			return basket;
		}
	}

	return basket;
};

const removeRecommendedProductFromCart = (recommendedProduct: any, basket: any) => {
	if (isProductInBasket(recommendedProduct.productCode, basket)) {
		const tempBasket = basket;

		tempBasket.shoppingCart[0].products = tempBasket.shoppingCart[0].products.filter((p: IShoppingCartProduct) => p.productCode !== recommendedProduct.productCode);
		return tempBasket;
	}

	return basket;
};

export const ShoppingCartSessionService = {
	createUniqueUserIdentifier,
	getShoppingCartSession,
	setShoppingCartSession,
	addRecommendedProductToCart,
	removeRecommendedProductFromCart,
};

export type {IShoppingCartSession, IShoppingCartSessionUpdate, IShoppingCart, IShoppingCartProduct};
