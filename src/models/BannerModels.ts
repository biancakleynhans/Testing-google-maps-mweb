
export interface IBannerImage {
  path: string;
  width: number;
  height: number;
  sizes: string;
}

export interface IHeadingBanner {
  bannerHeading: string;
  bannerDescription: string;
  backgroundImage: IBannerImage[];
  bannerCtaText: string;
  bannerCtaUrl: string;
}
