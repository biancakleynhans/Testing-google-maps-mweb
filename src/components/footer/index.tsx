'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IFooterCategory } from '@/models/Footer';
import MwebSliceContainer from '../shared/MwebSliceContainer';
import { getFooterContent } from '@/services/footerService';
import MobileAppSlice from '@/components/MobileAppSlice';
import BottomFooterMain from './BottomFooterMain';
import {usePathname} from "next/navigation";
import MwebIcon from '@/components/ui/mwebIcon/MwebIcon';
import { IMobileAppSlice } from '@/models/mobileAppSlice';
interface IProps {
  variant: 'full' | 'condensed' | 'banner';
  bgColor?: string;
  hideAppSlice?: boolean;
}

// { footerContent }: { footerContent: IFooterCategory[] }
function Footer({ variant, bgColor, hideAppSlice }: IProps) {
  const [footerContent, setfooterContent] = useState<IFooterCategory[]>([]);
  const [mobileAppSlice, setfooterMobileContent] = useState<IMobileAppSlice>({} as IMobileAppSlice);
  const path = usePathname();

  useEffect(() => {
    getFooterContent()
      .then((res) => {
        // console.log('MAIN RES', res.mobileAppSlice);
        setfooterContent(res.footerCategories);
        setfooterMobileContent(res.mobileAppSlice);
      })
      .catch((err) => { });
  }, []);

  return (
	  <>
    <MwebSliceContainer sectionId='footer-slice' bgColor={`${variant !== "condensed" ? "bg-mwPrimary-900" : bgColor}`}>
      {/* PT2-648: Show Footer Slice  */}
      <footer className="flex flex-col w-full px-4 md:px-[15px] desktop:px-20" datat-testid='footer_section'>

        {/* PT2-647: Show Mobile App Slice  */}
        {variant === "full" && !hideAppSlice &&
          <div className="py-8 md:py-12">
            <MwebSliceContainer
              sectionId='mobile_app_slice_section'
            >
              <MobileAppSlice mobileAppSlice={mobileAppSlice} />
            </MwebSliceContainer>
          </div>}
        {/* PT2-647: Show Mobile App Slice  */}
        {
          variant !== "condensed" &&
          <>
            {/** second part of the footer: contain links and categories */}
            {footerContent.length > 0 && (
              <div className={`${hideAppSlice ? "" : "border-t-[1px] border-mwPrimary-200 border-b-[1px] border-opacity-25"} py-8 md:py-12`}>
                <ul className='grow grid grid-cols-2 gap-y-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-y-10' data-testid='top_part_footer-section'>
                  {footerContent.map((footerItem) => (
                    <li key={footerItem.title} className='flex flex-col justify-start items-start gap-2'>
                      <h4 className='text-mwCaptionLarge text-white'>{footerItem.title}</h4>

                      {/** map footer link items */}
                      <ul className='flex flex-col justify-start items-start gap-2' data-testid={'footer-item' + footerItem.title}>
                        {footerItem.categories.map((footerLink, idx) => (
                          <li className='' key={footerLink.id + idx}>
                            <>
                              {
                                // New requirements : if no social-icons then display Link
                                footerLink.title !== 'footer-social-icons' && (
                                  <Link href={footerLink.targetUrl ? footerLink.targetUrl : '#'} data-testid={`${footerLink.analyticsId}`}>
                                    <p className='text-mwTextParaSmall text-left text-white'>{footerLink.title}</p>
                                  </Link>
                                )
                              }
                            </>

                            <>
                              {
                                // New requirements: if social-icons and level 2 then show social icons
                                footerLink.level === 2 && footerLink.title === 'footer-social-icons' ? (
                                  <div className='flex justify-start items-start  relative gap-6 pt-6' data-testid='footer-social-icons'>
                                    {/** Faccebook svg */}
                                    <a href='https://www.facebook.com/MWEB'>
                                    <MwebIcon color=' text-white' iconType='facebook' size={24} variant='social' />                                      
                                    </a>

                                    {/** Twitter svg */}
                                    <a href='https://twitter.com/mwebtweets'>
                                    <MwebIcon color=' text-white' iconType='twitter' size={24} variant='social' />                                      
                                    </a>

                                    {/** instagram svg */}
                                    <a href='https://www.instagram.com/mweb_insta'>
                                    <MwebIcon color=' text-white' iconType='instagram' size={24} variant='social' /> 
                                    </a>

                                    {/**Youtube svg */}
                                    <a href='https://www.youtube.com/user/mweb'>
                                    <MwebIcon color=' text-white' iconType='youtube' size={24} variant='social' /> 
                                    </a>
                                  </div>
                                ) : (
                                  ''
                                )
                              }
                            </>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        }


        {/**  Bottom Section that contains About Us, Privacy Policy links*/}
        <BottomFooterMain variant={variant} bgColor={bgColor} />
      </footer>


    </MwebSliceContainer>
	  {
		  (path && path.toLowerCase().includes('order-summary')) && (
			  <div className={`clear-both h-[146px] md:hidden`}></div>
		  )
	  }

	</>
  );
}

export default Footer;
