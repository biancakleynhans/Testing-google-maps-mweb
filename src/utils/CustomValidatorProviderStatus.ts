import {IProviderLocation, IProviderStatus} from '@/models/Coverage';
import {getString} from './CheckTypes';

export class RegEx {
	static REGEX_COVERAGE_PROMO_LIVE = /^(promo).*(-live)$/;
	static REGEX_COVERAGE_PROMO_AMBER = /^(promo).*(-inprogress)$/;
}

export class CustomValidatorProviderStatus {
	static hasPromoGreenCoverage(providerStatus: string): boolean {
		return RegEx.REGEX_COVERAGE_PROMO_LIVE.test(providerStatus);
	}

	static hasPromoAmberCoverage(providerStatus: string): boolean {
		return RegEx.REGEX_COVERAGE_PROMO_AMBER.test(providerStatus);
	}
}

export function parseProviderLocation(item: any): IProviderLocation {
	// console.log('%c provider location result premise_ref_isp', 'color:yellow', getString(item?.premise_ref_isp));
	// console.log('%c provider location result premiseid', 'color:yellow', getString(item?.premisesid));
	// console.log('%c provider location result suburb', 'color:yellow', getString(item?.suburb));
	// console.log('%c provider location result address', 'color:yellow', getString(item?.address));
	// console.log('   ');

	let entry: IProviderLocation = {
		premiseRefIsp: getString(item?.premise_ref_isp) ?? '',
		premiseId: getString(item?.premisesid) ?? '',
		suburb: getString(item?.suburb) ?? '',
		address: getString(item?.address) ?? '',
		streetName: getString(item?.street_name) ?? '',
		streetNumber: getString(item?.street_number) ?? '',
		city: getString(item?.city) ?? '',
		province: getString(item?.province) ?? '',
		country: getString(item?.country) ?? '',
		postalCode: getString(item?.postal_code) ?? '',
		estateName: getString(item?.estate_name) ?? '',
		mduName: getString(item?.mdu_name) ?? '',
		mduFloor: getString(item?.mdu_floor) ?? '',
		mduUnitNumber: getString(item?.mdu_unitno) ?? '',
		networkReadinessStatus: getString(item?.network_readiness_status) ?? '',
		latitude: getString(item?.latitude) ?? '',
		longitude: getString(item?.longitude) ?? '',
	};

	return entry;
}

const REGEX_PLANNED_STATUS = /(.*progress|planned)/gi;
const REGEX_LIVE_STATUS = /(.*live)/gi;
const REGEX_COVERAGE_PROMO_LIVE = /^(promo).*(green)$/;
const REGEX_COVERAGE_PROMO_AMBER = /^(promo).*(amber)$/;

function isLive(status: string): boolean {
	return status.match(REGEX_LIVE_STATUS) !== null;
}

function isPlanned(status: string): boolean {
	return status.match(REGEX_PLANNED_STATUS) !== null;
}

function isPromoLive(status: string): boolean {
	return status.match(REGEX_COVERAGE_PROMO_LIVE) !== null;
}

function isPromoAmber(status: string): boolean {
	return status.match(REGEX_COVERAGE_PROMO_AMBER) !== null;
}

function hasVumaReachFibre(FibreProviders: IProviderStatus[]): boolean {
	if (FibreProviders.length === 0) {
		return false;
	}

	return FibreProviders.find((p) => p.code === 'vumatelreach' && (isLive(p.status !== null ? p.status : '') || isPlanned(p.status !== null ? p.status : ''))) ? true : false;
}

export {isLive, isPlanned, isPromoAmber, isPromoLive, hasVumaReachFibre};
