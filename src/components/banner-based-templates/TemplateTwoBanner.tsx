'use client';
import CallToActionBanner from '../cta/CallToActionBanner';

interface ITemplateBanner {
    __typename: string;
    templateType: string;
    useBackgroundImage: boolean;
    backgroundImageDesktop: any[];
    backgroundImageMobile: any[];
    bannerImage: any[];
    bannerHeading: string;
    bannerDescription: string;
    bannerTermsText: null | string;
    bannerCtaText: string;
    bannerCtaUrl: string;
    //
}

export default function TemplateTwoBanner({ banner }: { banner: ITemplateBanner }) {
    //
    return (
        <CallToActionBanner
            action='scroll'
            vasCallToAction={{
                __typename: '',
                action: 'scroll',
                callToActionHeading: banner.bannerHeading,
                callToActionButtonText: banner.bannerCtaText,
                callToActionUrl: banner.bannerCtaUrl,
                useBackground: true,
                backgroundLaptop: banner.backgroundImageDesktop,
                backgroundMobile: banner.backgroundImageMobile,
            }}
        />
    );
}
