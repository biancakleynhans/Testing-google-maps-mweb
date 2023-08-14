'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';

interface Icontent {
  path: string;
  width: number;
  height: number;
  sizes: string;
}

interface ISimpleBanner {
  bannerHeading: string;
  bannerDescription: string;
  backgroundImageDesktop: Icontent[];
  backgroundImageLaptop: Icontent[];
  backgroundImageMedium: Icontent[];
  backgroundImageTablet: Icontent[];
  backgroundImageSmall: Icontent[];
  backgroundImageMobile: Icontent[];
  bannerCtaText: string;
  bannerCtaUrl: string;
}

// dummy data
const BANNERS: ISimpleBanner[] = [
  {
    bannerHeading: 'Start summer right with Fibre at 25% OFF 1',
    bannerDescription: 'From 1 December 2022 - 1 January 2023',
    backgroundImageDesktop: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1920x400.jpeg`,
        width: 1920,
        height: 400,
        sizes: '(max-width: 1920px) 100vw',
      },
    ],
    backgroundImageLaptop: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1366x400.jpeg`,
        width: 1366,
        height: 400,
        sizes: '(max-width: 1366px) 100vw',
      },
    ],
    backgroundImageMedium: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1024x400.jpeg`,
        width: 1024,
        height: 400,
        sizes: '(max-width: 1024px) 100vw',
      },
    ],
    backgroundImageTablet: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-768x400.jpeg`,
        width: 768,
        height: 400,
        sizes: '(max-width: 768px) 100vw',
      },
    ],
    backgroundImageSmall: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-480x400.jpeg`,
        width: 480,
        height: 400,
        sizes: '(max-width: 480px) 100vw',
      },
    ],
    backgroundImageMobile: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-360x400.jpeg`,
        width: 360,
        height: 400,
        sizes: '(max-width: 360px) 100vw',
      },
    ],
    bannerCtaText: 'Get deal',
    bannerCtaUrl: '/fibre',
  },
  {
    bannerHeading: 'Start summer right with Fibre at 25% OFF 2',
    bannerDescription: 'From 1 December 2022 - 1 January 2023',
    backgroundImageDesktop: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1920x400.jpeg`,
        width: 1920,
        height: 400,
        sizes: '(max-width: 1920px) 100vw',
      },
    ],
    backgroundImageLaptop: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1366x400.jpeg`,
        width: 1366,
        height: 400,
        sizes: '(max-width: 1366px) 100vw',
      },
    ],
    backgroundImageMedium: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1024x400.jpeg`,
        width: 1024,
        height: 400,
        sizes: '(max-width: 1024px) 100vw',
      },
    ],
    backgroundImageTablet: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-768x400.jpeg`,
        width: 768,
        height: 400,
        sizes: '(max-width: 768px) 100vw',
      },
    ],
    backgroundImageSmall: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-480x400.jpeg`,
        width: 480,
        height: 400,
        sizes: '(max-width: 480px) 100vw',
      },
    ],
    backgroundImageMobile: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-360x400.jpeg`,
        width: 360,
        height: 400,
        sizes: '(max-width: 360px) 100vw',
      },
    ],
    bannerCtaText: 'Get deal',
    bannerCtaUrl: '/fibre',
  },
  {
    bannerHeading: 'Start summer right with Fibre at 25% OFF 3',
    bannerDescription: 'From 1 December 2022 - 1 January 2023',
    backgroundImageDesktop: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1920x400.jpeg`,
        width: 1920,
        height: 400,
        sizes: '(max-width: 1920px) 100vw',
      },
    ],
    backgroundImageLaptop: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1366x400.jpeg`,
        width: 1366,
        height: 400,
        sizes: '(max-width: 1366px) 100vw',
      },
    ],
    backgroundImageMedium: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1024x400.jpeg`,
        width: 1024,
        height: 400,
        sizes: '(max-width: 1024px) 100vw',
      },
    ],
    backgroundImageTablet: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-768x400.jpeg`,
        width: 768,
        height: 400,
        sizes: '(max-width: 768px) 100vw',
      },
    ],
    backgroundImageSmall: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-480x400.jpeg`,
        width: 480,
        height: 400,
        sizes: '(max-width: 480px) 100vw',
      },
    ],
    backgroundImageMobile: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-360x400.jpeg`,
        width: 360,
        height: 400,
        sizes: '(max-width: 360px) 100vw',
      },
    ],
    bannerCtaText: 'Get deal',
    bannerCtaUrl: '/fibre',
  },
  {
    bannerHeading: 'Start summer right with Fibre at 25% OFF 4',
    bannerDescription: 'From 1 December 2022 - 1 January 2023',
    backgroundImageDesktop: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1920x400.jpeg`,
        width: 1920,
        height: 400,
        sizes: '(max-width: 1920px) 100vw',
      },
    ],
    backgroundImageLaptop: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1366x400.jpeg`,
        width: 1366,
        height: 400,
        sizes: '(max-width: 1366px) 100vw',
      },
    ],
    backgroundImageMedium: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-1024x400.jpeg`,
        width: 1024,
        height: 400,
        sizes: '(max-width: 1024px) 100vw',
      },
    ],
    backgroundImageTablet: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-768x400.jpeg`,
        width: 768,
        height: 400,
        sizes: '(max-width: 768px) 100vw',
      },
    ],
    backgroundImageSmall: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-480x400.jpeg`,
        width: 480,
        height: 400,
        sizes: '(max-width: 480px) 100vw',
      },
    ],
    backgroundImageMobile: [
      {
        path: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banners/placeholder-banner-360x400.jpeg`,
        width: 360,
        height: 400,
        sizes: '(max-width: 360px) 100vw',
      },
    ],
    bannerCtaText: 'Get deal',
    bannerCtaUrl: '/fibre',
  },
];

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '">&nbsp;</span>';
  },
};

