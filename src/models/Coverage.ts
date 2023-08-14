import {providerJourneyStatus, providerJourneyType} from '@/context/CoverageContext';

interface IAddressComponentsEntry {
	long_name: string;
	short_name: string;
	types: string[];
}

interface IGeolocation {
	location: {
		lat: any;
		lng: any;
	};
	location_type?: string;
	viewport: {
		south: number;
		west: number;
		north: number;
		east: number;
	};
}

export interface IAddressObject {
	address_components: IAddressComponentsEntry[];
	formatted_address: string;
	geometry: IGeolocation;
	place_id: string;
	types: string[];
	html_attributions?: any[];
	plus_code?: {
		compound_code: string;
		global_code: string;
	};
}

export enum ServiceType {
	FIBRE = 'fibre',
	LTE = 'lte',
	ADSL = 'dsl',
	PUREDSL = 'pureconnect',
	FIVEG = 'fiveg',
}

export interface iLocationEntry extends IProviderLocation {
	selected: boolean;
}

export interface IProviderStatus {
	code: string | null;
	status: string | null;
	locations: IProviderLocation[];
}

export interface IProviderLocation {
	premiseRefIsp: string; // required
	premiseId: string; // required
	suburb: string; // required
	address: string; // required
	streetName: string;
	streetNumber: string;
	city: string;
	province: string;
	country: string;
	postalCode: string;
	estateName: string;
	mduName: string;
	mduFloor: string;
	mduUnitNumber: string;
	networkReadinessStatus: string;
	latitude: string;
	longitude: string;
}

interface iLocationResult {
	address: string;
	city: string;
	country: string;
	estate_name: string | null;
	latitude: string;
	longitude: string;
	mdu_floor: string | null;
	mdu_name: string | null;
	mdu_unitno: string | null;
	network_readiness_status: string;
	postal_code: string | null;
	premise_ref_isp: string;
	province: string;
	street_name: string;
	street_number: string;
	suburb: string;
}

export interface iProviderEntry {
	provider: string;
	status: string;
	locationResult: IProviderLocation[];
	type: ServiceType;
	promoStatus: string;
}

export interface IServiceEntry {
	providers: {provider: string; status: string; location_result: iLocationResult; locations: any; data: any}[];
	type: ServiceType;
}

export interface iActiveProvider extends iProviderEntry {
	hasAdressList: boolean;
}

export enum ProviderAvailability {
	NotAvailable = 'NOT AVAILABLE',
	ComingSoon = 'COMING SOON',
	Available = 'AVAILABLE',
}

// current nextjs => angular  needs this as well
export interface IUserDataSearchAddressAngularNeeds {
	complex: string;
	streetNumber: string;
	street: string;
	suburb: string;
	town: string;
	province: string;
	postalCode: string;
	latitude: string;
	longitude: string;
	locationType: string;
	locationTypes: Array<string>;
	formattedAddress: string;
	placeId: string;
	fibreAvailability: ProviderAvailability;
	lteAvailability: ProviderAvailability;
	pureDslAvailability: ProviderAvailability;
}

export interface IUserDataSearchedAddress extends IUserDataSearchAddressAngularNeeds {
	addressObject: IAddressObject;
	servicesAvailable: IServiceEntry[];
	providerType: providerJourneyType;
	providerStatusType: providerJourneyStatus;
}
