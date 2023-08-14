'use client';

import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { IBannerImage, IHeadingBanner } from '@/models/BannerModels';
import parse from 'html-react-parser';
import MwebSlider from '../ui/mwebSlider/MwebSlider';
import MwebCarouselIndicator from '../ui/mwebCarouselIndicator/MwebCarouselIndicator';
import { IGeneralBanner, getGeneralBannerContent } from '@/services/MobileBannerService';
import MobileAppSlice from '@/components/OrderConfirmation/AppStoreSlice';
import { IMobileAppSlice } from '@/models/mobileAppSlice';
import MwebButtonAppStore from '../ui/mwebButtons/MwebButtonAppStore';


export function MobileAppBanner(){ 

    
    const [generalBannerContent, setGeneralBannerContent] = useState<IGeneralBanner>();

    useEffect (() => {
        getGeneralBannerContent().then((data) => {
            setGeneralBannerContent(data[0])
        })
    },[])

    const imageBannerData = generalBannerContent?.mobileAppBanner;

    const bannerText = imageBannerData?.[0].bannerText || '';

    const bannerImageProperties = imageBannerData?.[0].bannerImage

    const imagePath = bannerImageProperties?.[0].path || '';

    const width:number = bannerImageProperties?.[0].width || 400
    const height:number = bannerImageProperties?.[0].height || 440

    console.log(imagePath)
    
  return (
    <div className='flex w-full max-h-[520px] lg:max-h-[416px] flex bg-gradient-to-r from-mwTealGradientFromLeft to-mwTealGradientToRight '>

        <div className='max-container-1366-center flex flex-col lg:flex-row items-center self-center max-h-[520px] px-4 py-8  md:py-0 desktop:py-0 lg:max-h-[416px]'>
            {/* left side */}
            <div className='flex flex-col items-center text-center desktop:items-start desktop:text-left gap-y-6 desktop:gap-y-8 desktop:pl-20 self-center md:p-10 '>
                
                <h2 className='text-center desktop:text-start text-mwTextDeskH3Bold desktop:text-mwTextDeskH2Bold text-white desktop:max-w-[694px]'> {parse(bannerText)} </h2>
                
                {/* mobile app stores */}
                <div className='flex flex-row  desktop:max-w-[694px] gap-x-4'>
                   {imageBannerData?.map((item, index) => {
                        if(index === 0 ) return null
                        else {
                            const bannerImageProperties = imageBannerData?.[index].mobileAppStoreLogo
                            const logoPath = bannerImageProperties?.[0].path || '';
                            const width = bannerImageProperties?.[0].width || 10
                            const height = bannerImageProperties?.[0].height || 10
                            const mobileAppStoreUrl = imageBannerData?.[index].mobileAppStoreUrl

                            return(

                            <div key={index} className='' onClick={()=>{window.location.href = mobileAppStoreUrl}}>
                               <Image src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${logoPath}`} 
                                   alt='image' 
                                   width={width} 
                                   height={height}     
                               />
                           </div>
                        ) 
                        }                   
                    })}
                </div>
                
            </div>
            {/* right, mboile app picture */}
            <div className='flex max-w-[284px] max-h-[568px] pt-8 desktop:pt-10 items-center self-center md:px-12 desktop:px-0'>
                <Image src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${imagePath}`} 
                    alt='image' 
                    width={width} 
                    height={height}     
                />
            </div>

        </div>

    </div>
  );
};

export default MobileAppBanner;
