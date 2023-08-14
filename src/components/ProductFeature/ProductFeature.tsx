'use client';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import MwebCard from '@/components/ui/mwebCard/MwebCard';
import { iFeatureCardDetails } from '@/components/ui/mwebCard/CardStyles';
import MwebButtonGroup from '@/components/ui/mwebButtonGroup/MwebButtonGroup';

export interface IUseCaseAccordion {
    __typename: string;
    useCaseImage: any[];
    useCaseItemList: IUseCaseItemList[];
    useCaseMainHeading: string;
    useCaseMainDescription: string;
    useCaseImagePosition: 'left' | 'right';
}

interface IUseCaseItemList {
    itemDescription: string;
    itemHeading: string;
}

export default function ProductFeature({ useCaseAccordion }: { useCaseAccordion: IUseCaseAccordion[] }) {
    const [currentUseCaseAccordionIndex, setCurrentUseCaseAccordionIndex] = useState<number>(0);
    const [currentUseCaseAccordion, setCurrentUseCaseAccordion] = useState<IUseCaseAccordion>(
        useCaseAccordion[currentUseCaseAccordionIndex]
    );

    useEffect(() => {
        setCurrentUseCaseAccordion(useCaseAccordion[currentUseCaseAccordionIndex]);
    }, [currentUseCaseAccordionIndex, useCaseAccordion]);

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <div className='flex flex-col items-center gap-10'>
            <h2 className='px-10 text-center md:px-0 text-mwTextMobileH2Bold desktop:text-mwTextDeskH1Bold'>
                Internet made simple
            </h2>

            <ul className='w-8/12'>
                <MwebButtonGroup
                    size={`${isTabletOrMobile ? 'small' : 'large'}`}
                    buttons={useCaseAccordion.map((useCase, index: number) => {
                        return {
                            label: useCase.useCaseMainHeading as string,
                            description: '',
                            isActive: index === currentUseCaseAccordionIndex,
                        };
                    })}
                    hasDescription={false}
                    onClickFunc={(selectedUseCase) => {
                        // Find the index of the selected use case and update component state
                        const selectedIndex = useCaseAccordion.findIndex(
                            (useCase) => useCase.useCaseMainHeading === selectedUseCase.label
                        );
                        setCurrentUseCaseAccordionIndex(selectedIndex);
                    }}
                />
            </ul>

            <div className='px-4 md:px-0'>
                <MwebCard
                    onClickCallback={() => {}}
                    type='feauture'
                    size={`${isTabletOrMobile ? 'small' : 'large'}`}
                    cardDetails={
                        {
                            btnLabel: `Get ${currentUseCaseAccordion.useCaseMainHeading}`,
                            header: currentUseCaseAccordion.useCaseMainDescription,
                            details: currentUseCaseAccordion.useCaseItemList.map((item) => item.itemHeading) ?? [],
                            image: `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${currentUseCaseAccordion.useCaseImage[0]?.path}`,
                        } as iFeatureCardDetails
                    }
                />
            </div>
        </div>
    );
}
