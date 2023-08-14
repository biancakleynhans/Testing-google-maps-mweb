import React from 'react';
import ProductsLayout from '@/components/products/ProductsLayout';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import {getFibreCheckoutContent} from '@/services/FibreCheckoutService';
import {ProductsService} from '@/services/CraftProductsService';
import {getFibreLandingPageContent} from '@/services/fibre_landing';

export default async function ConnectivityPage() {
	const fibreContent = await getFibreCheckoutContent();
	const fibreContentLanding = await getFibreLandingPageContent();
	const chooseHeaderText = fibreContent[0]?.fibreCheckoutProductSelectionPageHeading;
	const landingPageProductsContent = ProductsService.getLandingPageProductCraftData(fibreContentLanding[0]?.landingPageProducts);
	const productFilters = ProductsService.getProductFiltersFromCraftFilters(landingPageProductsContent.filters);

	return (
		<MwebSliceContainer sectionId='' bgColor='' padding=''>
			<ProductsLayout typeJourney='fibre' type='journey' productFiltersRaw={productFilters} headerText={chooseHeaderText} cardButtonText={''} />
		</MwebSliceContainer>
	);
}
