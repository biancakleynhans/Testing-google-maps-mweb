'use client';

import {INavCategory} from '@/models/nav';
import {createContext, ReactNode, useContext, useState, useEffect} from 'react';
import {providerJourneyStatus, providerJourneyType, useCoverage} from './CoverageContext';
import {usePathname, useRouter} from 'next/navigation';
import Footer from '@/components/footer';
import ProgressionFooter from '@/components/ClientJourneyLayout/ProgressionFooter';
import Header from '@/components/layout/Header';
import {useClientJourney} from './ClientJourneyContext';
import {
	HeaderTypeNavMatched,
	NavJourneyFibre,
	NavJourneyFibreAmber,
	NavJourneyFibreAmberToLte,
	NavJourneyFibreVumaReach,
	NavJourneyHomeInternet,
	NavJourneyLte,
	NavigationHeaderTypes,
	iNavContent,
} from '@/constants/NavJourneySets';

interface INavigationContext {
	currActiveStep: iNavContent;
	handleCurrActiveStep: (type: 'next' | 'back') => void;
	goToStepByHeaderName: (stepName: string, currentType: string) => void;
	isNextActive: boolean;
	handleIsNextActive: (value: boolean) => void;
}

interface iProps {
	children: ReactNode;
	mainNav: INavCategory[];
	topNav: INavCategory[];
}

/* Helper functions Start */

function getNavstateFromPath(path: string, useVr: boolean) {
	let fibreGreen = NavJourneyFibre.filter((x) => x.path === path)[0];
	let fibreVr = NavJourneyFibreVumaReach.filter((x) => x.path === path)[0];
	let homeInternet = NavJourneyHomeInternet.filter((x) => x.path === path)[0];
	let fibreAmber = NavJourneyFibreAmber.filter((x) => x.path === path)[0];
	let fibreAmberLte = NavJourneyFibreAmberToLte.filter((x) => x.path === path)[0];
	let lteGreen = NavJourneyLte.filter((x) => x.path === path)[0];

	let use =
		fibreGreen !== undefined
			? useVr
				? fibreVr
				: fibreGreen
			: homeInternet !== undefined
			? homeInternet
			: fibreAmber !== undefined
			? fibreAmber
			: fibreAmberLte !== undefined
			? fibreAmberLte
			: lteGreen !== undefined
			? lteGreen
			: null;
	return use;
}

function moveFibreVr(type: 'next' | 'back', NavState: iNavContent) {
	let useNavSet = NavJourneyFibreVumaReach;
	let curr: number = useNavSet.indexOf(NavState) != -1 ? useNavSet.indexOf(NavState) : 1;
	let nextStep: iNavContent = useNavSet[curr + 1] !== undefined ? useNavSet[curr + 1] : useNavSet[useNavSet.length - 1];
	let prevStep: iNavContent = useNavSet[curr - 1] !== undefined ? useNavSet[curr - 1] : useNavSet[0];
	let newStep = type === 'next' ? nextStep : prevStep;

	console.log('%c STEPS FIBRE VR ', 'color:violet', curr, newStep);
	return newStep;
}

function moveFibre(type: 'next' | 'back', statusType: providerJourneyStatus, NavState: iNavContent, defaultMove: number = 1) {
	let useNavSet = statusType !== providerJourneyStatus.green ? NavJourneyFibreAmber : NavJourneyFibre;

	let curr: number = useNavSet.indexOf(NavState) != -1 ? useNavSet.indexOf(NavState) : defaultMove;
	let nextStep: iNavContent = useNavSet[curr + 1] !== undefined ? useNavSet[curr + 1] : useNavSet[useNavSet.length - 1];
	let prevStep: iNavContent = useNavSet[curr - 1] !== undefined ? useNavSet[curr - 1] : useNavSet[0];
	let newStep = type === 'next' ? nextStep : prevStep;

	console.log('%c STEPS FIBRE', 'color:lightgreen', curr, newStep);
	return newStep;
}

function moveLte(type: 'next' | 'back', statusType: providerJourneyStatus, NavState: iNavContent, defaultMove: number = 1) {
	let useNavSet = statusType !== providerJourneyStatus.green ? NavJourneyFibreAmberToLte : NavJourneyLte;

	let curr: number = useNavSet.indexOf(NavState) != -1 ? useNavSet.indexOf(NavState) : defaultMove;
	let nextStep: iNavContent = useNavSet[curr + 1] !== undefined ? useNavSet[curr + 1] : useNavSet[useNavSet.length - 1];
	let prevStep: iNavContent = useNavSet[curr - 1] !== undefined ? useNavSet[curr - 1] : useNavSet[0];
	let newStep = type === 'next' ? nextStep : prevStep;

	console.log('%c STEPS LTE', 'color:lightblue', curr, newStep);
	return newStep;
}

/* Helper functions End */

