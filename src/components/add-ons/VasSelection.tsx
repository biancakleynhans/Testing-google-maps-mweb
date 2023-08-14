'use client';

import { useClientJourney } from '@/context/ClientJourneyContext';
import { iVasCard } from '@/models/Vas';
import React, { useState, useEffect } from 'react';
import MwebCard from '@/components/ui/mwebCard/MwebCard';
import { iVasCardDetails } from '@/components/ui/mwebCard/CardStyles';
import { AnalyticsService } from '@/services/analyticsService';
import { useNavContext } from '@/context/NavigationContext';

import useCheckoutProcess from '@/hooks/useCheckoutProcess';
import { ADD_ONS_LOOKUP_KEY } from '@/services/Constants';

export default function VasSelectionAddOn({ addOnHeading }: { addOnHeading: string }) {
    const {
        recommendedVasProducts,
        handleSelectedVasProduct,
        handleAddProductToShoppingCart,
        handleRemoveProductFromShoppingCart,
    } = useClientJourney();
    const { handleIsNextActive } = useNavContext();

    const [isLoading, setIsLoading] = useState(true);
    const { vasProductsFromSession } = useCheckoutProcess();

    const analyticsService = new AnalyticsService();

    const [ranonce, setRanonce] = useState(false);
    const [vasArr, setvasArr] = useState<iVasCard[]>([]);

    useEffect(() => {
        // Read recommended vas from the session and update component state
        const addOnsDataKey = localStorage.getItem(ADD_ONS_LOOKUP_KEY) || '';

        if (addOnsDataKey !== '') {
            const addOnsData = JSON.parse(addOnsDataKey);

            let arr: iVasCard[] = [];

            addOnsData.vas.forEach((rec: any) => {
                // Check if the current router is found in tillSlip vas products
                let isSelected = vasProductsFromSession.find((vasProduct) => vasProduct.productCode === rec.productCode);

                let obj = {
                    description: rec.summary,
                    header: rec.name,
                    price: rec.price,
                    provider: rec.subcategory,
                    selected: isSelected ? true : false,
                    promoCode: rec.promoCode,
                    productCode: rec.productCode,
                };

                arr.push(obj);
            });

            setvasArr(arr);
            setIsLoading(false);
            return;
        }

        if (recommendedVasProducts.length > 0 && !ranonce) {
            analyticsService.pushViewItemListGA4Tracking(recommendedVasProducts);
            setRanonce(true);
        }

        if (recommendedVasProducts.length === 0) {
            handleIsNextActive(true);
        }

        setIsLoading(false);
        handleIsNextActive(true);
    }, [recommendedVasProducts, vasProductsFromSession]);

    function handleAddtoArr(selected: iVasCard) {
        let arr: iVasCard[] = [];

        vasArr.forEach((rec) => {
            let val = rec.productCode === selected.productCode ? (rec.selected ? false : true) : rec.selected;

            rec.selected = val;
            arr.push(rec);

            let product = {
                productCode: rec.productCode ?? '',
                promoCode: rec.promoCode ?? '',
            };

            rec.selected ? handleAddProductToShoppingCart(product) : handleRemoveProductFromShoppingCart(product);
        });

        setvasArr(arr);
        handleSelectedVasProduct(arr);
        handleIsNextActive(true);
    }

    if (isLoading) {
        return (
            <div className='py-8 px-4 desktop:px-20 desktop:py-16'>
                <p>Loading .....</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-center py-8 px-4 desktop:px-0 desktop:py-16 items-center'>
            <div className='text-mwTextDeskH3Bold desktop:text-mwTextDeskH2Bold text-mwGrey text-center pb-8 desktop:pb-10'>
                {addOnHeading}
            </div>

            {vasArr.length === 0 && (
                <section>
                    <p className='text-center text-red-500'>No VAS recommended products associated with the selected product</p>
                </section>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-y-4 md:gap-y-4 gap-x-6'>
                {vasArr.map((vas, index) => (
                    <div key={`vas-cards-container-${index}`}>
                        {/* laptop version cards*/}
                        <div key={`desktop-vas-cards-container-${index}`} className={`items-left hidden desktop:block`}>
                            <MwebCard
                                onClickCallback={() => {
                                    handleAddtoArr(vas);
                                    if (vas.selected) {
                                        analyticsService.pushItemSelectGA4Tracking(vas);
                                    }
                                }}
                                type='product-vas'
                                showButton={false}
                                isSelected={vas.selected}
                                size='large'
                                isPromo={false}
                                cardDetails={
                                    {
                                        provider: vas.provider,
                                        details: vas.description,
                                        speed: '00Mbps',
                                        price: vas.price,
                                        productName: vas.header,
                                    } as iVasCardDetails
                                }
                            />
                            {/* <VasCard selected={false} description={vas.description} header={vas.header} price={vas.price} provider={vas.provider} /> */}
                        </div>
                        {/* mobile version cards*/}
                        <div key={`mobile-vas-cards-container-${index}`} className={`items-left block desktop:hidden`}>
                            <MwebCard
                                onClickCallback={() => {
                                    handleAddtoArr(vas);
                                    if (vas.selected) {
                                        analyticsService.pushItemSelectGA4Tracking(vas);
                                    }
                                }}
                                type='product-vas'
                                showButton={false}
                                isSelected={vas.selected}
                                size='small'
                                isPromo={false}
                                cardDetails={
                                    {
                                        provider: vas.provider,
                                        details: vas.description,
                                        speed: '00Mbps',
                                        price: vas.price,
                                        productName: vas.header,
                                    } as iVasCardDetails
                                }
                            />
                            {/* <VasCard selected={false} description={vas.description} header={vas.header} price={vas.price} provider={vas.provider} /> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
