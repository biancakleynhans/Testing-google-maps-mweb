import {ICampaign, IHeroOption, IProduct, IPromo} from '@/models/Products';
import {getBooleanOrDefault, getNumber, getNumberOrDefault, getString, isObject, isString} from './CheckTypes';

function convertKbpsToMbps(speedKbps: unknown): number {
	if (typeof speedKbps === 'string') {
		const speedMbps = Number(speedKbps.toLowerCase().replace('kbps', '').trim()) / 1024;
		if (!Number.isNaN(speedMbps)) {
			return Number(speedMbps.toFixed(3));
		}
	}
	return 0;
}

function convertCapToGB(cap: unknown): number {
	if (typeof cap === 'string') {
		const capGB = Number(cap?.toLowerCase()?.replace('gb', '')?.trim());
		const capTB = Number(cap?.toLowerCase()?.replace('tb', '')?.trim());

		if (!Number.isNaN(capGB) || !Number.isNaN(capTB)) {
			return capGB || capTB;
		}
	}

	return 0;
}

function convertHeroOption(option: string): IHeroOption {
	let heroOption: IHeroOption;

	switch (getString(option)) {
		case IHeroOption.INCOGNITO_JOURNEY:
			heroOption = IHeroOption.INCOGNITO_JOURNEY;
			break;
		case IHeroOption.COVERAGE_SEARCH_JOURNEY:
			heroOption = IHeroOption.COVERAGE_SEARCH_JOURNEY;
			break;
		case IHeroOption.INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY:
			heroOption = IHeroOption.INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY;
			break;
		case IHeroOption.NOT_APPLICABLE:
			heroOption = IHeroOption.INCOGNITO_JOURNEY;
			break;
		default:
			heroOption = IHeroOption.COVERAGE_SEARCH_JOURNEY;
	}

	return heroOption;
}

function convertResponseItemToCampaign(item: any): ICampaign | null {
	if (!isObject(item)) {
		return null;
	}

	// console.log('%c Raw campaign data', 'color:yellow', item);

	let promocodes: string[] = [];

	if (Array.isArray(item?.promocodes)) {
		for (const pc of item.promocodes) {
			if (isString(pc)) {
				promocodes.push(pc);
			}
		}
	} else {
		console.warn(`campaign ${item?.code} promocode field is not an array`);
	}

	let campaign: ICampaign = {
		code: getString(item?.code) ?? '',
		name: getString(item?.name) ?? '',
		description: getString(item?.description) ?? '',
		urlSlug: getString(item?.urlSlug) ?? '',
		category: getString(item?.category) ?? '',
		isStandardCampaign: getBooleanOrDefault(item?.isStandardCampaign) ?? false,
		isDefaultCampaign: getBooleanOrDefault(item?.isDefaultCampaign) ?? false,
		isPrivateCampaign: getBooleanOrDefault(item?.isPrivateCampaign) ?? false,
		promocodes: promocodes,
	};

	return campaign;
}

function convertResponseItemToPromo(item: any) {
	// console.log('%c convertResponseItemToPromo', 'color:lime', item?.promoCode, item?.promoCodeCategory, item?.promoCodeSubcategory, JSON.stringify(item));

	if (item && isObject(item)) {
		let promo: IPromo = {
			promoCode: getString(item?.promoCode) ?? '',
			promoCodeTagLine: getString(item?.promoCodeTagLine) ?? '',
			promoCodeDescription: getString(item?.promoCodeDescription) ?? '',
			promoUrlSlug: getString(item?.promoUrlSlug) ?? '',
			promoProductTagline: getString(item?.promoProductTagline) ?? '',
			promoProductDescription: getString(item?.promoProductDescription) ?? '',
			coverageStatusDisplayValue: getString(item?.coverageStatusOptionKey) ?? '',
			coverageStatusOptionKey: getString(item?.coverageStatusOptionKey) ?? '',
			promoCodeCategory: getString(item?.promoCodeCategory) ?? '',
			promoCodeSubcategory: getString(item?.promoCodeSubcategory) ?? '',
			provider: getString(item?.provider) ?? '',
		};

		return promo;
	} else {
		return null;
	}
}

