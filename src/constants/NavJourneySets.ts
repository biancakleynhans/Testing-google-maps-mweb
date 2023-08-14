// route Obj interface (better than having single states have a state obj)
export interface iNavContent {
	headerName:
		| 'Default'
		| StepInProgressionFibre
		| StepInProgressionFibreVumaReach
		| StepInProgressionAmber
		| StepInProgressionLte
		| StepInProgressionAmber
		| StepInProgressionPhase2;
	headerType: NavigationHeaderTypes;
	path: string;
}

// header types
export enum NavigationHeaderTypes {
	'Default' = 'Default',
	'ConnectivityPhase1FibreAmber' = 'connectivity-phase-1-fibre-amber',
	'ConnectivityPhase1FibreVR' = 'connectivity-phase-1-fibre-vuma-reach',
	'ConnectivityPhase1FibreToLte' = 'connectivity-phase-1-fibre-to-lte',
	'ConnectivityPhase1Fibre' = 'connectivity-phase-1-fibre',
	'ConnectivityPhase1Lte' = 'connectivity-phase-1-lte',
	'ConnectivityPhase2' = 'connectivity-phase-2',
}

// client journeys
export enum StepInProgressionFibre {
	'Connectivity' = 'Connectivity',
	'Location' = 'Location',
	'AddOns' = 'Add-ons',
	'OrderSummary' = 'Order Summary',
}

export enum StepInProgressionFibreVumaReach {
	'Connectivity' = 'Connectivity',
	'Location' = 'Location',
	'OrderSummary' = 'Order Summary',
}

export enum StepInProgressionLte {
	'Location' = 'Location',
	'AddOns' = 'Add-ons',
	'OrderSummary' = 'Order Summary',
}

export enum StepInProgressionAmber {
	'Connectivity' = 'Connectivity',
	'AddOns' = 'Add-ons',
	'OrderSummary' = 'Order Summary',
}

// Checkout
export enum StepInProgressionPhase2 {
	'YourDetails' = 'Your Details',
	'AddressDelivery' = 'Address & Delivery',
	'Payment' = 'Payment',
}

// lists of routes by type
export const NavJourneyHomeInternet: iNavContent[] = [
	{headerName: NavigationHeaderTypes.Default, headerType: NavigationHeaderTypes.Default, path: '/home-internet'},
	{
		headerName: StepInProgressionFibre.Connectivity,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Fibre,
		path: '/home-internet/connectivity-options',
	},
];

export const NavJourneyFibre: iNavContent[] = [
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/fibre'},
	{
		headerName: StepInProgressionFibre.Connectivity,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Fibre,
		path: '/fibre/choose-a-plan',
	},
	{
		headerName: StepInProgressionFibre.Location,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Fibre,
		path: '/fibre/confirm-location',
	},
	{
		headerName: StepInProgressionFibre.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Fibre,
		path: '/fibre/router-selection',
	},
	{
		headerName: StepInProgressionFibre.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Fibre,
		path: '/fibre/add-ons',
	},
	{
		headerName: StepInProgressionFibre.OrderSummary,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Fibre,
		path: '/fibre/order-summary',
	},
	{
		headerName: StepInProgressionPhase2.YourDetails,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/fibre/checkout/your-details',
	},
	{
		headerName: StepInProgressionPhase2.AddressDelivery,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/fibre/checkout/address-and-delivery',
	},
	{
		headerName: StepInProgressionPhase2.Payment,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/fibre/checkout/payment',
	},
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/fibre/order-confirmation'},
];

export const NavJourneyFibreVumaReach: iNavContent[] = [
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/fibre'},
	{
		headerName: StepInProgressionFibre.Connectivity,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreVR,
		path: '/fibre/choose-a-plan',
	},
	{
		headerName: StepInProgressionFibre.Location,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreVR,
		path: '/fibre/confirm-location',
	},
	{
		headerName: StepInProgressionFibre.OrderSummary,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreVR,
		path: '/fibre/order-summary',
	},
	{
		headerName: StepInProgressionPhase2.YourDetails,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/fibre/checkout/your-details',
	},
	{
		headerName: StepInProgressionPhase2.AddressDelivery,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/fibre/checkout/address-and-delivery',
	},
	{
		headerName: StepInProgressionPhase2.Payment,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/fibre/checkout/payment',
	},
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/fibre/order-confirmation'},
];

