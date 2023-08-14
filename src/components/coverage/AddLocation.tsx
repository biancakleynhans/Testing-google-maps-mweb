'use client';

import React, {useEffect, useState} from 'react';
import {useCoverage} from '@/context/CoverageContext';
import {useNavContext} from '@/context/NavigationContext';
import {usePathname} from 'next/navigation';
import {useInternetServiceProviders} from '@/context/InternetServiceProvidersContent';
import CoverageMap from './CoverageMap';
import MwebSearchBar from '../ui/mwebSearch/MwebSearchBar';

interface iLoc {
	address: string;
	selected: boolean;
	lat: number;
	lng: number;
}

interface iProps {
	providerType: 'fibre' | 'lte';
	headerText: string;
	subHeaderText?: string;
}

export default function AddLocation(props: iProps) {
	const {providerType, headerText, subHeaderText} = props;
	const {currentFormattedAdress, currentCoverageObj, mapSource, isLoading, handleSetMap, getAddressObj} = useCoverage();
	const {handleIsNextActive} = useNavContext();
	const {servicesFromCoverage} = useInternetServiceProviders();

	const path = usePathname()?.split('/')[1];

	const [locationsArr, setlocationsArr] = useState<iLoc[]>([]);

	// setting up of the location arr based on the service providers available and assigned adresses to them
	// useEffect(() => {
	// 	let arr: iLoc[] = [];

	// 	if (servicesFromCoverage !== undefined && servicesFromCoverage.length > 0) {
	// 		let data = servicesFromCoverage.filter((s) => s.type === providerType)[0];
	// 		let providers = data !== undefined ? data.providers : [];

	// 		if (providers.length > 0) {
	// 			let locations = providers.flatMap((p: any) => p.location_result).filter((x: any) => x !== undefined);

	// 			if (locations.length > 0) {
	// 				arr.push({
	// 					address: currentFormattedAdress,
	// 					selected: true,
	// 					lat: currentCoverageObj?.geometry.location.lat,
	// 					lng: currentCoverageObj?.geometry.location.lng,
	// 				});

	// 				locations.forEach((location: any) => {
	// 					let isAdded = arr.filter((x) => x.address.slice(0, 15) === location.address.slice(0, 15))[0] !== undefined;
	// 					// console.log('%c SINGLE LOCATION', 'color:coral', isAdded, location.address);

	// 					if (!isAdded) {
	// 						arr.push({
	// 							address: location.address,
	// 							selected: false,
	// 							lat: location.latitude,
	// 							lng: location.longitude,
	// 						});
	// 					}
	// 				});

	// 				console.log('%c arr end', 'color:peachpuff', arr);
	// 				setlocationsArr(arr.slice(0, 3));
	// 				// handleIsNextActive();
	// 			}
	// 			// no locations only fixed one
	// 			else {
	// 				setlocationsArr([]);
	// 				// handleIsNextActive();
	// 			}
	// 		}
	// 		// no fibre
	// 		else {
	// 			setlocationsArr([]);
	// 			console.log('%c  no fibre available do pop up for no fibre found here', 'color:yellow', data, providers);
	// 		}
	// 	}
	// }, [servicesFromCoverage, providerType]);

	useEffect(() => {}, [isLoading]);

	useEffect(() => {
		if (currentFormattedAdress.length > 0) {
			handleIsNextActive(true);
		}
	}, [currentFormattedAdress]);

	// function handleSelectedAddress(seleceted: iLoc) {
	// 	let newArr: iLoc[] = [];

	// 	locationsArr.forEach((location) => {
	// 		if (location.address === seleceted.address) {
	// 			location.selected = true;
	// 			newArr.push(location);

	// 			if (currentFormattedAdress !== seleceted.address) {
	// 				getAddressObj(seleceted.lat, seleceted.lng);
	// 				handleSetMap(seleceted.lat, seleceted.lng);
	// 			}
	// 		} else {
	// 			location.selected = false;
	// 			newArr.push(location);
	// 		}
	// 	});

	// 	setlocationsArr(newArr);
	// 	handleIsNextActive(true);
	// }

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			{/* left */}
			<div className='flex align-center w-full  lg:max-w-[500px] desktop:max-w-[695px] px-4 py-8 lg:py-16 lg:px-20'>
				<div className='w-full flex flex-col justify-start items-start'>
					<div className='w-full text-mwTextMobileH2Bold md:text-mwTextDeskH2Bold text-mwGrey-900 text-center lg:text-left pb-8 md:pb-10'>{headerText}</div>

					<MwebSearchBar type='square' placeHolderText={currentFormattedAdress.length > 0 ? currentFormattedAdress : 'Enter your address'} isDisabled={false} />

					{!isLoading && subHeaderText && (
						<div className='w-full flex flex-col justify-start items-center '>
							<div className='text-mwTextParaBaseSemi md:text-mwTextParaLargeSemi text-mwGrey-900 text-left pt-6 md:pt-8 pb-4'>{subHeaderText}</div>
						</div>
					)}

					{/* {!isLoading && locationsArr.length > 0 && (
						<div className='w-full flex flex-col justify-start items-start gap-y-2'>
							{locationsArr.map((location: iLoc, i) => (
								<div key={`confirm-location-option-${i}`} className={`w-full`}>
									<div className={`hidden md:flex w-full`}>
										<MwebRadioButton
											id={`confirm-location-option-${i}`}
											disabled={false}
											handleOnChange={(isSelected) => (isSelected ? handleSelectedAddress(location) : null)}
											label={location.address}
											isSelected={location.selected}
											variant={'fill'}
											size={'large'}
										/>
									</div>
									<div className={`flex md:hidden w-full`}>
										<MwebRadioButton
											id={`confirm-location-option-${i}`}
											disabled={false}
											handleOnChange={(isSelected) => (isSelected ? handleSelectedAddress(location) : null)}
											label={location.address}
											isSelected={location.selected}
											variant={'fill'}
											size={'small'}
										/>
									</div>
								</div>
							))}
						</div>
					)} */}
				</div>
			</div>

			{/* right */}
			<div className='w-full pb-8 lg:pb-0'>
				<CoverageMap />
			</div>
		</div>
	);
}
