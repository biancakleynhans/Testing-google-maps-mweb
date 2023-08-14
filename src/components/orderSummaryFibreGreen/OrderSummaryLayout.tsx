'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import CardOrderSummary from '../ui/mwebCard/CardOrderSummary';
import { iOrderSummaryCardDetails, iVoucherCardDetails } from '../ui/mwebCard/CardStyles';
import MwebListItem from '@/components/ui/mwebList/MwebListItem';
import MwebCard from '@/components/ui/mwebCard/MwebCard';
import MwebBottomSheet from '../ui/mwebBottomSheet/MwebBottomSheet';
import MwebIcon from '@/components/ui/mwebIcon/MwebIcon';
import { useClientJourney } from '@/context/ClientJourneyContext';
import { useNavContext } from '@/context/NavigationContext';
import { IGeneralCheckout, getGeneralCheckoutContent } from '@/services/GeneralCheckoutService';
import { AnalyticsService } from '@/services/analyticsService';
import useCheckoutProcess from '@/hooks/useCheckoutProcess';
import MwebSliceContainer from '../shared/MwebSliceContainer';
import MwebButton from '../ui/mwebButtons/MwebButtonMain';
import MwebIconIllustration from '../ui/mwebIcon/MwebIconIllustration';

// TODO: unused files: need to be remove but at the moment other pages depend on them
// import OrderTillSlip from '@/components/orderSummaryFibreGreen/OrderTillSlip';
// import OrderVoucher from '@/components/orderSummaryFibreGreen/OrderVoucher';
// import Footer from '@/components/footer/index';
// import OrderSummary from '@/components/checkout/OrderSummary';
// import Jumpotron from '@/components/checkout/Jumpotron';
// import MwebCard from '../ui/mwebCard/MwebCard';

/**
 *  Display selected products i.e
 *   routers, recommended vas products and fibre product
 *
 */

