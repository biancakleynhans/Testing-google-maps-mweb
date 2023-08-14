'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import parse from 'html-react-parser';

import MwebSliceContainer from '../shared/MwebSliceContainer';
import MwebCarouselIndicator from '../ui/mwebCarouselIndicator/MwebCarouselIndicator';
import Slider from 'react-slick';

export default function MwebServices() {
    const slideRef = useRef<any>();
    const [bannerInViewIndex, setBannerInViewIndex] = useState(0);
    const templateBasedBanners = [
        {
            __typename: 'templateBasedBanner_banner_BlockType',
            templateType: 'contentLeftImageRight',
            useBackgroundImage: false,
            backgroundImageDesktop: [],
            backgroundImageMobile: [],
            bannerImage: [{ path: 'images/simple-banner-bg/guy-vr-soccer@2x.png', width: 568, height: 538 }],
            bannerHeading: 'From "get a real job" to <span class="mweb-highlight">gaming legend</span>',
            bannerDescription: 'You deserve better Internet in your pursuit of a better YOU!',
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
            bannerHeading: '<span class="mweb-highlight">Bigger &amp better</span> Connections',
            bannerDescription:
                'We have dedicated teams, sites, and systems in place to help you stay connected to better Internet 365 days a year.',
            bannerTermsText: null,
            bannerCtaText: 'Get Fibre',
            bannerCtaUrl: '/fibre',
        },
    ];

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
        },
    };

    return (
        <div
            className='relative w-full'
            style={{ background: 'var(--background-gradient, linear-gradient(90deg, #398595 0%, #4FB1AF 100%))' }}
        >
            <Slider ref={slideRef} {...settings}>
                {templateBasedBanners.map((banner) => {
                    return (
                        <div key={banner.bannerCtaUrl}>
                            <section className='flex flex-col relative'>
                                <MwebSliceContainer sectionId='' padding='px-4 py-6 desktop:py-24 desktop:px-[180px]'>
                                    <div className='flex flex-col gap-4 md:gap-10 w-full md:w-7/12'>
                                        <div className='text-white text-mwTextMobileH2Bold px-6 text-center desktop:px-0 desktop:text-left desktop:text-mwTextDeskH2Bold'>
                                            {parse(`${banner.bannerHeading}`)}
                                        </div>

                                        <p className='text-white text-mwTextParaBase'>{banner.bannerDescription}</p>

                                        <MwebCarouselIndicator
                                            controlsLength={templateBasedBanners.length}
                                            selectedIndex={bannerInViewIndex}
                                        />
                                    </div>
                                </MwebSliceContainer>

                                <div className='desktop:absolute desktop:top-0 desktop:right-0 desktop:bottom-0 desktop:w-5/12'>
                                    <section className='relative h-[300px] desktop:h-[458px] w-full'>
                                        <Image
                                            alt=''
                                            src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${banner.bannerImage[0].path}`}
                                            fill={true}
                                            objectFit='contain'
                                            objectPosition='top'
                                            className=''
                                        />
                                    </section>
                                </div>
                            </section>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
