import React from 'react';
import MwebIcon from '../mwebIcon/MwebIcon';

interface iProps {
	placeHolderText: string;
	inputValue: string;
	handleChange: (val: string) => void;
}

export default function InputForAdressListSearch(props: iProps) {
	const {placeHolderText, inputValue, handleChange} = props;

	const size = 'w-full h-[56px] min-w-[150px]';
	const border = 'border border-mwPrimary-100 hover:border-mwPrimary-900';

	return (
		<div className={`${size} ${border} px-6 py-[19px] flex flex-row justify-center items-center bg-white rounded-lg  duration-200`}>
			{/* Input */}
			<input
				className={`w-full peer outline-none border-none  ring-transparent bg-transparent placeholder:text-mwPrimary-900 text-mwPrimary-900`}
				type='text'
				placeholder={placeHolderText}
				onChange={(e) => handleChange(e.target.value!)}
				value={inputValue}
			/>

			{/* icon right */}
			<div className='w-5 mr-2'>{<MwebIcon size={20} color='text-mwGrey-600' iconType='search' />}</div>
		</div>
	);
}
