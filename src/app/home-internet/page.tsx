import HomeInternet from '@/components/home-internet/HomeInternet';
import ProductFeature from '@/components/ProductFeature/ProductFeature';
import SEO from '@/components/seo/index';
import BannerBasedTemplate from '@/components/banner-based-templates/Main';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';

import HelpMeDecideLayout from '@/components/HelpMeDecide/HelpMeDecideLayout';
import { HelpMeDecideService } from '@/services/helpMeDecideService';

import getHomeInternetLandingPageContent, { IHomePageContent } from '@/services/HomeInternetService';
import ProductsComparison from '@/components/ProductsComparison/ProductsComparison';
import Testimonials from '@/components/testimonials';
import getTestimonials2023 from '@/services/TestimonialsService';

export default async function HomeInternetLandingPage() {
    const pageContent: IHomePageContent = await getHomeInternetLandingPageContent();
    const testimonialsList = await getTestimonials2023();
    const helpMeDecide = HelpMeDecideService.getHelpMeDecideCraftData(pageContent?.helpMeDecide);
    return (
        <>
            <BannerBasedTemplate templateOne={pageContent.templateBasedBanner ?? []} />
            <HomeInternet pageContent={pageContent} />
            <MwebSliceContainer sectionId='fibre-help-me-decide-section' bgColor='bg-white' padding=''>
                <HelpMeDecideLayout data={helpMeDecide} />
            </MwebSliceContainer>
            <MwebSliceContainer sectionId='' padding='md:px-20 py-24' bgColor='bg-mwBlueGrey-25'>
                <ProductFeature useCaseAccordion={pageContent.useCaseAccordion} />
            </MwebSliceContainer>
            <MwebSliceContainer sectionId='products-comparison' padding='px-4 py-14 md:px-20 md:py-24' bgColor='bg-mwBlueGrey-25'>
                <ProductsComparison
                    heading={pageContent.productComparisonHeading}
                    productComparisonList={pageContent.productComparisonCard}
                />
            </MwebSliceContainer>
            <div className={`${testimonialsList.length < 4 ? 'mx-auto  w-full max-w-[1760px]' : ''}`}>
                <Testimonials heading={pageContent.genericHeading} testimonialsList={testimonialsList} />
            </div>

            <BannerBasedTemplate templateTwo={pageContent.templateBasedBannerTwo[0]} />
            
            <MwebSliceContainer sectionId='seo_content' padding=''>
                <SEO seo={pageContent.vasSectionHeader[0]} />
            </MwebSliceContainer>
        </>
    );
}
