'use client';

import { useState } from 'react';

import { FaLock } from 'react-icons/fa';
import SecurityVerification from '@/components/auth/SecurityVerification';
import { useNavContext } from '@/context/NavigationContext';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';

interface iProps {
    buttonTitle: string;
    isButtonDisabled: boolean;
    handleOnButtonClick: () => void;
}

export default function OrderSummary(props: iProps) {
    const { handleCurrActiveStep } = useNavContext();

    const [isSecurityVerificationPopUpOpen, setIsSecurityVerificationPopUpOpen] =
        useState<boolean>(false); // controlled by the parent component

    /***
     *
     */
    const onEditOrderClick = () => {
        setIsSecurityVerificationPopUpOpen((status) => !status);
        //handleCurrActiveStep('next');
    };

    /**
     * Is user verfied
     */
    const proceedToCheckOut = () => {
        props.handleOnButtonClick();
    };

    return (
        <div>
            <section id='' className='drop-shadow-tillslip'>
                {/** Hero Tag Line */}
                <div className='text-white text-center bg-mwLightTeal-900 pt-2 pb-[7px] rounded-tl-2xl rounded-tr-2xl'>
                    <p className='text-mwCaptionLarge uppercase'>Order Summary</p>
                </div>

                {/** Card */}
                <div
                    id=''
                    className='bg-mwBlueGrey-25 flex flex-col gap-4 md:p-6 rounded-bl-2xl rounded-br-2xl'
                >
                    <section className='flex justify-between'>
                        <p className='text-mwTextParaBase text-mwGrey-600'>
                            Your monthly total
                        </p>
                        <p className='text-black text-mwTextParaBaseSemi'>R499</p>
                    </section>
                    <section className='flex justify-between'>
                        <p className='text-mwTextParaBase text-mwGrey-600'>
                            Your once-off total
                        </p>
                        <p className='text-black text-mwTextParaBaseSemi'>R0</p>
                    </section>
                    <section className='flex justify-between'>
                        <p className='text-mwTextParaBase text-mwGrey-600'>
                            Delivery and installation
                        </p>
                        <p className='text-black text-mwTextParaBaseSemi'>R0</p>
                    </section>

                    <button
                        onClick={proceedToCheckOut}
                        className={`text-white flex justify-center items-center gap-2 py-[11px]  
                        ${props.isButtonDisabled ? 'bg-mwgray-400' : 'bg-black'}`}
                        disabled={props.isButtonDisabled}
                    >
                        <FaLock className='h-4 w-4' />
                        <p className='text-base font-semibold'>{props.buttonTitle}</p>
                    </button>
                    <MwebButton
                        isDisabled={false}
                        size='small'
                        color='primary'
                        btnText='Proceed To Checkout'
                        hasIcon={false}
                        onClickFunction={() => {}}
                    />
                </div>
            </section>

            <div className='pt-6'>
                <button
                    onClick={() => handleCurrActiveStep('back')}
                    className='flex justify-start items-center gap-2'
                >
                    <svg
                        width={20}
                        height={20}
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='flex-grow-0 flex-shrink-0 w-5 h-5 relative'
                        preserveAspectRatio='xMidYMid meet'
                    >
                        <path
                            d='M2.5 14.3768V17.5018H5.625L14.8417 8.28516L11.7167 5.16016L2.5 14.3768ZM17.8417 5.28516L14.7167 2.16016L12.6083 4.27682L15.7333 7.40182L17.8417 5.28516Z'
                            fill='black'
                        />
                    </svg>
                    <p className='text-base font-semibold text-left text-black underline'>
                        Edit order
                    </p>
                </button>
            </div>

            {isSecurityVerificationPopUpOpen && (
                <>
                    <SecurityVerification
                        isOpen={isSecurityVerificationPopUpOpen}
                        onClose={onEditOrderClick}
                    />
                </>
            )}

            <br />
            <br />
        </div>
    );
}