'use client';
import {useState, useEffect, Suspense} from 'react';

import {useMediaQuery} from 'react-responsive';
import MwebSliceContainer from '../shared/MwebSliceContainer';
import {useCoverage} from '@/context/CoverageContext';
import {IAddressObject} from '@/models/Coverage';
import MwebSearchBar from '../ui/mwebSearch/MwebSearchBar';

export default function HomeInternetLanding({pageContent}: {pageContent: any}) {
	const {getAddressObj, currentCoverageObj} = useCoverage();
	const [currentUserLocation, setCurrentUserLocation] = useState<IAddressObject | null>(currentCoverageObj);

	// Get user location
	useEffect(() => {
		if (window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition(
				(position) => {
					// Grab latitude and longitude and transform them into place name:
					const {latitude, longitude} = position.coords;

					// const adddress = getAddressObj(latitude, longitude);
					// console.log('user adddress', adddress);
					// setCurrentUserLocation(adddress);
				},
				(permissionError) => {
					console.log('User denied web browser location access:', permissionError);
				}
			);
		} else {
			console.warn('Geo location not available');
		}
	}, [getAddressObj]);

	// Update component with user location obtained from coverage context getAddressObj()
	useEffect(() => {
		setCurrentUserLocation(currentCoverageObj);
	}, [currentCoverageObj]);

	const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'});

	return (
		<MwebSliceContainer sectionId='coverage-search-bar' bgColor='bg-mwBlueGrey-50' padding='px-4 py-8 md:px-[81px] md:py-6 lg:px-[182px] lg:py-12'>
			<Suspense fallback={`<p>loading map ...</p>`}>
				<MwebSearchBar type='round' isDisabled={false} placeHolderText={`${isTabletOrMobile ? 'Enter your address' : 'Enter your address to get connected'}`} />
			</Suspense>
		</MwebSliceContainer>
	);
}
