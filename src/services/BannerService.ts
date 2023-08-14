
import { IHeadingBanner } from '@/models/BannerModels';

// Convert the raw Banner Craft Data to an object that's easier to reference
function getBannerCraftData(simpleBanner: IHeadingBanner[]): IHeadingBanner {
    let content: IHeadingBanner = {
        bannerHeading: "",
        bannerDescription: "",
        backgroundImage: [],
        bannerCtaText: "",
        bannerCtaUrl: ""
    }

    if (simpleBanner && simpleBanner.length > 0) {
        content= simpleBanner[0]
      
    }

    return content;
}

export const BannerService = {
    getBannerCraftData
}
