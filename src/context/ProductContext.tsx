'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {IProduct} from '@/models/Products';
import {useInternetServiceProviders} from './InternetServiceProvidersContent';
import {iActiveProvider} from '@/models/Coverage';

interface iProductContext {
	allProducts: IProduct[];
	productsMatchedToServiceProvider: IProduct[];
}

interface iProps {
	children: ReactNode;
	products: {lte: IProduct[]; fibre: IProduct[]};
}

function getAmber(status: string) {
	let str =
		status.includes('planned') || status.includes('trenching') || status.includes('amber') || status.includes('in progress') || status.includes('inprogress') ? 'amber' : '';

	return str;
}

/* FILTER TO FIND RELEVENT PRODUCTS to the type of provider required */
function filterProducts(ispMatched: iActiveProvider[], allProducts: IProduct[]): IProduct[] {
	// console.log('%c Filtering products ', 'color:violet', ispMatched, allProducts);

	let productsFromServices: IProduct[] = [];

	ispMatched.forEach((isp) => {
		// console.log('%c 1. curr ISP', 'color:orange', isp.provider, isp.type, isp.status, isp.promoStatus);

		let isPromo = isp.status.toLowerCase().includes('promo');
		// console.log('%c 2. isPromo ? ', 'color:olive', isPromo);

		// get the proper promo code to search for
		let isAll = isp.status.includes('live') || isp.status.includes('green') ? 'all' : '';
		let isAmber = getAmber(isp.status);

		// console.log('%c 3. isAmber', 'color:lime', isAmber);
		// console.log('%c 4. isAll', 'color:aqua', isAll);

		let providerStatus = isAmber.length > 0 ? isAmber : isAll.length > 0 ? isAll : isp.status;
		// console.log('%c 5. final provider status', 'color:teal', providerStatus);

		allProducts
			.filter((product) => product.providerCode.toLowerCase() === isp.provider.toLowerCase())
			// .filter((product) => console.log('>>>', product.providerCode, ' VS ', isp.provider));
			.forEach((product) => {
				// console.log('%c Product matched isp ', product.productName, product.providerCode, product.coverageStatusDisplayValue);
				// Non promo area
				if (!isPromo) {
					// normal area with live products
					if (isAll && !isAmber) {
						// console.log('%c normal area with live products', 'color:lime');
						if (product.coverageStatusDisplayValue.toLowerCase() === providerStatus.toLowerCase()) {
							productsFromServices.push(product);
						}
					}
					// amber area with live products
					else if (!isAll && isAmber) {
						// console.log('%c amber area with live products TODO', 'color:orange');
						if (!product.coverageStatusDisplayValue.toLowerCase().includes('promo')) {
							productsFromServices.push(product);
						}
					}
				}
				// promo area
				else {
					console.log('%c THIS IS A PROMO AREA WE NEED ONLY PROMO PRODUCTS', 'color:red');
					if (product.coverageStatusDisplayValue.toLowerCase().includes('promo') && product.coverageStatusDisplayValue.toLowerCase() === isp.promoStatus) {
						console.log('%c this is a promo product for a promo area', isp.promoStatus, isp.status, product.productName, product.coverageStatusDisplayValue);
						productsFromServices.push(product);
					}
				}
			});
	});

	// console.log('%c PRODUCTS FROM SERVICES END', 'color:lightblue', productsFromServices);
	return productsFromServices;
}

/* Main provider function */
function Provider(props: iProps) {
	const {children, products} = props;
	const {internetServiceProviders, internetServiceProvidersMatched} = useInternetServiceProviders();

	const [allProducts, setallProducts] = useState<IProduct[]>([]);
	const [productsMatchedToServiceProvider, setproductsMatchedToServiceProvider] = useState<IProduct[]>([]);

	useEffect(() => {
		// console.log('Products: ', products);

		let all = [...products.fibre, ...products.lte];

		let filledWithIspData: IProduct[] = [];

		internetServiceProviders.forEach((isp) =>
			all.forEach((product) => {
				if (product.providerName === isp.solidName) {
					// console.log('isp and product', product.providerName, product.providerCode, isp.solidName);
					product.providerCode = isp.coverageRef;
					product.providerName = isp.solidName;
					product.providerImage = isp.image[0].path;

					// TODO: remove when done testing vr products dont have filterkeys
					product.productFilterKeys = product.productFilterKeys.length === 0 ? ['BEST_VALUE'] : product.productFilterKeys;

					filledWithIspData.push(product);
				}
			})
		);

		setallProducts(filledWithIspData);
	}, [products, internetServiceProviders]);

	useEffect(() => {
		// console.log('Isp Matched now get products ready', internetServiceProvidersMatched, allProducts.length);
		let final = filterProducts(internetServiceProvidersMatched, allProducts);
		setproductsMatchedToServiceProvider(final);
	}, [internetServiceProvidersMatched, allProducts]);

	const value: iProductContext = {
		allProducts: allProducts,
		productsMatchedToServiceProvider: productsMatchedToServiceProvider,
	};

	return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

// CONTEXT
const ProductContext = createContext<iProductContext>({} as iProductContext);
export const useProducts = () => useContext(ProductContext);

// PROVIDER
export default Provider;
