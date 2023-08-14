import React from 'react';
import { useState } from 'react';
import MwebIcon from '@/components/ui/mwebIcon/MwebIcon';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';
interface IProps {
    editAction?: () => void;
    handleOnProceedBtnClick: () => void;
    annual?: number;
    monthly: number;
    onceOff: number;
    deliveryInstalation: number;
    buttonText: string;
    items: number;
    IsProceedDisabled: boolean
}
export default function MwebBottomSheet(props: IProps) {
    const {
        editAction,
        handleOnProceedBtnClick,
        monthly,
        annual,
        onceOff,
        deliveryInstalation,
        buttonText,
        items, IsProceedDisabled = true } = props
    const [isDropDown, setIsDropDown] = useState(false);

    const handleOnDropDownToggle = () => {
        setIsDropDown((isOpen) => !isOpen);
    };
const setDeliveryInstalation=()=>{
 return   deliveryInstalation===0?"Free": `R${deliveryInstalation}`
}
    return (
        <div id='tillSlip' className='fixed bottom-0 left-0 right-0 z-50 md:hidden'>
            <section className='py-[25px] px-4 flex flex-col gap-4 bg-mwBlueGrey-50 rounded-tl-2xl rounded-tr-2xl'>
                {/** ORDER SUMMARY */}
                <div className='flex flex-col gap-4'>
                    {/** DROP DOWN */}
                    <section className='flex justify-between items-center'>
                        <p className='text-mwTextParaSmallSemi'>
                            Items <span>({items})</span>
                        </p>
                        <button
                            className='focus:outline-none'
                            onClick={handleOnDropDownToggle}
                        >
                            {isDropDown ? (
                                <MwebIcon variant='functional' iconType={'chevron-down'} size={24} color='text-mwPrimary-900' />
                            ) : (
                                <MwebIcon variant='functional' iconType={'chevron-up'} size={24} color='text-mwPrimary-900' />
                            )}
                        </button>
                    </section>

                    {/** ORDER DETAILS */}
                    {isDropDown && (
                        <section className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <section className='flex justify-between items-center'>
                                    <p className='text-mwGrey-600 text-mwTextParaSmall'>
                                        {`Your ${annual&& monthly===0?"annual":"monthly"} total`}
                                    </p>
                                    <h4 className='text-mwGrey-900 text-mwTextParaSmallSemi'>
                                    {`R${annual && monthly===0? `${annual}pa`:`${monthly}pm`}`}
                                        
                                    </h4>
                                </section>
                                <section className='flex justify-between items-center'>
                                    <p className='text-mwGrey-600 text-mwTextParaSmall'>
                                        Your once-off total
                                    </p>
                                    <h4 className='text-mwGrey-900 text-mwTextParaSmallSemi'>
                                        {`R${onceOff}`}
                                    </h4>
                                </section>
                                <section className='flex justify-between items-center'>
                                    <p className='text-mwGrey-600 text-mwTextParaSmall'>
                                        Delivery and installation
                                    </p>
                                    <h4 className='text-mwGrey-900 text-mwTextParaSmallSemi'>
                                        {setDeliveryInstalation()}
                                    </h4>
                                </section>
                            </div>
                            <div className='self-start'>
                               {editAction&&
                                <MwebButton
                                btnText='Edit Order'
                                color='text-only'
                                size='small'
                                hasIcon={true}
                                iconProps={{ color: 'text-mwPrimary-900', icon: 'edit', iconPosition: 'left', size: 20, variant: 'basic' }}
                                isDisabled={false}
                                onClickFunction={editAction}
                            />}
                            </div>
                        </section>
                    )}
                </div>

                {/** BUTTON */}
                <div>
                    <MwebButton
                        btnText={buttonText}
                        color='primary'
                        size='medium'
                        hasIcon={true}
                        isFullWidth={true}
                        iconProps={{
                            color: 'text-white',
                            icon: 'lock',
                            iconPosition: 'left',
                            size: 20,
                            variant: 'basic',
                        }}
                        isDisabled={IsProceedDisabled}
                        onClickFunction={handleOnProceedBtnClick}
                    />
                </div>
            </section>
        </div>
    );
}
