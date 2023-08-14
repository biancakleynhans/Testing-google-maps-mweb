'use client';

import {IHelpMeDecide} from '@/models/HelpMeDecideModels';
import React, {useEffect, useState} from 'react';
import {FaRegImage} from 'react-icons/fa';
import {BsSquareFill, BsSquare} from 'react-icons/bs';
import {MdClose} from 'react-icons/md';
import DynamicPopOver from './DynamicPopOver';
import MwebCard from '@/components/ui/mwebCard/MwebCard';
import {iHDMCardDetails} from '@/components/ui/mwebCard/CardStyles';
import CTAButton from '../switchBlock/CTAButton';

interface iProps {
	data: IHelpMeDecide;
}

interface iSelectedOption {
	code: string;
	selected: boolean;
	text: string;
	image: string;
}

enum HMD_STEPS {
	'internet-use' = 'internet-use',
	'number-of-devices' = 'number-of-devices',
	'location-of-use' = 'location-of-use',
	'solution-type' = 'solution-type',
	'price-range' = 'price-range',
	'adress' = 'adress',
	'products' = 'products',
	'router-option' = 'router-option',
}

const DeviceOptions: iSelectedOption[] = [
	{code: '1-3', text: '1-3', image: '', selected: false},
	{code: '4-6', text: '4-6', image: '', selected: false},
	{code: '7-9', text: '7-9', image: '', selected: false},
	{code: '10+', text: '10+', image: '', selected: false},
];

const FixedOrPortableOptions: iSelectedOption[] = [
	{code: 'Fixed', text: 'I use my Internet at home', image: '', selected: false},
	{code: 'Portable', text: 'I take my Internet with me', image: '', selected: false},
];

const AllInOneOptions: iSelectedOption[] = [
	{code: 'Connectivity + Internet Security', text: 'All the tools to keep you and your family safe online', image: '', selected: false},
	{code: 'Connectivity + Entertainment', text: 'Stream thousands of series, sports and movies', image: '', selected: false},
	{code: 'Connectivity + Home Office', text: 'Set up your office to make working from home a breeze', image: '', selected: false},
	{code: 'Connectivity Only', text: 'No thanks, I want connectivity only', image: '', selected: false},
];

const BugetOptions: iSelectedOption[] = [
	{code: '0-400', text: 'R400 or less', image: '', selected: false},
	{code: '400-800', text: 'R400 - R800', image: '', selected: false},
	{code: '800-10000', text: 'R800 +', image: '', selected: false},
];

