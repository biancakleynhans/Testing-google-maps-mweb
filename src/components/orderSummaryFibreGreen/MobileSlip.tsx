import React from 'react';
import {
    MdDeleteOutline,
    MdLockOutline,
    MdExpandMore,
    MdExpandLess,
    MdModeEditOutline,
} from 'react-icons/md';
import { useState } from 'react';
import { tillSlip } from './OrderSummaryMockData';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';

export default function MobileSlip() {
    const [showOrderSlip, setShowOrderSlip] = useState(false);

    const handleClick = () => {
        setShowOrderSlip(!showOrderSlip);
    };

    return (
        <>
            {tillSlip.map((sItem, idx) => (
                <div
                    key={idx}
                    className='fixed flex flex-col lg:hidden z-50 h-auto bottom-0 w-full'
                >
                    <div className='flex flex-col bottom-0 ml-0 bg-[#F1F1F2] z-50 p-4  h-auto top-auto gap-[16px]'>
                        <div
                            className='flex flex-row  h-[24px] justify-between items-center  cursor-pointer'
                            onClick={handleClick}
                        >
                            <span className='flex flex-row w-[295px] h-[21px] mt-[1.5px] text-s font-normal '>
                                {sItem.items} ({' '}
                                <span className='font-normal text-base'>
                                    {' '}
                                    {sItem.two}{' '}
                                </span>{' '}
                                )
                            </span>

                            <div className='w-[24px] h-[24px] mt-[8px] cursor-pointer'>
                                {!showOrderSlip && (
                                    <MdExpandLess size='24px' className='' />
                                )}
                                {showOrderSlip && (
                                    <MdExpandMore size='24px' className='' />
                                )}
                            </div>
                        </div>
                        {/* checkout button */}
                        <div className='flex flex-col items-start gap-2  order-1 self-stretch grow-0 p-0 left-6 top-[146px] '>
                            <MwebButton
                                isFullWidth
                                color='primary'
                                iconProps={{
                                    variant: 'basic',
                                    color: 'text-white',
                                    icon: 'lock',
                                    size: 20,
                                    iconPosition: 'left',
                                }}
                                size='medium'
                                btnText={sItem.proceed_title}
                                hasIcon={true}
                                onClickFunction={() => {}}
                                isDisabled={false}
                            />
                        </div>

                        {/*ORDER SLIP MOBILE*/}
                        {showOrderSlip && (
                            <div className='flex flex-col items-start gap-2 lg:hidden order-none self-stretch grow-0 p-0'>
                                <div className='flex flex-col items-start order-none grow-0 p-0 self-stretch '>
                                    <div className='flex flex-row justify-between items-center order-1 self-stretch grow-0 p-0 w-full'>
                                        <h3 className='not-italic font-semibold text-sm leading-[160%] flex items-center tracking-[-0.01em] text-black  order-none grow-0 top-0.5'>
                                            {sItem.monthly_total_title}
                                        </h3>
                                        <h3 className='font-semibold text-base leading-[150%] flex items-center text-right text-black order-1 grow-0'>
                                            {sItem.monthly_total}
                                        </h3>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between items-center gap-4 order-1 self-stretch grow-0 p-0'>
                                    <h3 className='font-semibold text-sm leading-[160%] flex items-center tracking-[-0.01em] text-black  order-none grow-0 top-0.5'>
                                        {sItem.once_off_total_title}
                                    </h3>
                                    <h3 className='font-semibold text-base leading-[150%] flex items-center text-right text-black order-1 grow-0'>
                                        {sItem.once_off_total}
                                    </h3>
                                </div>

                                <div className='flex flex-col items-start gap-2 order-2 grow-0 p-0  self-stretch'>
                                    <div className='flex flex-row justify-between items-center gap-4order-none grow-0 p-0 self-stretch'>
                                        <h3 className='not-italic font-semibold text-sm leading-[160%] flex items-center tracking-[-0.01em] text-black  order-none grow-0 top-0.5'>
                                            {sItem.delivery_installation_title}
                                        </h3>
                                        <h3 className='font-semibold text-base leading-[150%] flex items-center text-right text-black  order-1 grow-0 '>
                                            {sItem.Delivery_installation}
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    className='flex flex-row items-start gap-1  h-[20px] pb-[10px] order-2 grow-0 p-0 top-[20px] cursor-pointer'
                                    onClick={() => {}}
                                >
                                    <div className='w-[16px] h-[16px] mt-[0.25px]'>
                                        <MdModeEditOutline className='mt-[4px] text-sm' />
                                    </div>
                                    <h4 className='text-sm w-max font-semibold underline'>
                                        {sItem.edit_order}
                                    </h4>
                                </div>
                            </div>
                        )}

                        {/* mobile OrderSlip end */}
                    </div>
                </div>
            ))}
        </>
    );
}
