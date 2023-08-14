'use client';

import React, { useState, useEffect } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import {
  basic,
  disabled,
  error,
  helper,
  helperError,
  labelBasic,
  labelColor,
  labelDisabled,
  labelError,
  labelNormalFilled,
  labelNormalUnfilled,
  normal,
} from './InputStyles';
import InputSelectBasedOptions from './InputSelectBasedOptions';
import MwebIcon from "@/components/ui/mwebIcon/MwebIcon";

interface iProps {
  errorText: string;
  isDisabled: boolean;
  showIcon: boolean;
  labelText: string;
  helperText: string;
  placeHolderText: string;
  inputValue: any;
  options: { label: string; value: string }[];
  id: string;
  isFullWidth?: boolean;
  handleChange: (val: any) => void;
}

export default function InputSelectBased(props: iProps) {
  const { handleChange, options, id, isFullWidth, errorText, helperText, inputValue, isDisabled, labelText, placeHolderText, showIcon } = props;

  const [hasError, sethasError] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);

  const BasicLabel = `${labelBasic} ${inputValue.length > 0 ? labelNormalFilled : `${labelNormalUnfilled} text-black  lg:top-3.5`}`;
  const LabelFullyStyled = `${BasicLabel}  ${isDisabled ? labelDisabled : hasError ? labelError : labelColor}`;

  const labelPadding = 'pl-[33px]';

  useEffect(() => {
    if (errorText.length > 2) {
      sethasError(true);
    } else {
      sethasError(false);
    }
  }, [errorText]);

  const HelperErrorText = () => {
    return (
      <>
        {(hasError || helperText.length > 0) && (
          <p id='outlined_success_help' className={hasError ? helperError : helper}>
            {hasError ? errorText : helperText}
          </p>
        )}
      </>
    );
  };

  //   the main select button shows the value as well as opening the select drop down
  const SelectButton = () => {
    const buttonBasic = 'w-full h-8 peer flex flex-row justify-between items-center outline-none border-none ring-transparent bg-transparent';
    const dropStyle = isDisabled ? 'text-mwGrey-300' : 'text-mwPrimary-900';
    const inputColor = isDisabled ? 'text-mwGrey-300' : hasError ? 'text-mwError-500' : 'text-mwGrey-900';

    return (
      <button
        className={`${buttonBasic}`}
        id={id}
        disabled={isDisabled}
        placeholder={placeHolderText}
        value={inputValue}
        onClick={() => {
          setIsOpen(true);
          handleChange('   ');
        }}
      >
        <div className={`w-full text-left mt-4 ${inputColor}`}>{inputValue}</div>
        {/*<div className='w-[20px]'>{isOpen ? <MdArrowDropUp size={24} className={dropStyle} /> : <MdArrowDropDown size={24} className={dropStyle} />}</div>*/}
        <div className='w-[20px]'>{isOpen ? <MwebIcon size={20} iconType={'arrow-solid-up'} color={dropStyle} /> : <MwebIcon size={20} iconType={'arrow-solid-down'} color={dropStyle} />}</div>
      </button>
    );
  };


  return (
    <div className={`relative ${isFullWidth ? 'w-full min-w-full max-w-full' : 'w-full max-w-[500px]'} `}>
      <div className={isDisabled ? `${basic} ${disabled}` : `${basic} ${hasError ? error : normal} px-4 py-[15px] `}>
        {/* icon left */}
        <div className={showIcon ? 'w-5 ml-0 mr-2' : 'w-0'}>
          {showIcon && <FaRegCircle size={20} className={` ${isDisabled ? disabled : hasError ? error : labelColor}`} />}
        </div>

        {/* <!-- This is the select button replacement to be able to fully style it  --> */}
        <SelectButton />

        {/* Label for select this still floats  */}
        <label htmlFor={id} className={`${LabelFullyStyled} ${showIcon ? labelPadding : ''}`}>
          {labelText}
        </label>
      

      {/* <!-- Dropdown menu for select  --> */}
      <InputSelectBasedOptions handleChange={(val) => handleChange(val)} inputValue={inputValue} isOpen={isOpen} options={options} setIsOpen={(val) => setIsOpen(val)} />
      </div>
      <HelperErrorText />
    </div>
  );
}
