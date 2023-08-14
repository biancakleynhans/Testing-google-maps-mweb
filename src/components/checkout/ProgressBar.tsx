'use client';

import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import { useSelectedLayoutSegment } from 'next/navigation';

/**
 *
 * @returns
 */
export default function CheckoutProgressBar() {
    // get router details
    const routeSegement = useSelectedLayoutSegment();
    console.log('segment:', routeSegement);

    return (
        <div className='flex justify-center items-center  gap-1 px-4 pt-2 pb-4   md:gap-8'>
            <div className='flex justify-start items-center  gap-1 md:gap-x-8'>
                <div className='flex justify-start items-start gap-2.5'>
                    <Link href='/fibre/checkout/your-details'>
                        <p
                            className={`text-xs font-semibold text-right md:text-base md:tracking-tight ${
                                routeSegement === 'your-details'
                                    ? 'text-black'
                                    : 'text-[#646464]'
                            }`}
                        >
                            Your Details
                        </p>
                    </Link>
                </div>
                <FaChevronRight className='w-[10px] h-[10px] md:w-[17px] md:h-[17px] text-gray-700' />
            </div>

            <div className='flex justify-start items-center  gap-1 md:gap-x-8'>
                <div className='flex justify-start items-start gap-2.5'>
                    <Link href='/fibre/checkout/address-and-delivery'>
                        <p
                            className={`text-xs font-semibold text-right md:text-base md:tracking-tight ${
                                routeSegement === 'address-and-delivery'
                                    ? 'text-black'
                                    : 'text-[#646464]'
                            }`}
                        >
                            Address &amp; Delivery
                        </p>
                    </Link>
                </div>
                <FaChevronRight className='w-[10px] h-[10px] md:w-[17px] md:h-[17px] text-gray-400' />
            </div>

            <div className='flex justify-start items-start gap-2.5'>
                <Link href='/fibre/checkout/payment'>
                    <p
                        className={`text-xs font-semibold text-right  md:text-base md:tracking-tight ${
                            routeSegement === 'payment' ? 'text-black' : 'text-[#646464]'
                        }`}
                    >
                        Payment
                    </p>
                </Link>
            </div>
        </div>
    );
}
