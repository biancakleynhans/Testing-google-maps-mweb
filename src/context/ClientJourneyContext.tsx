'use client';

import {IProduct} from '@/models/Products';
import {IRouter} from '@/models/Routers';
import {iVasCard, IVasProduct} from '@/models/Vas';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import useCheckoutProcess from '@/hooks/useCheckoutProcess';
import {IConnectivityOption} from '@/components/connectivity-availability';
import {eRouterOptions} from '@/components/add-ons/RouterOption';

import {SELECTED_PRODUCT_LOOKUP_KEY} from '@/services/Constants'

interface IShoppingCartProduct {
	promoCode: string;
	productCode: string;
}

interface IClientJourneyContext {
	handleSelectedProduct: (product: IProduct) => void;
	selectedProduct: IProduct | null;

	// redirect action

	connectivityOption: IConnectivityOption | null;
	handleconnectivityOption: (newVal: IConnectivityOption | null) => void;

	// ROUTER SELECTION
	selectedRouterOption: eRouterOptions;
	handleRouterOption: (option: eRouterOptions) => void;

	// ROUTER SELECTION
	selectedRouter: IRouter | null;
	handleSelectedRouter: (router: IRouter | null) => void;

	// selected vas products
	selectedVasProduct: iVasCard[];
	handleSelectedVasProduct: (vas: any) => void;

	// available vas products
	handleSetRecommednedVasProducts: (router: IVasProduct[]) => void;
	recommendedVasProducts: IVasProduct[];

	// Clear client journey
	handleResetClient: () => void;

	// Sync context with Shopping Cart State
	handleAddProductToShoppingCart: (product: IShoppingCartProduct) => void;
	handleRemoveProductFromShoppingCart: (product: IShoppingCartProduct) => void;

	orderCharges: any;
}

interface iProps {
	children: ReactNode;
}

/* Main provider function */
function Provider({children, ...props}: iProps) {
	const {onPrimaryProductAdd, addProductToShoppingCart, removeProductFromShoppingCart, tillSlipCharges: orderCharges} = useCheckoutProcess();

	//   Acessing and setting the values to the required entities
	const [selectedProduct, setselectedProduct] = useState<IProduct | null>(null);
	const [selectedRouter, setselectedRouter] = useState<IRouter | null>(null);
	const [selectedVasProduct, setselectedVasProduct] = useState<iVasCard[]>([]);
	const [selectedRouterOption, setRouterOption] = useState<eRouterOptions>(eRouterOptions.blank);
	const [connectivityOption, setconnectivityOption] = useState<IConnectivityOption | null>(null);
	const [recommendedVasProducts, setRecommednedVasProducts] = useState<IVasProduct[]>([]);

	useEffect(() => {
		const previousSelectedProductKey = localStorage.getItem(SELECTED_PRODUCT_LOOKUP_KEY) || ""
		setselectedProduct(() => {
			return previousSelectedProductKey === "" ? null : JSON.parse(previousSelectedProductKey) as IProduct

		})

		
	}, []);

	function handleProductSelected(product: IProduct) {
		onPrimaryProductAdd(product);

		// new product so set is as the selected product
		if (product.productCode !== selectedProduct?.productCode) {
			setselectedProduct(product);
			localStorage.setItem(SELECTED_PRODUCT_LOOKUP_KEY, JSON.stringify(product))
		}
		//    same product so set to null
		else {
			setselectedProduct(null);
			localStorage.removeItem(SELECTED_PRODUCT_LOOKUP_KEY)
		}
	}

	function handleRouterOptionSelected(option: eRouterOptions) {
		setRouterOption(option);
	}

	function handleRouterSelected(router: IRouter | null) {
		setselectedRouter(router);
	}

	function handleSetConnectivityOption(option: IConnectivityOption | null) {
		setconnectivityOption(option);
	}

	function handleSelectedVasProduct(vases: iVasCard[]) {
		setselectedVasProduct(vases);
	}

	function handleRecommendedVases(vases: IVasProduct[]) {
		// console.log('%c CLient journey setting recommended vases', 'color:crimson', vases);
		setRecommednedVasProducts(vases);
	}

	function handleReset() {
		setselectedProduct(null);
		setselectedRouter(null);
		setselectedVasProduct([]);
		setRouterOption(eRouterOptions.blank);
	}

	const value: IClientJourneyContext = {
		// ROUTER SELECTION
		selectedRouterOption: selectedRouterOption,
		handleRouterOption: (option: eRouterOptions) => handleRouterOptionSelected(option),

		selectedProduct: selectedProduct,
		handleSelectedProduct: (product: IProduct) => handleProductSelected(product),

		selectedRouter: selectedRouter,
		handleSelectedRouter: (router: IRouter | null) => handleRouterSelected(router),

		connectivityOption: connectivityOption,
		handleconnectivityOption: (val: IConnectivityOption | null) => handleSetConnectivityOption(val),

		// vas products
		selectedVasProduct: selectedVasProduct,
		handleSelectedVasProduct: (vases: iVasCard[]) => handleSelectedVasProduct(vases),

		recommendedVasProducts: recommendedVasProducts,
		handleSetRecommednedVasProducts: (vases: IVasProduct[]) => handleRecommendedVases(vases),

		handleResetClient: () => handleReset(),

		/* sync context with shopping cart session*/
		orderCharges: orderCharges,
		handleAddProductToShoppingCart: (product: any) => addProductToShoppingCart(product),
		handleRemoveProductFromShoppingCart: (product: any) => removeProductFromShoppingCart(product),
	};

	return <ClientJourneyContext.Provider value={value}>{children}</ClientJourneyContext.Provider>;
}

// CONTEXT
const ClientJourneyContext = createContext<IClientJourneyContext>({} as IClientJourneyContext);
export const useClientJourney = () => useContext(ClientJourneyContext);

// PROVIDER
export default Provider;
