'use client'
import React, {useState, useEffect} from 'react';
import {IAboutUs } from '@/services/aboutUsService';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

interface IGeneralCheckoutProps {
    aboutUsData?: IAboutUs | undefined;
}
export default function HomeBanner({aboutUsData}: IGeneralCheckoutProps) {

    const banner = aboutUsData?.simpleBanner

    const bannerScroll = {
        dots: true,
        infinite: true,
        speed: 50,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoPlaySpeed: 50,
    }

    return (
        <div className='flex flex-col w-full self-center items-center'>
            {/* desktop slider */}
            <div className='w-full hidden md:flex'>
                <div className='w-full '>
                <Slider {...bannerScroll} className=''>
                {banner?.map((item, index) => {

                    const bannerImage = item?.backgroundImage?.[0];
                    const bannerPath = bannerImage?.path || '';

                    const bannerHeading = item?.bannerHeading || '';
      
                    if (bannerHeading.toLowerCase() === 'desktop') {
                        return (
                            <div key={index} className='w-full hidden md:flex'>
    
                                <div className='w-full '>
                                    <img className='w-full' src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${bannerPath}`} alt='banner'/>
                                </div>
    
                
                             </div>
                        )
                    }

                    else {return null}
                    
                })}
                </Slider>  
                </div>
            </div>
            
            {/* mobile slider */}
            <div className='w-full flex md:hidden '>
                <div className='w-full'>
                <Slider {...bannerScroll} className=''>
                {banner?.map((item, index) => {

                    const bannerImage = item?.backgroundImage?.[0];
                    const bannerPath = bannerImage?.path || '';

                    const bannerHeading = item?.bannerHeading || '';
                
                    if (bannerHeading.toLowerCase() === 'mobile') {
                        return (
                            <div key={index} className='w-full hidden md:flex'>
    
                                <div className='w-full h-[351px]'>
                                    <img className='w-full h-[351px]' src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${bannerPath}`} alt='banner'/>
                                </div>
    
                
                             </div>
                        )
                    }

                    else {return null}
                    
                })}
                </Slider> 
                </div>
            </div>
    
        </div>
    )
}