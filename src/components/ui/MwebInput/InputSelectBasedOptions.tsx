'use client';

import React from 'react';

interface iProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  handleChange: (val: string) => void;
  inputValue: string;
  options: iOptionType[];
}

export interface iOptionType {
  label: string;
  value: string;
}

export default function InputSelectBasedOptions(props: iProps) {
  const { handleChange, setIsOpen, isOpen, inputValue, options } = props;

  return (
    <div
      onMouseLeave={() => {
        setIsOpen(false);
        // if (inputValue?.trim().length < 2) {
        //   handleChange('     ');
        // }
      }}
      className={`hover:bg-red-400 ${
        isOpen ? 'block' : 'hidden'
      } top-16 w-full absolute bg-white text-base z-100 list-none divide-y divide-gray-100 rounded-lg border border-mwPrimary-100`}
    >
      <ul className='rounded-lg bg-white' aria-labelledby='dropdown'>
        {options.map((option, i) => (
            option.value &&
          <li key={i} className={`first:rounded-tl-lg first:rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg hover:bg-mwBlueGrey-25 !m-0 !w-full !h-auto`}>
            <button
              className='text-mwTextParaBase text-mwGrey-900 w-full text-left  hover:text-mwPrimary-900 focus:text-mwTextParaBaseSemi bg-transparent block px-4 py-2 '
              onClick={() => {
                handleChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
