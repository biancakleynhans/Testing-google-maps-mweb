'use client';

/*
STRUCTURE AND REQUIREMENTS:
1. Page will only ever display 3 product cards -> changed may be any amount but show 3 and show more btn 
2. As a Product owner, we will need to configure the three products in Craft. (API from Craft to website).
3. The user enters his/her address in the search bar which shows a dropdown of addresses (operated by Google Maps) or user allows his/her location to populate their address.
4. Clicking on “Enter your address” will anchor the user up the page to the search bar above.
5. The user can filter between the tabs best value, most popular, fastest and all-in-one. 
If all-in-one is not needed, this tab is dropped and the remaining tabs are centered.
6. If there are no bundles on offer at the time, this option will be removed and the remaining 3 options must then be centred.
7. Product cards are always displayed in a row of 3.
8. User can select Mweb logo to go back to the home page or click cancel to leave the journey.
The breadcrumbs allow the user to go back to the first step of each section to edit their selection.

*/

import React, {useState, useEffect} from 'react';
import {IProductFilter, IProductFilterAdd} from '@/models/ProductFilters';
import {IProduct} from '@/models/Products';
import ProductsLayoutLanding from './ProductsLayoutLanding';
import ProductsLayoutJourney from './ProductsLayoutJourney';
import {useProducts} from '@/context/ProductContext';
import {useCoverage} from '@/context/CoverageContext';

export interface iProductsLayoutProps {
	productFilters: IProductFilterAdd[];
	products: IProduct[];
	headerText: string;
	descriptionText?: string;
	onFilterClickedCB: (val: any) => void;
}

interface iProps {
	type: 'landing' | 'journey' | 'switch' | 'mop';
	productFiltersRaw: IProductFilter[];
	headerText: string;
	descriptionText?: string;
	cardButtonText: string;
	typeJourney: 'fibre' | 'lte';
}

export default function ProductsLayout(props: iProps) {
	const {productFiltersRaw, headerText, type, descriptionText, cardButtonText} = props;

	const {providerType} = useCoverage();
	const {productsMatchedToServiceProvider, allProducts} = useProducts();

	const [filters, setFilters] = useState<IProductFilterAdd[]>([]);
	const [products, setProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		let filters = productFiltersRaw.map((pf: IProductFilter, i) => ({key: pf.code, label: pf.displayName, selected: i === 0 ? true : false} as IProductFilterAdd));
		setFilters(filters);
	}, [productFiltersRaw]);

	useEffect(() => {
		// no futher filtering required
		if (type === 'landing') {
			let providerProducts = allProducts.filter((x) => x.providerType === providerType);
			// console.log('%c Products layout landing', 'color: coral', providerType, allProducts.length, providerProducts);
			handleGetProducts(providerProducts);
		}
		// products after a coverage search
		else {
			// console.log('%c Products layout Journey', 'color: coral', productsMatchedToServiceProvider);
			handleGetProducts(productsMatchedToServiceProvider);
		}
	}, [filters, providerType, productsMatchedToServiceProvider]);

	function handleGetProducts(rawProducts: IProduct[]) {
		let final: IProduct[] = [];
		let selectedFilter: IProductFilterAdd | undefined = filters.find((f) => f.selected);

		// console.log('Selected filter is', selectedFilter);

		if (selectedFilter) {
			rawProducts
				.filter((product) => product.productFilterKeys?.includes(selectedFilter?.key ?? ''))
				.forEach((prod) => {
					let isIncluded = final.find((f) => f.productCode === prod.productCode);

					if (!isIncluded && type !== 'switch' && prod.campaignCode !== 'FTTH-FREESETUP-FREEROUTER-SWITCH-REGRADE-LINE') {
						final.push(prod);
					}
				});
		} else {
			rawProducts.forEach((prod) => {
				let isIncluded = final.find((f) => f.productCode === prod.productCode);

				if (!isIncluded && type !== 'switch' && prod.campaignCode !== 'FTTH-FREESETUP-FREEROUTER-SWITCH-REGRADE-LINE') {
					final.push(prod);
				}
			});
		}

		// console.log('%c FINAL PRODUCTS', 'color:lime', filters, final);
		setProducts(final);
	}

	function handleFilterSelected(btn: any) {
		let code = btn.label;
		let clone: IProductFilterAdd[] = [];

		filters.forEach((c) => {
			if (c.label === code) {
				c.selected = !c.selected;
			} else {
				c.selected = false;
			}
			clone.push(c);
		});
		setFilters(clone);
	}

	return (
		<>
			{type === 'landing' ? (
				<ProductsLayoutLanding
					providerType={providerType}
					descriptionText={descriptionText}
					headerText={headerText}
					productFilters={filters}
					products={products}
					onFilterClickedCB={(val) => handleFilterSelected(val)}
					cardButtonText={cardButtonText}
				/>
			) : type === 'journey' ? (
				<ProductsLayoutJourney
					providerType={providerType}
					descriptionText={descriptionText}
					headerText={headerText}
					productFilters={filters}
					products={products}
					onFilterClickedCB={(val) => handleFilterSelected(val)}
				/>
			) : (
				<></>
			)}
		</>
	);
}
