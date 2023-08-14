'use client';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {IShoppingCartSession, IShoppingCartProduct, ShoppingCartSessionService, IShoppingCartSessionUpdate} from '@/services/shoppingCartSessionService';
import {TillSlipService} from '@/services/tillSlipService';

import checkoutService, {ITillSlipCharge} from '@/helpers/CheckoutProcessService';
import {GetCoverageDataToShoppingCart} from '@/utils/Coverage';

/**
 *  User talks to their basket and basket kick starts synchronize session from localStorage
 * @returns
 */

export default function useCheckoutProcess() {
	const [userBasket, setUserBasket] = useState<any | null>(null);
	const [portalShoppingCartSession, setPortalShoppingCartSession] = useState<IShoppingCartSession | null>(null);
	// states which pages interact with
	const [primaryProductFromSession, setPrimaryProductFromSession] = useState<any>();
	const [routersFromSession, setRoutersFromSession] = useState<any[] | null>([]);
	const [vasProductsFromSession, setVasProductsFromSession] = useState<any[]>([]);
	const [tillSlipCharges, setTillSlipCharges] = useState<ITillSlipCharge | null>(null);

	/**
	 * Sync States
	 */
	useEffect(() => {
		const portalShoppingCartSessionKey = localStorage.getItem('portalShoppingCartSession') || ''; // ask localStorage for portalShoppingCartSession

		if (portalShoppingCartSessionKey !== '') {
			// Grab the portal shopping cart session from the local storage
			const portalShoppingCartSessionFromStorage: IShoppingCartSession = JSON.parse(portalShoppingCartSessionKey); // convert shopping cart session to object

			setPortalShoppingCartSession(portalShoppingCartSessionFromStorage);

			setUserBasket(portalShoppingCartSessionFromStorage.shoppingCart);

			updateHookGoodies(portalShoppingCartSessionFromStorage);
		}
	}, []);

	/**
	 * React to basket updates
	 */
	const pageUrl = usePathname();
	const [isUpdateServer, setIsUpdateServer] = useState(false);

	const [isLoadingApiCall, setisLoadingApiCall] = useState(false);

	// Send Server updates and update hook state with portalShoppingCartSession from the server
	useEffect(() => {
		//
		async function synchronizeSession() {
			const tillSlipData = await TillSlipService.getTillSlip(userBasket);
			console.log('%c 4. synchronize Session called ', 'color: crimson');

			const sessionUpdate: IShoppingCartSessionUpdate = {
				addressSearch: GetCoverageDataToShoppingCart(),
				id: portalShoppingCartSession?.id ?? 91,
				userIdentifier: portalShoppingCartSession?.userIdentifier ?? '',
				shoppingCart: userBasket,
				tillSlipData: tillSlipData,
				orderFormData: null,
				currentCheckoutStep: pageUrl ?? '',
			};

			const updatedSession = await ShoppingCartSessionService.setShoppingCartSession(sessionUpdate);

			if (updatedSession) {
				console.log('%c 5. session updated now update local storage ', 'color: crimson');
				// update local storage with the latest updated session
				localStorage.setItem('portalShoppingCartSession', JSON.stringify(updatedSession));

				// update local state
				setPortalShoppingCartSession(updatedSession);
				updateHookGoodies(updatedSession);
			}
			console.log('%c 6. synchronize Session complete', 'color: crimson');
			setIsUpdateServer(false);
			setisLoadingApiCall(false);
		}

		// Check if the session should be
		if (isUpdateServer) {
			console.log('%c Checking if the session should be synced', 'color: crimson', isUpdateServer);
			synchronizeSession();
			setIsUpdateServer(false);
		}
	}, [userBasket, isUpdateServer, pageUrl, portalShoppingCartSession?.id, portalShoppingCartSession?.userIdentifier]);

	useEffect(() => {}, [isLoadingApiCall]);

	//
	async function updateHookGoodies(portalShoppingCartSession: IShoppingCartSession) {
		//
		const {productFromSession, routersFromSession, vasProductsFromSession, tillSlipCharges} = await checkoutService.getProductsFromPortalSession(portalShoppingCartSession);

		setPrimaryProductFromSession(productFromSession);
		setRoutersFromSession(routersFromSession);
		setVasProductsFromSession(vasProductsFromSession);
		setTillSlipCharges(tillSlipCharges);
	}

	/**
	 *  Actions
	 */
	function onPrimaryProductAdd(primaryProduct: any) {
		// Build a new tillslip when a primary product is added
		const newUserBasket = {
			shoppingCart: [
				{
					products: [
						{
							primary: true,
							saleType: 'New',
							promoCode: primaryProduct.promoCode,
							productCode: primaryProduct.productCode,
							parentContractId: 0,
						},
					],
				},
			],
		};
		setUserBasket(newUserBasket);
		setIsUpdateServer(true);
	}

	function addProductToShoppingCart(product: any) {
		let tempBasket = userBasket; //JSON.parse(JSON.stringify(userBasket)); // deep copy

		let isProductInBasket: boolean = tempBasket?.shoppingCart[0].products?.find((p: any) => p.productCode === product.productCode) === undefined ? false : true;

		// console.log('%c 2. addProductToShoppingCart', 'color:lightseagreen', product.productCode);

		if (!isProductInBasket) {
			tempBasket?.shoppingCart[0].products?.push({
				parentContractId: 0,
				primary: false,
				saleType: 'New',
				...product,
			});

			setUserBasket(tempBasket);
			setIsUpdateServer(true);
		}
	}

	function removeProductFromShoppingCart(product: any) {
		// We can olny remove a product that is alread in the user basket, if not then nothing
		let tempBasket = userBasket; //JSON.parse(JSON.stringify(userBasket)); // deep copy

		let isProductInBasket: boolean = tempBasket?.shoppingCart[0].products?.find((p: any) => p.productCode === product.productCode) === undefined ? false : true;

		// console.log('%c 2. removeProductFromShoppingCart', 'color:coral', product.productCode);

		if (isProductInBasket) {
			tempBasket.shoppingCart[0].products = tempBasket.shoppingCart[0].products.filter((p: IShoppingCartProduct) => p.productCode !== product.productCode);
			// console.log('%c 3. Is matched removing now from shopping cart ', 'color:crimson');

			setUserBasket(tempBasket);
			setIsUpdateServer(true);
		}
	}

	return {
		// States
		primaryProductFromSession,
		routersFromSession,
		vasProductsFromSession,
		tillSlipCharges,
		isLoadingApiCall,

		// Actions
		onPrimaryProductAdd,
		addProductToShoppingCart,
		removeProductFromShoppingCart,
		setPortalShoppingCartSession,
	};
}
