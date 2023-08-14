'use client';

import React, {useMemo, useState, useEffect} from 'react';
import {GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';
import {providerJourneyType, useCoverage} from '@/context/CoverageContext';

const containerStyle = {
	width: '100%',
	height: '100vh',
};

const svgMarker = {
	path: 'M20.0003 20.0002C20.917 20.0002 21.7017 19.6738 22.3545 19.021C23.0073 18.3682 23.3337 17.5835 23.3337 16.6668C23.3337 15.7502 23.0073 14.9654 22.3545 14.3127C21.7017 13.6599 20.917 13.3335 20.0003 13.3335C19.0837 13.3335 18.2989 13.6599 17.6462 14.3127C16.9934 14.9654 16.667 15.7502 16.667 16.6668C16.667 17.5835 16.9934 18.3682 17.6462 19.021C18.2989 19.6738 19.0837 20.0002 20.0003 20.0002ZM20.0003 36.0418C19.7781 36.0418 19.5559 36.0002 19.3337 35.9168C19.1114 35.8335 18.917 35.7224 18.7503 35.5835C14.6948 32.0002 11.667 28.6738 9.66699 25.6043C7.66699 22.5349 6.66699 19.6668 6.66699 17.0002C6.66699 12.8335 8.00727 9.51405 10.6878 7.04183C13.3684 4.56961 16.4725 3.3335 20.0003 3.3335C23.5281 3.3335 26.6323 4.56961 29.3128 7.04183C31.9934 9.51405 33.3337 12.8335 33.3337 17.0002C33.3337 19.6668 32.3337 22.5349 30.3337 25.6043C28.3337 28.6738 25.3059 32.0002 21.2503 35.5835C21.0837 35.7224 20.8892 35.8335 20.667 35.9168C20.4448 36.0002 20.2225 36.0418 20.0003 36.0418Z',
	fillColor: '#4FB1AF',
	fillOpacity: 1,
	strokeWeight: 0,
	rotation: 0,
	scale: 1,
};

export default function CoverageMap() {
	const {getAddressObj, providerType, mapSource} = useCoverage();

	// Store lat, lng as State Variables
	const [lat, setLat] = useState(-33.8142359);
	const [lng, setLng] = useState(18.5144319);

	// Add lat, lng as dependencies
	const mapCenter = useMemo(() => ({lat: lat, lng: lng}), [lat, lng]);

	const mapOptions = {
		disableDefaultUI: true,
		clickableIcons: false,
		scrollwheel: false,
		mapTypeId: 'satellite', // google.maps.MapTypeId.SATELLITE,
		draggable: providerType !== providerJourneyType.fibre ? true : false,
		zoomControl: providerType !== providerJourneyType.fibre ? true : false,
		disableDoubleClickZoom: providerType !== providerJourneyType.fibre ? true : true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: 0, //google.maps.MapTypeControlStyle.DEFAULT,
			position: 6.0, //google.maps.ControlPosition.LEFT_BOTTOM,
			mapTypeIds: ['roadmap', 'satellite'],
		},
	};

	const {isLoaded} = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
	});

	useEffect(() => {
		if ((lat !== mapSource.lat && mapSource.lat !== 0) || (lng !== mapSource.long && mapSource.long !== 0)) {
			setLat(mapSource.lat);
			setLng(mapSource.long);
		}
	}, [mapSource]);

	// handle the movement of the map pin as well as clicking on the map to change locations => google.maps.MapMouseEvent
	function handleMapPinMoved(e: any) {
		if (providerType !== providerJourneyType.fibre) {
			let lt = e.latLng?.toJSON().lat ?? 0;
			let lg = e.latLng?.toJSON().lng ?? 0;

			console.log('%c Clicked on the map need to inform coverage context of this ', 'color:coral', lt, lg);

			setLat(lt);
			setLng(lg);
			getAddressObj(lt, lg);
		}
	}

	function Map() {
		return (
			<GoogleMap
				options={mapOptions}
				zoom={18}
				center={mapCenter}
				onClick={(e) => handleMapPinMoved(e)}
				mapContainerStyle={containerStyle}
				// mapContainerStyle={{aspectRatio: '129 / 118'}}
				// onLoad={() => console.log('Map Component Loaded')}
				// onMapTypeIdChanged={() => console.log('Map type changed ')}
			>
				<MarkerF
					position={mapCenter}
					// onLoad={() => console.log('Marker Loaded')}
					draggable={providerType !== providerJourneyType.fibre ? true : false}
					clickable={providerType !== providerJourneyType.fibre ? true : false}
					icon={svgMarker}
					visible={true}
					onDragEnd={(e) => handleMapPinMoved(e)}
				/>
			</GoogleMap>
		);
	}

	if (!isLoaded) {
		return <div>Loading map please wait ...</div>;
	}

	return <Map />;
}
