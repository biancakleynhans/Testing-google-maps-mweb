import { IConnectivityOption } from "@/components/connectivity-availability";
import { IFibreCheckout } from "./FibreCheckoutService";

export interface IConnectivityContent {
	pageHeading: string;
	choices: IConnectivityOption[];
	faq: { text: string; question: string; }
}

// Convert the raw product filter data from Craft to match the Interface created for the mocked data
function getFibreConnectivityContentData(pageContent: IFibreCheckout): IConnectivityContent {
  const connectivityPageContent:IConnectivityContent = {
		pageHeading: pageContent?.fibreCheckoutConnectivityOptionsPageHeading,
		choices: [{
			text: `<div className="w-full">${pageContent?.fibreCheckoutConnectivityOptionsLteOptionHead}</div>`,
			description: pageContent?.fibreCheckoutConnectivityOptionsLteOptionText,
			image: 'get-lte-instead',
			value: 'get-lte-instead',
			altJourney: 'lte',
		},
		{
			text: `<div className="w-full">${pageContent?.fibreCheckoutConnectivityOptionsPreorderHead}</div>`,
			description: pageContent?.fibreCheckoutConnectivityOptionsPreorderText,
			image: 'pre-order-fibre',
			value: 'pre-order-fibre',
			altJourney: 'fibre',
		},
		// {
		// 	text: `<div className="w-full">${pageContent?.fibreCheckoutConnectivityOptionsBothOptionHead}</div>`,
		// 	description: pageContent?.fibreCheckoutConnectivityOptionsBothOptionText,
		// 	image: 'get-lte-while-i-wait',
		// 	value: 'get-lte-while-i-wait',
		// 	altJourney: 'lte',
		// }
		],
		faq: {
			question: pageContent?.fibreCheckoutConnectivityOptionsFaqHeading,
			text: pageContent?.fibreCheckoutConnectivityOptionsFaqText,

		}
	}

  return connectivityPageContent;
}
function getHomeInternetConnectivityData(pageContent: IFibreCheckout): IConnectivityContent {
  const connectivityPageContent:IConnectivityContent = {
		pageHeading: pageContent?.fibreCheckoutConnectivityOptionsPageHeading,
		choices: [{
			text: `<div className="w-full">LTE</div>`,
			// text: `<div className="w-full">${pageContent?.fibreCheckoutConnectivityOptionsLteOptionHead}</div>`,
			description: `Connect your home in 1, 2, 3 with plug and play LTE.`,
			// description: pageContent?.fibreCheckoutConnectivityOptionsLteOptionText,
			image: 'lte',
			price:`R134pm`,
			value: 'lte',
			altJourney: 'lte',
		},
		{
			text: `<div className="w-full">FIBRE</div>`,
			description: `No buffering, just lots of bingeing with Fibre`,
			// text: `<div className="w-full">${pageContent?.fibreCheckoutConnectivityOptionsPreorderHead}</div>`,
			// description: pageContent?.fibreCheckoutConnectivityOptionsPreorderText,
			image: 'fibre',
			value: 'fibre',
			price:`R199pm`,
			altJourney: 'fibre',
		},
		{
			text: `<div className="w-full">5G</div>`,
			description: `Say goodbye to waiting and hello to real-time 5G`,
			// text: `<div className="w-full">${pageContent?.fibreCheckoutConnectivityOptionsBothOptionHead}</div>`,
			// description: pageContent?.fibreCheckoutConnectivityOptionsBothOptionText,
			image: '5g',
			price:`R249pm`,
			value: '5G',
			altJourney: '5G',
		}
		],
		faq: {
			question: pageContent?.fibreCheckoutConnectivityOptionsFaqHeading,
			text: pageContent?.fibreCheckoutConnectivityOptionsFaqText,

		}
	}

  return connectivityPageContent;
}
export const ConnectivityService = {
   getFibreConnectivityContentData,
   getHomeInternetConnectivityData
}