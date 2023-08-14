import {providerJourneyStatus, providerJourneyType} from '@/context/CoverageContext';
import {IAddressObject, IServiceEntry, IUserDataSearchAddressAngularNeeds, IUserDataSearchedAddress, ProviderAvailability, ServiceType} from '@/models/Coverage';
import {IShoppingCartSession} from '@/services/shoppingCartSessionService';
import {getLocalStorageItem, setLocalStorageItem} from '@/services/storage-service';
import {isLive, isPlanned, isPromoAmber, isPromoLive} from './CustomValidatorProviderStatus';

// gets the day diffence between 2 dates
function getDayDiff(firstDate: Date, secondDate: Date): number {
	let diff = secondDate.getTime() - firstDate.getTime();
	let daydiff = diff / (1000 * 60 * 60 * 24);
	// console.log('diff', daydiff);
	return daydiff;
}

//
function getCoverageDataAngularNeeds(place: IAddressObject) {
	// console.log('%c  SERVICES >> set userData', 'color:yellow', place);
	let userData: IUserDataSearchAddressAngularNeeds = {} as IUserDataSearchAddressAngularNeeds;

	let lat = typeof place.geometry.location.lat === 'function' ? place.geometry.location.lat() : place.geometry.location.lat;
	let long = typeof place.geometry.location.lng === 'function' ? place.geometry.location.lng() : place.geometry.location.lng;

	userData.locationTypes = place.types ? place.types : [];
	userData.placeId = place.place_id ? place.place_id : '';
	userData.formattedAddress = place.formatted_address ? place.formatted_address : '';

	userData.latitude = lat;
	userData.longitude = long;

	if (place.address_components && place.address_components?.length > 0) {
		for (let i = 0; i < place.address_components?.length; i++) {
			const types = place.address_components[i].types;
			if (types && types.length > 0) {
				for (let t = 0; t < types.length; t++) {
					if (types[t] === 'street_number') {
						userData.streetNumber = place.address_components[i].long_name;
					}
					if (types[t] === 'route') {
						userData.street = place.address_components[i].long_name;
					}
					if (types[t] === 'sublocality') {
						userData.suburb = place.address_components[i].long_name;
					}
					if (types[t] === 'locality') {
						userData.town = place.address_components[i].long_name;
					}
					if (types[t] === 'administrative_area_level_1') {
						userData.province = place.address_components[i].long_name;
					}
					if (types[t] === 'postal_code') {
						userData.postalCode = place.address_components[i].long_name;
					}
				}
			}
		}
	}

	console.log('%c  USERDATA', 'color:pink ', userData);
	return userData;
}

//
function getProviderAvailability(services: IServiceEntry[]) {
	/* ---- FIBRE ---- */
	let fibreProviders = services.filter((s) => s.type === ServiceType.FIBRE).flatMap((x) => x.providers);
	let hasFibre: boolean = fibreProviders.some((s) => (s.status === 'live' ? isLive(s.status) : isPromoLive(s.status)));
	let hasFibreInProgress: boolean = fibreProviders.some((s) => (s.status === 'inprogress' || s.status === 'in progress' ? isPlanned(s.status) : isPromoAmber(s.status)));

	/* ---- LTE ---- */
	let lteProviders = services.filter((s) => s.type === ServiceType.LTE).flatMap((x) => x.providers);
	let hasLte = lteProviders.some((s) => (s.status === 'live' ? isLive(s.status) : isPromoLive(s.status)));

	/* ---- ADSL ---- */
	let adslProviders = services.filter((s) => s.type === ServiceType.ADSL).flatMap((x) => x.providers);
	let hasAdsl = adslProviders.some((s) => (s.status === 'live' ? isLive(s.status) : isPromoLive(s.status)));

	/* ---- PURE ADSL ---- */
	let pureProviders = services.filter((s) => s.type === ServiceType.PUREDSL).flatMap((x) => x.providers);
	let hasPure = pureProviders.some((s) => (s.status === 'live' ? isLive(s.status) : isPromoLive(s.status)));

	return {
		fibre: hasFibre ? ProviderAvailability.Available : hasFibreInProgress ? ProviderAvailability.ComingSoon : ProviderAvailability.NotAvailable,
		lte: hasLte ? ProviderAvailability.Available : ProviderAvailability.NotAvailable,
		pure: hasPure ? ProviderAvailability.Available : ProviderAvailability.NotAvailable,
		dsl: hasAdsl ? ProviderAvailability.Available : ProviderAvailability.NotAvailable,
	};
}

/* handles adding the adress object to local storage/ shopping cart in order to be able to have a refrence to a searched address object once page is refreshed */
export function AddCoverageDataToShoppingCart(
	location: IAddressObject | null,
	services: IServiceEntry[],
	type: providerJourneyType,
	status: providerJourneyStatus
): IShoppingCartSession {
	let ls = getLocalStorageItem('portalShoppingCartSession') as IShoppingCartSession;

	if (ls !== null) {
		if (location !== null) {
			let daydiff = getDayDiff(new Date(ls.updatedAt), new Date());

			let isMade = ls.addressSearchMade === true && ls.addressSearch !== null;
			let addrNotMatched = ls.addressSearchMade && ls.addressSearch && ls.addressSearch.addressObject.formatted_address !== location.formatted_address;
			let dayDiffGreater = ls.addressSearchMade && ls.addressSearch && ls.addressSearch.addressObject.formatted_address === location.formatted_address && daydiff > 0.9;

			console.log('%c current ls value: ', 'color:lightblue', ls.addressSearch, ls.addressSearchMade, '>>>', isMade, addrNotMatched, dayDiffGreater);

			if (!isMade || !addrNotMatched || dayDiffGreater) {
				let angular: IUserDataSearchAddressAngularNeeds = getCoverageDataAngularNeeds(location);
				let availability = getProviderAvailability(services);

				angular.fibreAvailability = availability.fibre;
				angular.lteAvailability = availability.lte;
				angular.pureDslAvailability = availability.pure;

				console.log('%c ok we can set the ls obj now it hasnt been set before ', 'color: lightblue');

				let newObj: IUserDataSearchedAddress = {
					addressObject: location,
					servicesAvailable: services,
					providerStatusType: status,
					providerType: type,
					...angular,
				};

				ls.addressSearchMade = type !== providerJourneyType.error ? true : false;
				ls.addressSearch = newObj;
				ls.updatedAt = new Date();

				setLocalStorageItem('portalShoppingCartSession', ls);
			}
		} else {
			ls.addressSearch = null;
			setLocalStorageItem('portalShoppingCartSession', ls);
		}
	}
	return ls;
}

/*handles getting the addess obj from the shopping cart / local storage */
export function GetCoverageDataToShoppingCart(): IUserDataSearchedAddress | null {
	let ls = getLocalStorageItem('portalShoppingCartSession') as IShoppingCartSession;
	// console.log('%c Starting up for the first time need to check ls to see if we have a stored address obj: ', 'color:violet', ls.addressSearchMade, ls.addressSearch);

	return ls ? ls?.addressSearch : null;
}
