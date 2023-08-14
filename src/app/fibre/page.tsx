import ProductsLayout from '@/components/products/ProductsLayout';
import SEO from '@/components/seo/index';
import CallToActionBanner from '@/components/cta/CallToActionBanner';
import ShowSwitchBlock from '@/components/switchBlock/ShowSwitchBlock';
import FAQs from '@/components/faqs';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import HelpMeDecideLayout from '@/components/HelpMeDecide/HelpMeDecideLayout';
import UseCaseBlock from '@/components/useCase/UseCaseBlock';
import {getFibreLandingPageContent, IFibreContent} from '@/services/fibre_landing';
import {ProductsService} from '@/services/CraftProductsService';
import {HelpMeDecideService} from '@/services/helpMeDecideService';
import HeadingBanner from '@/components/banners/HeadingBanner';
import {BannerService} from '@/services/BannerService';
import MwebSearchBar from '@/components/ui/mwebSearch/MwebSearchBar';

/**
 *
 * @returns Server side React Component with some children of Client Site components
 */

export default async function FibrePage() {
	//
	const fibreContent: IFibreContent[] = await getFibreLandingPageContent();

	// deconstruct slices from the landing page content
	// extract page data from fibreContent craft
	const vasSectionHeader = fibreContent[0]?.vasSectionHeader; // TODO: once we specify type of fibreContent then all fibreContent fields will have types
	const useCaseAccordion = fibreContent[0]?.useCaseAccordion;
	const vasFaqs = fibreContent[0]?.vasFaqs || [];
	const vasCallToAction = fibreContent[0]?.vasCallToActionSection;
	const vasFeatureDescription = fibreContent[0]?.vasFeatureDescription;
	const helpMeDecide = HelpMeDecideService.getHelpMeDecideCraftData(fibreContent[0]?.helpMeDecide);
	const landingPageProductsContent = ProductsService.getLandingPageProductCraftData(fibreContent[0]?.landingPageProducts);
	const productFilters = ProductsService.getProductFiltersFromCraftFilters(landingPageProductsContent.filters);
	const banner = BannerService.getBannerCraftData(fibreContent[0]?.simpleBanner);

	return (
		<>
			{/* <SimpleBanner /> */}

			<HeadingBanner simpleBanner={banner} />

			{/* Added a inbetween size for tablet screens mobile not enough and desktop to much so used half of the desktop sizes  */}
			<MwebSliceContainer sectionId='coverage-search-bar' bgColor='bg-mwBlueGrey-50' padding='px-4 py-8 md:px-[81px] md:py-6 lg:px-[182px] lg:py-12'>
				<MwebSearchBar type='round' placeHolderText='Enter your address to get connected' isDisabled={false} />
			</MwebSliceContainer>

			{landingPageProductsContent && (
				<MwebSliceContainer sectionId='fibre-products-landing-section' bgColor='bg-mwBlueGrey-25' padding=''>
					<ProductsLayout
						typeJourney='fibre'
						type='landing'
						productFiltersRaw={productFilters}
						headerText={landingPageProductsContent.header.heading ?? ''}
						cardButtonText={'Check availability'}
					/>
				</MwebSliceContainer>
			)}

			{/* PT2-639: Show Feature Block  */}

			{/* PT2-640: Show Help Me Decide Block  */}
			<MwebSliceContainer sectionId='fibre-help-me-decide-section' bgColor='bg-white' padding=''>
				<HelpMeDecideLayout data={helpMeDecide} />
			</MwebSliceContainer>

			{/* PT2-641: Show Switch Block  */}
			<MwebSliceContainer sectionId={'fibre-switch-section'} bgColor={'bg-mwBlueGrey-25'} padding=''>
				<ShowSwitchBlock vasFeatureDescription={vasFeatureDescription} />
			</MwebSliceContainer>

			{/* PT2-642: Show Use Case Block  */}

			{useCaseAccordion?.length > 0 && (
				<MwebSliceContainer sectionId={'showUseCase'} bgColor={'bg-mwgray-100'} padding='py-14 px-4 xl:px-[182px] xl:py-24'>
					<UseCaseBlock useCaseAccordion={useCaseAccordion} />
				</MwebSliceContainer>
			)}

			{/* PT2-643: Show Check Availability CTA Slice  */}
			{vasCallToAction?.length > 0 && <CallToActionBanner action='scroll' vasCallToAction={vasCallToAction[0]} />}

			{/* PT2-644: Show FAQs Slice */}
			<MwebSliceContainer sectionId='fibre-faq' bgColor='bg-mwBlueGrey-25 ' padding=''>
				<FAQs faqs={vasFaqs} />
			</MwebSliceContainer>

			{/* PT2-645: Show SEO Slice  */}
			{vasSectionHeader?.length > 0 && (
				<MwebSliceContainer sectionId='seo_section' bgColor='bg-white' padding=''>
					<SEO seo={vasSectionHeader[0]} />
				</MwebSliceContainer>
			)}
		</>
	);
}