export const NavJourneyFibreAmber: iNavContent[] = [
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/fibre'},
	{headerName: StepInProgressionAmber.Connectivity, headerType: NavigationHeaderTypes.ConnectivityPhase1FibreAmber, path: '/fibre/connectivity-options'},
	{
		headerName: StepInProgressionAmber.Connectivity,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreAmber,
		path: '/fibre/choose-a-plan',
	},
	{
		headerName: StepInProgressionAmber.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreAmber,
		path: '/fibre/router-selection',
	},
	{
		headerName: StepInProgressionAmber.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreAmber,
		path: '/fibre/add-ons',
	},
	{
		headerName: StepInProgressionAmber.OrderSummary,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreAmber,
		path: '/fibre/order-summary',
	},
	{
		headerName: StepInProgressionPhase2.YourDetails,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/fibre/checkout/your-details',
	},
	{
		headerName: StepInProgressionPhase2.AddressDelivery,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/fibre/checkout/address-and-delivery',
	},
	{
		headerName: StepInProgressionPhase2.Payment,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/fibre/checkout/payment',
	},
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/fibre/order-confirmation'},
];

export const NavJourneyFibreAmberToLte: iNavContent[] = [
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/fibre'},
	{headerName: StepInProgressionAmber.Connectivity, headerType: NavigationHeaderTypes.ConnectivityPhase1FibreToLte, path: '/fibre/connectivity-options'},
	{
		headerName: StepInProgressionFibre.Connectivity,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreToLte,
		path: '/lte/choose-a-plan',
	},
	{
		headerName: StepInProgressionLte.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreToLte,
		path: '/lte/router-options',
	},
	{
		headerName: StepInProgressionLte.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreToLte,
		path: '/lte/router-selection',
	},
	{
		headerName: StepInProgressionLte.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreToLte,
		path: '/lte/add-ons',
	},
	{
		headerName: StepInProgressionLte.OrderSummary,
		headerType: NavigationHeaderTypes.ConnectivityPhase1FibreToLte,
		path: '/lte/order-summary',
	},
	{
		headerName: StepInProgressionPhase2.YourDetails,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/lte/checkout/your-details',
	},
	{
		headerName: StepInProgressionPhase2.AddressDelivery,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/lte/checkout/address-and-delivery',
	},
	{
		headerName: StepInProgressionPhase2.Payment,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/lte/checkout/payment',
	},
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/lte/order-confirmation'},
];

export const NavJourneyLte: iNavContent[] = [
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/lte'},
	{
		headerName: StepInProgressionLte.Location,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Lte,
		path: '/lte/location',
	},
	{
		headerName: StepInProgressionLte.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Lte,
		path: '/lte/router-options',
	},
	{
		headerName: StepInProgressionLte.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Lte,
		path: '/lte/router-selection',
	},
	{
		headerName: StepInProgressionLte.AddOns,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Lte,
		path: '/lte/add-ons',
	},
	{
		headerName: StepInProgressionLte.OrderSummary,
		headerType: NavigationHeaderTypes.ConnectivityPhase1Lte,
		path: '/lte/order-summary',
	},
	{
		headerName: StepInProgressionPhase2.YourDetails,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/lte/checkout/your-details',
	},
	{
		headerName: StepInProgressionPhase2.AddressDelivery,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/lte/checkout/address-and-delivery',
	},
	{
		headerName: StepInProgressionPhase2.Payment,
		headerType: NavigationHeaderTypes.ConnectivityPhase2,
		path: '/lte/checkout/payment',
	},
	{headerName: 'Default', headerType: NavigationHeaderTypes.Default, path: '/lte/order-confirmation'},
];

/* matches the steps in progression to header type */
export const HeaderTypeStepsMatched: {[k: string]: string[]} = {
	Default: [],

	'connectivity-phase-1-fibre-vuma-reach': [...Object.values(StepInProgressionFibreVumaReach)],
	'connectivity-phase-1-fibre-amber': [...Object.values(StepInProgressionAmber)],
	'connectivity-phase-1-fibre-to-lte': [...Object.values(StepInProgressionAmber)],
	'connectivity-phase-1-fibre': [...Object.values(StepInProgressionFibre)],
	'connectivity-phase-1-lte': [...Object.values(StepInProgressionLte)],
	'connectivity-phase-2': [...Object.values(StepInProgressionPhase2)],
};

/* Matches the nav state to a header type */
export const HeaderTypeNavMatched: {[k: string]: iNavContent[]} = {
	Default: [],
	'connectivity-phase-1-fibre-vuma-reach': NavJourneyFibreVumaReach,
	'connectivity-phase-1-fibre-amber': NavJourneyFibreAmber,
	'connectivity-phase-1-fibre-to-lte': NavJourneyFibreAmberToLte,
	'connectivity-phase-1-fibre': NavJourneyFibre,
	'connectivity-phase-1-lte': NavJourneyLte,
	'connectivity-phase-2': [],
};
