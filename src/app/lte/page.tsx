import HelpMeDecideLayout from '@/components/HelpMeDecide/HelpMeDecideLayout';
import ProductsLayout from '@/components/products/ProductsLayout';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import SEO from '@/components/seo/index';

import {ILteContent} from '@/services/lte_landing';
import {getLteLandingPageContent} from '@/services/lte_landing';
import {ProductsService} from '@/services/CraftProductsService';
import UseCaseBlock from '@/components/useCase/UseCaseBlock';
import CallToActionBanner from '@/components/cta/CallToActionBanner';
import FAQs from '@/components/faqs';
import {HelpMeDecideService} from '@/services/helpMeDecideService';
import HeadingBanner from '@/components/banners/HeadingBanner';
import {BannerService} from '@/services/BannerService';

/**
 *
 * @returns Server side React Component with some children of Client Site components
 */

export default async function LtePage() {
	// Get LTE craft data
	const lteContent: ILteContent[] = await getLteLandingPageContent();

	// deconstruct slices from the landing page content
	// extract page data from lteContent craft
	const vasSectionHeader = lteContent[0]?.vasSectionHeader; // TODO: once we specify type of lteContent then all lteContent fields will have types
	const useCaseAccordion = lteContent[0]?.useCaseAccordion;
	const vasFaqs = lteContent[0]?.vasFaqs || [];
	const vasCallToAction = lteContent[0]?.vasCallToActionSection;
	const banner = BannerService.getBannerCraftData(lteContent[0]?.simpleBanner);
	const landingPageProductsContent = ProductsService.getLandingPageProductCraftData(lteContent[0]?.landingPageProducts);
	const productFilters = ProductsService.getProductFiltersFromCraftFilters(landingPageProductsContent.filters);
	const helpMeDecide = HelpMeDecideService.getHelpMeDecideCraftData(lteContent[0]?.helpMeDecide);
	return (
		<>
			<HeadingBanner simpleBanner={banner} />

			{/* PT2-1907: Show LTE PRODUCTS  */}
			{landingPageProductsContent && (
				<MwebSliceContainer sectionId='lte-products-landing-section' bgColor='bg-mwBlueGrey-25' padding=''>
					<ProductsLayout
						typeJourney='lte'
						type='landing'
						productFiltersRaw={productFilters}
						headerText={landingPageProductsContent.header.heading ?? ''}
						descriptionText={landingPageProductsContent.header.description ?? ''}
						cardButtonText={'Get LTE'}
					/>
				</MwebSliceContainer>
			)}

			{/* PT2-1908: Show Help Me Decide Block  */}
			<MwebSliceContainer sectionId='lte-help-me-decide-section' bgColor='bg-white' padding=''>
				<HelpMeDecideLayout data={helpMeDecide} />
			</MwebSliceContainer>

			{/* PT2-1909: Show Use Case Block  */}

			{useCaseAccordion?.length > 0 && (
				<MwebSliceContainer sectionId={'showUseCase'} bgColor={'bg-mwgray-100'} padding='py-14 px-4 xl:px-[182px] xl:py-24'>
					<UseCaseBlock useCaseAccordion={useCaseAccordion} />
				</MwebSliceContainer>
			)}

			{/* PT2-1910: Show Check Availability CTA Slice  */}
			{vasCallToAction?.length > 0 && <CallToActionBanner action='scroll' vasCallToAction={vasCallToAction[0]} />}

			{/* PT2-1912: Show FAQs Slice */}
			<MwebSliceContainer sectionId='lte-faq' bgColor='bg-mwBlueGrey-25 ' padding=''>
				<FAQs faqs={vasFaqs} />
			</MwebSliceContainer>

			{/* PT2-1911: Show SEO Slice  */}
			{vasSectionHeader?.length > 0 && (
				<MwebSliceContainer sectionId='seo_section' bgColor='bg-white' padding=''>
					<SEO seo={vasSectionHeader[0]} />
				</MwebSliceContainer>
			)}
		</>
	);
}
