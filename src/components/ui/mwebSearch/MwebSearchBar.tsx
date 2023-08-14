'use client';

import React from 'react';
import SearchBarSquare from './SearchBarSquare';
import SearchBarRound from './SearchBarRound';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import MwebIcon from '../mwebIcon/MwebIcon';
import MwebButton from '../mwebButtons/MwebButtonMain';
import Script from 'next/script';

interface iProps {
	type: 'round' | 'square';
	placeHolderText: string;
	isDisabled: boolean;
}

interface iPropsBtn {
	isLoading: boolean;
	inputString: string;
	isDisabled: boolean;
	buttonFunction: (props?: any) => void;
}

export const CancelBtn = (props: iPropsBtn) => {
	const {buttonFunction, inputString, isLoading} = props;

	return (
		<>
			{isLoading ? (
				<LoadingSpinner color='blue' isSmall={false} />
			) : (
				<div className='flex-flex-row justify-end items-center cursor-pointer' onClick={() => buttonFunction()}>
					{inputString.length > 0 && <MwebIcon iconType={'circle-multiply'} size={24} color={'text-mwGrey-400'} />}
				</div>
			)}
		</>
	);
};

export const UseLocBtn = (props: iPropsBtn) => {
	const {buttonFunction, isDisabled} = props;

	return (
		<div className='w-full pt-4 desktop:pt-0 cursor-pointer flex flex-row justify-center items-center' onClick={() => buttonFunction()}>
			<MwebIcon iconType={'location'} size={20} color={isDisabled ? 'text-mwGrey-300' : 'text-mwLightTeal-900'} />
			<div className={`text-mwTextParaBase ${isDisabled ? 'text-mwGrey-300' : 'text-mwGrey-600'} ml-1`}>Use current location</div>
		</div>
	);
};

export const ConfirmLocBtn = (props: iPropsBtn) => {
	const {isDisabled, inputString} = props;

	return (
		<>
			<div className='cursor-pointer hidden lg:flex flex-row justify-center items-center'>
				{inputString !== 'lte' && <MwebButton btnText='Check Availability' color='primary' hasIcon={false} isDisabled={isDisabled} size='large' onClickFunction={() => {}} />}
			</div>

			{inputString === 'lte' ? (
				<div className='cursor-pointer lg:flex flex-row justify-center items-center'>
					<MwebButton
						btnText=''
						color='primary'
						hasIcon={true}
						iconProps={{size: 20, color: 'text-white', icon: 'arrow-right', iconPosition: 'icon-only', variant: 'basic'}}
						isDisabled={isDisabled}
						size='small'
						onClickFunction={() => {}}
					/>
				</div>
			) : (
				<div className='lg:hidden'>
					<MwebButton
						btnText=''
						color='primary'
						hasIcon={true}
						iconProps={{size: 20, color: 'text-white', icon: 'arrow-right', iconPosition: 'icon-only', variant: 'basic'}}
						isDisabled={isDisabled}
						size='small'
						onClickFunction={() => {}}
					/>
				</div>
			)}
		</>
	);
};

export default function MwebSearchBar(props: iProps) {
	const {isDisabled, placeHolderText, type} = props;

	return (
		<>
			<Script
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`}
				strategy={'beforeInteractive'}
			/>
			{type === 'square' && <SearchBarSquare isDisabled={isDisabled} placeHolderText={placeHolderText} />}

			{type === 'round' && <SearchBarRound isDisabled={isDisabled} placeHolderText={placeHolderText} />}
		</>
	);
}
