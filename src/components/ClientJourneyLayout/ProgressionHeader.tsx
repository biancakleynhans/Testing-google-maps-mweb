import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {providerJourneyStatus, providerJourneyType, useCoverage} from '@/context/CoverageContext';
import {useClientJourney} from '@/context/ClientJourneyContext';
import MwebSliceContainer from '../shared/MwebSliceContainer';
import MwebIcon from '@/components/ui/mwebIcon/MwebIcon';
import MwebProgressBar from '@/components/ui/mwebProgressBar/MwebProgressBar';
import {useNavContext} from '@/context/NavigationContext';
import {HeaderTypeStepsMatched, NavigationHeaderTypes} from '@/constants/NavJourneySets';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

interface iProps {
	navType: providerJourneyType;
	statusType: providerJourneyStatus;
}

interface iStepsProps {
	currentStep: string;
	currentType: NavigationHeaderTypes;
}

const Steps = (props: iStepsProps) => {
	const {currentStep, currentType} = props;
	const {goToStepByHeaderName} = useNavContext();

	const PREV = 'text-mwTextParaBase text-white cursor-pointer';
	const ACTIVE = 'text-mwTextParaBaseSemi text-white';
	const INACTIVE = 'text-mwTextParaBase text-mwPrimary-500';

	let steps: string[] = HeaderTypeStepsMatched[currentType.toString()];
	// console.log('%c STEPS MADE: ', 'color:coral', currentStep, currentType, statusType, '>>>', steps);

	return (
		<div className='flex flex-col'>
			{/*   Desktop     */}
			<div className='hidden lg:flex flex-row justify-center items-center md:w-full'>
				<div className={`flex flex-row justify-between items-center `}>
					{steps.length > 0 &&
						steps.map((step, index) => {
							let stepStyle = step === currentStep ? ACTIVE : `${steps.indexOf(step) < steps.indexOf(currentStep) ? PREV : INACTIVE}`;
							// console.log('>>>', step, currentStep, steps.indexOf(step));
							return (
								<div
									onClick={() => (steps.indexOf(step) < steps.indexOf(currentStep) ? goToStepByHeaderName(step, currentType) : null)}
									key={index}
									className={`flex flex-row justify-between items-center ${stepStyle}`}
								>
									{step}
									{index !== steps.length - 1 ? (
										<div className='mx-1 md:mx-4 xl:mx-8'>
											<MwebIcon
												variant='functional'
												iconType={'chevron-right'}
												size={20}
												color={`${step === currentStep ? 'text-white' : `${steps.indexOf(step) < steps.indexOf(currentStep) ? 'text-white' : 'text-mwPrimary-500'}`} }`}
											/>
										</div>
									) : (
										<></>
									)}
								</div>
							);
						})}
				</div>
			</div>

			{/* Mobile  */}
			{steps.length > 0 && (
				<div className='flex flex-col w-full lg:hidden justify-center items-center'>
					<StepSlider currentStep={currentStep} steps={steps} />
					<MwebProgressBar curentStep={steps.indexOf(currentStep) + 1} totalSteps={steps.length} color='bg-mwLightTeal-900' />
				</div>
			)}
		</div>
	);
};

