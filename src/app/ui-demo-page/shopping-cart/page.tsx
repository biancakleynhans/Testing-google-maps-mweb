'use client';
import CardOrderSummary from '@/components/ui/mwebCard/CardOrderSummary';
import { iOrderSummaryCardDetails, iVoucherCardDetails } from '@/components/ui/mwebCard/CardStyles';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import useCheckoutProcess from '@/hooks/useCheckoutProcess';
import { useEffect } from 'react';

export default function Page() {
    const {
        tillSlipCharges,
        routersFromSession,
        vasProductsFromSession,
        primaryProductFromSession,

        onPrimaryProductAdd,
        addProductToShoppingCart,
        removeProductFromShoppingCart,
    } = useCheckoutProcess();

    // products used to simulate checkout
    const primaryProduct = {
        productCode: 'MTN-LTE-10MBPS-UNC-ROUTER-MAY23',
        promoCode: 'LTE-MTN-FREE-UPS',
    };
    const RouterA = {
        productCode: 'LTE-MTN-ROUTER-ZTEMF286C1-PROMO-OCT22-12MONTHS',
        promoCode: 'LTE-MTN-ROUTER-ZTEMF286C1-12MONTH-OCT22-INSTALLMENT',
    };
    const RouterB = {
        productCode: 'LTE-MTN-ROUTER-ZTEMF286C1-PROMO-OCT22-24MONTHS',
        promoCode: 'LTE-MTN-ROUTER-ZTEMF286C1-24MONTH-OCT22-INSTALLMENT',
    };
    const VasProduct = {
        productCode: 'HARDWARE-MINIUPS-ISPRODUCT',
        promoCode: 'HARDWARE-MINIUPS-NETOGY-IS',
    };

    console.log('primaryProductFromSession:', primaryProductFromSession);

    return (
        <MwebSliceContainer sectionId='shopping-cart-demo' padding='desktop:p-20'>
            <section className='flex justify-center'>
                <div className='w-8/12 flex flex-col gap-8 '>
                    <button
                        className='border px-10 py-3 rounded-md ring'
                        onClick={() => {
                            onPrimaryProductAdd(primaryProduct);
                        }}
                    >
                        <p className='text-gray-900'> Add Primary product</p>
                        <span className='block text-sm '>{JSON.stringify(primaryProduct)}</span>
                    </button>

                    <div className='grid grid-cols-6 space-x-2'>
                        <button
                            className='border px-10 py-3 rounded-md col-span-4 ring-2 ring-purple-200'
                            onClick={() => {
                                addProductToShoppingCart(RouterA);
                            }}
                        >
                            <p className='text-purple-500 border-b py-2'> Add Router x 12 monts</p>
                            <span className='text-sm text-gray-600'>{JSON.stringify(RouterA)}</span>
                        </button>
                        <button
                            className='border px-10 py-3 rounded border-red-500 col-span-2'
                            onClick={() => {
                                removeProductFromShoppingCart(RouterA);
                            }}
                        >
                            Remove Router x12
                        </button>
                    </div>

                    <div className='grid grid-cols-6 space-x-2'>
                        <button
                            className='border px-10 py-3 rounded-md col-span-4  ring-2 ring-purple-200'
                            onClick={() => {
                                addProductToShoppingCart(RouterB);
                            }}
                        >
                            <p className='text-purple-500 border-b py-2'> Add Router x 24 monts</p>
                            <span className='text-sm text-gray-600'>{JSON.stringify(RouterB)}</span>
                        </button>
                        <button
                            className='border px-10 py-3 rounded border-red-500 col-span-2'
                            onClick={() => {
                                removeProductFromShoppingCart(RouterB);
                            }}
                        >
                            Remove Router x12
                        </button>
                    </div>

                    <div className='grid grid-cols-6 space-x-2'>
                        <button
                            className='border px-10 py-2 rounded-md col-span-4  ring-2 ring-purple-200'
                            onClick={() => {
                                addProductToShoppingCart(VasProduct);
                            }}
                        >
                            <p className='text-purple-500 border-b pb-2'> Add VasProduct</p>
                            <span className='text-sm text-gray-600'>{JSON.stringify(VasProduct)}</span>
                        </button>
                        <button
                            className='border px-10 py-2 rounded border-red-500 col-span-2'
                            onClick={() => {
                                removeProductFromShoppingCart(VasProduct);
                            }}
                        >
                            Remove VasProduct
                        </button>
                    </div>
                </div>
            </section>

            <p className='py-4'>Real time experience</p>

            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-7'>
                    <section className='border ring rounded-md p-4 tracking-[-0.01em]'>
                        {/** primary Product */}
                        {primaryProductFromSession?.productCode !== null ? (
                            <div className=''>
                                <section className='flex justify-between'>
                                    <p>{primaryProductFromSession?.friendlyName}</p>
                                    <p className='text-lg'>R {primaryProductFromSession?.displayPrice}</p>
                                </section>
                                <ul className='pl-4 flex flex-col text-sm'>
                                    {primaryProductFromSession?.highlights?.map((item: string) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>Empy session</p>
                        )}

                        {/** routers */}
                        <ul className='py-10 flex flex-col space-y-2'>
                            {routersFromSession?.map((router, index) => (
                                <li key={router.name}>
                                    <div className='flex justify-between'>
                                        <p> {router.name}</p>
                                        <p className='text-lg'>R {router.price}</p>
                                    </div>

                                    <div className='pl-4 flex flex-col text-sm'>
                                        {router?.highlights?.map((item: string) => (
                                            <section key={item}>{item}</section>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/** vas */}
                        <ul>
                            {vasProductsFromSession?.map((vasProduct, index) => (
                                <li key={vasProduct.name} className=''>
                                    <div className='flex justify-between'>
                                        <p> {vasProduct.name}</p>
                                        <p className='text-lg'>R {vasProduct.price}</p>
                                    </div>

                                    <div className='pl-4 flex flex-col text-sm'>
                                        {vasProduct?.highlights.map((item: string) => (
                                            <section key={item}>{item}</section>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className='col-span-4'>
                    <CardOrderSummary
                        onClickCallback={() => {}}
                        size='large'
                        cardDetails={
                            {
                                btnLabel: ' ',
                                orderDetails: {
                                    deliveryInstalation: 'FREE',
                                    monthly: tillSlipCharges?.monthlyCharges,
                                    onceOff: tillSlipCharges?.onceOffCharges,
                                },

                                hasVoucher: true,
                                isDisabled: false,
                                showEdit: false,
                                hasIcon: true,
                                iconProps: {
                                    color: '',
                                    icon: 'lock',
                                    iconPosition: 'left',
                                    size: 20,
                                    variant: 'basic',
                                },
                                voucherProps: {
                                    btnLabel: 'Apply',
                                    inputValue: 'BLA',
                                    placeholderText: 'Enter your code',
                                    onClickCB: (val) => {
                                        console.log('Voucher value is ', val);
                                    },
                                },
                            } as iOrderSummaryCardDetails
                        }
                    />
                </div>
            </div>
        </MwebSliceContainer>
    );
}
