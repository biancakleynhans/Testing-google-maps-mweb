/* PRODUCTS */
export interface IPreProduct {
	preProductCode: string;
	preProductName: string;
	preProductFriendlyName: string;
	preProductInvoiceRollupDescription: string;
	preProductRate: number;
	preProductDiscountAmount: number;
	preProductDiscountType: string;
	preProductDiscountedProductRate: number;
	preProductDiscountPeriodInDays: number;
	preProductDiscountSavings: number;
	preProductDisplay: string;
}

export interface IProduct {
	providerType: string;
	providerImage: string;
	providerCode: string;
	providerName: string;

	campaignCode: string;
	campaignName: string;

	coverageCode: string; // Fibre
	coverageStatusDisplayValue: string; // Fibre
	coverageStatusOptionKey: string; // Fibre

	hasPreProduct: boolean;
	preProduct: IPreProduct | null;

	productCode: string;
	productName: string;
	productPrice: number;
	productChargePeriod: string;

	highlight1: string;
	highlight2: string;
	highlight3: string;
	highlight4: string;
	highlight5: string;
	highlight6: string;

	promoCode: string;
	promoCodeCategory: string;
	promoCodeSubcategory: string;
	promoDescription: string;
	promoTagline: string;
	promoUrlSlug: string;

	cappedStatus: string;
	downloadSpeedMbps: number; // Fibre
	throttledStatus: string; // Fibre
	uncappedLine1?: string; // optional on Fibre
	uncappedLine2?: string; // optional on Fibre
	uploadSpeedMbps: number; // Fibre

	standardCapGB?: number; //LTE
	nighttimeCapGB?: number; //LTE
	hasTeraByteValue?: boolean; // LTE

	isHero: boolean;
	heroImage: string;
	heroOption: IHeroOption;
	heroTagline: string;

	productFilterKeys: string[]; // This is the new field which is returned in the Raw data which we need to add to the interface => 	filterKeys: string[];
	tagLine: string;

	deliveryNotes?: string; // Lte spesific
	dealEndDate: string;
}

export enum IHeroOption {
	INCOGNITO_JOURNEY = 'IncognitoJourneyOnly',
	COVERAGE_SEARCH_JOURNEY = 'CoverageSearchedJourneyOnly',
	INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY = 'AllUserJourneys',
	NOT_APPLICABLE = 'na',
}

/* PROMOS */
export interface IPromo {
	promoCode: string;
	promoCodeTagLine: string;
	promoCodeDescription: string;
	promoCodeCategory: string;
	promoCodeSubcategory: string;
	promoUrlSlug: string;
	coverageStatusDisplayValue: string;
	coverageStatusOptionKey: string;
	provider: string;
	promoProductDescription: string;
	promoProductTagline: string;
}

/* CAMPAIGNS */
export interface ICampaign {
	code: string;
	name: string;
	description: string;
	urlSlug: string;
	category: string;
	isStandardCampaign: boolean;
	isDefaultCampaign: boolean;
	isPrivateCampaign: boolean;
	promocodes: string[];
}

export interface IGetCampaignsParams {
	category: CampaignCategory;
	channel: CampaignChannel;
	subcategories?: string[];
}

export enum CampaignCategory {
	DSL = 'dsl',
	FIBRE = 'fibre',
	CAPPED_HOSTING = 'cappedhosting',
	SECURITY = 'security',
	LTE = 'lte',
	MAILBOX = 'mailbox',
	OFFICE365 = 'office365',
	SVOD = 'svod',
	VOIP = 'voip',
	THREEG = '3g',
	HARDWARE = 'hardware',
	ANTIVIRUS = 'antivirus',
	KASPERSKY = 'kaspersky',
	STORE_HARDWARE = 'store-hardware',
	STORE_SOFTWARE = 'store-software',
	BIT_DEFENDER = 'bitdefender',
	DOMAINS = 'domains',
	NORTON = 'norton',
}

export enum CampaignChannel {
	NEW_CUSTOMERS = '120',
	EXISTING_CUSTOMERS = '130',
	ALL_CUSTOMERS = '120,130',
}
