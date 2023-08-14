'use client';

import React, { useEffect, useState } from 'react';
import { iProps, labelDisabled, labelError, labelColor, helperError, helper } from './InputStyles';
import InputVerificationSingle from './InputVerificationSingle';

interface iPropsLocal extends iProps {
  verificationCodeCount: number;
  hyphenPosition: number;
}

function generateArrForDisplay(arrCount: number, hyphenPosition: number): string[] {
  let arr: string[] = [];

  for (let i = 0; i < arrCount; i++) {
    if (hyphenPosition !== 0 && hyphenPosition < arrCount) {
      if (hyphenPosition === i) {
        arr.push('hyvin');
        arr.push('');
      } else {
        arr.push('');
      }
    } else {
      arr.push('');
    }
  }

  return arr;
}

export default function InputVerificationBased(props: iPropsLocal) {
  const { handleChange, helperText, isDisabled, labelText, placeHolderText, verificationCodeCount, hyphenPosition } = props;

  const [hasError, sethasError] = useState<boolean>(false);
  const [errorText, seterrorText] = useState<string>('');
  const [verifyCode, setverifyCode] = useState<string>('');

  useEffect(() => {
    if (labelText.includes('error')) {
      sethasError(true);
      seterrorText('Error text');
    }
  }, [labelText]);

  useEffect(() => {
    // console.log('curr verification code ', verifyCode);

    if (verifyCode.length === verificationCodeCount) {
      console.log('%c we have a full verification code ', 'color:lime', verifyCode);
      handleChange(verifyCode);
    }
  }, [verifyCode, verificationCodeCount]);

  function createCode(val: string) {
    // console.log('add to code', val, val.length, '>>>>', verifyCode);

    if (val.length === 0) {
      setverifyCode(verifyCode.substring(0, verifyCode.length - 1));
    } else {
      setverifyCode(`${verifyCode}${val}`);
    }
  }

  return (
    <div className='flex flex-col justify-start items-start gap-y-1 '>
      <div className=''>
      <div className={isDisabled ? ` ${labelDisabled}` : `${hasError ? labelError : labelColor}`}>{labelText}</div>

      <div className='inline-flex gap-x-1 md:gap-x-2 '>
        {generateArrForDisplay(verificationCodeCount, hyphenPosition).map((entry, i) =>
          entry === '' ? (
            <InputVerificationSingle key={i} handleAddToString={(val) => createCode(val)} hasError={hasError} isDisabled={isDisabled} placeHolderText={placeHolderText} />
          ) : (
            <div key={i} className={`text-mwTextDeskH3Bold ${isDisabled ? 'text-mwgray-400' : hasError ? 'text-mwError-500' : 'text-mwPrimary-100'}`}>
              -
            </div>
          )
        )}
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
