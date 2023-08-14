'use client';

import React, {useEffect, useState} from 'react';
import {useCoverage} from '@/context/CoverageContext';
import {useNavContext} from '@/context/NavigationContext';
import parse from 'html-react-parser';
import {useInternetServiceProviders} from '@/context/InternetServiceProvidersContent';
import {useClientJourney} from '@/context/ClientJourneyContext';
import CoverageMap from './CoverageMap';
import ConfirmLocationList from './ConfirmLocationList';
import {IProviderLocation, iActiveProvider, iLocationEntry} from '@/models/Coverage';

interface iProps {
	headerText: string;
	subHeaderText?: string;
}

function firstLetterCapitilize(str: string) {
	const arr = str.split(' ');

	//loop through each element of the array and capitalize the first letter.
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}

	//Join all the elements of the array back into a string using a blankspace as a separator
	const str2 = arr.join(' ');
	return str2;
}

export default function ConfirmLocation(props: iProps) {
	const {headerText, subHeaderText} = props;

	const {currentFormattedAdress, isLoading} = useCoverage();
	const {internetServiceProvidersMatched} = useInternetServiceProviders();
	const {selectedProduct} = useClientJourney();
	const {handleIsNextActive} = useNavContext();

	const [locations, setlocations] = useState<iLocationEntry[]>([]);
	const [providerNeedsLocArr, setproviderNeedsLocArr] = useState<boolean>(false);

	useEffect(() => {
		let found = internetServiceProvidersMatched.filter((x) => x.provider === selectedProduct?.providerCode)[0];
		// console.log('%c Location array from ISP', 'color:lightseagreen', selectedProduct?.providerCode, internetServiceProvidersMatched.length, found);

		if (found && found.hasAdressList) {
			handleProviderWithList(found);
			setproviderNeedsLocArr(found.hasAdressList);
		} else {
			setproviderNeedsLocArr(false);
			handleIsNextActive(true);
		}
	}, [internetServiceProvidersMatched, selectedProduct]);

	function handleProviderWithList(providerMatched: iActiveProvider) {
		let update: iLocationEntry[] = [];

		providerMatched.locationResult.forEach((loc) => {
			let locAdj = loc.address.toLocaleLowerCase().replace(' av ', ' ave ').replace(' cl ', ' close ').replaceAll(',', '');
			let coverAdressAdj = currentFormattedAdress.toLocaleLowerCase().replace(' cl ', ' close ').replace(' st ', ' street ').replaceAll(',', '');
			let isIncluded = coverAdressAdj.indexOf(locAdj);

			if (isIncluded !== -1 && providerMatched.provider === selectedProduct?.providerCode) {
				let curr: iLocationEntry = loc as iLocationEntry;
				// console.log('%c Adress matched ???', 'color:lime');
				curr.selected = true;
				curr.address = firstLetterCapitilize(locAdj);
				update.push(curr);
				handleIsNextActive(true);
			}
			// not matched but need to make adress neat
			else {
				let curr: iLocationEntry = loc as iLocationEntry;
				curr.selected = false;
				curr.address = firstLetterCapitilize(locAdj);
				update.push(curr);
			}
		});

		setlocations(update.sort((a, b) => Number(b.selected) - Number(a.selected)));
	}

	function handleSelectedAddress(selected: IProviderLocation) {
		console.log('%c handleSelectedAddress => Need to do this still', 'color:yellow', selected);
		let newArr: iLocationEntry[] = [];

		locations.forEach((location) => {
			if (location.address === selected.address) {
				location.selected = true;
				newArr.push(location);

				if (currentFormattedAdress !== selected.address) {
					// getAddressObj(seleceted.lat, seleceted.lng);
					// handleSetMap(seleceted.lat, seleceted.lng);
				}
			} else {
				location.selected = false;
				newArr.push(location);
			}
		});

		setlocations(newArr);
		handleIsNextActive(true);
	}

	return (
		<div className='w-full flex flex-col lg:flex-row lg:justify-between'>
			{/* left */}
			<div className='w-full lg:max-w-[500px] desktop:max-w-[695px] flex align-center px-4 py-8 lg:py-16 lg:px-20'>
				<div className='w-full flex flex-col justify-start items-start'>
					<div className='w-full text-mwTextMobileH2Bold md:text-mwTextDeskH2Bold text-mwGrey-900 text-center lg:text-left pb-8 md:pb-10'>{headerText}</div>

					<ConfirmLocationList
						locationArray={locations}
						currentFormattedAdress={currentFormattedAdress}
						providerNeedsLocArr={providerNeedsLocArr}
						handleSelectedAddress={(loc) => handleSelectedAddress(loc)}
					/>

					{!isLoading && subHeaderText && providerNeedsLocArr && (
						<div className='w-full flex flex-col justify-start items-center '>
							<div className='text-mwTextParaBaseSemi md:text-mwTextParaLargeSemi text-mwGrey-900 text-left pt-6 md:pt-8 pb-4'>{parse(subHeaderText)}</div>
						</div>
					)}
				</div>
			</div>

			{/* right */}
			<div className='w-full desktop:max-w-[774px] pb-8 lg:pb-0'>
				<CoverageMap />
			</div>
		</div>
	);
}