//ORDER SUMMARY PAGE
function OrderSummaryDesktop() {
    const router = useRouter();
    const pathName = usePathname();
    const rootPath = pathName?.split('/')[1];

    const [generalCheckoutContent, setGeneralCheckoutContent] = useState<IGeneralCheckout>();

    useEffect(() => {
        getGeneralCheckoutContent().then((data) => {
            setGeneralCheckoutContent(data[0]);
        });
    }, []);

    const { handleCurrActiveStep } = useNavContext();
    const {
        routersFromSession,
        vasProductsFromSession,
        tillSlipCharges,
        primaryProductFromSession,
        removeProductFromShoppingCart,
    } = useCheckoutProcess();

    // simulate products added
    const [productsGroup, setProductsGroup] = useState<any[]>([]);
    /**
    *  const oldProductsGroup = [
        {
            id: '1928282',
            productsGroupName: 'Connectivity Solution',
            productsItems: [
                {
                    id: 'ksnks12928',
                    productName: '25 Mbps Uncapped Fibre',
                    productPrice: 499,
                    isMonthly: true,
                    isOnceOff: false,
                    provider: {
                        name: 'Powered by Openserve',
                    },
                },
                {
                    id: '102892',
                    productName: 'Zyxel EMG 3525 Router',
                    productPrice: 'Free',
                    isMonthly: false,
                    isOnceOff: true,
                    promotionalText: 'You saved R699',
                },
            ],
        },
    ];
    */

    // get selected products from the client i.e Fibre,routers,recommended vas products
    // TODO: read from the basket
    const { recommendedVasProducts, selectedProduct } = useClientJourney();
    const analyticsService = new AnalyticsService();
    const [ranOnce, setRanOnce] = useState(false);

    useEffect(() => {
        // Build products
        let productItems: any[] = [];

        let productsGroupAPI: any = [
            {
                id: '1019isus',
                productsGroupName: 'Connectivity Solution',
                productsItems: [],
            },
        ];

        // pack all selected fibre products
        if (primaryProductFromSession) {
            console.log('primaryProductFromSession:', primaryProductFromSession);

            productItems.push({
                id: '109190181',
                productName: primaryProductFromSession.productDisplayName,
                productPrice: primaryProductFromSession.productRate,
                isMonthly: primaryProductFromSession.chargePeriod === 'Monthly', // boolean
                isOnceOff: primaryProductFromSession.chargePeriod !== 'Monthly',
                promotionalText: primaryProductFromSession.highlight1,
                canRemoveProduct: false,
                promoCode: primaryProductFromSession.promoCode,
                productCode: primaryProductFromSession.productCode,
                provider: {
                    name: primaryProductFromSession.subcategory,
                },
            });
        }

        // pack all selected routers
        if (routersFromSession) {
            routersFromSession.forEach((router: any) => {
                productItems.push({
                    id: router.id,
                    productName: router.name,
                    productPrice: router.price,
                    isMonthly: router.chargePeriod === 'Monthly',
                    isOnceOff: router.chargePeriod !== 'Monthly',
                    canRemoveProduct: true,
                    promotionalText: router.tagLine,
                    promoCode: router.promoCode,
                    productCode: router.productCode,
                });
            });
        }

        // pack all selected recommended products
        if (vasProductsFromSession) {
            vasProductsFromSession.forEach((vasProduct: any) => {
                productItems.push({
                    id: vasProduct.id,
                    productName: vasProduct.name,
                    productPrice: vasProduct.price,
                    isMonthly: vasProduct.chargePeriod === 'Monthly',
                    isOnceOff: vasProduct.chargePeriod !== 'Monthly',
                    promotionalText: vasProduct.tagLine,
                    canRemoveProduct: true,
                    promoCode: vasProduct.promoCode,
                    productCode: vasProduct.productCode,
                    provider: {
                        name: `POWERED BY ${vasProduct.subcategory}`,
                    },
                });
            });
        }
        // analyticsService.pushViewCartGA4Tracking(productItems);

        // update productGroup List
        productsGroupAPI[0].productsItems = productItems;
        if (productItems.length > 0 && !ranOnce) {
            analyticsService.pushViewCartGA4Tracking(productsGroupAPI[0]?.productsItems);
            setRanOnce(true);
        }

        //
        setProductsGroup(productsGroupAPI);
    }, [recommendedVasProducts, selectedProduct, routersFromSession, vasProductsFromSession, primaryProductFromSession]);

    const [isEmptyCart, setIsEmptyCart] = useState(false);

    // remove productGroup Item
    const handleOnProductGroupItemRemove = (productGroupItem: any) => {
        // filter out productGroup item whose id is not the same as the passed productGroupItem
        const updatedProductsGroup = [...productsGroup].filter((item) => item.id !== productGroupItem.id);
        setProductsGroup(updatedProductsGroup);
        setIsEmptyCart(true);
    };

    // remove selected product from the productsGroup list
    const handleOnProductRemove = (productGroupItemIdx: number, product: any) => {
        removeProductFromShoppingCart(product);
        analyticsService.pushRemoveProductFromCartGA4Tracking(product);
    };

    // navigate to the next step of Fibre Green Journey after Procced To Order button click
    const handleOnProceedToOrderBtnClick = () => {
        analyticsService.pushBeginCheckoutGA4Tracking(productsGroup[0].productsItems);
        handleCurrActiveStep('next');
    };

    if (isEmptyCart) {
        return (
            <MwebSliceContainer sectionId='empty-cart-ui' padding='px-4 md:p-16'>
                <section className='flex flex-col gap-24'>
                    <div className='flex flex-col items-center desktop:gap-10'>
                        <h2 className='text-mwTextDeskH3Bold'>Your cart is Empty</h2>
                        <MwebButton
                            isFullWidth={false}
                            color='primary'
                            size='medium'
                            btnText='Back Home'
                            hasIcon={false}
                            isDisabled={false}
                            onClickFunction={() => {
                                router.push('/fibre');
                            }}
                        />
                    </div>

                    <div className='border-t-2 flex flex-col md:gap-10 md:pt-24'>
                        <h3 className='text-center text-mwTextDeskH3Bold'>Shop all Mweb products</h3>

                        <section className='grid grid-cols-5 gap-6'>
                            {[
                                { illustrationType: 'lte', illustrationName: 'LTE' },
                                { illustrationType: 'fibre', illustrationName: 'FIBRE' },
                                { illustrationType: 'internet-security', illustrationName: 'INTERNET-SECURITY' },
                                { illustrationType: 'entertainment', illustrationName: 'ENTERTAINMENT' },
                                { illustrationType: 'home-office', illustrationName: 'HOME-OFFICE' },
                            ].map((illustration, index: number) => (
                                <div key={index} className='p-6 bg-mwBlueGrey-25 rounded-md flex flex-col items-center gap-4'>
                                    <MwebIconIllustration illustrationName={illustration.illustrationType} size={75} />
                                    <p className='text-center text-mwPrimary-900 text-mwTextParaSmall'>
                                        {illustration.illustrationName}
                                    </p>
                                </div>
                            ))}
                        </section>
                    </div>
                </section>
            </MwebSliceContainer>
        );
    }

    return (
        <div className='flex flex-col'>
            <div className='text-mwTextMobileH2Bold md:text-mwTextDeskH2Bold text-center text-mwGrey-900 pb-8 md:pb-10'>
                {generalCheckoutContent?.generalCheckoutOrderSummaryPageHeading}
            </div>

            <section className='flex flex-col md:flex-row justify-center md:gap-12' data-testid=''>
                <div className='md:max-w-[592px] w-full mb-4 md:mb-0'>
                    <div className='bg-mwBlueGrey-25 rounded-2xl'>
                        <section className='flex flex-col py-6 px-4 md:p-6'>
                            {/** empty product group list state */}
                            {productsGroup.length === 0 && (
                                <div>
                                    <p>Empty state</p>
                                </div>
                            )}

                            {/**  */}
                            <section className='flex flex-col gap-10'>
                                {productsGroup.map((productGroupItem: any, productGroupItemIdx: number) => (
                                    <div key={productGroupItem.id} className=''>
                                        {/** */}
                                        <div className='flex flex-col border-t-0 border-r-0 border-b border-l-0 border-mwBlueGrey-100'>
                                            <div className='flex justify-between items-center pb-5 md:pb-6'>
                                                <p className='text-mwTextParaBaseSemi md:text-mwTextParaXLargeSemi text-left text-mwGrey-900'>
                                                    {productGroupItem.productsGroupName}
                                                </p>
                                                <button onClick={() => handleOnProductGroupItemRemove(productGroupItem)}>
                                                    <MwebIcon
                                                        color={'text-mwGrey-400'}
                                                        size={20}
                                                        iconType={'remove'}
                                                        variant={'basic'}
                                                    />
                                                </button>
                                            </div>

                                            <div id='' className=''>
                                                {productGroupItem.productsItems.map((productItem: any) => (
                                                    <section key={productItem.id}>
                                                        <MwebListItem
                                                            productName={productItem.productName}
                                                            isOnceOff={productItem.isOnceOff}
                                                            isMonthly={productItem.isMonthly}
                                                            productPrice={productItem.productPrice}
                                                            promotionalText={productItem.promotionalText}
                                                            canRemoveProduct={productItem.canRemoveProduct}
                                                            onProductRemove={() => {
                                                                handleOnProductRemove(productGroupItemIdx, productItem);
                                                            }}
                                                            indicator={
                                                                productItem.provider
                                                                    ? {
                                                                          type: 'pill',
                                                                          label: productItem.provider.name,
                                                                          size: 'sm',
                                                                      }
                                                                    : undefined
                                                            }
                                                            onTermsAndConditionsButtonClick={() => console.log()}
                                                        />
                                                    </section>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>

                            <Link
                                href={`/${rootPath}`}
                                className='pt-6 md:pt-10 text-mwTextParaXSmall md:text-mwTextParaSmall text-mwGrey-600'
                            >
                                {generalCheckoutContent?.generalCheckoutOrderSummaryContinueShoppingText}{' '}
                                <span className='text-mwTextLinkXSmall md:text-mwTextLinkSmall text-mwPrimary-900'>
                                    Continue shopping
                                </span>
                            </Link>
                        </section>
                    </div>
                </div>

                <div className='md:max-w-[362px] w-full hidden md:block'>
                    <CardOrderSummary
                        onClickCallback={handleOnProceedToOrderBtnClick}
                        size='large'
                        cardDetails={
                            {
                                btnLabel: generalCheckoutContent?.generalCheckoutOrderSummaryCtaText || ' ',
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
                <div className='w-full flex md:hidden'>
                    <MwebCard
                        onClickCallback={() => {}}
                        type='voucher'
                        isSelected={false}
                        size='small'
                        cardDetails={
                            {
                                btnLabel: 'Apply',
                                inputValue: 'BLA',
                                placeholderText: 'Enter your Code',
                                onClickCB: (val) => {
                                    console.log('Voucher value is ', val);
                                },
                            } as iVoucherCardDetails
                        }
                    />
                </div>
                {/* STICKY SLIP FOR MOBILE */}
                <MwebBottomSheet
                    handleOnProceedBtnClick={handleOnProceedToOrderBtnClick}
                    monthly={499}
                    onceOff={0}
                    deliveryInstalation={0}
                    buttonText={generalCheckoutContent?.generalCheckoutOrderSummaryCtaText || ' '}
                    items={2}
                    IsProceedDisabled={false}
                />
            </section>
        </div>
    );
}

export default OrderSummaryDesktop;