const StepSlider = ({currentStep, steps}: {currentStep: string; steps: string[]}) => {
	const PREV = 'text-mwTextParaSmall text-white';
	const ACTIVE = 'text-mwTextParaSmallSemi text-white';
	const INACTIVE = 'text-mwTextParaSmall text-mwPrimary-500';

	const [currslide, setcurrslide] = useState<number>(0);

	const slider = React.useRef<any>(null);
	const {handleCurrActiveStep, isNextActive} = useNavContext();

	const settings = {
		dots: false,
		arrows: false,
		infinite: false,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {slidesToShow: 1},
			},
		],
	};

	// Function to sync currentSlider to currentStep based on action
	useEffect(() => {
		const currentValue = steps.indexOf(currentStep);
		slider?.current.slickGoTo(currentValue);
		setcurrslide(currentValue);
	}, [currentStep]);

	const handlePrev = () => {
		handleCurrActiveStep('back');
		if (currslide === 0) {
			setcurrslide(0);
		} else {
			setcurrslide(currslide - 1);
		}
	};
	const handleNext = () => {
		handleCurrActiveStep('next');
		if (currslide === steps.length) {
			setcurrslide(steps.length);
		} else {
			setcurrslide(currslide + 1);
		}
	};

	return (
		<div className='w-full h-[38px] flex justify-center items-center  px-4 pb-4' role='group'>
			<div className='w-full flex flex-row justify-evenly items-center gap-x-1 sm:w-11/12'>
				{/* Back */}

				<div
					className={currslide > 0 ? 'cursor-pointer' : 'cursor-not-allowed text-mwPrimary-500'}
					onClick={() => {
						if (steps.findIndex((a) => a === 'Add-ons') !== currslide) {
							slider?.current?.slickPrev();
						}
						handlePrev();
					}}
				>
					<MwebIcon variant='functional' iconType={'chevron-left'} size={20} color={currslide > 0 ? 'text-white' : 'text-mwPrimary-500'} />
				</div>
				{/* Slider */}
				<div className='w-11/12'>
					<Slider ref={slider} {...settings}>
						{steps.map((step, index) => (
							<div
								className={`flex flex-row justify-between text-center items-center ${
									step === currentStep ? ACTIVE : `${steps.indexOf(step) < steps.indexOf(currentStep) ? PREV : INACTIVE}`
								}`}
								key={index}
							>
								{step}
							</div>
						))}
					</Slider>
				</div>
				{/* Next */}
				<div
					className={isNextActive && currslide < steps.length ? 'cursor-pointer' : 'cursor-not-allowed text-mwPrimary-500'}
					onClick={() => {
						if (isNextActive && steps.findIndex((a) => a === 'Add-ons') !== currslide) {
							slider?.current?.slickNext();
							handleNext();
						} else if (isNextActive) {
							handleNext();
						}
					}}
				>
					<MwebIcon variant='functional' iconType={'chevron-right'} size={20} color={isNextActive && currslide < steps.length ? 'text-white' : 'text-mwPrimary-500'} />
				</div>
			</div>
		</div>
	);
};

export default function ProgressionHeader(props: iProps) {
	const {navType} = props;
	const {handleReset} = useCoverage();
	const {handleResetClient} = useClientJourney();
	const {currActiveStep} = useNavContext();

	const router = useRouter();

	function resetFull(route: string) {
		handleReset();
		handleResetClient();
		router.push(route);
	}

	const MWEB_BTN = () => {
		return (
			<>
				<button onClick={() => resetFull('/')} className='outline-none h-6 md:h-9 flex w-max hidden md:block'>
					<Image
						className={`h-6 md:h-9 w-[91.333px] md:w-[137px] flex flex-col object-cover`}
						src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/mweb-logo-2020-white.png`}
						width={137}
						height={36}
						priority={true}
						alt='Mweb logo'
					/>
				</button>
				<button onClick={() => resetFull('/')} className='outline-none h-6 md:h-9 flex w-max block md:hidden'>
					<Image
						className={`h-6 md:h-9 w-[92px] md:w-[137px] flex flex-col object-cover`}
						src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/mweb-logo-2020-white.png`}
						width={92}
						height={24}
						priority={true}
						alt='Mweb logo'
					/>
				</button>
			</>
		);
	};

	const CloseButton = () => {
		return (
			<div className={`flex w-auto lg:w-[137px] justify-end items-end`}>
				<button className='text-mwTextParaXSmall md:text-mwTextParaSmall text-white' onClick={() => resetFull(`/${navType}`)}>
					Close
				</button>
			</div>
		);
	};

	const SecureCheckOut = () => {
		return (
			<div className='flex items-center gap-3'>
				<MwebIcon variant='basic' iconType={'lock'} size={16} color='text-white' />
				<h3 className='text-mwTextParaXSmall md:text-mwTextParaSmall text-white'>Secure checkout</h3>
			</div>
		);
	};

	return (
		<MwebSliceContainer sectionId='progression-nav' bgColor='bg-mwPrimary-900' padding=''>
			{/* DESKTOP */}
			<div className='w-full hidden lg:flex flex-row justify-between items-center py-[18px] px-[15px] lg:px-20 gap-x-10'>
				<MWEB_BTN />
				<Steps currentStep={currActiveStep.headerName} currentType={currActiveStep.headerType} />
				{currActiveStep.headerType === NavigationHeaderTypes.ConnectivityPhase2 ? <SecureCheckOut /> : <CloseButton />}
			</div>

			{/* MOBILE */}
			<div className='flex flex-col lg:hidden'>
				<div className='w-full flex flex-col lg:hidden bg-mwPrimary-900'>
					<div className='flex flex-row justify-between items-center px-4 pb-6 pt-4'>
						<MWEB_BTN />

						<div className='w-1/2 text-right right-0 pr-0'>{currActiveStep.headerType === NavigationHeaderTypes.ConnectivityPhase2 ? <SecureCheckOut /> : <CloseButton />}</div>
					</div>

					<Steps currentStep={currActiveStep.headerName} currentType={currActiveStep.headerType} />
				</div>
			</div>
		</MwebSliceContainer>
	);
}
