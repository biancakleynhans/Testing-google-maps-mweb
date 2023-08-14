'use client';

/* 
	Coverage Context that holds all of the api calls and data available through out the application and ensures consistancy. 
	Here we will add the load from local storage when ready but for now it 
	handles all of the required logic to get the correct lat, long as well as physical location. 
	It keeps a copy of the adress object, the formatted address string as well as the services associated to that location. 
 */

/*
	TEST ADRESSES: 
	  FIBRE GREEN => 29 Sheffield Cl, Milnerton Rural, Cape Town, 7441, South Africa
	  FIBRE AMBER => 0 West St, Parow East, Cape Town, 7500, South Africa
	  FIBRE RED   => R27, Cape Farms, Cape Town, South Africa

	  LTE GREEN   => 100 Fairway Cl, Golf Course, Cape Town, 7500, South Africa
	  LTE AMBER   =>
	  LTE RED     =>

	  NO SERVICES => WHF9+XX Kugqawe, South Africa


	  Lte but no fibre => 47 Old Main Rd, Bothas Hill, Durban, 3610, South Africas
*/

import React, {useState, createContext, useContext, ReactNode, useEffect} from 'react';
import {fetchFromClient} from '@/utils/Fetching';
import {IAddressObject, IServiceEntry} from '@/models/Coverage';
import {usePathname, useRouter} from 'next/navigation';
import {useInternetServiceProviders} from './InternetServiceProvidersContent';
import Script from 'next/script';
import {getGeocode} from 'use-places-autocomplete';
import {AddCoverageDataToShoppingCart, GetCoverageDataToShoppingCart} from '@/utils/Coverage';
import useCheckoutProcess from '@/hooks/useCheckoutProcess';
import {NavJourneyFibre, NavJourneyFibreAmber, NavJourneyHomeInternet, NavJourneyLte} from '@/constants/NavJourneySets';

export enum providerJourneyType {
	'fibre' = 'fibre',
	'lte' = 'lte',
	'5G' = '5G',
	'home' = 'fibre',
	'error' = '',
}

export enum providerJourneyStatus {
	'green' = 'green',
	'amber' = 'amber',
	'red' = 'red',
	'error' = '',
}

interface ICoverageContext {
	startCoverage: (location: IAddressObject) => void;
	handleGetCurrentLocationForCoverage: () => void;
	handleSetMap: (lat: number, long: number) => void;
	getAddressObj: (lat: number, long: number) => void;

	mapSource: {lat: number; long: number};
	currentCoverageObj: IAddressObject | null;
	currentFormattedAdress: string;

	providerType: providerJourneyType;
	handleProviderType: (val: providerJourneyType) => void;
	statusType: providerJourneyStatus;
	hasError: boolean;
	errorMessage: string;

	isLoading: boolean;
	handleLoading: (val: boolean) => void;

	startProgression: boolean;
	endProgression: () => void;
	handleReset: () => void;
}

interface iProps {
	children: ReactNode;
}

// navigator options
const NAVIGATOR_OPTIONS = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 3000,
};

// converts path string to providerJourneyType
function convertEnumToString(path: string): providerJourneyType {
	let val = path?.split('/')[1] ?? '';
	return val === 'fibre' ? providerJourneyType.fibre : val === 'lte' ? providerJourneyType.lte : val === '5g' ? providerJourneyType['5G'] : providerJourneyType.home;
}

// api call to 28 east to get the services for this location function
async function doApiCallTo28E(lat: number, long: number) {
	let api: IServiceEntry[] | string = await getServices(lat, long);
	return api;
}

/*GET THE SERVICES VIA FETCH CALL FOR WHEN USER ENTERS ADRESS IN SEARCH BAR*/
async function getServices(latitude: number, longitude: number): Promise<IServiceEntry[] | string> {
	const url = `${process.env.NEXT_PUBLIC_COVERAGE_URL}${latitude}/${longitude}`;
	const response = await fetchFromClient(url);
	const data = await response.json();

	let services: IServiceEntry[] = [];

	if (response.ok) {
		// console.log('%c DATA response', 'color:yellow ', data);

		services = data.services;

		if (services.length > 0) {
			return Promise.resolve(services);
		} else {
			return Promise.resolve('No services available');
		}
	} else {
		// console.log('%c Error happend getServices', 'color:red', response);
		return Promise.resolve(`error happend`);
	}
}