interface Props {
  simpleBanners: ISimpleBanner[];
}

const SimpleBanner = () => {
  const { width } = useWindowSize();

  const [display, setdisplay] = useState<Icontent[]>([]);

  useEffect(() => {
    let arr = SizingDisplay(BANNERS);
    setdisplay(arr);
  }, [width]);

  function SizingDisplay(banners: ISimpleBanner[]) {
    let Mobile: string = width < 480 ? 'backgroundImageMobile' : '';
    let Small: string = width >= 480 && width < 768 ? 'backgroundImageSmall' : '';
    let Tablet: string = width >= 480 && width < 1024 ? 'backgroundImageTablet' : '';
    let Medium: string = width >= 1024 && width < 1366 ? 'backgroundImageMedium' : '';
    let Laptop: string = width >= 1366 && width < 1920 ? 'backgroundImageLaptop' : '';
    let Desktop: string = width >= 1920 ? 'backgroundImageDesktop' : '';
    // console.log('get Banner', Desktop, Laptop, Medium, Tablet, Small, Mobile);

    let use: Icontent[] = banners.flatMap((x) => {
      return Mobile.length > 0
        ? x.backgroundImageMobile
        : Small.length > 0
        ? x.backgroundImageSmall
        : Tablet.length > 0
        ? x.backgroundImageTablet
        : Medium.length > 0
        ? x.backgroundImageMedium
        : Laptop.length > 0
        ? x.backgroundImageLaptop
        : Desktop.length > 0
        ? x.backgroundImageDesktop
        : x.backgroundImageDesktop;
    });

    // console.log('USE ?????', use);

    return use;
  }

  return (
    <div className='w-full h-[400px]'>
      <Swiper
        className='w-full h-[400px]'
        pagination={pagination}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        spaceBetween={0}
        slidesPerView={'auto'}
        centeredSlides={true}
        onSlideChange={() => {}}
        onSwiper={() => {}}
        effect='fade'
      >
        <SwiperSlide className='h-[400px] w-full'>
          {display.map((banner, i) => (
            <Image key={i} fill={true} src={banner?.path} alt='' quality={100} className='cursor-pointer' onClick={() => console.log('banner clicked')} />
          ))}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SimpleBanner;
