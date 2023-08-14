'use client';

import React from 'react';
import InputSelectBased from './InputSelectBased';
import { iProps } from './InputStyles';
import InputTextBased from './InputTextBased';
import InputVerificationBased from './InputVerificationBased';
import InputVoucherBased from './InputVoucherBased';

interface iPropsLocal extends iProps {
  // selected HTMLInputTypeAttribute mainly text type based
  type: 'number' | 'text' | 'date' | 'email' | 'file' | 'password' | 'range' | 'select' | 'verification' | 'voucher';
  subType?: 'phone' | 'name' | 'id';
  iconPostion?: 'left' | 'right' | 'both' | '';
  verificationCodeCount?: number;
  hyphenPosition?: number;
  buttonText?: string;
  id: string;
  isFullWidth?: boolean;
  options?: { label: string; value: string }[];
}

export default function MwebInput(props: iPropsLocal) {
  const {
    handleChange,
    helperText,
    isFullWidth,
    errorText,
    iconPostion,
    inputValue,
    isDisabled,
    labelText,
    placeHolderText,
    showIcon,
    type,
    id,
    options,
    verificationCodeCount,
    hyphenPosition,
    buttonText,
    subType
  } = props;

  return (
    <>
      {type === 'select' ? (
        <InputSelectBased
          isFullWidth={isFullWidth}
          id={id ? id : ''}
          options={options ? options : []}
          errorText={errorText}
          handleChange={handleChange}
          helperText={helperText}
          inputValue={inputValue}
          isDisabled={isDisabled}
          labelText={labelText}
          placeHolderText={placeHolderText}
          showIcon={showIcon}
        />
      ) : type === 'verification' ? (
        <InputVerificationBased
          errorText={errorText}
          showIcon={false}
          verificationCodeCount={verificationCodeCount ? verificationCodeCount : 4}
          hyphenPosition={hyphenPosition ? hyphenPosition : 0}
          handleChange={handleChange}
          helperText={helperText}
          inputValue={inputValue}
          isDisabled={isDisabled}
          labelText={labelText}
          placeHolderText={placeHolderText}
        />
      ) : type === 'voucher' ? (
        <InputVoucherBased
          isFullWidth={isFullWidth}
          errorText={errorText}
          handleChange={handleChange}
          helperText={helperText}
          inputValue={inputValue}
          isDisabled={isDisabled}
          labelText={labelText}
          placeHolderText={placeHolderText}
          showIcon={showIcon}
          buttonText={buttonText ? buttonText : 'Forgot Btn Text'}
          
        />
      )  : (
        <InputTextBased
          id={id ? id : ''}
          errorText={errorText}
          handleChange={handleChange}
          helperText={helperText}
          iconPosition={iconPostion ? iconPostion : ''}
          inputValue={inputValue}
          isDisabled={isDisabled}
          labelText={labelText}
          placeHolderText={placeHolderText}
          showIcon={showIcon}
          type={type}
          subType={subType}
        />
      )}
    </>
  );
}