/* Main provider function */
function Provider({children, ...props}: iProps) {
	const {handleGetServicesFromCoverage, servicesFromCoverage} = useInternetServiceProviders();
	const {setPortalShoppingCartSession} = useCheckoutProcess();

	const router = useRouter();
	const path = usePathname();

	// States
	const [isLoading, setisLoading] = useState<boolean>(false);
	const [currentCoverage, setcurrentCoverage] = useState<IAddressObject | null>(null);
	const [formattedAdressString, setformattedAdressString] = useState<string>('');
	const [mapSrc, setMapSrc] = useState<{lat: number; long: number}>({lat: 0, long: 0});

	const [hasError, sethasError] = useState<boolean>(false);
	const [errorMsg, seterrorMsg] = useState<string>('');
	const [typeProvider, settypeProvider] = useState<providerJourneyType>(providerJourneyType.fibre);
	const [typeStatus, settypeStatus] = useState<providerJourneyStatus>(providerJourneyStatus.green);
	const [startProgression, setStartProgression] = useState<boolean>(false);

	useEffect(() => {
		let ls = GetCoverageDataToShoppingCart();

		if (ls) {
			let geo = ls.addressObject.geometry.location;
			let lat = typeof geo.lat === 'function' ? geo.lat() : geo.lat;
			let long = typeof geo.lng === 'function' ? geo.lng() : geo.lng;

			setcurrentCoverage(ls.addressObject);
			setformattedAdressString(ls.addressObject.formatted_address);
			handleSetMap(lat, long);
			settypeProvider(ls.providerType);
			settypeStatus(ls.providerStatusType);
			handleGetServicesFromCoverage(ls.servicesAvailable, ls.providerType);
		}
	}, []);

	useEffect(() => {
		// console.log('path: ', path);

		if (path) {
			settypeProvider(convertEnumToString(path));
		}

		if (path?.includes('location')) {
			setStartProgression(true);
		}
	}, [path]);

	useEffect(() => {}, [typeProvider, typeStatus, mapSrc, isLoading, hasError, errorMsg, currentCoverage, formattedAdressString]);

	function handleSetMap(lat: number, long: number) {
		let map = {lat: lat, long: long};
		let isSameMap = map == mapSrc;

		if (!isSameMap) {
			console.log(`%c %c MAP Pin location changed lat:${lat}, long: ${long}`, 'color:orange');
			setMapSrc(map);
		}
	}

	// fibre green and lte green
	function handleGreen(location: IAddressObject) {
		settypeStatus(providerJourneyStatus.green);
		setcurrentCoverage(location);
		sethasError(false);
		seterrorMsg('');

		if (path === NavJourneyHomeInternet[0].path) {
			router.push(NavJourneyHomeInternet[1].path);
			setisLoading(false);
		} else {
			// fibre logic
			if (typeProvider === providerJourneyType.fibre) {
				// so if we are comming from the home screen
				if (path !== NavJourneyFibre[2].path) {
					// console.log('%c Here we need to trigger redirect and start the clients user journey and step progression', 'color:lightseagreen');
					setisLoading(false);
					router.push(NavJourneyFibre[1].path);
					setStartProgression(true);
				}
				// confirm location screen
				else {
					setisLoading(false);
					setStartProgression(true);
				}
			}
			// lte logic
			else {
				setisLoading(false);
				setStartProgression(true);
			}
		}
	}

	// fibre amber, red and lte amber, red
	function handleAmberRed(location: IAddressObject, status: providerJourneyStatus) {
		settypeStatus(status);
		setcurrentCoverage(location);
		sethasError(false);
		seterrorMsg('');
		setisLoading(false);

		if (path === NavJourneyHomeInternet[0].path) {
			router.push(NavJourneyHomeInternet[1].path);
		} else {
			router.push(NavJourneyFibreAmber[1].path);
			setStartProgression(true);
		}
	}

	// errors regarding the 28E call
	function handleError(error: string) {
		handleGetServicesFromCoverage([], '');
		setcurrentCoverage(null);
		setStartProgression(false);
		setisLoading(false);
		sethasError(true);
		seterrorMsg(error);
	}

	// container function holding all the relevent funtionality this function is the function exposed for usage
	function startCoverageSearch(location: IAddressObject): void {
		setisLoading(true);
		let lat = typeof location.geometry.location.lat === 'function' ? location.geometry.location.lat() : location.geometry.location.lat;
		let long = typeof location.geometry.location.lng === 'function' ? location.geometry.location.lng() : location.geometry.location.lng;

		let isSameAdress = location.formatted_address === currentCoverage?.formatted_address;

		if (!isSameAdress) {
			console.log('%c Ok new data we can trigger the 28 east api call here ', 'color:orange', lat, long);
			setformattedAdressString(location.formatted_address);
			setcurrentCoverage(location);
			handleSetMap(lat, long);

			doApiCallTo28E(lat, long)
				.then((response) => {
					if (typeof response !== 'string') {
						console.log('%c Response from CallTo28E SERVICES: ', 'color:yellow', typeProvider.toString(), response);
						handleGetServicesFromCoverage(response, typeProvider);

						const matched = response.filter((service) => service.type === typeProvider.toString());
						const isRed = matched.length === 0 ? true : false;
						const isAmber = !isRed && matched[0].providers.filter((p) => p.status === 'live').length > 0 ? false : true;

						// red journey
						if (isRed) {
							console.log(`%c JOURNEY IS ${typeProvider} RED`, 'color:red');
							handleAmberRed(location, providerJourneyStatus.red);
							let update = AddCoverageDataToShoppingCart(location, response, typeProvider, providerJourneyStatus.red);
							setPortalShoppingCartSession(update);
						}
						// Amber Journey
						else if (isAmber) {
							console.log(`%c JOURNEY IS ${typeProvider} AMBER`, 'color:orange');
							handleAmberRed(location, providerJourneyStatus.amber);
							let update = AddCoverageDataToShoppingCart(location, response, typeProvider, providerJourneyStatus.amber);
							setPortalShoppingCartSession(update);
						}
						// Green Journey
						else {
							console.log(`%c JOURNEY IS ${typeProvider} GREEN`, 'color:green');
							handleGreen(location);
							let update = AddCoverageDataToShoppingCart(location, response, typeProvider, providerJourneyStatus.green);
							setPortalShoppingCartSession(update);
						}
					}
					// error happend
					else {
						console.log('%c API RESPONSE IS STRING', 'color: yellow', response);
						handleError(response);
						AddCoverageDataToShoppingCart(null, [], providerJourneyType.error, providerJourneyStatus.error);
						setPortalShoppingCartSession(null);
					}
				})
				.catch((error) => {
					console.log('%c Error Response from doApiCallTo28E', 'color:yellow', error);
					setisLoading(false);
					handleError(error);
					AddCoverageDataToShoppingCart(null, [], providerJourneyType.error, providerJourneyStatus.error);
					setPortalShoppingCartSession(null);
				});
		}
		// same adress
		else {
			console.log('coverge context same adress is used again ');
			setisLoading(true);
			setformattedAdressString(location.formatted_address);
			setStartProgression(true);
			setisLoading(false);
			handleGetServicesFromCoverage([], typeProvider, true);

			const matched = servicesFromCoverage.filter((service) => service.type === typeProvider.toString());
			const isRed = matched.length === 0 ? true : false;
			const isAmber = !isRed && matched[0].providers.filter((p) => p.status === 'live').length > 0 ? false : true;

			// red journey
			if (isRed) {
				console.log(`%c JOURNEY IS ${typeProvider} RED`, 'color:red');
				router.push(NavJourneyFibreAmber[1].path);
			}
			// Amber Journey
			else if (isAmber) {
				console.log(`%c JOURNEY IS ${typeProvider} AMBER`, 'color:orange');

				router.push(NavJourneyFibreAmber[1].path);
			}
			// Green Journey
			else {
				console.log(`%c JOURNEY IS ${typeProvider} GREEN`, 'color:green');

				if (path === '/fibre') {
					router.push(NavJourneyFibre[1].path);
				} else if (path === '/lte') {
					router.push(NavJourneyLte[1].path);
				} else if (path === '/home-internet') {
					router.push(NavJourneyHomeInternet[1].path);
				}
			}
		}
	}

	// Converts lat, long to address obj needed for state
	function getAddressObj(lat: number, long: number) {
		setisLoading(false);
		getGeocode({location: {lat: Number(lat), lng: Number(long)}})
			.then((response: any) => {
				if (response) {
					console.log('%c HANDLE GEOCODE USED MY LOCATION', 'color: lightblue', response[0]);
					startCoverageSearch(response[0] as IAddressObject);
				} else {
					console.log('%c NO RESULTS FOUND FOR GEOCODE', 'color: red');
				}
			})
			.catch((e) => {
				console.log('%c Geocoder failed due to:', 'color: red', e.message);
			});
	}

	/* USE LOCATION CODE START */
	function successCallback(position: any) {
		let crd = position.coords;
		console.log(`%c YOUR CURRENT LOCATION IS: Latitude : ${crd.latitude} Longitude: ${crd.longitude} More or less ${crd.accuracy} meters.`, 'color:pink', position);
		getAddressObj(crd.latitude, crd.longitude);
	}

	function errorCallback(error: any) {
		console.warn(`%c ERROR (${error.code}): ${error.message}`, 'color:red');
	}

	// exported function
	function handleCurrentLocation() {
		setisLoading(true);
		if (navigator.geolocation) {
			navigator.permissions
				.query({name: 'geolocation'})
				.then((result) => {
					// ok we have permission do call from here
					if (result.state === 'granted') {
						console.log('%c navigator permisson granted', 'color:lime', result.state);
						navigator.geolocation.getCurrentPosition(successCallback, errorCallback, NAVIGATOR_OPTIONS);
					}
					// do popup
					else if (result.state === 'prompt') {
						setisLoading(false);
						console.log('%c navigator permisson needed Prompt', 'color:yellow', result.state);
						navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
						navigator.geolocation.getCurrentPosition(successCallback, errorCallback, NAVIGATOR_OPTIONS);
					}
					// TODO: unsure
					else if (result.state === 'denied') {
						setisLoading(false);
						console.log('%c navigator permisson denied', 'color:red', result.state);
					}
					// location has changed
					result.onchange = function () {
						console.log('%c navigator chnage happened', 'color:orange', result.state);
					};
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {});
		}
		// no Navigator
		else {
			console.log('%c Sorry, use location Not available!', 'color:red');
		}
	}
	/* USE LOCATION CODE end */

	function handleReset() {
		AddCoverageDataToShoppingCart(null, [], providerJourneyType.error, providerJourneyStatus.error);
		setPortalShoppingCartSession(null);
		setcurrentCoverage(null);
		setMapSrc({lat: 0, long: 0});
		setformattedAdressString('');
		handleGetServicesFromCoverage([], '');
		setisLoading(false);
	}

	function handleDoneWithJourney() {
		setStartProgression(false);
	}

	//   Acessing and setting the values to the required entities
	const value: ICoverageContext = {
		currentCoverageObj: currentCoverage,
		providerType: typeProvider,
		handleProviderType: (val: providerJourneyType) => settypeProvider(val),
		statusType: typeStatus,
		hasError: hasError,
		errorMessage: errorMsg,
		currentFormattedAdress: formattedAdressString,
		mapSource: mapSrc,
		startCoverage: (location: IAddressObject) => startCoverageSearch(location),
		handleGetCurrentLocationForCoverage: () => handleCurrentLocation(),
		handleSetMap: (lat, long) => handleSetMap(lat, long),
		handleLoading: (val) => setisLoading(val),
		isLoading: isLoading,
		handleReset: () => handleReset(),
		getAddressObj: (lat: number, long: number) => getAddressObj(lat, long),
		startProgression: startProgression,
		endProgression: () => handleDoneWithJourney(),
	};

	return (
		<>
			<Script
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`}
				strategy={'beforeInteractive'}
			/>

			<CoverageContext.Provider value={value}>{children}</CoverageContext.Provider>
		</>
	);
}

// CONTEXT
const CoverageContext = createContext<ICoverageContext>({} as ICoverageContext);
export const useCoverage = () => useContext(CoverageContext);

// PROVIDER
export default Provider;
