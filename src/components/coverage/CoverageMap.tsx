'use client';

import React, {useState, useEffect, useMemo} from 'react';
// import {GoogleMap, MarkerF, useGoogleMap, useLoadScript} from '@react-google-maps/api';
import {useCoverage} from '@/context/CoverageContext';
import {usePathname} from 'next/navigation';

export default function CoverageMap() {
	const {mapSource} = useCoverage();
	const path = usePathname();

	const mapStringFibre: string = `//${process.env.NEXT_PUBLIC_28EAST_MAP_URL}?geolocate=false&hidecoveragelayers=true&hidesearch=true&&satellite=true&showMapType=true&`;
	const mapStringLte: string = `//${process.env.NEXT_PUBLIC_28EAST_MAP_URL}?geolocate=false&hidecoveragelayers=true&hidesearch=true&&satellite=true&showMapType=true&`;

	const [mapSrc, setMapSrc] = useState<string>(`${mapStringFibre}location=0,0`);

	useEffect(() => {
		handleSetMap();
	}, [mapSource]);

	function handleSetMap() {
		let lat = mapSource.lat;
		let lng = mapSource.long;

		let type = path ? path.split('/')[1] : 'fibre';
		let use = type === 'fibre' ? mapStringFibre : mapStringLte;
		let map = `${use}location=${lat},${lng}`;

		// console.log('%c MAP', 'color:orange', mapSrc, ' => ', map, '???', isSameMap);
		setMapSrc(map);
	}

	return (
		<div className='w-full pb-8 lg:pb-0'>
			<div className='w-full'>
				<iframe id='mweb-coverage-map-iframe' className='w-full aspect-map' src={mapSrc} />
			</div>
		</div>
	);
}

// @react-google-maps/api Version works but breaks when deploying to vercel need to use this variation once vercel issue is resolved (npm package issue)
// export default function CoverageMap() {
// const {handleSetMap, getAddressObj, providerType, mapSource} = useCoverage();

// // Store lat, lng as State Variables
// const [lat, setLat] = useState(-33.8142359);
// const [lng, setLng] = useState(18.5144319);

// // Add lat, lng as dependencies
// const mapCenter = useMemo(() => ({lat: lat, lng: lng}), [lat, lng]);

// const {isLoaded, loadError} = useLoadScript({
// 	googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
// });

// useEffect(() => {
// 	if ((lat !== mapSource.lat && mapSource.lat !== 0) || (lng !== mapSource.long && mapSource.long !== 0)) {
// 		setLat(mapSource.lat);
// 		setLng(mapSource.long);
// 	}
// }, [mapSource]);

// // handle the movement of the map pin as well as clicking on the map to change locations => google.maps.MapMouseEvent
// function handleMapPinMoved(e: any) {
// 	if (providerType !== providerJourneyType.fibre) {
// 		let lt = e.latLng?.toJSON().lat ?? 0;
// 		let lg = e.latLng?.toJSON().lng ?? 0;
// 		console.log('%c Clicked on the map need to inform coverage context of this ', 'color:coral', lt, lg);

// 		handleSetMap(lt, lg);
// 		setLat(lt);
// 		setLng(lg);
// 		getAddressObj(lt, lg);
// 	}
// }

// function Map() {
// 	return (
// 		<GoogleMap
// 			options={{
// 				disableDefaultUI: true,
// 				clickableIcons: false,
// 				scrollwheel: false,
// 				mapTypeId: 'satellite', // google.maps.MapTypeId.SATELLITE,
// 				draggable: providerType !== providerJourneyType.fibre ? true : false,
// 				zoomControl: providerType !== providerJourneyType.fibre ? true : false,
// 				disableDoubleClickZoom: providerType !== providerJourneyType.fibre ? true : true,
// 				mapTypeControl: true,
// 				mapTypeControlOptions: {
// 					style: 0, //google.maps.MapTypeControlStyle.DEFAULT,
// 					position: 3, //google.maps.ControlPosition.LEFT_BOTTOM,
// 					mapTypeIds: ['roadmap', 'satellite'],
// 				},
// 			}}
// 			zoom={18}
// 			center={mapCenter}
// 			mapContainerStyle={{aspectRatio: '129 / 118'}}
// 			onLoad={() => console.log('Map Component Loaded')}
// 			onClick={(e) => handleMapPinMoved(e)}
// 			onMapTypeIdChanged={() => console.log('Map type changed ')}
// 		>
// 			<MarkerF
// 				position={mapCenter}
// 				onLoad={() => console.log('Marker Loaded')}
// 				draggable={providerType !== providerJourneyType.fibre ? true : false}
// 				clickable={providerType !== providerJourneyType.fibre ? true : false}
// 				icon={{
// 					path: 'M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 21.625C11.8667 21.625 11.7333 21.6 11.6 21.55C11.4667 21.5 11.35 21.4333 11.25 21.35C8.81667 19.2 7 17.2042 5.8 15.3625C4.6 13.5208 4 11.8 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8 19.4 13.5208 18.2 15.3625C17 17.2042 15.1833 19.2 12.75 21.35C12.65 21.4333 12.5333 21.5 12.4 21.55C12.2667 21.6 12.1333 21.625 12 21.625Z',
// 					fillColor: '#4FB1AF',
// 					fillOpacity: 0.9,
// 					strokeWeight: 0,
// 					rotation: 0,
// 					scale: 2,
// 					// anchor: new google.maps.Point(mapCenter.lat, mapCenter.lng),
// 				}}
// 				visible={true}
// 				onDragEnd={(e) => handleMapPinMoved(e)}
// 			/>
// 		</GoogleMap>
// 	);
// }

// if (!isLoaded) {
// 	return <div>Loading map please wait ...</div>;
// }

// return <div>Map should be here <Map/> </div>;

// }
