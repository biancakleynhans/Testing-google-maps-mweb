import React from 'react';
import ProductsLayout from '@/components/products/ProductsLayout';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import {ILteContent, getLteLandingPageContent} from '@/services/lte_landing';
import {ProductsService} from '@/services/CraftProductsService';
import {getLTECheckoutContent} from '@/services/LteCheckoutService';

export default async function ChooseAPlan() {
	const lteContentCheckout = await getLTECheckoutContent();
	const headerText = lteContentCheckout[0].lteCheckoutProductSelectionPageHeading;

	const lteContent: ILteContent[] = await getLteLandingPageContent();
	const landingPageProductsContent = ProductsService.getLandingPageProductCraftData(lteContent[0]?.landingPageProducts);
	const productFilters = ProductsService.getProductFiltersFromCraftFilters(landingPageProductsContent.filters);

	return (
		<MwebSliceContainer sectionId='' bgColor='' padding=''>
			<ProductsLayout typeJourney='lte' type='journey' productFiltersRaw={productFilters} headerText={headerText} descriptionText='' cardButtonText={''} />
		</MwebSliceContainer>
	);
}
