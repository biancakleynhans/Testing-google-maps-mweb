'use client';

import React, { useState, useEffect } from 'react';
import { disabled, helper, helperError, iProps, normal, error, inputStyle } from './InputStyles';
import MwebButton from '../mwebButtons/MwebButtonMain';

interface iPropsLocal extends iProps {
	buttonText: string;
	isFullWidth?: boolean;
}

export default function InputVoucherBased(props: iPropsLocal) {
	const { handleChange, errorText, helperText, inputValue, isDisabled, labelText, placeHolderText, buttonText, isFullWidth } = props;

	const [hasError, sethasError] = useState<boolean>(false);
	// const [errorText, seterrorText] = useState<string>('');
	const [vouchercode, setvouchercode] = useState<string>(placeHolderText);

	const inputColor = isDisabled ? 'text-mwgray-400' : hasError ? 'text-mwError-500' : 'text-mwPrimary-900';
	const placeholderColor = isDisabled
		? ' placeholder:text-mwgray-400'
		: hasError
		? ' placeholder:text-mwError-500'
		: ' placeholder:text-mwPrimary-900';
	const focus = 'focus:ring-4 focus:ring-mwLightTeal-500';

	const basic =
		`w-full p-2 pl-4 left-0 flex flex-row justify-center items-center appearance-none bg-white rounded ring-4 border placeholder:text-transparent gap-2`;
		const active = `${basic}  ${focus} ${hasError ? error : normal}`;
	const container = isDisabled ? `${basic}  ${disabled} ` : active;

	useEffect(() => {
		if (errorText.length > 2) {
			sethasError(true);
		}
	}, [errorText]);

	return (
		<div className={`${isFullWidth ? 'w-full' : 'p-2'} flex flex-col justify-start items-start `}>
			<div className={`flex flex-row justify-between  items-center rounded-lg ${container} `}>
				<input
					className={`${inputStyle} ${
						vouchercode.length > 0 ? `placeholder:text-transparent ${inputColor} text-mwTextParaSmallSemi` : placeholderColor
					}`}
					disabled={isDisabled}
					placeholder={vouchercode.length > 0 ? vouchercode : placeHolderText}
					value={vouchercode}
					onChange={(e) => setvouchercode(e.target.value!)}
				/>

				<div className='flex flex-row justify-end items-center'>
					<MwebButton
						btnText={buttonText}
						color='primary'
						isDisabled={isDisabled}
						hasIcon={false}
						onClickFunction={() => {
							handleChange(inputValue.length > 0 ? '' : vouchercode);
							setvouchercode(inputValue.length > 0 ? '' : vouchercode);
						}}
						size='x-small'
						// isFullWidth={true}
					/>
				</div>
			</div>
		

			{(hasError || helperText.length > 0) && (
				<p id='outlined_success_help' className={hasError ? helperError : helper}>
					{hasError ? errorText : helperText}
				</p>
			)}
		</div>
	);
}
