'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './UseCaseBlock.module.css';
import MwebAccordionList from '@/components/ui/mwebAccordion/MwebAccordionsList';

const UseCaseBlock = ({ useCaseAccordion }: { useCaseAccordion: any[] }) => {
    // extract useCase item from props list
    const [useCase] = useState(
        useCaseAccordion.find(
            (item) => item.__typename === 'useCaseAccordion_useCase_BlockType'
        )
    );

    //  accordionList to be used in MwebAccordionList component
    const accordionList = useCase.useCaseItemList?.map((useCase: any) => {
        return {
            heading: useCase.itemHeading ?? '',
            description: useCase.itemDescription ?? '',
        };
    });

    return (
        <>
            {useCase && (
                <div className={`w-full flex flex-col justify-center items-center`}>
                    <div className="pb-8 lg:pb-10">
                        <div className='text-center text-mwTextMobileH1Bold lg:text-mwTextDeskH1Bold text-mwGrey-900'>
                            {useCase?.useCaseMainHeading}
                        </div>

                    </div>

                    <section className='w-full flex flex-col lg:flex-row'>
                        {/** use case image */}
                        <div className='w-full lg:w-6/12 flex flex-col justify-between items-start relative mb-8 xl:mb-0'>
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_MEDIA_BASE_URL +
                                    '/' +
                                    useCase?.useCaseImage[0].path
                                }
                                alt=''
                                width={useCase?.useCaseImage[0].width}
                                height={useCase?.useCaseImage[0].height}
                                quality={100}
                                className={`w-full rounded-lg max-w-[385px] mx-auto lg:mx-0`}
                            />
                        </div>

                        {/** use case list  */}
                        <div className={`w-full lg:w-6/12 lg:my-2`}>
                            <MwebAccordionList
                                accordionList={accordionList}
                                variant='on-page'
                            />
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default UseCaseBlock;
