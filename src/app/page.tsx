import BannerBasedTemplate from '@/components/banner-based-templates/Main';
import Testimonials from '@/components/testimonials';
import { iTestimonialProps } from '@/components/ui/mwebCard/CardStyles';
import HistoryInternet from '@/components/mwebHome/historyInternet';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import OurMileStone from '@/components/mwebHome/ourMilestone';
import MwebServices from '@/components/mwebHome/mwebServices';
import Deals from '@/components/mwebHome/Deals';
import LeadrshipTeam from '@/components/mwebHome/leadership';
import { ExistingMwebberBannerA, ExistingMwebberBannerB } from '@/components/mwebHome/mwebber';
import { getAboutUsContent, IAboutUs } from '@/services/aboutUsService';
import { getStaffProfileContent, IStaffProfile } from '@/services/staffProfileService';

export default async function Home() {
    const [aboutUsData, profileData] = await Promise.all([getAboutUsContent(), getStaffProfileContent()]);

    const templateBasedBanners = [
        {
            __typename: 'templateBasedBanner_banner_BlockType',
            templateType: 'contentLeftImageRight',
            useBackgroundImage: false,
            backgroundImageDesktop: [],
            backgroundImageMobile: [],
            bannerImage: [{ path: 'images/simple-banner-bg/guy-vr-soccer@2x.png', width: 568, height: 538 }],
            bannerHeading: 'From "get a real job" to <span class="mweb-highlight">"gaming legend"</span>',
            bannerDescription: 'Connecting over 1,3 million South African homes to better internet since 1997.',
            bannerTermsText: null,
            bannerCtaText: 'Sign Up Today',
            bannerCtaUrl: '/lte',
        },
        {
            __typename: 'templateBasedBanner_banner_BlockType',
            templateType: 'contentLeftImageRight',
            useBackgroundImage: false,
            backgroundImageDesktop: [],
            backgroundImageMobile: [],
            bannerImage: [{ path: 'images/simple-banner-bg/LTE-new-image-test.png', width: 568, height: 538 }],
            bannerHeading: '2. Experience the power of the Internet',
            bannerDescription: 'save R3 500 with free Fibre setup + router',
            bannerTermsText: null,
            bannerCtaText: 'Get Fibre',
            bannerCtaUrl: '/fibre',
        },
    ];

    const testimonialsList: iTestimonialProps[] = [
        {
            __typename: 'testimonials2023_testimonial_BlockType',
            useIcon: true,
            size: 'small',
            icon: 'heart',
            testimonialText:
                'I have had fibre with MWEB for the last 6 months and their service has been incredible and very reliable. I would definitely recommend it to anyone.',
            firstName: 'Mike',
        },
        {
            __typename: 'testimonials2023_testimonial_BlockType',
            useIcon: true,
            size: 'small', // Ensure that the size property is either 'small' or 'large'
            icon: 'badge',
            testimonialText:
                'Incredible service - professional, efficient, patient and so refreshingly pleasant. I look forward to a long and happy relationship with Mweb.',
            firstName: 'Silke',
        },
        {
            __typename: 'testimonials2023_testimonial_BlockType',
            useIcon: true,
            size: 'small',
            icon: 'heart',
            testimonialText:
                'Thanks for setting up my new router. Really appreciate your quick response and going the extra mile. Thanks for making me a happy Mweb customer.',
            firstName: 'Preston',
        },
        {
            __typename: 'testimonials2023_testimonial_BlockType',
            useIcon: true,
            size: 'small',
            icon: 'star',
            testimonialText:
                "I'd just like to compliment you on your wonderful service. Ive been given the runaround from other ISP's and you managed to assist.",
            firstName: 'Tasneem',
        },
    ];

    return (
        <div>
            <BannerBasedTemplate templateOne={templateBasedBanners ?? []} />

            <MwebSliceContainer sectionId='history_internet' padding='px-4 py-10 desktop:px-[182px] desktop:py-[50px]'>
                <HistoryInternet />
            </MwebSliceContainer>

            <MwebSliceContainer sectionId='our-milestone' padding='px-4 py-10 desktop:px-[182px] desktop:py-[50px]'>
                <OurMileStone />
            </MwebSliceContainer>

            <MwebServices />

            <MwebSliceContainer sectionId='deals' padding='px-4 py-10 desktop:px-[182px] desktop:py-[50px]'>
                <Deals />
            </MwebSliceContainer>

            <MwebSliceContainer sectionId='deals-banner-a' bgColor='bg-mwBlueGrey-25' padding='px-4  desktop:px-[182px]'>
                <ExistingMwebberBannerA />
            </MwebSliceContainer>

            <div className='bg-white h-[72px]'></div>

            <MwebSliceContainer sectionId='deals-banner-a' bgColor='bg-mwBlueGrey-25' padding='px-4  desktop:px-[182px]'>
                <ExistingMwebberBannerB />
            </MwebSliceContainer>

            <MwebSliceContainer sectionId='leadership' padding='px-4 py-10 desktop:px-[182px] desktop:py-[50px]'>
                <LeadrshipTeam aboutUsData={aboutUsData[0]} profileData={profileData} />
            </MwebSliceContainer>

            <div className={`${testimonialsList.length < 4 ? 'mx-auto  w-full max-w-[1760px]' : ''}`}>
                <Testimonials heading='' testimonialsList={testimonialsList} />
            </div>
        </div>
    );
}
