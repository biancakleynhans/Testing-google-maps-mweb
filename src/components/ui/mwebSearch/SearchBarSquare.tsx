'use client';

import React, {useEffect} from 'react';
import {useCoverage} from '@/context/CoverageContext';
import {usePathname} from 'next/navigation';
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

export default function SearchBarSquare(props: iProps) {
	const {isDisabled, placeHolderText} = props;
	const {handleGetCurrentLocationForCoverage, currentFormattedAdress, startProgression, isLoading, handleReset, handleLoading, startCoverage} = useCoverage();

	const autoComplete = usePlacesAutocomplete(AutoValues);
	const path = usePathname()?.split('/')[1];

	useEffect(() => {
		if (currentFormattedAdress.length === 0 && !startProgression && autoComplete.value.length > 0) {
			autoComplete.setValue('');
		}
		if (autoComplete.value.length === 0 && currentFormattedAdress.length > 0) {
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
					className='w-full cursor-pointer px-6 py-[19px] text-mwPrimary-900 text-mwTextParaBase border-b-[1px] border-mwPrimary-100'
					onClick={() => handleSuggestionSelected(suggestion)}
				>
					<strong>{suggestion.structured_formatting.main_text}</strong> <small>{suggestion.structured_formatting.secondary_text}</small>
				</li>
			);
		});
	};

	const textColor = isDisabled ? 'text-mwGrey-300 placeholder:text-mwGrey-300' : 'text-mwPrimary-900 placeholder:text-mwPrimary-900';
	const border = `border border-mwPrimary-100 ${autoComplete.suggestions.status === 'OK' ? 'rounded-b-none rounded-t-[8px]' : 'rounded-[8px]'}`;

	return (
		<div className='w-full flex-col justify-start items-start'>
			<div className={`w-full flex flex-row justify-between items-center px-6 py-[19px] gap-x-2  ${border} bg-white `}>
				<div className='w-full h-12 lg:h-14 flex flex-row justify-start items-center'>
					<input
						className={`w-full peer outline-none border-none ring-transparent bg-transparent  truncate placeholder:truncate ${textColor}`}
						value={autoComplete.value}
						disabled={!autoComplete.ready || isDisabled}
						onChange={(e) => autoComplete.setValue(e.target.value)}
						placeholder={placeHolderText}
					/>
				</div>

				<div className='hidden desktop:flex'>
					{autoComplete.value.length === 0 && path !== 'lte' && (
						<UseLocBtn buttonFunction={() => handleGetCurrentLocationForCoverage()} inputString={autoComplete.value} isDisabled={isDisabled} isLoading={isLoading} />
					)}
				</div>

				{autoComplete.value.length === 0 && <ConfirmLocBtn buttonFunction={() => {}} inputString={'lte'} isDisabled={isDisabled} isLoading={isLoading} />}

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

			{/* use location */}
			{path === 'fibre' && currentFormattedAdress.length === 0 && (
				<div className={` w-full flex flex-row justify-center items-center pt-4 `}>
					<UseLocBtn buttonFunction={() => handleGetCurrentLocationForCoverage()} inputString={autoComplete.value} isDisabled={isDisabled} isLoading={isLoading} />
				</div>
			)}

			{autoComplete.suggestions.status === 'OK' && (
				<ul className='w-full list-none  rounded-t-none rounded-b-[8px] bg-white border border-t-0 border-mwPrimary-100'>{renderSuggestions()}</ul>
			)}

			{path === 'lte' && (
				<div className='w-full flex flex-row justify-center items-center pt-4'>
					<UseLocBtn buttonFunction={() => handleGetCurrentLocationForCoverage()} inputString={autoComplete.value} isDisabled={isDisabled} isLoading={isLoading} />
				</div>
			)}
		</div>
	);
}

// OLD VERSION

// export default function SearchBarSquare(props: iProps) {
// 	const {children, isDisabled} = props;
// 	const {handleGetCurrentLocationForCoverage, currentFormattedAdress} = useCoverage();
// 	const path = usePathname()?.split('/')[1];

// 	const container = `rounded-lg ${currentFormattedAdress.length > 0 ? 'bg-mwBlueGrey-25' : 'bg-white'} py-[19px] px-6`;
// 	const icon = isDisabled ? 'text-mwGrey-300' : 'text-mwLightTeal-900';
// 	const text = `text-mwTextParaSmall text-mwGrey-600 ml-1 ${isDisabled ? 'text-mwGrey-300' : 'text-mwGrey-600'}`;

// 	const basic = `w-full  p-4 border border-mwPrimary-100 `;
// 	const styling = isDisabled ? `${basic} ${disabled}` : `${basic} ${normal}`;
// 	const flexing = 'flex flex-row justify-end items-center';
// 	const square = 'text-mwTextParaBaseSemi text-mwPrimary-900';

// 	return (
// 		<div className={currentFormattedAdress.length > 0 ? 'w-full' : 'w-full flex flex-col justify-start items-center'}>
// 			{/* input and buttons  */}
// 			<div className={`${container} ${styling} ${flexing} ${square} gap-x-2`}>{children}</div>

// {/* use location */}
// {path === 'fibre' && currentFormattedAdress.length === 0 && (
// 	<div className={` w-full flex flex-row justify-center items-center pt-4 `}>
// 		<div className={'flex w-max mr-6 hover:cursor-pointer justify-center items-center'} onClick={() => handleGetCurrentLocationForCoverage()}>
// 			<MwebIcon iconType={'location'} size={20} color={icon} />
// 			<div className={text}>Use current location</div>
// 		</div>
// 	</div>
// )}

// {path === 'lte' && (
// 	<div className='w-full flex flex-row justify-center items-center pt-4'>
// 		<div className={'flex w-max mr-6 hover:cursor-pointer justify-center items-center'} onClick={() => handleGetCurrentLocationForCoverage()}>
// 			<MwebIcon iconType={'location'} size={20} color={icon} />
// 			<div className={text}>Use current location</div>
// 		</div>
// 	</div>
// )}
// 		</div>
// 	);
// }
