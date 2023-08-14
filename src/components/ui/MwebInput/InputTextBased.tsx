'use client';

import React, {useEffect, useRef, useState} from 'react';
import {FaRegCircle} from 'react-icons/fa';
import {
	basic,
	error,
	disabled,
	helper,
	helperError,
	iProps,
	labelColor,
	labelDisabled,
	labelError,
	labelNormalFilled,
	labelNormalUnfilled,
	normal,
	labelBasic,
	inputStyle,
	inputPaddingNormal,
	inputPaddingFocused,
	labelUnfocusedAndFilled,
	labelFocus,
	helperDisabled,
} from './InputStyles';
import {getElementById} from 'domutils';

interface iPropsLocal extends iProps {
	// selected HTMLInputTypeAttribute mainly text type based
	type: 'number' | 'text' | 'date' | 'email' | 'file' | 'password' | 'range';
	subType?: 'phone' | 'name' | 'id';
	iconPosition: 'left' | 'right' | 'both' | '';
	id?: string;
}

// const id = 'text-input-field-reusable';

export default function InputTextBased(props: iPropsLocal) {
	const {isDisabled, helperText, labelText, errorText, placeHolderText, inputValue, type, subType, iconPosition, showIcon, id, handleChange} = props;

	const [hasError, sethasError] = useState<boolean>(false);
	const [localInputValue, setLocalInputValue] = useState<string>(inputValue);
	const [minChars, setMinChars] = useState(2);
	const [maxChars, setMaxChars] = useState(50);

	const inputFieldRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputFieldRef.current && inputValue) {
			inputFieldRef.current.value = inputValue;
		}

		switch(subType) {
			case 'phone':
				setMinChars(10);
				setMaxChars(10);
				break;

			case 'name':
				setMinChars(2);
				setMaxChars(50);
				break;

			case 'id':
				setMinChars(13);
				setMaxChars(13);
				break;

			default:
				setMinChars(2);
				setMaxChars(50);
				break;
		}
	}, []);

	const BasicLabel = `${labelBasic} ${localInputValue.length > 0 ? labelNormalFilled : labelFocus}`;
	const LabelFullyStyled = `${BasicLabel}  ${isDisabled ? labelDisabled : hasError ? labelError : labelColor}`;

	const inputPadding = iconPosition === 'left' ? 'pl-3' : iconPosition === 'right' ? 'pl-0' : iconPosition === 'both' ? 'pl-3' : 'pl-0';
	const inputColor = isDisabled ? 'placeholder:text-mwgray-400' : hasError ? 'placeholder:text-mwError-500' : 'placeholder:text-mwPrimary-900';

	const LabelField = () => {
		const labelPadding = iconPosition === 'left' ? 'pl-[33px] ' : iconPosition === 'right' ? 'pl-[0px]' : iconPosition === 'both' ? 'pl-[33px]' : '';

		return (
			<label htmlFor={id} className={`truncate ${LabelFullyStyled} ${showIcon ? labelPadding : ''}  ${inputValue?.length > 0 ? '' : ''}`} onClick={onLabelClick}>
				{labelText}
			</label>
		);
	};
	const onInputChanged = (value: any) => {
		handleChange(value);
		type === 'email' ? sethasError(ValidateEmail(value)) : sethasError(value.length < 2 ? true : false);
	};

	function ValidateEmail(input: string) {
		var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//Check if email value is valid
		return !input.match(validRegex);
	}
	const HelperErrorText = () => {
		return (
			<>
				{((hasError && errorText.length > 0) || helperText.length > 0) && (
					<p id='outlined_success_help' className={`mt-1 text-mwTextParaXSmall ${hasError ? helperError : isDisabled ? helperDisabled : helper}`}>
						{hasError ? errorText : helperText}
					</p>
				)}
			</>
		);
	};

	function onLabelClick() {
		if (inputFieldRef.current) {
			inputFieldRef.current.focus();
		}
	}

	return (
		<div className='relative min-w-[150px] '>
			{/* Sizing and main contaianer */}
			
			<div className={isDisabled ? `${basic} ${disabled} ${inputPaddingNormal}` : `${basic} ${hasError ? error : normal} ${inputPaddingFocused}  `}>
				{/* icon left */}
				<div className={`flex flex-row justify-center items-center ${showIcon && iconPosition !== 'right' ? 'w-5 ml-0' : 'w-0'}`}>
					{/* ${!hasError && !isDisabled ? labelColor : ''} */}
					{showIcon && (iconPosition === 'left' || iconPosition === 'both') && <FaRegCircle size={20} className={` ${isDisabled ? disabled : hasError ? error : labelColor}`} />}
				</div>

				{/* Input */}
				<input
					className={`${inputStyle} ${inputColor} ${showIcon ? inputPadding : ''} ${isDisabled ? 'text-mwTextParaBase' : ''} top-[8px] relative`}
					type={type}
					id={id}
					disabled={isDisabled}
					onBlur={(e) => {
						onInputChanged(e.target.value!);
					}}
					onChange={(e) => {
						setLocalInputValue(e.target.value!);
					}}
					ref={inputFieldRef}
					value={localInputValue}
					minLength={minChars}
					maxLength={maxChars}
				/>

				{/* Label  */}
				<LabelField />

				{/* icon right */}
				<div className={showIcon && iconPosition !== 'left' ? 'w-5 mr-2' : 'w-0'}>
					{showIcon && (iconPosition === 'right' || iconPosition === 'both') && <FaRegCircle size={20} className={` ${isDisabled ? disabled : hasError ? error : labelColor}`} />}
				</div>
			</div>
	
			<HelperErrorText />
		</div>
	);
}
