import {Transition} from '@headlessui/react';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';
import parse from 'html-react-parser';
import MwebIcon from '@/components/ui/mwebIcon/MwebIcon';

// Creating a TypeScript interface `IProps` to define the props that `mwebAccordion` component accepts
interface IProps {
    variant: 'contained' | 'on-page';
    heading: string;
    description: string;
    isExpanded: boolean;
    handleOnExpand: (isExpanded: boolean, currentIndex: number) => void;
    currentIndex: number;
    isLast: boolean;
}

// Defining a React functional component `mwebAccordion` that accepts `IProps` as its props
export default function MwebAccordion({
                                          variant,
                                          heading,
                                          description,
                                          isExpanded,
                                          handleOnExpand,
                                          currentIndex,
                                          isLast
                                      }: IProps) {
    // Checking if the `variant` prop value is 'on-page' then return that mwebAccordion flavour
    if (variant === 'on-page') {
        return (
            <section className={`flex flex-col gap-0 md:gap-2 ${isLast ? 'mb-0' : 'mb-6 md:mb-8 '} hover:cursor-pointer`}
                     onClick={() => handleOnExpand(!isExpanded, currentIndex)}>
                <div
                    data-testid='accordion'
                    className='flex justify-baseline items-start gap-2'
                >
                    <section className=''>
                        <button
                            data-testid='accordion_button'
                            className='flex justify-start gap-2 items-start relative py-1 focus:outline-none'
                        >
                            {isExpanded ? (
                                <MwebIcon iconType={'circle-minus'} size={24} color={'text-mwLightTeal-900'} variant={'basic'} />
                            ) : (
                                <MwebIcon iconType={'circle-plus'} size={24} color={'text-mwLightTeal-900'} variant={'basic'} />
                            )}
                        </button>


                    </section>
                    <div className='flex flex-col gap-2 self-center'>
                        <p
                            data-testid='accordion_heading'
                            className={`text-mwTextParaBaseSemi md:text-mwTextParaXLargeSemi hover:cursor-pointer ${
                                isExpanded ? 'text-mwGrey-900' : 'text-mwGrey-600'
                            }`}
                        >
                            {heading}
                        </p>
                    </div>
                </div>

                {isExpanded &&

                    <div data-testid='accordion_panel' className='flex gap-2'>
                        <section className=''>
                            <p className='w-[25px]'/>
                        </section>
                        <section
                            className='flex flex-col gap-2 text-mwTextParaSmall md:text-mwTextParaLarge text-mwGrey-600'>
                            {parse(description)}
                        </section>
                    </div>
                }
            </section>
        );
    }

    // Checking if the `variant` prop value is 'contained' then return that mwebAccordion flavour
    return (
        <div
            data-testid='accordion'
            className='p-4 rounded-2xl bg-white border border-mwBlueGrey flex flex-col gap-2 md:px-8 md:py-6   hover:cursor-pointer'
            onClick={() => handleOnExpand(!isExpanded, currentIndex)}
        >
            <section className={'self-stretch flex items-center gap-2 justify-between  hover:cursor-pointer'}>
                <h3
                    data-testid='accordion_heading'
                    className='text-mwGrey-600 text-mwTextParaBaseSemi md:text-mwTextParaXLargeSemi hover:cursor-pointer'
                >
                    {heading}
                </h3>

                <div
                    className={'block md:hidden'}
                >
                    <MwebIcon
                        color='text-mwPrimary-900'
                        iconType={isExpanded ? 'circle-minus' : 'circle-plus'}
                        size={24}
                        variant={'basic'}
                    />
                </div>

                <div className={'hidden md:block'}>
                    <MwebButton
                        color='primary'
                        size='small'
                        btnText=''
                        isDisabled={false}
                        onClickFunction={() => handleOnExpand(!isExpanded, currentIndex)}
                        hasIcon={true}
                        iconProps={{
                            variant: 'functional',
                            color: '',
                            icon: isExpanded ? 'minus-large' : 'plus-large',
                            size: 20,
                            iconPosition: 'icon-only',
                        }}
                    />
                </div>
            </section>

            {isExpanded &&

                <section
                    id='faq-description'
                    data-testid='accordion_panel'
                    className='flex gap-2'
                >
                    <div
                        data-testid='accordion_description'
                        className='text-mwGrey-400 text-mwTextParaSmall md:text-mwTextParaBase'
                    >
                        {parse(description)}
                    </div>
                    <div className={`hidden lg:block`}>
                        <p className='w-[58px]'/>
                    </div>
                </section>
            }
        </div>
    );
}