/* Main provider function */
function NavigationProvider(props: iProps) {
	const {children, mainNav, topNav} = props;
	const {currentCoverageObj, startProgression, endProgression, providerType, statusType, isLoading} = useCoverage();
	const {connectivityOption, selectedProduct} = useClientJourney();

	const router = useRouter();
	const path = usePathname();

	const [NavState, setNavState] = useState<iNavContent>(NavJourneyFibre[0]);
	const [isNextActive, setIsNextActive] = useState<boolean>(false);

	/* page setup ie, when someone hits refresh */
	useEffect(() => {
		let use = getNavstateFromPath(path ?? '', selectedProduct?.providerCode === 'vumatelreach');

		// console.log('%c Path : ', 'color:yellow', path);
		// console.log('%c Nav state from Path : ', 'color:yellow', use);
		// console.log('%c Current selected product is :', 'color:yellow', selectedProduct?.providerCode);
		// console.log('%c Current connectivity option is :', 'color:yellow', typeof connectivityOption, connectivityOption);

		if (path !== NavState?.path) {
			setIsNextActive(false);

			if (use) {
				setNavState(use);

				if (selectedProduct) {
					setIsNextActive(true);
				}
			} else {
				setNavState(NavJourneyFibre[0]);
			}
		}
	}, [path, selectedProduct, connectivityOption]);

	/* location changes wait for all 28E calls to complete */
	useEffect(() => {
		// console.log('%c loading api calls', 'color:crimson', isLoading);
		if (isLoading) {
			setIsNextActive(false);
		} else {
			setIsNextActive(true);
		}
	}, [isLoading]);

	/* check for the coverage obj and start progression ==> updated the header now with new values and catering for status types */
	// useEffect(() => {
	// 	// adress has been searched and the client journey has been activated
	// 	// console.log('Provider type', providerType, 'status type', statusType, '>>>', startProgression, typeof currentCoverageObj);

	// 	if (currentCoverageObj && startProgression) {
	// 		// fibre
	// 		if (providerType === providerJourneyType.fibre) {
	// 			setNavState(statusType !== providerJourneyStatus.green ? NavJourneyFibreAmber[1] : NavJourneyFibre[1]);
	// 		}
	// 		// lte
	// 		else if (providerType === providerJourneyType.lte) {
	// 			setNavState(statusType !== providerJourneyStatus.green ? NavJourneyFibreAmberToLte[1] : NavJourneyLte[1]);
	// 		}
	// 		// 5G
	// 		else if (providerType === providerJourneyType['5G']) {
	// 			setNavState(statusType !== providerJourneyStatus.red ? NavJourneyHomeInternet[1] : NavJourneyHomeInternet[1]);
	// 		}
	// 	}
	// }, [currentCoverageObj, startProgression, providerType, statusType]);

	/*handles navigating the user to where they want to go */
	function handleMovement(type: 'next' | 'back') {
		// console.log('%c type : ', 'color:coral', type);
		// console.log('%c provider and status', 'color:coral', providerType, statusType);
		// console.log('%c Current selected product is :', 'color:coral', selectedProduct?.providerCode);

		let newStep: iNavContent = NavJourneyFibre[0];

		// Vuma reach
		if (selectedProduct?.providerCode === 'vumatelreach') {
			console.log('%c 1. handle Movement VR', 'color:violet', statusType, providerType, type, selectedProduct?.providerCode);
			newStep = moveFibreVr(type, NavState);
		}
		// norrmal
		else {
			// Alt point switch over
			if (connectivityOption && connectivityOption?.altJourney !== undefined) {
				console.log('%c 1. handle Movement Switch over ', 'color:lightgreen', statusType, providerType, type, connectivityOption?.altJourney);
				let count = statusType === providerJourneyStatus.red ? 0 : 1;

				newStep = connectivityOption.altJourney === providerJourneyType.lte ? moveLte(type, statusType, NavState) : moveFibre(type, statusType, NavState);
			}
			// normal
			else {
				console.log('%c 1. handle Movement NORMAL', 'color:lightgreen', statusType, providerType, type, connectivityOption?.altJourney);
				newStep = providerType === providerJourneyType.fibre ? moveFibre(type, statusType, NavState) : moveLte(type, statusType, NavState);
			}
		}

		setNavState(newStep);
		setIsNextActive(false);
		router.push(newStep.path);
	}

	//
	function goToStep(stepName: string, currentType: string) {
		let nav = HeaderTypeNavMatched[currentType];
		let selected = HeaderTypeNavMatched[currentType].find((x) => x.headerName === stepName);
		console.log('we want to go to this step: ', stepName, nav, selected);

		if (selected) {
			setNavState(selected);
			router.push(selected.path);
		}
	}

	const value: INavigationContext = {
		currActiveStep: NavState,
		isNextActive: isNextActive,
		handleCurrActiveStep: (type: 'next' | 'back') => handleMovement(type),
		handleIsNextActive: (value) => setIsNextActive(value),
		goToStepByHeaderName: (stepName: string, currentType: string) => goToStep(stepName, currentType),
	};

	return (
		<NavigationContext.Provider value={value}>
			<div data-testid='general_layout' className='min-h-screen flex flex-col items-between'>
				{/* Headers  */}
				<Header mainNav={mainNav} navState={NavState} topNav={topNav} navType={providerType} currentProviderStatus={statusType} />

				{/* Children  */}
				<section>{children}</section>

				{/* Footers  */}
				<section>
					{NavState && NavState.headerType !== NavigationHeaderTypes.Default ? (
						<>{!path?.includes('/order-summary') ? <ProgressionFooter /> : <Footer variant={'condensed'} />}</>
					) : (
						<Footer variant={'full'} hideAppSlice={path?.includes('/order-confirmation') ? true : false} />
					)}
				</section>
			</div>
		</NavigationContext.Provider>
	);
}

// CONTEXT
const NavigationContext = createContext<INavigationContext>({} as INavigationContext);
export const useNavContext = () => useContext(NavigationContext);

// PROVIDER
export default NavigationProvider;
