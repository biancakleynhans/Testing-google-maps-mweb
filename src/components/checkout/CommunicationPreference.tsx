'use client';

import Checkbox from '@mui/material/Checkbox';
import MwebCheckbox from '@/components/ui/mwebCheckbox/MwebCheckbox';
import { useState, useEffect } from 'react';
import {IGeneralCheckout, getGeneralCheckoutContent } from '@/services/GeneralCheckoutService';
export default function CommunicationPrefence() {

    const [generalCheckoutContent, setGeneralCheckoutContent] = useState<IGeneralCheckout>();

    useEffect(() => {
        getGeneralCheckoutContent().then((data) => {
            setGeneralCheckoutContent(data[0]);
        })
    },[])

    return (
        <div className='flex flex-col px-4 py-6 md:p-6'>
            {/** communcation title and description*/}
            <div className='flex flex-col pb-4 lg:pb-6 '>
                <div className='text-mwTextParaBaseSemi lg:text-mwTextParaXLargeSemi text-left text-mwGrey-900 pb-1 lg:pb-2'>
                    {generalCheckoutContent?.generalCheckoutYourDetailsCommunicationHeading}
                </div>
                <div className='text-mwTextParaSmall lg:text-mwTextParaBase text-left text-mwGrey-600'>
                    {generalCheckoutContent?.generalCheckoutYourDetailsCommunicationSummary}
                </div>
            </div>

            {/** commnucation radio buttons */}
            <div className='flex flex-row justify-start items-center grid grid-cols-2 gap-[17px] lg:flex lg:flex-row lg:gap-6'>
                {/** Email radio button */}
                <div className='flex justify-start items-center'>
                    <MwebCheckbox
                        selectedKey={1}
                        isChecked={false}
                        disabled={false}
                        label='Email'
                        onStateChange={(newState) => console.log(`checkbox state changed to ${newState}`)}
                    />
                </div>
                {/** SMS radio button */}
                <div className='flex justify-start items-center'>
                    <MwebCheckbox
                        selectedKey={1}
                        isChecked={false}
                        disabled={false}
                        label='SMS'
                        onStateChange={(newState) => console.log(`checkbox state changed to ${newState}`)}
                    />
                </div>
                {/** Call radio button */}
                <div className='flex justify-start items-center'>
                    <MwebCheckbox
                        selectedKey={1}
                        isChecked={false}
                        disabled={false}
                        label='Call'
                        onStateChange={(newState) => console.log(`checkbox state changed to ${newState}`)}
                    />
                </div>
                {/** WHatsApp radio button */}
                <div className='flex justify-start items-center'>
                    <MwebCheckbox
                        selectedKey={1}
                        isChecked={false}
                        disabled={false}
                        label='WhatsApp'
                        onStateChange={(newState) => console.log(`checkbox state changed to ${newState}`)}
                    />
                </div>
            </div>
          
        </div>
    );
}
