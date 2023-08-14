'use client';
/**
 * This is a React.js component that renders a list of FAQs (Frequently Asked Questions) with the option to show more or fewer questions.
 */

import { useEffect, useState } from 'react';

import { IFaq } from '@/models/faq';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';
import MwebAccordion from '@/components/ui/mwebAccordion/MwebAccordion';

//
const numberOfFaqsToShow = 7; // REQUIREMENT: Allow for 7 FAQ’s. Should FAQ’s exceed 7, allow for “Show more FAQ’s.

export default function FAQs({ faqs }: { faqs: IFaq[] }) {
    // get FAQ's heading
    const [sectionHeading] = useState<IFaq | undefined>(
        faqs?.find((faq) => faq.__typename === 'vasFaqs_faqsSectionHeading_BlockType')
    );

    // filter out FAQ's items into  a list called questionList: This is usefull when slice FAQ's items list based on toggle Show More/Less FAQs
    const [questionList] = useState<IFaq[]>(
        faqs?.filter((faq) => faq.__typename === 'vasFaqs_faqsItem_BlockType')
    );

    // upon mounting the component, we need to know if we should show the buttons Show More/Less FAQs
    const [isDisplayShowMoreButton, setIsDisplayShowmoreButton] = useState<boolean>(
        questionList.length > numberOfFaqsToShow
    );

    // Faq list : displayed to the client
    const [faqsList, setFaqsList] = useState<IFaq[]>(() => {
        const faqs: IFaq[] = isDisplayShowMoreButton
            ? questionList?.slice(0, numberOfFaqsToShow)
            : questionList;

        return faqs;
    });

    // state for the mode of the button (either "More" or "Less")
    const [showMoreOrLessBtnMode, setShowMoreOrLesBtnMode] = useState<
        'Show More FAQs' | 'Show Less FAQs'
    >('Show More FAQs');

    // update button mode to either Show More FAQs or Show Less FAQs
    const handleShowMoreOrLessToggle = () => {
        // update faqs list items
        const isShowMoreOptionClicked: boolean =
            showMoreOrLessBtnMode === 'Show More FAQs' ? true : false;

        // update faqs that are visible to the client
        if (isShowMoreOptionClicked) {
            setFaqsList(questionList);
            setShowMoreOrLesBtnMode('Show Less FAQs');
        } else {
            setFaqsList(questionList.slice(0, numberOfFaqsToShow));
            setShowMoreOrLesBtnMode('Show More FAQs');

            // scroll to the faq heading element. This correct jumpy jumpy behavior when elements mount to the DODM
            const faqHeadingElement = document.getElementById('faqHeading');
            faqHeadingElement?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    //
    // state to control which accordion to open
    const [openAccordions, setOpenAccordions] = useState<any[]>(
        faqsList.map((_: any, idx: number) => {
            return {
                isExpanded: false, // set all other open accordions to false by default
            };
        }) ?? []
    );

    /**
     *  The function iterates over openAccordions state and set all other open accordions to false
     *  except the accordion clicked
     * @param isExpanded
     * @param currentIndex
     */
    const [currentOpenAccordionIdx, setCurrentOpenAccordionIdx] = useState<number | null>(0);
    const handleOnExpand = (isExpanded: boolean, currentIndex: number) => {
        setCurrentOpenAccordionIdx(currentOpenAccordionIdx !== currentIndex ? currentIndex : null);
    };

    //
    return (
        <div className='py-10 px-4  md:px-14 md:py-10 desktop:px-[182px] desktop:py-24'>
            {/**  */}
            <div className='flex flex-col  gap-10'>
                <h3
                    id='faqHeading'
                    className='text-mwTextMobileH1Bold md:text-mwTextDeskH1Bold text-mwGrey-900 md:px-20 text-center'
                >
                    {sectionHeading?.faqsSectionHeading}
                </h3>

                {/** */}
                <ul
                    id='accordion-list-container'
                    className='w-full flex flex-col gap-2.5'
                >
                    {faqsList.map((faqItem, idx) => (
                        <li key={idx} className=''>
                            <MwebAccordion
                                variant='contained'
                                heading={faqItem.faqItemHeading ?? ''}
                                description={
                                    faqItem.faqsSectionDescription ??
                                    faqItem?.faqItemDetails ??
                                    ''
                                }
                                isExpanded={idx === currentOpenAccordionIdx}
                                handleOnExpand={(isExpanded, currentIndex) =>  handleOnExpand(isExpanded, currentIndex)}
                                currentIndex={idx}
                                isLast={idx === (faqsList.length - 1)}
                            />
                        </li>
                    ))}
                </ul>

                {/** */}
                {isDisplayShowMoreButton && (
                    <div className='flex justify-center'>
                        <div className='flex justify-center items-center gap-2 hidden lg:block'>
                            <MwebButton
                                color='text-only'
                                size='large'
                                btnText={showMoreOrLessBtnMode}
                                hasIcon={false}
                                isDisabled={false}
                                onClickFunction={handleShowMoreOrLessToggle}
                            />
                        </div>
                        <div className='flex justify-center items-center gap-2 block lg:hidden'>
                            <MwebButton
                                color='text-only'
                                size='medium'
                                btnText={showMoreOrLessBtnMode}
                                hasIcon={false}
                                isDisabled={false}
                                onClickFunction={handleShowMoreOrLessToggle}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
