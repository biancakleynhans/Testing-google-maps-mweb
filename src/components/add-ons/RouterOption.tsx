'use client';

import React, {useEffect, useState} from 'react';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';
import MwebCheckbox from '@/components/ui/mwebCheckbox/MwebCheckbox';
import MwebCard from '@/components/ui/mwebCard/MwebCard';
import {iOptionCardDetails} from '@/components/ui/mwebCard/CardStyles';
import parse from 'html-react-parser';
import {useClientJourney} from '@/context/ClientJourneyContext';
import {useNavContext} from '@/context/NavigationContext';

export enum eRouterOptions {
	'fixed' = 'router-fixed',
	'portable' = 'router-portable',
	'both' = 'router-both',
	'none' = 'none',
	'blank' = '',
}

interface IOption {
	text: string;
	image: string;
	selected: boolean;
	value: eRouterOptions;
}

const faq = {
	question: 'What is the difference between a fixed and portable router?',
	text: 'A fixed router is designed to be permanently installed in a specific location, while a portable router is designed for use on-the-go',
};

const choices: IOption[] = [
	{text: `<div className="w-full md:w-[120px]">I would like a fixed router</div>`, image: 'router-fixed', selected: false, value: eRouterOptions.fixed},
	{text: `<div className="w-full md:w-[120px]">I would like a portable router</div>`, image: 'router-portable', selected: false, value: eRouterOptions.portable},
	{text: `<div className="w-full md:w-[180px]">I would like a fixed and a portable router</div>`, image: 'router-both', selected: false, value: eRouterOptions.both},
];

export default function RouterOption({headingTitle}: {headingTitle: string}) {
	const {handleIsNextActive} = useNavContext();
	const {handleRouterOption, selectedRouterOption} = useClientJourney();

	const [routerOptionSelected, setrouterOptionSelected] = useState<eRouterOptions>(eRouterOptions.blank);
	const [showMore, toggleMore] = useState(false);
	const [faqMax, setFaqMax] = useState(200);

	useEffect(() => {
		if (selectedRouterOption !== eRouterOptions.blank && routerOptionSelected === eRouterOptions.blank) {
			setrouterOptionSelected(selectedRouterOption);
		}

		if (selectedRouterOption !== eRouterOptions.blank && routerOptionSelected !== eRouterOptions.blank) {
			// console.log('%c router option selected is : ', 'color:coral', routerOptionSelected);
			handleIsNextActive(routerOptionSelected === selectedRouterOption);
		}
	}, [routerOptionSelected, selectedRouterOption]);

	const handleFaqMore = (value: boolean) => {
		toggleMore(value);
		setFaqMax(value ? faq.text.length : 200);
	};

	return (
		<div className=' flex flex-col justify-center items-center'>
			{/* PAGE TITLE HEADING */}
			<div className='text-mwTextDeskH3Bold desktop:text-mwTextDeskH2Bold text-mwGrey-900 text-center mb-8 desktop:mb-10'>{headingTitle}</div>

			{/* SELECT ROUTER OPTIONS */}
			<div className=' grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 gap-4 md:gap-6  mb-8 desktop:mb-10'>
				{choices.map((choice, i) => {
					return (
						<div key={`add-ons-router-type-${i}`}>
							<div className='text-mwTextParaBaseSemi hidden md:block'>
								<MwebCard
									key={`add-ons-router-type-${i}`}
									onClickCallback={() => {
										setrouterOptionSelected(choice.value);
										handleRouterOption(choice.value);
									}}
									type='option'
									isSelected={choice.value === routerOptionSelected}
									size='large'
									cardDetails={
										{
											label: parse(choice.text),
											icon: choice.image,
											iconType: 'illustration',
										} as iOptionCardDetails
									}
								/>
							</div>

							<div className='text-mwTextParaBaseSemi md:hidden'>
								<MwebCard
									key={`add-ons-router-type-${i}`}
									onClickCallback={() => {
										setrouterOptionSelected(choice.value);
										handleRouterOption(choice.value);
									}}
									type='option'
									isSelected={choice.value === routerOptionSelected}
									size='small'
									cardDetails={
										{
											label: parse(choice.text),
											icon: choice.image,
											iconType: 'illustration',
										} as iOptionCardDetails
									}
								/>
							</div>
						</div>
					);
				})}
			</div>

			{/* DO NOT WANT A ROUTER SELECTION CHOICE */}
			<div className='w-full flex justify-center flex-col items-center mb-16 desktop:mb-20'>
				<div className='flex justify-center'>
					<MwebCheckbox
						selectedKey={1}
						isChecked={routerOptionSelected === 'none'}
						disabled={false}
						label={'No thanks, I have my own router'}
						onStateChange={(e) => {
							setrouterOptionSelected(eRouterOptions.none);
							handleRouterOption(eRouterOptions.none);
						}}
					/>
				</div>
			</div>

			{/* ROUTER SELECTION FAQ SECTION */}
			<div className='w-full border-t border-mwBlueGrey-100 pt-6 flex flex-col gap-2'>
				<div className='text-mwGrey-600 text-mwTextParaSmallSemi desktop:text-mwTextParaBaseSemi'>{faq.question}</div>
				<div className='text-mwGrey-600 text-mwTextParaSmall'>
					{faq.text.slice(0, faqMax)} {faqMax < faq.text.length ? '...' : ''}{' '}
				</div>
				{faq.text.length > 200 && (
					<MwebButton
						color='text-only'
						size='small'
						btnText={showMore ? 'Read less' : 'Read more'}
						hasIcon={false}
						isDisabled={false}
						onClickFunction={() => handleFaqMore(!showMore)}
					/>
				)}
			</div>
		</div>
	);
}
