export interface INav {
	__typename: string;
	id: string;
	level: number;
	title: string;
	mainLink: boolean;
	targetUrl: null | string;
	analyticsId: string;
	externalLink: boolean;
	mobileOnly: boolean;
	parent: null | INavParent;
}

export interface INavParent {
	__typename: string;
	id: string;
	tittle: string;
}

//
export interface INavCategory extends INav {
	categories: INav[];
}