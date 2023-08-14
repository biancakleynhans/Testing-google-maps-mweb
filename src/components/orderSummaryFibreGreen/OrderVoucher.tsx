import {voucher_part} from '@/components/orderSummaryFibreGreen/OrderSummaryMockData';
import styles from './OrderSummary.module.css';
import Link from 'next/link';
import React from "react";
import { IMainProduct,IAddedProduct,IContinueShopping,ITillSlip,IVoucher } from '@/models/OrderSummaryService';



//DO YOU HAVE A VOUCHER CODE?

export default function VoucherComponent(){

    return(
            <>
                {/* VOUCHER DIV */}
                {voucher_part.map((item, index)=>(
                <div key={index} className={'flex flex-col items-start lg:gap-2 gap-4  w-full  pb-[16px] pt-[16px] px-[16px] shadow-[0px_2px_15px_rgba(11,14,26,0.1)] flex-none order-1 self-stretch grow-0 bg-[#FFFFFF]'}>
                    <h3 className={'not-italic font-semibold lg:text-base text-base leading-15 flex items-center tracking-[-0.01em] text-black flex-none order-none self-stretch grow-0'}>{item.voucher_title}</h3>
                    <div className={'box-border flex flex-row justify-between items-center lg:gap-2.5 gap-10 border flex-none order-1 self-stretch grow-0  py-[16px] px-[16px] border-solid border-[#F1F1F2] bg-[#F9F9F9]'}>
                        <input className={'flex flex-col justify-end items-start not-italic font-normal leading-15 flex items-center tracking-[-0.01em] text-[#646464] flex-none order-none grow-0 p-0 bg-[#F9F9F9]'} placeholder={item.placeholder}>
                            
                        </input>
                        <button className={'flex flex-row justify-center items-center gap-2.5 flex-none order-1 grow-0 bg-black'}>
                            <h4 className={'not-italic font-semibold text-xs leading-4 flex items-center text-center uppercase text-white flex-none p-2 order-none grow-0'}>{item.Apply}</h4>
                        </button>
                    </div>
                </div>
            

                ))}

            </>
    
        )
}

