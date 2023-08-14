import Image from 'next/image';

const SIZE = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

interface iByBrand {
  apple: JSX.Element;
  huawei: JSX.Element;
  google: JSX.Element;
}

export interface iAppStore {
  brand: iByBrand;
  black: iByBrand;
  white: iByBrand;
}

export const AppStoreLogos: iAppStore = {
  brand: {
    apple: <Image fill sizes={SIZE} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/brands/BrandAppleL.png`} alt='Brand Apple' />,
    huawei: <Image fill sizes={SIZE} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/brands/BrandHuaweiL.png`} alt='Brand Huawei' />,
    google: <Image fill sizes={SIZE} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/brands/BrandGoogleL.png`} alt='Brand Google' />,
  },
  black: {
    apple: <Image fill sizes={SIZE} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/brands/BlackAppleL.png`} alt='Black Apple' />,
    huawei: <Image fill sizes={SIZE} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/brands/BlackHuaweiL.png`} alt='Black Huawei' />,
    google: <Image fill sizes={SIZE} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/brands/BlackGoogleL.png`} alt='Black Google' />,
  },
  white: {
    apple: <Image fill sizes={SIZE} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/brands/WhiteAppleL.png`} alt='White Apple' />,
    huawei: <Image fill sizes={SIZE} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/brands/WhiteHuaweiL.png`} alt='White Huawei' />,
    google: <Image fill sizes={SIZE} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/brands/WhiteGoogleL.png`} alt='White Google' />,
  },
};
