'use client';

import React, {useEffect} from 'react';
import {useCoverage} from '@/context/CoverageContext';
import usePlacesAutocomplete, {HookArgs, getDetails} from 'use-places-autocomplete';
import {IAddressObject} from '@/models/Coverage';
import {CancelBtn, ConfirmLocBtn, UseLocBtn} from './MwebSearchBar';

type iProps = {
	isDisabled: boolean;
	placeHolderText: string;
};

const AutoValues: HookArgs = {
	requestOptions: {componentRestrictions: {country: 'za'}},
	debounce: 60,
	cache: 0,
};

export default function SearchBarRound(props: iProps) {
	const {isDisabled, placeHolderText} = props;
	const {handleGetCurrentLocationForCoverage, currentFormattedAdress, startProgression, isLoading, handleReset, handleLoading, startCoverage} = useCoverage();

	const autoComplete = usePlacesAutocomplete(AutoValues);

	useEffect(() => {
		if (currentFormattedAdress.length === 0 && !startProgression && autoComplete.value.length > 0) {
			autoComplete.setValue('');
		}
		if (autoComplete.value.length === 0 && currentFormattedAdress.length > 0) {
			autoComplete.setValue(currentFormattedAdress);
		}

		if (autoComplete.value !== currentFormattedAdress) {
			autoComplete.setValue(currentFormattedAdress);
		}
	}, [currentFormattedAdress]);

	// suggestion => google.maps.places.AutocompletePrediction
	function handleSuggestionSelected(suggestion: any) {
		console.log('place from list has been selected ', suggestion);

		handleLoading(true);

		autoComplete.setValue(suggestion.description, false);
		autoComplete.clearSuggestions();

		getDetails({placeId: suggestion.place_id, fields: ['formatted_address', 'address_components', 'geometry', 'place_id', 'types']})
			.then((details: any) => {
				console.log('Details: ', details as IAddressObject);
				startCoverage(details);
			})
			.catch((error) => {
				console.warn('Error getting Details: ', 'color:crimson', error);
			});
	}

	const renderSuggestions = () => {
		return autoComplete.suggestions.data.map((suggestion, i) => {
			return (
				<li
					key={suggestion.place_id}
					className='w-full cursor-pointer px-6 py-[17px] lg:py-[19px] text-mwPrimary-900 text-mwTextParaBase border-b-[1px] border-mwPrimary-100'
					onClick={() => handleSuggestionSelected(suggestion)}
				>
					<strong>{suggestion.structured_formatting.main_text}</strong> <small>{suggestion.structured_formatting.secondary_text}</small>
				</li>
			);
		});
	};

	const textColor = isDisabled ? 'text-mwGrey-300 placeholder:text-mwGrey-300' : 'text-mwPrimary-900 placeholder:text-mwPrimary-900';
	const border = `border border-mwPrimary-100 ${
		autoComplete.suggestions.status === 'OK' ? 'rounded-b-none rounded-t-[32px] lg:rounded-t-[45px]' : 'rounded-[32px] lg:rounded-[45px]'
	}`;

	const padding = autoComplete.value.length > 0 ? 'px-6 lg:px-6' : 'pl-6 pr-2 lg:pl-6 lg:pr-4';

	return (
		<div className='w-full flex-col justify-start items-start'>
			<div className={`w-full flex flex-row justify-between items-center ${padding} py-2 lg:py-4 gap-x-2 lg:gap-x-6 ${border} bg-white `}>
				<div className='w-full h-12 lg:h-14 flex flex-row justify-start items-center'>
					<input
						className={`w-full peer outline-none border-none ring-transparent bg-transparent truncate placeholder:truncate ${textColor}`}
						value={autoComplete.value}
						disabled={!autoComplete.ready || isDisabled}
						onChange={(e) => autoComplete.setValue(e.target.value)}
						placeholder={placeHolderText}
					/>
				</div>

				<div className='w-1/2 hidden desktop:flex'>
					{autoComplete.value.length === 0 && (
						<UseLocBtn buttonFunction={() => handleGetCurrentLocationForCoverage()} inputString={autoComplete.value} isDisabled={isDisabled} isLoading={isLoading} />
					)}
				</div>

				{autoComplete.value.length === 0 && <ConfirmLocBtn buttonFunction={() => {}} inputString={autoComplete.value} isDisabled={isDisabled} isLoading={isLoading} />}

				{autoComplete.value.length !== 0 && (
					<CancelBtn
						buttonFunction={() => {
							handleReset();
							autoComplete.setValue('');
						}}
						inputString={autoComplete.value}
						isDisabled={isDisabled}
						isLoading={isLoading}
					/>
				)}
			</div>

			{autoComplete.value.length === 0 && (
				<div className='flex desktop:hidden'>
					<UseLocBtn buttonFunction={() => handleGetCurrentLocationForCoverage()} inputString={autoComplete.value} isDisabled={isDisabled} isLoading={isLoading} />
				</div>
			)}

			{autoComplete.suggestions.status === 'OK' && (
				<ul className='w-full list-none  rounded-t-none rounded-b-[45px] bg-white border border-t-0 border-mwPrimary-100'>{renderSuggestions()}</ul>
			)}
		</div>
	);
}
