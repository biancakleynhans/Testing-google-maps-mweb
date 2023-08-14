'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import parse from 'html-react-parser';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import './TemplateOneBanner.css';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';

import MwebSliceContainer from '../shared/MwebSliceContainer';
import MwebCarouselIndicator from '../ui/mwebCarouselIndicator/MwebCarouselIndicator';

import type { ITemplateBanner } from '@/models/TemplateBasedBanner';

/**
 *
 * @param banner
 * @returns  Mobile Banner version
 */
function TemplateOneMobileBanner({ banners }: { banners: ITemplateBanner[] }) {
    const router = useRouter();
    const sliderRef = useRef<any>();

    const [bannerInViewIndex, setBannerInViewIndex] = useState(0);
    const [bannerInView, setBannerInView] = useState<ITemplateBanner>(banners[bannerInViewIndex]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 5000,
        afterChange: (currentBannerIndex: number) => {
            setBannerInViewIndex(currentBannerIndex);
            setBannerInView(banners[currentBannerIndex]);
        },
    };

    return (
        <div className='relative'>
            <Slider ref={sliderRef} {...settings}>
                {banners.map((banner, index) => {
                    return (
                        <div key={banner.bannerCtaUrl + index} className=''>
                            <div className='flex flex-col'>
                                <section className='px-4 pt-8 -mb-20 md:-mb-28 md:px-20'>
                                    <div className='flex flex-col gap-6'>
                                        {/** HEADING AND DESCRIPTION  */}
                                        <div className='flex flex-col gap-2'>
                                            <div className='w-10/12 text-white text-mwTextMobileH1Bold desktop:text-mwTextDeskDisplayLg'>
                                                {parse(`${banner.bannerHeading}`)}
                                            </div>
                                            <p className='text-white text-mwtextParaBase desktop:text-mwTextParaXLarge h-20'>
                                                {banner.bannerDescription}
                                            </p>
                                        </div>

                                        <div className='z-10'>
                                            <MwebButton
                                                isFullWidth={false}
                                                hasIcon={false}
                                                size='large'
                                                isDisabled={false}
                                                onClickFunction={() => {
                                                    router.push(banner.bannerCtaUrl);
                                                }}
                                                color='secondary-light'
                                                btnText={banner.bannerCtaText}
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className='flex justify-end'>
                                    <div className='relative w-10/12 h-[295px] md:h-[400px]'>
                                        <Image
                                            alt=''
                                            src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${bannerInView.bannerImage[0].path}`}
                                            fill={true}
                                            objectFit='cover'
                                            objectPosition='top'
                                            className=''
                                        />
                                    </div>
                                </section>
                            </div>
                        </div>
                    );
                })}
            </Slider>

            {banners.length > 1 && (
                <div className='absolute z-10 pb-8 left-0 bottom-0 right-0 flex justify-center'>
                    <MwebCarouselIndicator controlsLength={banners.length} selectedIndex={bannerInViewIndex} />
                </div>
            )}
        </div>
    );
}

/**
 *
 * @param banner
 * @returns Desktop Banner Version
 */
function TemplateOneDesktopBanner({ banners }: { banners: ITemplateBanner[] }) {
    const router = useRouter();
    const sliderRef = useRef<any>();
    const containerRef = useRef<any>();

    const [bannerInViewIndex, setBannerInViewIndex] = useState(0);
    const [bannerInView, setBannerInView] = useState<ITemplateBanner>(banners[bannerInViewIndex]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 7000,
        afterChange: (currentBannerIndex: number) => {
            setBannerInViewIndex(currentBannerIndex);
            setBannerInView(banners[currentBannerIndex]);
        },
    };

    return (
        <section className='relative'>
            <Slider ref={sliderRef} {...settings}>
                {banners.map((banner, index) => {
                    return (
                        <div key={banner.bannerCtaUrl + index} className=''>
                            <div className='grid grid-cols-12 gap-0'>
                                {/** BANNER LEFT CONTENT */}
                                <section className='col-span-7 pt-20 pb-10 flex flex-col items-start gap-10'>
                                    {/** HEADING AND DESCRIPTION  */}
                                    <div className='flex flex-col gap-4'>
                                        <div className='text-white text-mwTextMobileH1Bold desktop:text-mwTextDeskDisplayLg'>
                                            {parse(banner.bannerHeading)}
                                        </div>
                                        <p className='w-7/12 text-white text-mwtextParaBase desktop:text-mwTextParaXLarge'>
                                            {banner.bannerDescription}
                                        </p>
                                    </div>

                                    <MwebButton
                                        isFullWidth={false}
                                        hasIcon={false}
                                        size='large'
                                        isDisabled={false}
                                        onClickFunction={() => {
                                            router.push(banner.bannerCtaUrl);
                                        }}
                                        color='secondary-light'
                                        btnText={banner.bannerCtaText}
                                    />
                                </section>

                                <section className='col-span-5 relative h-[536px]'>
                                    <Image
                                        alt=''
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${banner.bannerImage[0].path}`}
                                        fill={true}
                                        objectFit='cover'
                                        className='object-left-top'
                                    />
                                </section>
                            </div>
                        </div>
                    );
                })}
            </Slider>

            {banners.length > 1 && (
                <div className='absolute bottom-0 left-0 right-0 flex justify-center mb-10'>
                    <MwebCarouselIndicator controlsLength={banners.length} selectedIndex={bannerInViewIndex} />
                </div>
            )}
        </section>
    );
}

export default function TemplateOneBanner({ banners }: { banners: ITemplateBanner[] }) {
    return (
        <div
            className=''
            style={{
                background: 'var(--background-gradient, linear-gradient(90deg, #398595 0%, #4FB1AF 100%))',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <MwebSliceContainer sectionId='template-banner' padding='px-0 desktop:px-20'>
                <section className='hidden desktop:block'>
                    <TemplateOneDesktopBanner banners={banners} />
                </section>

                <section className='block desktop:hidden'>
                    <TemplateOneMobileBanner banners={banners} />
                </section>
            </MwebSliceContainer>
        </div>
    );
}
