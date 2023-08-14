'use client';

import React, { useState } from 'react';
import { basic, disabled, normal, error } from './InputStyles';

interface iProps {
  isDisabled: boolean;
  hasError: boolean;
  placeHolderText: string;
  handleAddToString: (val: string) => void;
}

export default function InputVerificationSingle(props: iProps) {
  const { hasError, isDisabled, handleAddToString, placeHolderText } = props;

  const [input, setinput] = useState<string>('');

  const inputColor = isDisabled ? 'text-mwgray-400' : hasError ? 'text-mwError-500' : 'text-mwPrimary-900';

  function handleChange(val: string) {
    setinput(val);
    handleAddToString(val);
  }

  return (
    <div className='relative w-12 h-12 md:w-16 md:h-16 '>
      <div className={isDisabled ? `${basic} ${disabled}` : `${basic} ${hasError ? error : normal}`}>
        <input
          className={`${inputColor} w-full text-center text-mwTextDeskH3Bold outline-none border-none ring-transparent bg-transparent`}
          type='text'
          disabled={isDisabled}
          placeholder={placeHolderText}
          value={input}
          onChange={(e) => handleChange(e.target.value!)}
        />
      </div>
    </div>
  );
}