export default function HelpMeDecideLayout(props: iProps) {
	const {data} = props;
	const [internetUseOptions, setinternetUseOptions] = useState<iSelectedOption[]>([]);
	//edited
	const [internetTypeOptions, setinternetTypeOptions] = useState<iSelectedOption[]>([]);
	const [deviceCountOptions, setdeviceCountOptions] = useState<iSelectedOption[]>([]);
	const [locationOfUseOptions, setlocationOfUseOptions] = useState<iSelectedOption[]>([]);
	const [allInOneOptions, setallInOneOptions] = useState<iSelectedOption[]>([]);
	const [bugetOptions, setbugetOptions] = useState<iSelectedOption[]>([]);

	const [currStep, setcurrStep] = useState<HMD_STEPS>(HMD_STEPS['internet-use']);

	// Pop over for steps
	const [isOpen, setIsOpen] = useState(true);

	// Start up setup
	useEffect(() => {
		let arr: iSelectedOption[] = data.choices.map((x) => ({text: x.text, code: x.text, image: x.image, selected: false} as iSelectedOption));
		let arrType: iSelectedOption[] = data.types.map((x) => ({text: x.text, code: x.text, image: x.image, selected: false} as iSelectedOption));
		setinternetUseOptions(arr);
		setinternetTypeOptions(arrType);
		setdeviceCountOptions(DeviceOptions);
		setlocationOfUseOptions(FixedOrPortableOptions);
		setallInOneOptions(AllInOneOptions);
		setbugetOptions(BugetOptions);
	}, [data]);

	// useEffect(() => {
	//   // console.log('%c curr step is: ', 'color:hotpink', currStep);
	// }, [currStep]);

	/* Step 0 */
	function handleAddToStateInternetUseOptions(selectedOption: iSelectedOption) {
		let arr: iSelectedOption[] = [];

		internetUseOptions.forEach((option) => {
			if (option.code === selectedOption.code) {
				selectedOption.selected = !selectedOption.selected;
				arr.push(selectedOption);
			} else {
				arr.push(option);
			}
		});

		// console.log('%c Done with change Internet Use Options', 'color: aqua', arr);
		setinternetUseOptions(arr);
	}
	function handleAddToStateInternetTypeOptions(selectedOption: iSelectedOption) {
		let arrType: iSelectedOption[] = [];

		internetTypeOptions.forEach((option) => {
			if (option.code === selectedOption.code) {
				selectedOption.selected = !selectedOption.selected;
				arrType.push(selectedOption);
			} else {
				arrType.push(option);
			}
		});

		// console.log('%c Done with change Internet Use Options', 'color: aqua', arr);
		setinternetTypeOptions(arrType);
	}

	/* Step 1 */
	function handleAddStateDeviceCountOptions(selectedOption: iSelectedOption) {
		let arr: iSelectedOption[] = [];

		deviceCountOptions.forEach((option) => {
			if (option.code === selectedOption.code) {
				selectedOption.selected = !selectedOption.selected;
				arr.push(selectedOption);
			} else {
				option.selected = false;
				arr.push(option);
			}
		});

		// console.log('%c Done with change Device Count', 'color: cyan', arr);
		setdeviceCountOptions(arr);
		// trigger go to next step
		setcurrStep(HMD_STEPS['location-of-use']);
	}

	/* Step 2 */
	function handleAddToStateLocationUseOptions(selectedOption: iSelectedOption) {
		let arr: iSelectedOption[] = [];

		locationOfUseOptions.forEach((option) => {
			if (option.code === selectedOption.code) {
				selectedOption.selected = !selectedOption.selected;
				arr.push(selectedOption);
			} else {
				option.selected = false;
				arr.push(option);
			}
		});

		// console.log('%c Done with change Location Use', 'color: deepskyblue', arr);
		setlocationOfUseOptions(arr);
		// trigger go to next step
		setcurrStep(HMD_STEPS['solution-type']);
	}

	/* Step 3 */
	function handleAddToStateAllInOneOptions(selectedOption: iSelectedOption) {
		let arr: iSelectedOption[] = [];

		allInOneOptions.forEach((option) => {
			if (option.code === selectedOption.code) {
				selectedOption.selected = !selectedOption.selected;
				arr.push(selectedOption);
			} else {
				option.selected = false;
				arr.push(option);
			}
		});

		// console.log('%c Done with change All In One', 'color: dodgerblue', arr);
		setallInOneOptions(arr);
		// trigger go to next step
		setcurrStep(HMD_STEPS['price-range']);
	}

	/* Step 4 */
	function handleAddTostateBugetOptions(selectedOption: iSelectedOption) {
		let arr: iSelectedOption[] = [];

		bugetOptions.forEach((option) => {
			if (option.code === selectedOption.code) {
				selectedOption.selected = !selectedOption.selected;
				arr.push(selectedOption);
			} else {
				option.selected = false;
				arr.push(option);
			}
		});

		// console.log('%c Done with change All In One', 'color: lightskyblue', arr);
		setbugetOptions(arr);
		// trigger go to next step
		setcurrStep(HMD_STEPS['adress']);
	}

	/* Close resets everything */
	function handleClose() {
		// resets internet use options
		let arr: iSelectedOption[] = data.choices.map((x) => ({text: x.text, code: x.text, image: x.image, selected: false} as iSelectedOption));
		let arrType: iSelectedOption[] = data.types.map((x) => ({text: x.text, code: x.text, image: x.image, selected: false} as iSelectedOption));
		setinternetUseOptions(arr);
		setinternetTypeOptions(arrType);

		// resets back to step one internet use
		setcurrStep(HMD_STEPS['internet-use']);

		// closes dialog
		setIsOpen(false);
	}

	/*  Reusable Displays */
	const TopBar = ({actionForClickBack}: {actionForClickBack: () => void}) => (
		<div className='w-full flex flex-row justify-between items-center px-8 py-[30px]'>
			<button className='text-mwsm font-normal text-black text-left' onClick={() => actionForClickBack()}>
				Back
			</button>
			<button className='text-mwsm font-normal text-black text-right' onClick={() => handleClose()}>
				<MdClose />
			</button>
		</div>
	);

	const StepBar = ({currStep}: {currStep: number}) => {
		// bottom pos => pb-10 pt-20 lg:pb-20 lg:pt-60
		return (
			<div className='pt-0 pb-10'>
				<div className='flex flex-row justify-center items-center'>
					<div key={1} className={`w-16 h-1 mx-0 ${1 <= currStep ? 'bg-black' : 'bg-mwgray-400'}`} />
					<div key={2} className={`w-16 h-1 mx-0 ${2 <= currStep ? 'bg-black' : 'bg-mwgray-400'}`} />
					<div key={3} className={`w-16 h-1 mx-0 ${3 <= currStep ? 'bg-black' : 'bg-mwgray-400'}`} />
					<div key={4} className={`w-16 h-1 mx-0 ${4 <= currStep ? 'bg-black' : 'bg-mwgray-400'}`} />
					<div key={5} className={`w-16 h-1 mx-0 ${5 <= currStep ? 'bg-black' : 'bg-mwgray-400'}`} />
				</div>
			</div>
		);
	};

	/* DISPLAY STEPS */

	/* Step 0 */
	function InternetUseDisplay() {
		const helpType = internetTypeOptions.map((option) => option.text);
		return (
			<div className='grid grid-cols-2 md:grid-cols-2 desktop:grid-cols-4 gap-4 md:gap-6'>
				{internetUseOptions.map((choice, i) => (
					<div key={`desktop-internet-use-container-${i}`}>
						<div key={`desktop-internet-use-container-${i}`} className='text-mwTextParaBaseSemi hidden md:block'>
							<MwebCard
								key={`desktop-internet-use-${i}`}
								onClickCallback={() => handleAddToStateInternetUseOptions(choice)}
								type='HMD'
								isSelected={choice.selected}
								size='large'
								cardDetails={{label: choice.text, type: choice.image} as iHDMCardDetails}
							/>
						</div>

						<div key={`mobile-internet-use-container-${i}`} className='text-mwTextParaBaseSemi md:hidden'>
							<MwebCard
								key={`mobile-internet-use-${i}`}
								onClickCallback={() => handleAddToStateInternetUseOptions(choice)}
								type='HMD'
								isSelected={choice.selected}
								size='small'
								cardDetails={{label: choice.text, type: choice.image} as iHDMCardDetails}
							/>
						</div>
					</div>
				))}
			</div>
		);
	}

	/* Step 1 */
	function DeviceOptionsDisplayOptions() {
		return (
			<div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
				{deviceCountOptions.map((option, index) => (
					<button
						key={`device-options-${index}`}
						className={`${option.selected ? 'border-2 border-black' : 'border border-mwgray-400'} flex flex-col justify-center items-center py-2 px-24`}
						onClick={() => handleAddStateDeviceCountOptions(option)}
					>
						{option.image.length > 0 ? <>TODO</> : <FaRegImage size={32} className='text-mwgray-400 my-3' />}
						<div className='text-black text-mwbase font-semibold'> {option.text}</div>
					</button>
				))}
			</div>
		);
	}

	function DeviceOptionsDisplayContainer() {
		return (
			<div className='flex flex-col justify-center items-center'>
				{/* TOP BAR  */}
				<TopBar
					actionForClickBack={() => {
						setcurrStep(HMD_STEPS['internet-use']);
						setIsOpen(false);
					}}
				/>
				{/* step bar active step is the amount that are black for testing 1 of 5 */}
				<StepBar currStep={1} />

				{/* main header  */}
				<div className='mt-14 mb-2 text-black text-mw4xl font-semibold '>How many devices are connected to the internet? </div>

				{/* Sub hearder or normal text  */}
				<div className='mt-0 mb-5 text-black text-mwsm font-normal '>These include TVs, mobile devices, tablets, PCs, laptops, gaming consoles and smart devices.</div>

				{/* Options  */}
				<DeviceOptionsDisplayOptions />
			</div>
		);
	}

	/* Step 2 */
	function LocationOfUseOptionsDisplayOptions() {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				{locationOfUseOptions.map((option, index) => (
					<button
						key={`location-of-use-${index}`}
						className={`${option.selected ? 'border-2 border-black' : 'border border-mwgray-400'} flex flex-col justify-center items-center py-2 px-24`}
						onClick={() => handleAddToStateLocationUseOptions(option)}
					>
						{option.image.length > 0 ? <>TODO</> : <FaRegImage size={32} className='text-mwgray-400 my-3' />}
						<div className='text-black text-mwbase font-semibold'> {option.text}</div>
						<div className='text-black text-mwsm font-normal'>
							{option.code === 'Fixed' ? 'Get connected in 5-10 days with ultra-fast Fibre' : 'Get connected in 1-5 days with plug and play LTE'}
						</div>
					</button>
				))}
			</div>
		);
	}

	function LocationOfUseOptionsDisplayContainer() {
		return (
			<div className='flex flex-col justify-center items-center'>
				{/* TOP BAR  */}
				<TopBar
					actionForClickBack={() => {
						setcurrStep(HMD_STEPS['number-of-devices']);
						setIsOpen(true);
					}}
				/>
				{/* step bar active step is the amount that are black for testing 1 of 5 */}
				<StepBar currStep={2} />

				{/* main header  */}
				<div className='mt-14 mb-2 text-black text-mw4xl font-semibold '>Where do you use the internet?</div>

				{/* Sub hearder or normal text  */}
				<div className='mt-0 mb-5 text-black text-mwsm font-normal '></div>

				{/* Options  */}
				<LocationOfUseOptionsDisplayOptions />
			</div>
		);
	}

	/* Step 3 */
	function AllInOneDisplayOptions() {
		return (
			<div className='mx-4'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
					{allInOneOptions.slice(0, allInOneOptions.length - 1).map((option, index) => (
						<button
							key={`all-in-one-options-${index}`}
							className={`${option.selected ? 'border-2 border-black' : 'border border-mwgray-400'} flex flex-col justify-start items-start py-2 px-4`}
							onClick={() => handleAddToStateAllInOneOptions(option)}
						>
							<div className='text-black text-mwsm font-normal text-left'>{option.code}</div>
							<div className='text-black text-[28px] font-semibold text-left'> {option.text}</div>
						</button>
					))}
				</div>

				<div className='flex flex-row justify-center items-center mt-3 '>
					{allInOneOptions.slice(allInOneOptions.length - 1).map((option, index) => (
						<button key={index} className='flex flex-row justify-center items-center' onClick={() => handleAddToStateAllInOneOptions(option)}>
							<div>{option.selected ? <BsSquareFill size={24} /> : <BsSquare size={24} />}</div>
							<div className='mx-2 text-black text-mwbase font-semibold'>{option.text}</div>
						</button>
					))}
				</div>
			</div>
		);
	}

	function AllInOneDisplayContainer() {
		return (
			<div className='flex flex-col justify-center items-center'>
				{/* TOP BAR  */}
				<TopBar
					actionForClickBack={() => {
						setcurrStep(HMD_STEPS['location-of-use']);
						setIsOpen(true);
					}}
				/>
				{/* step bar active step is the amount that are black for testing 1 of 5 */}
				<StepBar currStep={3} />

				{/* main header  */}
				<div className='mt-14 mb-2 text-black text-mw4xl font-semibold '>Would you like an all-in-one solution?</div>

				{/* Sub hearder or normal text  */}
				<div className='mt-0 mb-5 text-black text-mwsm font-normal '>Get better deals when you bundle our products with your connectivity solution</div>

				{/* Options  */}
				<AllInOneDisplayOptions />
			</div>
		);
	}

	/* Step 4 */
	function BugetDisplayOptions() {
		return (
			<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
				{bugetOptions.map((option, index) => (
					<button
						key={`budget-options-${index}`}
						className={`${option.selected ? 'border-2 border-black' : 'border border-mwgray-400'} flex flex-col justify-center items-center py-2 px-24`}
						onClick={() => handleAddTostateBugetOptions(option)}
					>
						{option.image.length > 0 ? <>TODO</> : <FaRegImage size={32} className='text-mwgray-400 my-3' />}
						<div className='text-black text-mwbase font-semibold'> {option.text}</div>
					</button>
				))}
			</div>
		);
	}

	function BugetDisplayContainer() {
		return (
			<div className='flex flex-col justify-center items-center'>
				{/* TOP BAR  */}
				<TopBar
					actionForClickBack={() => {
						setcurrStep(HMD_STEPS['solution-type']);
						setIsOpen(true);
					}}
				/>
				{/* step bar active step is the amount that are black for testing 1 of 5 */}
				<StepBar currStep={4} />

				{/* main header  */}
				<div className='mt-14 mb-2 text-black text-mw4xl font-semibold '>Which price range best fits your budget?</div>

				{/* Sub hearder or normal text  */}
				<div className='mt-0 mb-5 text-black text-mwsm font-normal '></div>

				{/* Options  */}
				<BugetDisplayOptions />
			</div>
		);
	}

	/* Step 5 */
	function AdressContainer() {
		return (
			<div className='flex flex-col justify-center items-center'>
				{/* TOP BAR  */}
				<TopBar
					actionForClickBack={() => {
						setcurrStep(HMD_STEPS['price-range']);
						setIsOpen(true);
					}}
				/>
				{/* step bar active step is the amount that are black for testing 1 of 5 */}
				<StepBar currStep={5} />

				{/* main header  */}
				<div className='mt-14 mb-2 text-black text-mw4xl font-semibold '>At which address do you use internet?</div>

				{/* Sub hearder or normal text  */}
				<div className='mt-0 mb-5 text-black text-mwsm font-normal '></div>

				{/* Options  */}
				{/* <CoverageLayout bgColor='bg-none focus:border focus:border-mwgray-400' inputBgColor='bg-none' locBgColor='bg-none' showSmallChangeBtn={true} /> */}
			</div>
		);
	}

	return (
		<div className='flex flex-col justify-center items-center bg-white px-4 py-14 md:py-24 md:px-16 lg:px-[182px]'>
			<div className='text-center text-mwTextMobileH1Bold md:text-mwTextDeskH1Bold mb-2'>{data.heading}</div>
			<div className='text-center text-mwTextParaBase md:text-mwTextParaXLarge text-mwGrey-600 mb-10'>{data.subHeading}</div>
			{/* <div className='text-center text-mwxl font-semibold mb-11'>{data.supportText}</div> */}

			{currStep === HMD_STEPS['internet-use'] && <InternetUseDisplay />}

			{currStep === HMD_STEPS['number-of-devices'] && <DynamicPopOver displayChild={<DeviceOptionsDisplayContainer />} handleIsOpen={() => setIsOpen(false)} isOpen={isOpen} />}

			{currStep === HMD_STEPS['location-of-use'] && (
				<DynamicPopOver displayChild={<LocationOfUseOptionsDisplayContainer />} handleIsOpen={() => setIsOpen(false)} isOpen={isOpen} />
			)}

			{currStep === HMD_STEPS['solution-type'] && <DynamicPopOver displayChild={<AllInOneDisplayContainer />} handleIsOpen={() => setIsOpen(false)} isOpen={isOpen} />}

			{currStep === HMD_STEPS['price-range'] && <DynamicPopOver displayChild={<BugetDisplayContainer />} handleIsOpen={() => setIsOpen(false)} isOpen={isOpen} />}

			{currStep === HMD_STEPS['adress'] && <DynamicPopOver displayChild={<AdressContainer />} handleIsOpen={() => setIsOpen(false)} isOpen={isOpen} />}

			{/* Step 1 trigger Opens pop up for all remaining steps  */}

			<CTAButton
				action={null}
				copyText=''
				color='primary'
				ctaBtnText={data.cta ? data.cta.btnText: "Get started"}
				onClickFunction={() => {
					setcurrStep(HMD_STEPS['number-of-devices']);
					setIsOpen(true);
				}}
			/>
		</div>
	);
}
