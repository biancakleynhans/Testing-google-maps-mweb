'use client';
import { useState } from 'react';
import MwebAccordion from './MwebAccordion';

// create interface for functions props
interface IAccordion {
    description: string;
    heading: string;
}

interface IOpenAccordions {
    isExpanded: boolean;
}

/**
 * The function renders list of MwebAccordions
 * By default the first element in the list is Open
 *
 */
const MwebAccordionList = ({
    accordionList,
    variant,
}: {
    accordionList: IAccordion[];
    variant: 'contained' | 'on-page';
}) => {
    //

    // by default one accordion should be open
    const defaultAccordionIndexToOpen = 0; // TODO: pass as props

    // state to control which accordion to open
    const [openAccordions, setOpenAccordions] = useState<IOpenAccordions[]>(
        accordionList.map((_: IAccordion, idx: number) => {
            return {
                isExpanded: idx == defaultAccordionIndexToOpen ? true : false, // set all other open accordions to false by default
            };
        }) ?? []
    );

    /**
     *  The function iterates over openAccordions state and set all other open accordions to false
     *  except the accordion clicked
     * @param isExpanded
     * @param currentIndex
     */
    const handleOnExpand = (isExpanded: boolean, currentIndex: number) => {
        // update openAccordions state
        const updatedOpenAccordionsState = [...openAccordions].map((_, idx: number) => {
            return {
                isExpanded: idx === currentIndex ? isExpanded : false,
            };
        });

        // update openAccordions state
        setOpenAccordions(updatedOpenAccordionsState);
    };

    return (
        <ul id='accordionListContainer' className='h-[343px] xs:h-[360px] md:h-[370px] desktop:h-[380px] overflow-y-visible md:overflow-y-hidden'>
            {accordionList.map((item, idx) => (
                <li key={item.heading + idx} id={`accordionListIem-${idx}`}>
                    <MwebAccordion
                        description={item.description}
                        heading={item.heading}
                        variant={variant}
                        isExpanded={openAccordions[idx].isExpanded}
                        handleOnExpand={(isExpanded: boolean, currentIndex: number) => handleOnExpand(isExpanded, currentIndex)}
                        currentIndex={idx}
                        isLast={idx === (accordionList.length - 1)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default MwebAccordionList;
