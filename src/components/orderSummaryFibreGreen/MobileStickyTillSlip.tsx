import React from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useState } from 'react';
import MwebButton from '../ui/mwebButtons/MwebButtonMain';
import MwebIcon from '../ui/mwebIcon/MwebIcon';

export default function TillSlip({
    handleOnEditOrderBtnClick,
    handleOnProceedToOrderBtnClick,
}: {
    handleOnEditOrderBtnClick: () => void;
    handleOnProceedToOrderBtnClick: () => void;
}) {
    const [isDropDown, setIsDropDown] = useState(false);

    const handleOnDropDownToggle = () => {
        setIsDropDown((isOpen) => !isOpen);
    };

    return (
        <div id='tillSlip' className='fixed bottom-0 left-0 right-0 z-50 md:hidden'>
            <section className='py-[25px] px-4 flex flex-col gap-4 bg-mwBlueGrey-50 rounded-tl-2xl rounded-tr-2xl'>
                {/** ORDER SUMMARY */}
                <div className='flex flex-col gap-4'>
                    {/** DROP DOWN */}
                    <section className='flex justify-between items-center'>
                        <p className='text-mwTextParaSmallSemi'>
                            Items <span>(2)</span>
                        </p>
                        <button
                            className='focus:outline-none'
                            onClick={handleOnDropDownToggle}
                        >
                            {isDropDown ? (
                                <MdExpandLess className='h-6 w-6 text-mwPrimary-900' />
                            ) : (
                                <MdExpandMore className='h-6 w-6 text-mwPrimary-900' />
                            )}
                        </button>
                    </section>

                    {/** ORDER DETAILS */}
                    {isDropDown && (
                        <section className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <section className='flex justify-between items-center'>
                                    <p className='text-mwGrey-600 text-mwTextParaSmall'>
                                        Your monthly total
                                    </p>
                                    <h4 className='text-mwGrey-900 text-mwTextParaSmallSemi'>
                                        R499pm
                                    </h4>
                                </section>
                                <section className='flex justify-between items-center'>
                                    <p className='text-mwGrey-600 text-mwTextParaSmall'>
                                        Your once-off total
                                    </p>
                                    <h4 className='text-mwGrey-900 text-mwTextParaSmallSemi'>
                                        R0
                                    </h4>
                                </section>
                                <section className='flex justify-between items-center'>
                                    <p className='text-mwGrey-600 text-mwTextParaSmall'>
                                        Delivery and installation
                                    </p>
                                    <h4 className='text-mwGrey-900 text-mwTextParaSmallSemi'>
                                        FREE
                                    </h4>
                                </section>
                            </div>
                            <div className='self-start'>
                                <button
                                    onClick={handleOnEditOrderBtnClick}
                                    className='flex items-center gap-2'
                                >
                                    <MwebIcon
                                        iconType='pencil'
                                        variant='basic'
                                        size={12}
                                        color='text-mwPrimary-900'
                                    />
                                    <p className='text-mwPrimary-900 text-mwTextParaSmallSemi'>
                                        Edit Order
                                    </p>
                                </button>
                            </div>
                        </section>
                    )}
                </div>

                {/** BUTTON */}
                <div>
                    <MwebButton
                        btnText='Proceed To Checkout'
                        color='primary'
                        size='medium'
                        hasIcon={true}
                        isFullWidth={true}
                        iconProps={{
                            color: 'text-white',
                            icon: 'lock',
                            iconPosition: 'left',
                            size: 0,
                            variant: 'basic',
                        }}
                        isDisabled={false}
                        onClickFunction={handleOnProceedToOrderBtnClick}
                    />
                </div>
            </section>
        </div>
    );
}