function convertResponseItemToProduct(item: any, promo: IPromo, campaign: ICampaign, providerType: 'fibre' | 'lte'): IProduct | null {
	if (isObject(item)) {
		// console.log('PRODUCT: ', item);

		let productCode = getString(item?.productCode);
		let friendlyName = getString(item?.friendlyName?.trim());
		let productName = getString(item?.productName?.trim());
		let productDisplayName = friendlyName ? friendlyName : productName;

		let downloadSpeedParam = item?.parameters?.find((p: any) => p.name === 'downloadSpeed');
		let downloadSpeedMbps = convertKbpsToMbps(downloadSpeedParam?.value);

		let uploadSpeedParam = item?.parameters?.find((p: any) => p.name === 'uploadSpeed');
		let uploadSpeedMbps = convertKbpsToMbps(uploadSpeedParam?.value);

		let isCappedParam = item?.parameters?.find((p: any) => p.name === 'isCapped');
		let cappedStatus = getString(isCappedParam?.value);

		let isThrottledParam = item?.parameters?.find((p: any) => p.name === 'isThrottled');
		let throttledStatus = getString(isThrottledParam?.value);

		let standardCapParam = item?.parameters?.find((p: any) => p.name === 'standardCap');
		let standardCapGB = convertCapToGB(standardCapParam?.value);

		let nighttimeCapParam = item?.parameters?.find((p: any) => p.name === 'nightTimeCap');
		let nighttimeCapGB = convertCapToGB(nighttimeCapParam?.value);

		const displayPrice = getNumberOrDefault(item?.displayPrice, -1);
		const productRate = getNumber(item?.productRate);
		const productDisplayPrice = displayPrice > 0 ? displayPrice : productRate;

		// setting a flag for an item that has a terabyte value to pass in as a props
		let itemHasTeraByteValue = standardCapParam?.value?.toLowerCase()?.includes('tb') || nighttimeCapParam?.value?.toLowerCase()?.includes('tb');

		// console.log('%c convertResponseItemToProduct: ', 'color:lime', item);

		let product: IProduct = {
			campaignCode: campaign.code,
			campaignName: campaign.name,

			isHero: getBooleanOrDefault(item?.isHero, false),
			heroTagline: getString(item?.heroTagLine) ?? '',
			heroImage: getString(item?.heroImage) ?? '',
			heroOption: convertHeroOption(item?.heroOption),

			promoCode: promo.promoCode,
			promoCodeSubcategory: promo.promoCodeSubcategory,
			promoCodeCategory: promo.promoCodeCategory,
			promoUrlSlug: promo.promoUrlSlug,
			promoTagline: promo.promoProductTagline,
			promoDescription: promo.promoProductDescription,

			hasPreProduct: getBooleanOrDefault(item?.hasPreProduct, false),
			preProduct: item?.preProduct,

			productCode: productCode ?? '',
			productName: productDisplayName ?? '',
			productPrice: getNumberOrDefault(productDisplayPrice, -1),
			productChargePeriod: getString(item?.chargePeriod) ?? '',

			cappedStatus: cappedStatus ?? '',
			throttledStatus: throttledStatus ?? '',
			downloadSpeedMbps: downloadSpeedMbps,
			uploadSpeedMbps: uploadSpeedMbps,

			hasTeraByteValue: itemHasTeraByteValue ?? false,
			nighttimeCapGB: nighttimeCapGB ?? 0,
			standardCapGB: standardCapGB ?? 0,
			uncappedLine1: getString(item?.uncappedLine1) ?? '',
			uncappedLine2: getString(item?.uncappedLine2) ?? '',

			tagLine: item?.tagLine,
			dealEndDate: '',
			deliveryNotes: '',

			highlight1: getString(item?.highlight1) ?? '',
			highlight2: getString(item?.highlight2) ?? '',
			highlight3: getString(item?.highlight3) ?? '',
			highlight4: getString(item?.highlight4) ?? '',
			highlight5: getString(item?.highlight5) ?? '',
			highlight6: getString(item?.highlight6) ?? '',

			coverageCode: getString(item?.coverageCode) ?? '',
			coverageStatusOptionKey: promo.coverageStatusOptionKey,
			coverageStatusDisplayValue: promo.coverageStatusDisplayValue,

			providerName: promo.provider,
			providerCode: '',
			providerImage: '',
			providerType: providerType,

			productFilterKeys: item?.productFilterKeys ?? [],
		};

		return product;
	} else {
		return null;
	}
}

export {convertResponseItemToCampaign, convertResponseItemToPromo, convertResponseItemToProduct};
