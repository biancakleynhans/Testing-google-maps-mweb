'use client';

import React, {useState} from 'react';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import MwebListItem from '@/components/ui/mwebList/MwebListItem';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';
import MwebButtonAppStore from '@/components/ui/mwebButtons/MwebButtonAppStore';
import MwebSearchBar from '@/components/ui/mwebSearch/MwebSearchBar';
import MwebButtonGroup from '@/components/ui/mwebButtonGroup/MwebButtonGroup';
import MwebIcon from '@/components/ui/mwebIcon/MwebIcon';
import MwebIndicator from '@/components/ui/mwebIndicators/MwebIndicator';
import MwebAccordion from '@/components/ui/mwebAccordion/MwebAccordion';
import MwebRadioButton from '@/components/ui/mwebRadioButton/MwebRadioButton';
import MwebIconIllustration from '@/components/ui/mwebIcon/MwebIconIllustration';
import MwebToggle from '@/components/ui/mwebToggles/MwebToggles';
import MwebCheckbox from '@/components/ui/mwebCheckbox/MwebCheckbox';

import MwebCard from '@/components/ui/mwebCard/MwebCard';
import MwebProgressBar from '@/components/ui/mwebProgressBar/MwebProgressBar';
import {
	iCompareCardDetails,
	iFeatureCardDetails,
	iHDMCardDetails,
	iOptionCardDetails,
	iOrderSummaryCardDetails,
	iProductCardDetails,
	iVasCardDetails,
	iVoucherCardDetails,
} from '@/components/ui/mwebCard/CardStyles';
import MwebNotification from '@/components/ui/mwebNotifications/MwebNotifications';
import NotificationButton from '@/components/ui/mwebNotifications/MwebNotificationButton';
import MwebAlerts from '@/components/ui/mwebNotifications/MwebAlerts';
import {AiFillInfoCircle} from 'react-icons/ai';
import MwebInput from '@/components/ui/MwebInput/MwebInput';

