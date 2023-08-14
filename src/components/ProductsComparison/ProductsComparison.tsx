'use client';

import MwebCard from '@/components/ui/mwebCard/MwebCard';
import { iCompareCardDetails } from '@/components/ui/mwebCard/CardStyles';

export interface IProductComparisonCard {
    __typename: string;
    fromText: string;
    priceText: string;
    productComparisonItems: IProductComparisonItem[];
    productCtaText: string;
    productCtaUrl: string;
    productIcon: string;
}

interface IProductComparisonItem {
    comparisonItem: string;
}

export default function ProductsComparison({
    productComparisonList,
    heading,
}: {
    productComparisonList: IProductComparisonCard[];
    heading: string;
}) {
    //
    return (
        <div className='flex flex-col items-center gap-10'>
            <h2 className='text-center text-mwTextMobileH2Bold desktop:text-mwTextDeskH1Bold'>{heading}</h2>

            <section className='grid grid-cols-3 gap-6 w-full'>
                {productComparisonList.map((productCardItem) => {
                    return (
                        <div key={productCardItem.productCtaUrl} className='col-span-3 md:col-span-1'>
                            <MwebCard
                                onClickCallback={() => {}}
                                type='comparison'
                                isSelected={false}
                                size='large'
                                cardDetails={
                                    {
                                        details: productCardItem.productComparisonItems.map((item) => item.comparisonItem) ?? [],
                                        label: productCardItem.fromText,
                                        price: `${productCardItem.priceText.replace('R', '').replace('pm', '')}`,
                                        btnText: productCardItem.productCtaText,
                                        type: productCardItem.productIcon,
                                    } as iCompareCardDetails
                                }
                            />
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
