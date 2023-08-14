'use client';

import React, {useEffect, useState} from 'react';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';
import MwebCard from '@/components/ui/mwebCard/MwebCard';
import {iOptionCardDetails} from '@/components/ui/mwebCard/CardStyles';

import parse from 'html-react-parser';
import {useClientJourney} from '@/context/ClientJourneyContext';
import {useNavContext} from '@/context/NavigationContext';
import {IConnectivityContent} from '@/services/ConnectivityService';
import {providerJourneyType, useCoverage} from '@/context/CoverageContext';
import {useInternetServiceProviders} from '@/context/InternetServiceProvidersContent';

export interface IConnectivityOption {
	text: string;
	image: string;
	value: string;
	description: string;
	altJourney: 'lte' | 'fibre' | '5G';
	price?: string;
}

export default function ConnectivityAvailability({pageContent}: {pageContent: IConnectivityContent}) {
	const {handleIsNextActive} = useNavContext();
	const {handleconnectivityOption, connectivityOption} = useClientJourney();
	const {providerType, handleProviderType} = useCoverage();
	const {handleGetServicesFromCoverage, servicesFromCoverage} = useInternetServiceProviders();

	const [showMore, toggleMore] = useState(false);
	const [faqMax, setFaqMax] = useState(200);

	useEffect(() => {
		handleIsNextActive(connectivityOption ? true : false);
	}, [connectivityOption]);

	// FUNCTION TO UPDATE STATE IS ROUTER OPTION IS SELECTED
	const handleSelectedOption = (option: IConnectivityOption) => {
		let value =
			option.value === 'fibre'
				? providerJourneyType.fibre
				: option.value === 'lte'
				? providerJourneyType.lte
				: option.value === '5G'
				? providerJourneyType['5G']
				: providerJourneyType.fibre;

		handleProviderType(value);
		handleGetServicesFromCoverage(servicesFromCoverage, value);
		handleconnectivityOption(option);
	};
	const handleFaqMore = (value: boolean) => {
		toggleMore(value);
		setFaqMax(value ? pageContent.faq.text.length : 200);
	};
	return (
		<div className=' flex flex-col justify-center items-center'>
			{/* PAGE TITLE HEADING */}
			<div className='text-mwTextDeskH3Bold desktop:text-mwTextDeskH2Bold text-mwGrey-900 text-center mb-8 desktop:mb-10'>{pageContent.pageHeading}</div>

			<div className='flex flex-col w-full gap-16 lg:gap-20'>
				{/* SELECT ROUTER OPTIONS */}
				<div className='flex justify-center'>
					<div className={`flex justify-center md:justify-start flex-wrap gap-y-4 md:gap-6  items-stretch`}>
						{pageContent.choices.map((choice, i) => {
							return (
								<div key={`add-ons-router-type-${i}`}>
									<div className='justify-center h-full text-mwTextParaBaseSemi hidden lg:block'>
										<MwebCard
											key={`add-ons-router-type-${i}`}
											onClickCallback={() => handleSelectedOption(choice)}
											type='option'
											isSelected={choice.value === connectivityOption?.value}
											size='large'
											cardDetails={
												{
													label: parse(choice.text),
													description: parse(choice.description),
													icon: choice.image,
													iconType: 'illustration',
													price: choice.price,
												} as iOptionCardDetails
											}
										/>
									</div>

									<div className='flex justify-center h-full text-mwTextParaBaseSemi lg:hidden'>
										<MwebCard
											key={`add-ons-router-type-${i}`}
											onClickCallback={() => handleSelectedOption(choice)}
											type='option'
											isSelected={choice.value === connectivityOption?.value}
											size='small'
											cardDetails={
												{
													label: parse(choice.text),
													description: parse(choice.description),
													icon: choice.image,
													iconType: 'illustration',
													price: choice.price,
												} as iOptionCardDetails
											}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* ROUTER SELECTION FAQ SECTION */}
				<div className='w-full border-t border-mwBlueGrey-100 pt-6 flex flex-col gap-2'>
					<div className='text-mwGrey-600 text-mwTextParaSmallSemi desktop:text-mwTextParaBaseSemi'>{pageContent.faq.question}</div>
					<div className='text-mwGrey-600 text-mwTextParaSmall'>
						{pageContent.faq.text.slice(0, faqMax)} {faqMax < pageContent.faq.text.length ? '...' : ''}{' '}
					</div>

					{pageContent.faq.text.length > 200 && (
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
		</div>
	);
}
