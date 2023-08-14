interface ITemplateBanner {
    __typename: string;
    templateType: string;
    // 'contentLeftImageRight';
    // | 'contentLeftNoImage'
    // | 'contentCenterNoImage'
    // | 'contentRightImageLeft'
    // | 'contentRightImageLeft';
    useBackgroundImage: boolean;
    backgroundImageDesktop: any[];
    backgroundImageMobile: any[];
    bannerImage: ITemplateBannerImage[];
    bannerHeading: string;
    bannerDescription: string;
    bannerTermsText: null | string;
    bannerCtaText: string;
    bannerCtaUrl: string;
    //
}

interface ITemplateBannerImage {
    height: number;
    path: string;
    width: number;
}

export type { ITemplateBanner };
