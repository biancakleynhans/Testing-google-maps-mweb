'use client';
import MwebIndicator, {
    IndicatorProps,
} from '@/components/ui/mwebIndicators/MwebIndicator';
import MwebIcon from "@/components/ui/mwebIcon/MwebIcon";
import React from "react";

const ListItem = ({
    isOnceOff,
    isMonthly,
    productName,
    productPrice,
    promotionalText,
    onProductRemove,
    canRemoveProduct,
    indicator,
    onTermsAndConditionsButtonClick,
}: {
    isOnceOff?: boolean;
    isMonthly?: boolean;
    productName: string;
    productPrice: any;
    promotionalText?: string;
    canRemoveProduct?: boolean;
    onProductRemove: () => void;
    indicator?: IndicatorProps;
    onTermsAndConditionsButtonClick: () => void;
}) => {
    return (
        <section className='flex flex-col'>
            <div className='flex flex-col gap-1.5 py-4 md:gap-2 md:py-6 border-t border-r-0 border-b-0 border-l-0 border-[#d2d8e7]'>
                {/** PRODUCT NAME,PRICE and DELETE Button  */}
                <section
                    id='productNameAndPrice'
                    className='flex justify-between items-center'
                >
                    <h4
                        id='productPrice'
                        className='text-mwGrey-900 text-mwTextParaSmallSemi md:text-mwTextParaBaseSemi'
                    >
                        {productName}
                    </h4>
                    <div
                        id='productPriceAndDeleteButton'
                        className='flex items-center gap-2'
                    >
                        <h4
                            id='productPrice'
                            className='text-mwGrey-900 text-mwTextParaSmallSemi md:text-mwTextParaBaseSemi'
                        >
                            {productPrice==="Free"? productPrice: `R${productPrice}pm`}
                           
                        </h4>
                        {canRemoveProduct && (
                                <button id='deleteButton' onClick={() => onProductRemove()}>
                                <MwebIcon color={'text-mwGrey-400'} size={20} iconType={'remove'} variant={'basic'} />
                            </button>
                        )}
                    </div>
                </section>

                {/** PAYMENT TERMS and CONDITIONS and SAVINGS  */}
                <section id='paymentTermsAndConditions' className='flex flex-col gap-1'>
                    {/** PAYMENT TERMS and SAVINGS Text */}
                    <div className='flex justify-between items-center gap-2'>
                        <h5 className='text-mwGrey-600 text-mwTextParaXSmall md:text-mwTextParaSmall'>
                            Payment term: {`${isMonthly? "Monthly":"Once-off" }`}
                        </h5>

                        {promotionalText && (
                            <p className='text-mwLightTeal-900 text-mwTextParaXSmallSemi'>
                                {promotionalText}
                            </p>
                        )}
                    </div>
                    {/** TERMS & CONDITIONS and PoweredBy Indicator */}
                    <div className='flex justify-between items-center gap-2'>
                        <button
                            onClick={onTermsAndConditionsButtonClick}
                            className='text-mwTextLinkXSmall text-left text-mwPrimary-900'
                        >
                            Terms &amp; Conditions
                        </button>

                        {indicator && (
                            <MwebIndicator
                                type={indicator.type}
                                size={indicator.size}
                                label={indicator.label}
                            />
                        )}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default ListItem;
