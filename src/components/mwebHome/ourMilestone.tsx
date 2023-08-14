'use client';
import { IAboutUs } from '@/services/aboutUsService';

import { useEffect, useState } from 'react';
import MwebButtonGroup from '../ui/mwebButtonGroup/MwebButtonGroup';
import {
    NinetyEightIcon,
    NinetySevenIcon,
    TwentyThreeIcon,
    TwentyEightIcon,
    TwentyTenIcon,
    TwentyFourteenIcon,
    TwentyFiftenIcon,
    TwentySixteenIcon,
    TwentySeventeen,
    TwentyEighteen,
    TwentyTwentyIcon,
    TwentyTwentyOneIcon,
    TwentyTwentyTwoIcon,
} from './Mock/OurMileStoneImages';

const OurMileStone = () => {
    const [mileStones] = useState([
        {
            year: '1997',
            bannerImage: <NinetyEightIcon />,
            heading: 'The original ISP is born',
            description:
                'Bringing better Internet to South African homes with the launch of the Big Black Box (throwback alert!)',
        },
        {
            year: '1998',
            bannerImage: <NinetySevenIcon />,
            heading: 'We hit our first milestone',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2003',
            bannerImage: <TwentyThreeIcon />,
            heading: 'We expanded our offering',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2008',
            bannerImage: <TwentyEightIcon />,
            heading: 'Always doing better',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2010',
            bannerImage: <TwentyTenIcon />,
            heading: 'Being better means being first',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2014',
            bannerImage: <TwentyFourteenIcon />,
            heading: 'Bringing it home',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2015',
            bannerImage: <TwentyFiftenIcon />,
            heading: 'Always growing our customer base',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2016',
            bannerImage: <TwentySixteenIcon />,
            heading: 'Doing more doing great',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2017',
            bannerImage: <TwentySeventeen />,
            heading: 'Always winning',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2018',
            bannerImage: <TwentyEighteen />,
            heading: 'Fibre first',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2020',
            bannerImage: <TwentyTwentyIcon />,
            heading: 'Our 3rd win',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2021',
            bannerImage: <TwentyTwentyOneIcon />,
            heading: 'A new look',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
        {
            year: '2022',
            bannerImage: <TwentyTwentyTwoIcon />,
            heading: 'At the top',
            description:
                'Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam tempor quis cursus. Non orci viverra amet etiam vel venenatis mollis quis. Tellus erat viverra curabitur dictum orci ut volutpat. Vitae dignissim egestas est ac lorem ultrices diam.',
        },
    ]);
    const [mileStoneInViewIndex, setMileStoneInViewIndex] = useState(0);
    const [mileStoneInView, setMileStoneInView] = useState(mileStones[mileStoneInViewIndex]);

    useEffect(() => {
        setMileStoneInView(mileStones[mileStoneInViewIndex]);
    }, [mileStones, mileStoneInViewIndex]);

    //
    return (
        <div className='flex flex-col gap-y-8 desktop:gap-y-10'>
            <h3 className='text-center text-mwTextMobileH1Bold desktop:text-mwTextDeskH2Bold'>Our milestones</h3>

            <div className='flex justify-center'>
                <section className='w-10/12'>
                    <MwebButtonGroup
                        size='small'
                        buttons={mileStones.map((mileStone, index) => {
                            return { isActive: index === mileStoneInViewIndex, label: mileStone.year, description: '' };
                        })}
                        hasDescription={false}
                        onClickFunc={(selectedButton) => {
                            // Find the corresponding MileStone and set it to view
                            const selectedMileStoneIndex = mileStones.findIndex((item) => item.year === selectedButton.label);
                            setMileStoneInViewIndex(selectedMileStoneIndex);
                        }}
                    />
                </section>
            </div>

            <div className='grid grid-cols-12 gap-6'>
                <section className='col-span-12 md:col-span-6'>
                    <div className='relative w-full md:px-0 h-[406px]'>{mileStoneInView.bannerImage}</div>
                </section>
                <section className='col-span-12 md:col-span-6 px-8 md:px-0 desktop:px-12 flex flex-col gap-4 desktop:gap-[30px] desktop:py-6 '>
                    <h3 className='text-mwGrey-900 text-mwTextMobileH4Semi desktop:text-mwTextDeskH3Bold'>
                        {mileStoneInView.heading}
                    </h3>
                    <p className='text-mwGrey-600 text-mwTextParaSmall desktop:text-mwTextParaBase'>
                        {mileStoneInView.description}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default OurMileStone;
