'use client';

/* 
	TEST ADRESSES: 
	8 3rd Ave, Retreat, Cape Town  => 1 loc arr vumatel reach
	99 Van Eyssen Rd, Churchill Estate, Cape Town => 2 loc arr's vumatel core 
	104 Tenth Ave, Ravenswood, Boksburg => entries in 2 loc arr for vuma tt conect and vumatel core 
	57 Eugene Marais St, Elandspark, Johannesburg South, 2197, South Africa => vumatel loc arr
	
	11 Magnesium Ave, Dersley, Springs, 1569, South Africa => open serve arr <6 and vodacom
	82 Nirvana Rd, Brighton Beach, Bluff, 4052, South Africa => open serve arr <6 and metro fibre

	1004 Galjoen Rd, Garsfontein, Pretoria, 0042, South Africa => open serve arr >6  => ESTATES 

	Mathews Dr, Parkrand, Boksburg, 1459, South Africa => 0 entries in loc arr for vuma

	"Ukraine Street, Forest Village, Cape Town, 7100, South Africa" => VR


 */

import {IProviderLocation, IServiceEntry, iActiveProvider, iProviderEntry} from '@/models/Coverage';
import {IISP} from '@/services/IspService';
import {CustomValidatorProviderStatus, parseProviderLocation} from '@/utils/CustomValidatorProviderStatus';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

interface IISPContext {
	internetServiceProviders: IISP[];
	servicesFromCoverage: IServiceEntry[];
	internetServiceProvidersMatched: iActiveProvider[];
	handleGetServicesFromCoverage: (services: IServiceEntry[], providerType: string, isSameAdress?: boolean) => void;
}

interface iProps {
	children: ReactNode;
	ispArrayFromCraft: IISP[];
}

// generates the correct promo status for a service
function generatePromoStatus(providerStatus: string): string {
	// console.log('providerStatus', 'color: yellow', providerStatus);
	let returnedProviderStatus = '';

	if (CustomValidatorProviderStatus.hasPromoGreenCoverage(providerStatus)) {
		returnedProviderStatus = providerStatus?.replace('-live', 'green');
	} else if (CustomValidatorProviderStatus.hasPromoAmberCoverage(providerStatus?.replaceAll(' ', ''))) {
		returnedProviderStatus = providerStatus?.replace('-inprogress', 'amber');
	} else {
		returnedProviderStatus = providerStatus;
	}
	return returnedProviderStatus;
}

// FILTER TO SORT RELEVENT PROVIDERS from services recieved
function processServices(services: IServiceEntry[]): iProviderEntry[] {
	let allProviders: iProviderEntry[] = [];

	for (const service of services) {
		// console.log('%c curr service we are looking at ', 'color:yellow', service);

		// Check if the providers is an array before iterating through
		if (!Array.isArray(service.providers)) {
			// console.log(`%c providers = ${service.providers} associated service type = ${service.type} is not an array, skipping`, 'color:crimson');
			continue;
		}
		// Providers are an array we can continue trough the process

		for (const provider of service.providers) {
			let promostatus = generatePromoStatus(provider.status);
			let providerLocationArr: IProviderLocation[] = [];

			// check the location result array and format entries
			if (Array.isArray(provider?.location_result)) {
				for (const entry of provider.location_result) {
					if (entry) {
						let location = parseProviderLocation(entry);
						providerLocationArr.push(location);
					}
				}
			}
			// console.log('%c provider location result arr done', 'color:lime', promostatus, providerLocationArr);

			let curr: iProviderEntry = {
				locationResult: providerLocationArr,
				promoStatus: promostatus,
				provider: provider.provider,
				status: provider.status,
				type: service.type,
			};

			allProviders.push(curr);
		}
	}
	return allProviders;
}

/* Main provider function */
function Provider(props: iProps) {
	const {children, ispArrayFromCraft} = props;
	//

	const [allISPs, setallISPs] = useState<IISP[]>([]);
	const [ServicesFromCoverage, setServicesFromCoverage] = useState<IServiceEntry[]>([]);
	const [currProviders, setcurrProviders] = useState<iActiveProvider[]>([]);

	useEffect(() => {
		// console.log('%c ISP from Craft', 'color:hotpink', ispArrayFromCraft);
		setallISPs([...ispArrayFromCraft]);
	}, [ispArrayFromCraft]);

	// setting up of the location arr based on the service providers available and assigned adresses to them
	function handleServicesFromCoverage(services: IServiceEntry[], providerType: string, isSameAdress?: boolean) {
		let allProviders: iProviderEntry[] = processServices(services);
		// console.log('%c All providers new', 'color:blue', allProviders);

		if (!isSameAdress && services.length > 0) {
			setServicesFromCoverage(services);

			let providers = allProviders.filter((s) => s.type === providerType.toString());

			console.log('%c ISP SERVICE Search', 'color:hotpink', providers);

			if (providers.length > 0) {
				let acitveProviders: iActiveProvider[] = [];

				providers.forEach((x) => {
					let matched = ispArrayFromCraft.filter((z) => z.coverageRef === x.provider)[0];
					// ispArrayFromCraft.filter((z) => console.log('%c what is the values ', 'color:purple', z.coverageRef, z.providerSearchRef, z.solidName, z.slug, '>>>', x.provider));

					if (matched) {
						let curr = x as iActiveProvider;
						curr.hasAdressList = matched?.hasAddressList ?? false;
						acitveProviders.push(curr);
					}
				});

				// console.log('%c Acitve Providers arr created', 'color:peachpuff', acitveProviders);
				setcurrProviders(acitveProviders);
			}
		}
		// same adress so use what we got
		else if (isSameAdress && services.length === 0) {
			console.log('%c ISP SERVICE Same adress was search Search', 'color:yellow');
		}
		// no services recieved from coverage for current search
		else {
			console.log('%c No service where returned from coverage search', 'color:crimson');
			setServicesFromCoverage([]);
			setcurrProviders([]);
		}
	}

	const value: IISPContext = {
		internetServiceProviders: allISPs,
		servicesFromCoverage: ServicesFromCoverage,
		internetServiceProvidersMatched: currProviders,
		handleGetServicesFromCoverage: (services: IServiceEntry[], providerType: string, isSameAdress?: boolean) => handleServicesFromCoverage(services, providerType, isSameAdress),
	};

	return <InternetServiceProvidersContext.Provider value={value}>{children}</InternetServiceProvidersContext.Provider>;
}

// CONTEXT
const InternetServiceProvidersContext = createContext<IISPContext>({} as IISPContext);
export const useInternetServiceProviders = () => useContext(InternetServiceProvidersContext);

// PROVIDER
export default Provider;
