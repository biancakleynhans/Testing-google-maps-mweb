import { IMobileAppSlice } from "./mobileAppSlice";

export interface IFooter {
	__typename: string;
	id: string;
	level: number;
	title: string;
	mainLink: boolean;
	targetUrl: null | string;
	analyticsId: string;
	externalLink: boolean;
	mobileOnly: boolean;
	parent: null | IFooterParent;
}

export interface IFooterParent {
	__typename: string;
	id: string;
	tittle: string;
}

export interface IMobileAppSliceFooter {
    __typename:          string;
    heading?:            string;
    description?:        null;
    mobileAppStoreName?: string;
    mobileAppStoreLogo?: MobileAppStoreLogo[];
    mobileAppStoreUrl?:  string;
}

export interface MobileAppStoreLogo {
    path:   string;
    width:  number;
    height: number;
}

//
export interface IFooterCategory extends IFooter {
	categories: IFooter[];
}
export interface IFooterData  {
	footerCategories: IFooterCategory[];	
	mobileAppSlice: IMobileAppSlice;
}
