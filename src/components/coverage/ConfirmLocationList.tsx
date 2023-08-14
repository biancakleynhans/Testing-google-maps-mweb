'use client';

import React, {useEffect, useState} from 'react';
import MwebRadioButton from '../ui/mwebRadioButton/MwebRadioButton';
import {useRouter} from 'next/navigation';
import InputForAdressListSearch from '../ui/mwebSearch/InputForAdressListSearch';
import {iLocationEntry} from '@/models/Coverage';

interface iProps {
	locationArray: iLocationEntry[];
	providerNeedsLocArr: boolean;
	currentFormattedAdress: string;
	handleSelectedAddress: (location: iLocationEntry) => void;
}

const AddressEntry = ({i, location, handleSelectedAddress}: {i: number; location: iLocationEntry; handleSelectedAddress: (loc: iLocationEntry) => void}) => {
	return (
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
	);
};

export default function ConfirmLocationList(props: iProps) {
	const {handleSelectedAddress, locationArray, currentFormattedAdress, providerNeedsLocArr} = props;

	const router = useRouter();

	const [searchValue, setsearchValue] = useState<string>('');
	const [filteredAdresses, setfilteredAdresses] = useState<iLocationEntry[]>([]);

	useEffect(() => {
		if (searchValue.length > 0) {
			handleSearchList();
		}
	}, [searchValue]);

	useEffect(() => {
		if (filteredAdresses.length === 0 && searchValue.length === 0) {
			setfilteredAdresses(locationArray);
		}
	}, [locationArray]);

	useEffect(() => {}, [filteredAdresses]);

	function handleSearchList() {
		// console.log(`%c the searched value is: ${searchValue} find match in array`, 'color:orange');

		// handle filter through the list to find match
		let find: iLocationEntry[] = []; //locationArray.filter((x) => x.address.toLowerCase().includes(searchValue));// needs to be in excact order

		locationArray.forEach((loc) => {
			let subArr = searchValue.split(' ');

			if (subArr.length > 0) {
				subArr.forEach((subString) => {
					if (subString.length > 0 && loc.address.toLowerCase().includes(subString.toLocaleLowerCase())) {
						if (find.length > 0) {
							if (find.filter((x) => x.address !== loc.address)) {
								find.push(loc);
							}
						} else {
							find.push(loc);
						}
					}
				});
			} else {
				find.push(loc);
			}
		});

		// console.log('%c Possible matches', 'color:yellow', find);
		setfilteredAdresses(find);
	}

	const fixed = 'w-full overflow-y-scroll flex flex-col justify-start items-start gap-y-2';

	return (
		<div className='w-full flex flex-col justify-start items-start'>
			{providerNeedsLocArr && locationArray.length > 6 && (
				<InputForAdressListSearch inputValue={searchValue} handleChange={(e) => setsearchValue(e)} placeHolderText='Search for your address' />
			)}

			{!providerNeedsLocArr && <div className='text-mwTextParaLarge text-left'>{currentFormattedAdress} </div>}

			{!providerNeedsLocArr && (
				<div onClick={() => router.push('/fibre')} className='py-8 text-mwTextParaLargeSemi text-left cursor-pointer'>
					Change Address
				</div>
			)}

			{providerNeedsLocArr && locationArray.length > 0 && (
				<div className='w-full  pt-8'>
					<div
						className={`${filteredAdresses.length > 6 ? 'addressListShow' : 'addressListHide'} ${fixed} ${
							filteredAdresses.length > 6 ? 'min-h-[172px] h-full max-h-[344px]' : 'h-[164px]'
						}`}
					>
						{filteredAdresses.map((location: iLocationEntry, i) => (
							<AddressEntry key={i} i={i} location={location} handleSelectedAddress={(loc) => handleSelectedAddress(loc)} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
