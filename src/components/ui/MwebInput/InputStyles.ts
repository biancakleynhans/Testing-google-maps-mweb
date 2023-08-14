'use client';

export interface iProps {
	isDisabled: boolean;
	showIcon: boolean;
	labelText: string;
	errorText: string;
	helperText: string;
	placeHolderText: string;
	inputValue: any;
	handleChange: (val: any) => void;
}

// CONTAINER STYLES

export const basicColor = 'text-mwTextParaBase text-mwGrey-900 ring-transparent border-mwPrimary-100 outline-none';
export const error = 'ring-mwError-500 border-mwError-500 outline-none text-mwGrey-900';
export const focus = 'focus:ring-4 focus:ring-mwLightTeal-200 focus:border-mwPrimary-900 placeholder:text-transparent  focus:hover:ring-mwLightTeal-200 focus:hover:border-mwPrimary-900';
export const focusWithin = 'focus-within:ring-4 focus-within:ring-mwLightTeal-200 focus-within:border-mwPrimary-900 placeholder:text-transparent  focus-within:hover:ring-4 focus-within:hover:ring-mwLightTeal-200 focus-within:hover:border-mwPrimary-900';
export const hover = ' hover:border-mwPrimary-500 hover:outline-none hover:ring-4 hover:ring-mwLightTeal-200 hover:rounded-lg';
export const disabled = 'text-mwGrey-300 ring-mwGrey-300 border-mwGrey-300 outline-none ring-transparent';

export const basic = `w-full left-0 flex flex-row justify-center items-center appearance-none bg-white ring-transparent rounded-lg ring-4 border placeholder:text-transparent h-[56px]`;
export const inputPaddingNormal = `px-4 py-[15px]`;
export const inputPaddingFocused = `peer-focus:py-2 focus:py-2 focus-within:py-2 duration-200 px-4 py-[8px]`;
export const normal = `${basicColor} ${focus} ${focusWithin} ${hover}`;

export const inputStyle = 'w-full peer outline-none border-none ring-transparent bg-transparent';

// LABEL STYLES

export const labelBasic = 'absolute duration-200 z-10 origin-[0] text-mwTextParaBaseSemi left-[17px]'; // labelBasic is same
export const labelColor = 'text-mwPrimary-900 bg-transparent';
export const labelError = 'text-mwError-500 bg-transparent';
export const labelDisabled = 'text-mwGrey-300 bg-transparent ';

export const labelMotion = ''; //'peer-placeholder-shown:scale-95 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:bottom-1/2 ';
export const labelFocus = 'peer-focus:left-[17px] peer-focus:top-2 peer-focus:text-mwTextParaXSmallSemi';
export const labelUnfocusedAndFilled = 'left-[17px] top-2 text-mwTextParaXSmallSemi';

// Input text type
export const labelNormalUnfilled = `${labelBasic}  ${labelFocus} `;
export const labelNormalFilled = `${labelBasic} ${labelFocus} ${labelUnfocusedAndFilled}`;

export const helper = 'text-mwGrey-900';
export const helperDisabled = 'text-mwGrey-300'
export const helperError = 'text-mwError-500';
