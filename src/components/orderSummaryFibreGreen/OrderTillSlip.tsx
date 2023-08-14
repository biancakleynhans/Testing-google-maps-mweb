import {tillSlip} from '@/components/orderSummaryFibreGreen/OrderSummaryMockData';
import styles from './OrderSummary.module.css';
import Link from 'next/link';
import React from "react";
import {MdDeleteOutline,MdLockOutline} from 'react-icons/md'
import { IMainProduct,IAddedProduct,IContinueShopping,ITillSlip,IVoucher } from '@/models/OrderSummaryService';
import VoucherComponent from './OrderVoucher'
import {useRouter} from "next/navigation";
import MwebIcon from "@/components/ui/mwebIcon/MwebIcon";
// ORDER SLIP COMPONENT

export default function OrderTillSlip(){
    const router = useRouter();
    const onProceedClick = () => {
        router.push('/fibre/checkout/your-details');
    }

    return(
        
        <>

        {tillSlip.map((slipItem,index)=>(

            <div key={index} className='flex flex-col  items-start gap-4 flex-none order-1 grow-0 pr-12'>
            {/* ORDER SUMMARY */}
            <div className='flex flex-col items-start gap-6  flex-auto order-none grow p-0 shadow-md'>
                {/* tillSlip */}
                <div className='flex flex-col  items-center flex-auto order-none grow p-0'>

                    <div className='flex flex-row justify-center gap-2.5 text-center order-none pt-2 pb-[5px] px-4 bg-[#646464] '>
                        
                        <h2 className='not-italic font-semibold text-base leading-[19px] px-28 flex items-center text-center uppercase text-white flex-none order-none grow-0'>
                            {slipItem.slip_heading}
                        </h2>

                    </div>

                    {/* card order sllip */}

                    <div className='flex flex-col items-start  gap-4 flex-none order-1 grow-0 p-8 rounded-none bg-[FFFFFF]'>

                        <div className='flex flex-col items-start gap-4 flex-none  order-none self-stretch grow p-0'>
                            {/* breakdown not done */}
                            <div className='flex flex-col items-start gap-2 flex-none order-none self-stretch grow p-0'>

                                <div className='flex flex-col items-start self-stretch  flex-none order-none grow-0 p-0'>

                                    {/* gap edit rememebr */}
                                    <div className='flex flex-row justify-between gap-8  self-stretch order-none grow-0 p-0 '>
                                        <div className='not-italic font-semibold text-base leading-15 flex items-center tracking-[-0.01em] text-black flex-none order-none grow-0 '>
                                            {slipItem.monthly_total_title}
                                        </div>
                                        <div className='not-italic font-semibold text-xl leading-15 flex items-center text-right text-black pl-20 flex-none order-1 grow-0 '>
                                            {slipItem.monthly_total}
                                        </div>
                                    </div>

                                </div>

                                <div className='flex flex-row justify-between items-center  flex-none order-1 self-stretch grow-0 p-0 '>
                                    <h3 className='not-italic font-semibold text-base leading-15 flex items-center tracking-[-0.01em] text-black flex-none order-none grow-0 top-0.5'>
                                        {slipItem.once_off_total_title}
                                    </h3>
                                    <h3 className='not-italic font-semibold text-xl leading-15 flex items-center pl-20 text-right text-black flex-none order-1 grow-0'>
                                        {slipItem.once_off_total}
                                    </h3>
                                </div>

                                
                                <div className='flex flex-row items-start justify-between flex-none order-2  self-stretch grow-0 p-0'>
                                    <div className='flex flex-row justify-between items-center flex-none order-none self-stretch grow-0 p-0'>
                                        <h3 className='not-italic font-semibold text-base leading-15 flex items-center tracking-[-0.01em] text-black flex-none order-none grow-0'>
                                        {slipItem.delivery_installation_title}
                                        </h3>
                                        <h3 className='not-italic font-semibold text-xl leading-15 pl-20 flex items-center text-right text-black flex-none order-1 grow-0'>
                                        {slipItem.Delivery_installation}
                                        </h3>
                                    </div>
                                </div>

                            </div>

                            {/* CTA */}
                            <div className='flex flex-col items-start gap-2  flex-none order-1 self-stretch grow-0 p-0'>

                                <div className='box-border flex flex-row justify-center items-end gap-2 border flex-none order-1 self-stretch grow-0 py-[11px] px-6 border-solid border-black bg-black'>
                                    <div className='flex flex-col justify-center items-center gap-2 w-[182px] h-6 flex-none order-none grow-0 p-0 bg-black'>
                                        <button  className='flex flex-row items-start gap-2 flex-none order-none grow-0 p-0' onClick={onProceedClick}>
                                            <div className='h-5 flex-none order-none grow-0'>

                                                <div className='text-white pt-[4px]'>
                                                    <MwebIcon color={'text-white'} size={20} iconType={'lock'} variant={'basic'} />
                                                </div>
                                            </div>
                                           <h4 className=' h-6 not-italic font-semibold text-base leading-[150%] flex items-center text-white flex-none order-1 grow-0 left-7'>{slipItem.proceed_title}</h4>

                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <VoucherComponent />
            
        </div>
        ))}
        </>
    )
}
