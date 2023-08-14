'use client';
import { ICta } from '@/models/Cta';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image';
import React, { useCallback } from 'react';  


import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';
import parse from 'html-react-parser';

import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import CTAButton from '../switchBlock/CTAButton';
const MEDIA_QUERY = '(max-width: 768px)';
const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

interface IProps {
    action: 'redirect' | 'scroll';
    vasCallToAction: ICta;
}

export default function CallToActionBanner({ action, vasCallToAction }: IProps) {
    const router = useRouter();
    const {
        callToActionButtonText,
        callToActionHeading,
        callToActionUrl,
        useBackground,
        backgroundLaptop,
        backgroundMobile,
    } = vasCallToAction;

    const isTabletOrMobile = useMediaQuery({ query: MEDIA_QUERY });

    const backgroundImage = isTabletOrMobile
        ? `${MEDIA_BASE_URL}/${backgroundMobile[0]?.path}`
        : `${MEDIA_BASE_URL}/${backgroundLaptop[0]?.path}`;

    const handleClick = useCallback(() => {
        if (action === 'redirect') {
            router.push(callToActionUrl);
        } else {
            const point = document.getElementById(callToActionUrl);

            if (point) {
                point.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                });
            } else {
                console.error(`Error: no target found for URL "${callToActionUrl}"`);
            }
        }
    }, [action, callToActionUrl, router]);

    return (
        <div
            className={`${useBackground ? '' : 'bg-gradient-to-r from-mwTealGradientFromLeft to-mwTealGradientToRight'}`}
            style={{ position: 'relative' }}
        >
            {useBackground && (
                <Image
                    src={backgroundImage}
                    alt="Background image"
                    layout='fill'
                    objectFit='cover'
                    quality={100}
                />
            )}
            <div style={{ position: 'relative' }}>
                <MwebSliceContainer sectionId='cta_wording_and_button'>
                    <section className='z-40 flex flex-col items-center px-4 pt-8 pb-48 md:pt-24 md:pb-40 md:px-[182px] lg:px-52'>
                        <div
                            id='cta_wording'
                            className='text-mwTextMobileH1Bold text-center md:text-mwTextDeskDisplaySm text-white'
                        >
                            {parse(callToActionHeading)}
                        </div>

                        <CTAButton
                            action={null}
                            color='secondary-light'
                            copyText=''
                            ctaBtnText={callToActionButtonText}
                            onClickFunction={handleClick}
                        />
                    </section>
                </MwebSliceContainer>
            </div>
        </div>
    );
}