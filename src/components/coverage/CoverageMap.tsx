'use client';

import React, {useMemo, useState} from 'react';
import {GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
	width: '400px',
	height: '400px',
};

function Map() {
	const center = useMemo(() => ({lat: 43.45, lng: -80.49}), []);

	return (
		<>
			<GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle}>
				<MarkerF position={center} />
			</GoogleMap>
		</>
	);
}

export default function CoverageMap() {
	const {isLoaded} = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
	});

	if (!isLoaded) return <div>Loading...</div>;
	return <Map />;
}

// import {useMemo} from 'react';
// import React from 'react';
// import {GoogleMap, useJsApiLoader, MarkerF} from '@react-google-maps/api';

// const containerStyle = {
// 	width: '100%',
// 	height: '100vh',
// };

// export default function CoverageMap() {
// 	const center = useMemo(
// 		() => ({
// 			lat: -30.5595,
// 			lng: 22.9375,
// 		}),
// 		[]
// 	);

// 	const {isLoaded} = useJsApiLoader({
// id: 'google-map-script',
// googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
// 	});

// 	const svgMarker = {
// 		path: 'M20.0003 20.0002C20.917 20.0002 21.7017 19.6738 22.3545 19.021C23.0073 18.3682 23.3337 17.5835 23.3337 16.6668C23.3337 15.7502 23.0073 14.9654 22.3545 14.3127C21.7017 13.6599 20.917 13.3335 20.0003 13.3335C19.0837 13.3335 18.2989 13.6599 17.6462 14.3127C16.9934 14.9654 16.667 15.7502 16.667 16.6668C16.667 17.5835 16.9934 18.3682 17.6462 19.021C18.2989 19.6738 19.0837 20.0002 20.0003 20.0002ZM20.0003 36.0418C19.7781 36.0418 19.5559 36.0002 19.3337 35.9168C19.1114 35.8335 18.917 35.7224 18.7503 35.5835C14.6948 32.0002 11.667 28.6738 9.66699 25.6043C7.66699 22.5349 6.66699 19.6668 6.66699 17.0002C6.66699 12.8335 8.00727 9.51405 10.6878 7.04183C13.3684 4.56961 16.4725 3.3335 20.0003 3.3335C23.5281 3.3335 26.6323 4.56961 29.3128 7.04183C31.9934 9.51405 33.3337 12.8335 33.3337 17.0002C33.3337 19.6668 32.3337 22.5349 30.3337 25.6043C28.3337 28.6738 25.3059 32.0002 21.2503 35.5835C21.0837 35.7224 20.8892 35.8335 20.667 35.9168C20.4448 36.0002 20.2225 36.0418 20.0003 36.0418Z',
// 		fillColor: '#4FB1AF',
// 		fillOpacity: 1,
// 		strokeWeight: 0,
// 		rotation: 0,
// 		scale: 1,
// 	};

// 	return isLoaded ? (
// 		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
// 			<MarkerF position={center} icon={svgMarker} />
// 		</GoogleMap>
// 	) : (
// 		<></>
// 	);
// }

// import React, {useState, useEffect, useMemo} from 'react';
// // import {GoogleMap, MarkerF, useGoogleMap, useLoadScript} from '@react-google-maps/api';
// import {useCoverage} from '@/context/CoverageContext';
// import {usePathname} from 'next/navigation';

// export default function CoverageMap() {
// 	const {mapSource} = useCoverage();
// 	const path = usePathname();

// 	const mapStringFibre: string = `//${process.env.NEXT_PUBLIC_28EAST_MAP_URL}?geolocate=false&hidecoveragelayers=true&hidesearch=true&&satellite=true&showMapType=true&`;
// 	const mapStringLte: string = `//${process.env.NEXT_PUBLIC_28EAST_MAP_URL}?geolocate=false&hidecoveragelayers=true&hidesearch=true&&satellite=true&showMapType=true&`;

// 	const [mapSrc, setMapSrc] = useState<string>(`${mapStringFibre}location=0,0`);

// 	useEffect(() => {
// 		handleSetMap();
// 	}, [mapSource]);

// 	function handleSetMap() {
// 		let lat = mapSource.lat;
// 		let lng = mapSource.long;

// 		let type = path ? path.split('/')[1] : 'fibre';
// 		let use = type === 'fibre' ? mapStringFibre : mapStringLte;
// 		let map = `${use}location=${lat},${lng}`;

// 		// console.log('%c MAP', 'color:orange', mapSrc, ' => ', map, '???', isSameMap);
// 		setMapSrc(map);
// 	}

// 	return (
// 		<div className='w-full pb-8 lg:pb-0'>
// 			<div className='w-full'>
// 				<iframe id='mweb-coverage-map-iframe' className='w-full aspect-map' src={mapSrc} />
// 			</div>
// 		</div>
// 	);
// }

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