export default function Page() {
	const [input, setinput] = useState<string>('Standard input');
	const [inputSelect, setinputSelect] = useState<string>('');
	const [verifyCode, setverifyCode] = useState<string>('');
	const [voucherCode, setvoucherCode] = useState<string>('');

	const [standardRadioSelected, setStandardRadioSelected] = useState<'large' | 'small'>('large');
	const [fillRadioSelected, setFillRadioSelected] = useState<'large' | 'small'>('large');

	interface iButtonListEntry {
		label: string;
		description: string;
		isActive: boolean;
	}

	const Buttons: iButtonListEntry[] = [
		{label: 'BEST VALUE', description: 'Description', isActive: true},
		{label: 'MOST POPULAR', description: 'Description', isActive: false},
		{label: 'FASTEST', description: 'Description', isActive: false},
		{label: 'ALL-IN-ONE', description: 'Description', isActive: false},
		{label: 'Label5', description: 'Description', isActive: false},
		{label: 'Label6', description: 'Description', isActive: false},
		{label: 'Label7', description: 'Description', isActive: false},
		{label: 'Label8', description: 'Description', isActive: false},
	];

	const Buttons2: iButtonListEntry[] = Buttons.map((x) => ({description: '', isActive: x.isActive, label: x.label}));

	return (
		<MwebSliceContainer sectionId='' bgColor='bg-mwGrey-300' padding='p-4'>
			<div className='text-mwxl text-mwPrimary-500 text-center'>STANDARD Input </div>
			<div className='w-full flex flex-row flex-wrap justify-start items-start gap-x-8 gap-y-4 bg-red-100 p-8 mb-8'>
				<MwebInput
					id={'input-text-prefilled'}
					errorText=''
					iconPostion=''
					showIcon={false}
					type='text'
					isDisabled={false}
					placeHolderText='Standard Field Pre-filled'
					helperText='Standard Helper text'
					labelText='Pre-filled Field Label'
					inputValue={'Gary Riffel'}
					handleChange={(val: any) => console.log(val)}
				/>
				<MwebInput
					id={'input-text-nonfilled'}
					errorText=''
					iconPostion=''
					showIcon={false}
					type='text'
					isDisabled={false}
					placeHolderText=''
					helperText='Non-Filled Helper text'
					labelText='Non-Filled Label'
					inputValue={''}
					handleChange={(val: any) => console.log(val)}
				/>
				<MwebInput
					id={'input-text-disabled'}
					errorText=''
					iconPostion=''
					showIcon={false}
					type='text'
					isDisabled={true}
					placeHolderText='Disabled example'
					helperText='Helper text for disabled field'
					labelText='Disabled State Label'
					inputValue={'This is disabled'}
					handleChange={(val: any) => console.log(val)}
				/>
				<MwebInput
					id={'input-text-error'}
					errorText='Sumting Went Wong'
					iconPostion=''
					showIcon={false}
					type='text'
					isDisabled={false}
					placeHolderText='Error example'
					helperText='Focus and Unfocus to update error state'
					labelText='Error State Label'
					inputValue={'This is the error state'}
					handleChange={(val: any) => console.log(val)}
				/>
			</div>

			<div className='w-full flex flex-col justify-center items-center gap-y-4 '>
				<div className='text-mw3xl text-mwPrimary-900  '> UI DEMO PAGE</div>

				<div className='text-mw2xl text-mwTealGradientFromLeft'>Mweb buttons and variations </div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Text only </div>
				<div className='flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebButton color='primary' size='small' btnText='Button Text' hasIcon={false} isDisabled={false} onClickFunction={() => {}} />
					<MwebButton color='secondary-dark' size='medium' btnText='Button Text' hasIcon={false} isDisabled={false} onClickFunction={() => {}} />
					<MwebButton color='secondary-light' size='large' btnText='Button Text' hasIcon={false} isDisabled={false} onClickFunction={() => {}} />
					<MwebButton color='text-only' size='large' btnText='Button Text' hasIcon={false} isDisabled={false} onClickFunction={() => {}} />
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Text only disabled </div>
				<div className='flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebButton color='primary' size='small' btnText='Button Text' hasIcon={false} isDisabled={true} onClickFunction={() => {}} />
					<MwebButton color='secondary-dark' size='medium' btnText='Button Text' hasIcon={false} isDisabled={true} onClickFunction={() => {}} />
					<MwebButton color='secondary-light' size='large' btnText='Button Text' hasIcon={false} isDisabled={true} onClickFunction={() => {}} />
					<MwebButton color='text-only' size='large' btnText='Button Text' hasIcon={false} isDisabled={true} onClickFunction={() => {}} />
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Text and icons </div>
				<div className='w-full flex flex-row flex-wrap justify-evenly items-center  gap-y-2'>
					<MwebButton
						color='primary'
						size='small'
						btnText='Button Text'
						isDisabled={false}
						onClickFunction={() => {}}
						hasIcon={true}
						iconProps={{variant: 'basic', color: 'text-mwGrey-600', icon: 'circle', size: 18, iconPosition: 'left'}}
					/>

					<MwebButton
						color='secondary-dark'
						size='medium'
						btnText='secondary-dark Button Text'
						isDisabled={false}
						onClickFunction={() => {}}
						hasIcon={true}
						iconProps={{variant: 'basic', color: 'secondary-dark', icon: 'circle', size: 18, iconPosition: 'right'}}
					/>

					<MwebButton
						color='secondary-light'
						size='large'
						btnText=''
						isDisabled={false}
						onClickFunction={() => {}}
						hasIcon={true}
						iconProps={{variant: 'basic', color: '', icon: 'circle', size: 24, iconPosition: 'icon-only'}}
					/>

					<MwebButton
						color='text-only'
						size='large'
						btnText='Button Text'
						hasIcon={true}
						isDisabled={false}
						onClickFunction={() => {}}
						iconProps={{variant: 'basic', color: '', icon: 'circle', size: 18, iconPosition: 'left'}}
					/>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Text and icons disabled </div>
				<div className='flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebButton
						color='primary'
						size='small'
						btnText='Button Text'
						hasIcon={true}
						isDisabled={true}
						onClickFunction={() => {}}
						iconProps={{variant: 'basic', color: '', icon: 'circle', size: 18, iconPosition: 'left'}}
					/>

					<MwebButton
						color='secondary-dark'
						size='medium'
						btnText='Button Text'
						hasIcon={true}
						isDisabled={true}
						onClickFunction={() => {}}
						iconProps={{variant: 'basic', color: 'text-mwGrey-600', icon: 'circle', size: 18, iconPosition: 'right'}}
					/>

					<MwebButton
						color='secondary-light'
						size='large'
						btnText='Button Text'
						hasIcon={true}
						isDisabled={true}
						onClickFunction={() => {}}
						iconProps={{variant: 'basic', color: 'text-mwGrey-600', icon: 'circle', size: 18, iconPosition: 'icon-only'}}
					/>

					<MwebButton
						color='text-only'
						size='large'
						btnText='Button Text'
						hasIcon={true}
						isDisabled={true}
						onClickFunction={() => {}}
						iconProps={{variant: 'basic', color: 'text-mwGrey-600', icon: 'circle', size: 18, iconPosition: 'right'}}
					/>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>App store Buttons </div>
				<div className='flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebButtonAppStore size='large' brand='apple' type='brand' />
					<MwebButtonAppStore size='medium' brand='huawei' type='black' />
					<MwebButtonAppStore size='small' brand='apple' type='white' />
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Search bars </div>
				<div className='w-full flex flex-col justify-center items-center gap-y-4'>
					<MwebSearchBar type='round' placeHolderText='Enter your address to get connected' isDisabled={false} />
					<MwebSearchBar type='square' placeHolderText='Enter your address to get connected' isDisabled={false} />
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Buttons Groups </div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Buttons with label and description</div>
				<div className='flex flex-col justify-center items-center gap-4'>
					<div>UP TO 4 BUTTONS</div>
					<MwebButtonGroup hasDescription={true} size='small' buttons={Buttons.slice(0, 4)} onClickFunc={() => {}} />
					<MwebButtonGroup hasDescription={false} size='small' buttons={Buttons2.slice(0, 4)} onClickFunc={() => {}} />
					<MwebButtonGroup hasDescription={true} size='large' buttons={Buttons.slice(0, 4)} onClickFunc={() => {}} />
					<MwebButtonGroup hasDescription={false} size='large' buttons={Buttons2.slice(0, 4)} onClickFunc={() => {}} />

					<div className='mt-4'>MORE THAN 4 BUTTONS</div>
					<MwebButtonGroup hasDescription={true} size='small' buttons={Buttons} onClickFunc={() => {}} />
					<MwebButtonGroup hasDescription={false} size='small' buttons={Buttons2} onClickFunc={() => {}} />

					<MwebButtonGroup hasDescription={true} size='large' buttons={Buttons} onClickFunc={() => {}} />
					<MwebButtonGroup hasDescription={false} size='large' buttons={Buttons2} onClickFunc={() => {}} />
				</div>

				<div className='text-mw2xl text-mwTealGradientFromLeft'>Mweb inputs and variations </div>

				<div className='text-mwxl text-mwPrimary-500'>STANDARD Input </div>
				<div className='w-full flex flex-row flex-wrap justify-start items-start gap-x-4 gap-y-4'>
					<MwebInput
						id={`ui-demo-input-text-1`}
						errorText=''
						iconPostion='both'
						showIcon={true}
						type='text'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='Standard Label'
						inputValue={input}
						handleChange={(val: any) => setinput(val)}
					/>

					<MwebInput
						id={`ui-demo-input-text-2`}
						errorText=''
						iconPostion='left'
						showIcon={true}
						type='text'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='Standard Label'
						inputValue={input}
						handleChange={(val: any) => setinput(val)}
					/>

					<MwebInput
						id={`ui-demo-input-text-3`}
						errorText=''
						iconPostion='right'
						showIcon={true}
						type='text'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='Standard Label'
						inputValue={input}
						handleChange={(val: any) => setinput(val)}
					/>

					<MwebInput
						id={`ui-demo-input-text-4`}
						errorText=''
						iconPostion='both'
						showIcon={true}
						type='text'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='Standard Label'
						inputValue={''}
						handleChange={(val: any) => {}}
					/>

					<MwebInput
						id={`ui-demo-input-text-5`}
						errorText=''
						iconPostion='left'
						showIcon={true}
						type='text'
						isDisabled={true}
						placeHolderText=''
						helperText=''
						labelText='Disabled Label'
						inputValue={'Disabled value'}
						handleChange={(val: any) => {}}
					/>
					<MwebInput
						id={`ui-demo-input-text-6`}
						errorText=''
						iconPostion='both'
						showIcon={true}
						type='text'
						isDisabled={false}
						placeHolderText=''
						helperText='Error text'
						labelText='Error Lxample'
						inputValue={'Error value'}
						handleChange={(val: any) => {}}
					/>
				</div>

				<div className='text-mwxl text-mwPrimary-500'>SELECT option Input</div>
				<div className='w-full flex flex-row flex-wrap justify-start items-start gap-x-4  gap-y-4'>
					<MwebInput
						id={`ui-demo-input-select-1`}
						errorText=''
						iconPostion='left'
						showIcon={true}
						type='select'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='Standard input Label text'
						inputValue={inputSelect}
						handleChange={(val: any) => setinputSelect(val)}
					/>

					<MwebInput
						id={`ui-demo-input-select-2`}
						errorText=''
						showIcon={false}
						type='select'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='Standard input Label text'
						inputValue={''}
						handleChange={(val: any) => {}}
					/>

					<MwebInput
						id={`ui-demo-input-select-3`}
						errorText=''
						showIcon={true}
						type='select'
						isDisabled={true}
						placeHolderText=''
						helperText=''
						labelText='Disabled input Label text'
						inputValue={''}
						handleChange={(val: any) => {}}
					/>
					<MwebInput
						id={`ui-demo-input-select-4`}
						errorText=''
						showIcon={true}
						type='select'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='error example'
						inputValue={''}
						handleChange={(val: any) => {}}
					/>
				</div>

				<div className='text-mwxl text-mwPrimary-500'>Verification code input</div>
				<div className='w-full flex flex-row flex-wrap justify-start items-center gap-x-4 gap-y-5 '>
					<MwebInput
						id={`ui-demo-verification-1`}
						errorText=''
						verificationCodeCount={4}
						hyphenPosition={0}
						showIcon={false}
						type='verification'
						isDisabled={false}
						placeHolderText=''
						helperText=''
						labelText=''
						inputValue={verifyCode}
						handleChange={(val: any) => setverifyCode(val)}
					/>

					<MwebInput
						id={`ui-demo-verification-2`}
						errorText=''
						verificationCodeCount={6}
						hyphenPosition={3}
						showIcon={false}
						type='verification'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='Standard input Label text'
						inputValue={''}
						handleChange={(val: any) => {}}
					/>

					<MwebInput
						id={`ui-demo-verification-3`}
						errorText=''
						verificationCodeCount={5}
						hyphenPosition={5}
						showIcon={false}
						type='verification'
						isDisabled={true}
						placeHolderText=''
						helperText=''
						labelText='Disabled input Label text'
						inputValue={''}
						handleChange={(val: any) => {}}
					/>
					<MwebInput
						id={`ui-demo-verification-4`}
						errorText=''
						verificationCodeCount={5}
						hyphenPosition={3}
						showIcon={false}
						type='verification'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='error example'
						inputValue={''}
						handleChange={(val: any) => {}}
					/>
				</div>

				<div className='text-mwxl text-mwPrimary-500'>Voucher option input</div>
				<div className='w-full flex flex-row flex-wrap justify-start items-start  gap-y-4 gap-x-4'>
					<MwebInput
						id={`ui-demo-voucher-1`}
						errorText=''
						showIcon={false}
						type='voucher'
						buttonText='Long button text'
						isDisabled={false}
						placeHolderText='# voucher'
						helperText='Helper text'
						labelText='Standard input Label text'
						inputValue={voucherCode}
						handleChange={(val: any) => setvoucherCode(val)}
					/>

					<MwebInput
						id={`ui-demo-voucher-2`}
						errorText=''
						showIcon={false}
						type='voucher'
						buttonText='Test'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='Standard input Label text'
						inputValue={''}
						handleChange={(val: any) => {}}
					/>

					<MwebInput
						id={`ui-demo-voucher-3`}
						errorText=''
						showIcon={false}
						type='voucher'
						buttonText='Apply'
						isDisabled={true}
						placeHolderText=''
						helperText=''
						labelText='Disabled input Label text'
						inputValue={'#DISABLED'}
						handleChange={(val: any) => {}}
					/>
					<MwebInput
						id={`ui-demo-voucher-4`}
						errorText=''
						showIcon={false}
						type='voucher'
						buttonText='Apply'
						isDisabled={false}
						placeHolderText=''
						helperText='Helper text'
						labelText='error example'
						inputValue={'#ERROR'}
						handleChange={(val: any) => {}}
					/>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'> Icons </div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Full list of mweb design icons - Size 24</div>
				<div className='flex flex-col gap-4 w-full'>
					<div className={`flex justify-center w-full gap-8`}>
						<MwebIcon variant='basic' iconType={'circle-plus'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'circle-minus'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'circle-multiply'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'circle-check'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'remove'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'info'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'error'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'lock'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'edit'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'location'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'view'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'hide'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'cart-empty'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='basic' iconType={'cart-item'} size={24} color='text-mwGrey-600' />
					</div>

					<div className={`flex justify-center w-full gap-8`}>
						<MwebIcon variant='functional' iconType={'chevron-right'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'chevron-left'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'chevron-up'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'chevron-down'} size={24} color='text-mwGrey-600' />

						<MwebIcon variant='functional' iconType={'arrow-right'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'arrow-left'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'arrow-up'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'arrow-down'} size={24} color='text-mwGrey-600' />

						<MwebIcon variant='functional' iconType={'arrow-solid-right'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'arrow-solid-left'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'arrow-solid-up'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'arrow-solid-down'} size={24} color='text-mwGrey-600' />
					</div>

					<div className={`flex justify-center w-full gap-8`}>
						<MwebIcon variant='functional' iconType={'plus'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'minus-large'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'plus-large'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'minus'} size={24} color='text-mwGrey-600' />

						<MwebIcon variant='functional' iconType={'multiply'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'check'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='functional' iconType={'menu'} size={24} color='text-mwGrey-600' />
					</div>

					<div className={`flex justify-center w-full gap-8`}>
						<MwebIcon variant='social' iconType={'facebook'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='social' iconType={'instagram'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='social' iconType={'twitter'} size={24} color='text-mwGrey-600' />
						<MwebIcon variant='social' iconType={'youtube'} size={24} color='text-mwGrey-600' />
					</div>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Icon Illustrations </div>
				<div className='flex flex-row gap-16'>
					<div className={`grid grid-cols-1 content-between gap-y-4`}>
						<MwebIconIllustration illustrationName='video' size={56} />
						<p>
							Small
							<br />
							Size: 56
						</p>
					</div>
					<div className={`grid grid-cols-1 content-between gap-y-4`}>
						<MwebIconIllustration illustrationName='lte' size={88} />
						<p>
							Medium
							<br />
							Size: 88
						</p>
					</div>
					<div className={`grid grid-cols-1 content-between gap-y-4`}>
						<MwebIconIllustration illustrationName='entertainment' size={112} />
						<p>
							Large
							<br />
							Size: 112
						</p>
					</div>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Indicators </div>
				<div className='flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebIndicator label='Indicator label' size='xs' type='pill' />
					<MwebIndicator label='Indicator label' size='sm' type='pill' />
					<MwebIndicator label='Indicator label' size='md' type='pill' />
					<MwebIndicator label='Indicator label' size='lg' type='pill' />

					<MwebIndicator label='Indicator label' size='xs' type='tag' />
					<MwebIndicator label='Indicator label' size='sm' type='tag' />
					<MwebIndicator label='Indicator label' size='md' type='tag' />
					<MwebIndicator label='Indicator label' size='lg' type='tag' />
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Acordions </div>
				<div className='w-full flex flex-col items-center'>
					<div className='w-full md:w-6/12 hidden'>
						<MwebAccordion
							description='this is a description'
							heading='Accordion on page'
							variant='on-page'
							isExpanded={true}
							handleOnExpand={(isExpanded, currentIndex) => {}}
							currentIndex={0}
							isLast={false}
						/>

						<br />
						<MwebAccordion
							description='this is a description'
							heading='Accordion contained'
							variant='contained'
							isExpanded={true}
							handleOnExpand={(isExpanded, currentIndex) => {}}
							currentIndex={0}
							isLast={false}
						/>
					</div>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Toggle </div>
				<MwebToggle
					disabled={false}
					label='Mweb Toggle'
					onToggle={(isEnabled) => {
						console.log(`toggle is enabled:${isEnabled}`);
					}}
				/>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Cards LTE and FIBRE </div>
				<div className='w-full flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebCard
						onClickCallback={() => {}}
						type='product'
						showButton={false}
						isSelected={false}
						size='large'
						isPromo={false}
						cardDetails={
							{
								btnLabel: '',
								btnText: '',
								provider: '',
								details: ['Point A', 'Point B', 'Point C'],
								speed: '00Mbps',
								price: 0.0,
								promoTag: '',
								promoPrice: 0.0,
								promoLine: '',
							} as iProductCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='product'
						showButton={false}
						isSelected={true}
						size='medium'
						isPromo={false}
						cardDetails={
							{
								btnLabel: '',
								btnText: '',
								provider: '',
								details: ['Point A', 'Point B', 'Point C'],
								speed: '00Mbps',
								price: 0.0,
								promoTag: '',
								promoPrice: 0.0,
								promoLine: '',
							} as iProductCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='product'
						showButton={false}
						isSelected={false}
						size='small'
						isPromo={false}
						cardDetails={
							{
								btnLabel: '',
								btnText: '',
								provider: '',
								details: ['Point A', 'Point B', 'Point C'],
								speed: '00Mbps',
								price: 0.0,
								promoTag: '',
								promoPrice: 0.0,
								promoLine: '',
							} as iProductCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='product'
						showButton={true}
						isSelected={false}
						size='large'
						isPromo={true}
						cardDetails={
							{
								btnLabel: '',
								btnText: '',
								provider: '',
								details: ['Point A', 'Point B', 'Point C'],
								speed: '00Mbps',
								price: 0.0,
								promoTag: '',
								promoPrice: 0.0,
								promoLine: '',
							} as iProductCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='product'
						showButton={true}
						isSelected={false}
						size='medium'
						isPromo={true}
						cardDetails={
							{
								btnLabel: '',
								btnText: '',
								provider: '',
								details: ['Point A', 'Point B', 'Point C'],
								speed: '00Mbps',
								price: 0.0,
								promoPrice: 0.0,
								promoLine: '',
								promoTag: '',
							} as iProductCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='product'
						showButton={true}
						isSelected={false}
						size='small'
						isPromo={true}
						cardDetails={
							{
								btnLabel: '',
								btnText: '',
								provider: '',
								details: ['Point A', 'Point B', 'Point C'],
								speed: '00Mbps',
								price: 0.0,
								promoTag: '',
								promoPrice: 0.0,
								promoLine: '',
							} as iProductCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='product'
						showButton={false}
						isSelected={true}
						size='large'
						isPromo={true}
						cardDetails={
							{
								btnLabel: '',
								btnText: '',
								provider: '',
								details: ['Point A', 'Point B', 'Point C'],
								speed: '00Mbps',
								promoTag: '',
								price: 0.0,
								promoPrice: 0.0,
								promoLine: '',
							} as iProductCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='product'
						showButton={false}
						isSelected={false}
						size='medium'
						isPromo={true}
						cardDetails={
							{
								btnLabel: '',
								promoTag: '',
								btnText: '',
								provider: '',
								details: ['Point A', 'Point B', 'Point C'],
								speed: '00Mbps',
								price: 0.0,
								promoPrice: 0.0,
								promoLine: '',
							} as iProductCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='product'
						showButton={false}
						isSelected={false}
						size='small'
						isPromo={true}
						cardDetails={
							{
								btnLabel: '',
								promoTag: '',
								btnText: '',
								provider: '',
								details: ['Point A', 'Point B', 'Point C'],
								speed: '00Mbps',
								price: 0.0,
								promoPrice: 0.0,
								promoLine: '',
							} as iProductCardDetails
						}
					/>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Cards VAS </div>
				<div className='w-full flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebCard
						onClickCallback={() => {}}
						type='product-vas'
						showButton={true}
						isSelected={false}
						size='large'
						isPromo={true}
						cardDetails={
							{
								provider: 'Provider',
								details: 'Lorem ipsum dolor sit amet consectetur. Ipsum sed pretium.',
								speed: '00Mbps',
								price: 0.0,
								promoTagline: 'PROMOTION',
								productName: 'Product 1',
							} as iVasCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='product-vas'
						showButton={true}
						isSelected={false}
						size='medium'
						isPromo={true}
						cardDetails={
							{
								provider: 'Provider',
								details: 'Lorem ipsum dolor sit amet consectetur. Ipsum sed pretium.',
								speed: '00Mbps',
								price: 0.0,
								promoTagline: 'PROMOTION',
								productName: 'Product 2',
							} as iVasCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='product-vas'
						showButton={true}
						isSelected={false}
						size='small'
						isPromo={true}
						cardDetails={
							{
								provider: 'PROVIDER',
								details: 'Lorem ipsum dolor sit amet consectetur. Ipsum sed pretium.',
								speed: '00Mbps',
								price: 0.0,
								promoTagline: 'PROMOTION',
								productName: 'Product 3',
							} as iVasCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='product-vas'
						showButton={false}
						isSelected={false}
						size='large'
						isPromo={false}
						cardDetails={
							{
								provider: '',
								details: 'Lorem ipsum dolor sit amet consectetur. Ipsum sed pretium.',
								speed: '00Mbps',
								price: 0.0,
								promoTagline: 'PROMOTION',
								productName: 'Product 1',
							} as iVasCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='product-vas'
						showButton={false}
						isSelected={true}
						size='medium'
						isPromo={false}
						cardDetails={
							{
								details: 'Lorem ipsum dolor sit amet consectetur. Ipsum sed pretium.',
								speed: '00Mbps',
								price: 0.0,
								promoTagline: 'PROMOTION',
								productName: 'Product 2 Selected',
							} as iVasCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='product-vas'
						showButton={false}
						isSelected={false}
						size='small'
						isPromo={false}
						cardDetails={
							{
								provider: '',
								details: 'Lorem ipsum dolor sit amet consectetur. Ipsum sed pretium.',
								speed: '00Mbps',
								price: 0.0,
								promoTagline: 'PROMOTION',
								productName: 'Product 3',
							} as iVasCardDetails
						}
					/>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Cards Options </div>
				<div className='w-full flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebCard
						onClickCallback={() => {}}
						type='option'
						isSelected={false}
						size='large'
						cardDetails={
							{
								label: 'Label',
								description: 'Lorem ipsum dolor sit amet consectetur ullamcorper ',
								icon: '',
								iconType: 'placeholder',
							} as iOptionCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='option'
						isSelected={false}
						size='large'
						cardDetails={
							{
								label: 'Label',
								description: 'Lorem ipsum dolor sit amet consectetur ullamcorper ',
								price: '0.00',
								icon: '',
								iconType: 'placeholder',
							} as iOptionCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='option'
						isSelected={false}
						size='large'
						cardDetails={
							{
								label: 'Label',
								description: 'Lorem ipsum dolor sit amet consectetur ullamcorper ',
								price: '0.0',
								icon: '',
								iconType: 'placeholder',
							} as iOptionCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='option'
						isSelected={false}
						size='large'
						cardDetails={
							{
								label: 'Label',
								description: 'Lorem ipsum dolor sit amet consectetur ullamcorper ',
								price: '0.0',
								icon: '',
								iconType: 'placeholder',
							} as iOptionCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='option'
						isSelected={false}
						size='medium'
						cardDetails={
							{
								label: 'Label',
								description: 'Lorem ipsum dolor sit amet consectetur ullamcorper ',
								price: '0.0',
								icon: '',
								iconType: 'placeholder',
							} as iOptionCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='option'
						isSelected={false}
						size='small'
						cardDetails={
							{
								label: 'Label',
								description: 'Lorem ipsum dolor sit amet consectetur ullamcorper ',
								price: '0.0',
								icon: '',
								iconType: 'placeholder',
							} as iOptionCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='option'
						isSelected={false}
						size='small'
						cardDetails={
							{
								label: 'Label',
								description: 'Lorem ipsum dolor sit amet consectetur ullamcorper ',
								icon: '',
								iconType: 'placeholder',
							} as iOptionCardDetails
						}
					/>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Cards Comparrison </div>
				<div className='w-full grid grid-cols-3 gap-10'>
					<MwebCard
						onClickCallback={() => {}}
						type='comparison'
						isSelected={false}
						size='large'
						cardDetails={
							{
								details: [
									'Installation required',
									'Router required',
									'FREE router included',
									'Unlimited data',
									'No contracts',
									'Connection at a single location',
									'Connect multiple devices',
								],
								label: 'Fibre starting from',
								price: 134.0,
								btnText: 'Get Fibre',
								type: 'fibre',
							} as iCompareCardDetails
						}
					/>

					<MwebCard
						onClickCallback={() => {}}
						type='comparison'
						isSelected={false}
						size='medium'
						cardDetails={
							{
								details: [
									'No installation required',
									'Router required',
									'Router added at an additional cost',
									'Unlimited data on selected plans',
									'No contracts',
									'Connection at multiple locations',
									'Connect multiple devices',
								],
								label: 'LTE starting from',
								price: 199.0,
								btnText: 'Get LTE',
								type: 'lte',
							} as iCompareCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='comparison'
						isSelected={false}
						size='medium'
						cardDetails={
							{
								details: [
									'Installation required',
									'Router required',
									'FREE router included',
									'Unlimited data',
									'No contracts',
									'Connection at multiple locations',
									'Connect multiple devices',
									'Unlimited data',
									'No contracts',
								],
								label: '5G starting from',
								price: 249.0,
								btnText: 'Get 5G',
								type: '5g',
							} as iCompareCardDetails
						}
					/>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Cards Help me Choose </div>
				<div className='w-full flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebCard onClickCallback={() => {}} type='HMD' isSelected={false} size='large' cardDetails={{label: 'LABEL', type: 'entertainment'} as iHDMCardDetails} />
					<MwebCard onClickCallback={() => {}} type='HMD' isSelected={true} size='medium' cardDetails={{label: 'LABEL', type: 'home-office'} as iHDMCardDetails} />
					<MwebCard onClickCallback={() => {}} type='HMD' isSelected={false} size='small' cardDetails={{label: 'LABEL', type: 'streaming'} as iHDMCardDetails} />
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Cards Voucher </div>
				<div className='w-full flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebCard
						onClickCallback={() => {}}
						type='voucher'
						isSelected={false}
						size='large'
						cardDetails={
							{
								btnLabel: 'Apply Code',
								inputValue: '',
								onClickCB: (val: any) => {
									console.log('Voucher val is ', val);
								},
							} as iVoucherCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='voucher'
						isSelected={true}
						size='medium'
						cardDetails={
							{
								btnLabel: 'Apply Code',
								inputValue: '',
								onClickCB: (val: any) => {
									console.log('Voucher val is ', val);
								},
							} as iVoucherCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='voucher'
						isSelected={false}
						size='small'
						cardDetails={
							{
								btnLabel: 'Apply Code',
								inputValue: '',
								onClickCB: (val: any) => {
									console.log('Voucher val is ', val);
								},
							} as iVoucherCardDetails
						}
					/>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Cards Feature </div>
				<div className='w-full flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebCard
						onClickCallback={() => {}}
						type='feauture'
						size='large'
						cardDetails={
							{
								btnLabel: 'Btn Label',
								header: 'This is a header',
								details: [
									'Lorem ipsum dolor sit amet consectetur. Quis semper blandit integer velit lacinia.',
									'Lorem ipsum dolor sit amet consectetur. Quis semper blandit integer velit lacinia.',
									'Lorem ipsum dolor sit amet consectetur. Quis semper blandit integer velit lacinia.',
								],
								image: '',
							} as iFeatureCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='feauture'
						size='medium'
						cardDetails={
							{
								btnLabel: 'Btn Label',
								header: 'Lorem ipsum dolor sit amet consectetur magna venenatis.',
								details: [
									'Lorem ipsum dolor sit amet consectetur. Quis semper blandit integer velit lacinia.',
									'Lorem ipsum dolor sit amet consectetur. Quis semper blandit integer velit lacinia.',
									'Lorem ipsum dolor sit amet consectetur. Quis semper blandit integer velit lacinia.',
								],
								image: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-learning.png`,
							} as iFeatureCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='feauture'
						size='small'
						cardDetails={
							{
								btnLabel: 'Btn Label',
								header: 'This is a header',
								details: [
									'Lorem ipsum dolor sit amet consectetur. Quis semper blandit integer velit lacinia.',
									'Lorem ipsum dolor sit amet consectetur. Quis semper blandit integer velit lacinia.',
									'Lorem ipsum dolor sit amet consectetur. Quis semper blandit integer velit lacinia.',
								],
								image: '',
							} as iFeatureCardDetails
						}
					/>
				</div>

				<div className='text-mwxl text-mwTealGradientFromLeft'>Cards Order Summary </div>
				<div className='w-full flex flex-row flex-wrap justify-center items-center gap-4'>
					<MwebCard
						onClickCallback={() => {}}
						type='order-summary'
						size='large'
						cardDetails={
							{
								btnLabel: 'Button label',
								orderDetails: {deliveryInstalation: 500.0, monthly: 500.0, onceOff: 500.0},
								editAction: () => {},
								hasVoucher: true,
								isDisabled: false,
								showEdit: true,
								hasIcon: true,
								iconProps: {color: '', icon: 'lock', iconPosition: 'left', size: 18, variant: 'basic'},
								voucherProps: {
									btnLabel: 'Voucher ',
									inputValue: 'BLA',
									onClickCB: (val: any) => {
										console.log('Voucher value is ', val);
									},
								},
							} as iOrderSummaryCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='order-summary'
						size='medium'
						cardDetails={
							{
								btnLabel: 'Button label',
								orderDetails: {deliveryInstalation: 500.0, monthly: 500.0, onceOff: 500.0},
								editAction: () => {},
								hasVoucher: false,
								isDisabled: true,
								showEdit: false,
							} as iOrderSummaryCardDetails
						}
					/>
					<MwebCard
						onClickCallback={() => {}}
						type='order-summary'
						size='small'
						cardDetails={
							{
								btnLabel: 'Button label',
								orderDetails: {deliveryInstalation: 500.0, monthly: 500.0, onceOff: 500.0},
								editAction: () => {},
								hasVoucher: false,
								isDisabled: false,
								showEdit: true,
							} as iOrderSummaryCardDetails
						}
					/>
				</div>
			</div>

			<div className='w-full flex flex-row  bg-white p-4 mt-4 justify-center items-center gap-x-4'>
				<MwebCheckbox
					selectedKey={1}
					isChecked={false}
					disabled={false}
					label={
						'This is a checkbox button and this little piggy went wee, wee, wee, all the way home!and this little piggy went wee, wee, wee, all the way home!and this little piggy went wee, wee, wee, all the way home!and this little piggy went wee, wee, wee, all the way home!and this little piggy went wee, wee, wee, all the way home!and this little piggy went wee, wee, wee, all the way home!'
					}
					onStateChange={(newState) => console.log(`checkbox state changed to ${newState}`)}
				/>
			</div>

			<div className='w-full bg-white p-4 mt-4 flex flex-col md:flex-row justify-center items-center gap-x-4'>
				<div className={`w-[280px] md:w-[400px]`}>
					<MwebRadioButton
						disabled={false}
						handleOnChange={(isSelected) => {
							setStandardRadioSelected('large');
						}}
						label={'Standard : Large'}
						id={'mweb-radio-button-standard-large'}
						isSelected={standardRadioSelected === 'large'}
						variant={'standard'}
						size={'large'}
					/>
				</div>
				<div className={`w-[280px] md:w-[400px]`}>
					<MwebRadioButton
						disabled={false}
						handleOnChange={(isSelected) => {
							setStandardRadioSelected('small');
						}}
						label={'Standard : Small'}
						id={'mweb-radio-button-standard-small'}
						isSelected={standardRadioSelected === 'small'}
						variant={'standard'}
						size={'small'}
					/>
				</div>
			</div>

			<div className='w-full bg-white p-4 mt-4 flex flex-col md:flex-row justify-center items-center gap-x-4'>
				<div className={`w-[280px] md:w-[400px] mb-8`}>
					<MwebRadioButton
						disabled={false}
						handleOnChange={(isSelected) => {
							setFillRadioSelected('large');
						}}
						label={'Fill : Large'}
						id={'mweb-radio-button-fill-large'}
						isSelected={fillRadioSelected === 'large'}
						variant={'fill'}
						size={'large'}
					/>
				</div>
				<div className={`w-[280px] md:w-[400px] mb-8`}>
					<MwebRadioButton
						disabled={false}
						handleOnChange={(isSelected) => {
							setFillRadioSelected('small');
						}}
						label={'Fill : Small'}
						id={'mweb-radio-button-fill-small'}
						isSelected={fillRadioSelected === 'small'}
						variant={'fill'}
						size={'small'}
					/>
				</div>
			</div>

			<div className='flex flex-col gap-y-4'>
				<div className='text-mwxl text-mwTealGradientFromLeft pt-8'>Mweb progressbars</div>
				<div className='text-mwbase text-mwTealGradientFromLeft'>Mweb progressbar default 20%</div>
				<MwebProgressBar curentStep={2} totalSteps={10} />
				<div className='text-mwbase text-mwTealGradientFromLeft'>Mweb progressbar with color 40%</div>
				<MwebProgressBar curentStep={4} totalSteps={10} color='bg-mwLightTeal-900' />
				<div className='text-mwbase text-mwTealGradientFromLeft'>Mweb progressbar default 80%</div>
				<MwebProgressBar curentStep={8} totalSteps={10} />
			</div>

			<div className='pt-10'>
				<h2 className='text-mwxl text-mwTealGradientFromLeft border-b'>List Items</h2>
				<br />
				<p className='text-mwbase text-mwTealGradientFromLeft'>
					<span className='text-3xl text-black'>1: </span>A list Item an indicator
				</p>
				<section className='w-full md:w-6/12'>
					<MwebListItem
						productName='VOIP'
						productPrice={289}
						onProductRemove={() => {
							console.log('on product item remove');
						}}
						indicator={{
							type: 'pill',
							size: 'md',
							label: 'Powered by',
						}}
						onTermsAndConditionsButtonClick={() => {
							console.log('onTermsAndConditionsButtonClick');
						}}
						isOnceOff={false}
						isMonthly={true}
					/>
					<p className='text-mwbase text-mwTealGradientFromLeft'>
						<span className='text-3xl text-black'>2: </span>A list Item without an indicator
					</p>
					<MwebListItem
						productName='Internet Security'
						productPrice={560}
						onProductRemove={() => {
							console.log('on product item remove');
						}}
						onTermsAndConditionsButtonClick={() => {
							console.log('onTermsAndConditionsButtonClick');
						}}
						isOnceOff={false}
						isMonthly={true}
					/>
					<p className='text-mwbase text-mwTealGradientFromLeft'>
						<span className='text-3xl text-black'>3: </span>A list Item a different indicator
					</p>
					<MwebListItem
						productName='Hosting'
						productPrice={1400}
						onProductRemove={() => {
							console.log('on product item remove');
						}}
						indicator={{
							type: 'tag',
							size: 'md',
							label: 'Frogfot',
						}}
						onTermsAndConditionsButtonClick={() => {
							console.log('onTermsAndConditionsButtonClick');
						}}
						isOnceOff={true}
						isMonthly={false}
					/>
				</section>
			</div>

			<div className='flex flex-col gap-y-4'>
				<div className='text-mwxl text-mwTealGradientFromLeft pt-8'>Mweb progressbars</div>
				<div className='text-mwbase text-mwTealGradientFromLeft'>Mweb progressbar default 20%</div>
				<MwebProgressBar curentStep={2} totalSteps={10} />
				<div className='text-mwbase text-mwTealGradientFromLeft'>Mweb progressbar with color 40%</div>
				<MwebProgressBar curentStep={4} totalSteps={10} color='bg-mwLightTeal-900' />
				<div className='text-mwbase text-mwTealGradientFromLeft'>Mweb progressbar default 80%</div>
				<MwebProgressBar curentStep={8} totalSteps={10} />
			</div>

			<div className='w-full flex flex-col justify-center items-center gap-4'>
				<div className='text-mwxl text-mwTealGradientFromLeft'>Notification </div>
				{/* desktop size(default) notification NotificationButton prop passes button type and color, no Icon needed  */}
				<MwebNotification label='Notification messaging' NotificationButton={<NotificationButton btn='action' />} device='desktop' />

				{/* mobile size notification NotificationButton prop passes button type and color, no Icon needed  */}
				<MwebNotification label='Notification messaging' NotificationButton={<NotificationButton btn='action' />} device='mobile' />

				{/* desktop size notification NotificationButton prop passes button type and color, no Icon needed   */}
				<MwebNotification label='Notification messaging' NotificationButton={<NotificationButton btn='dismiss' />} device='desktop' />

				{/*success variant alert alert  pass in icon (import icon from react-icons above) with size */}
				<MwebAlerts
					label='Alert messaging'
					NotificationButton={<NotificationButton btn='dismiss' color='success' />}
					type='success'
					notificationIcon={<AiFillInfoCircle size={25} />}
				/>

				{/*success error default icon rendered if desiderd icon is not passed */}
				<MwebAlerts label='Alert messaging' NotificationButton={<NotificationButton btn='action' color='error' />} type='error' />
			</div>
		</MwebSliceContainer>
	);
}
