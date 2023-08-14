export interface iVas {
	header: string;
	price: number;
	description: string;
	provider: string;
}

export interface iVasCard extends iVas {
	selected: boolean;
	promoCode: string;
	productCode: string;
}

export interface IVasProduct {
	chargedPeriod: string;
	dealPromoCodecategory: any;
	discount: number;
	displayPrice: number;
	fullHighlights: string;
	highlights: string[];
	image: string;
	minimumContractMonths: number;
	name: string;
	onceOffCharge: boolean;
	price: number;
	productCode: string;
	productDescriptionAlternative: any;
	promoCode: string;
	subcategory: string;
	summary: string;
}
