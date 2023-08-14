'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { IBannerImage, IHeadingBanner } from '@/models/BannerModels';
import parse from 'html-react-parser';
import CTAButton from './CTAButton';
import MwebSlider from '../ui/mwebSlider/MwebSlider';
import MwebCarouselIndicator from '../ui/mwebCarouselIndicator/MwebCarouselIndicator';

const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
        return '<span class="' + className + '">&nbsp;</span>';
    },
};

interface Props {
    simpleBanner: IHeadingBanner;
}

const HeadingBanner = (props: Props) => {
    const { simpleBanner } = props;
    const [display, setdisplay] = useState<IBannerImage[]>([]);
    useEffect(() => {
        setdisplay(simpleBanner?.backgroundImage);
    }, [props]);

    return (
        <div className='relative w-full h-full max-h-[620px]  desktop:max-h-[536px]  flex bg-gradient-to-r from-mwTealGradientFromLeft to-mwTealGradientToRight'>
            <div className='flex flex-col desktop:flex-row w-full min-h-full flex desktop:gap-6'>
                <div className='w-full desktop:w-3/5 flex flex-col gap-y-6 desktop:gap-y-10 px-4 pt-6 desktop:pl-20 self-center pt-auto'>
                    <div className='flex align-center flex-col desktop:gap-y-4 gap-y-2'>
                        <div className='text-white text-mwTextMobileH1Bold desktop:text-mwTextDeskDisplayLg'>
                            {parse(simpleBanner.bannerHeading)} Hello
                        </div>
                        <div className='flex flex-col text-white text-mwTextParaBase desktop:text-mwTextParaXLarge'>
                            {simpleBanner.bannerDescription && (
                                <div className='mb-[6px]'>{simpleBanner.bannerDescription} hello</div>
                            )}
                            <div>T&Cs apply.</div>
                        </div>
                    </div>

                    <div className='flex justify-start'>
                        <CTAButton action={null} color='secondary-light' copyText='' ctaBtnText={simpleBanner.bannerCtaText} />
                    </div>
                </div>
                <div className='w-full desktop:w-2/5 flex  self-center h-[385px]  desktop:h-full overflow-hidden'>
                    <MwebSlider images={display} />
                </div>
            </div>

            <div className='absolute inset-x-0 bottom-6'>
                <div className='flex justify-center'>
                    <MwebCarouselIndicator controlsLength={simpleBanner.backgroundImage.length + 2} selectedIndex={0} />
                </div>
            </div>
        </div>
    );
};

export default HeadingBanner;
