'use client ';

import React, {useEffect} from 'react';
import MwebIcon from '../mwebIcon/MwebIcon';

interface iIconProps {
	size: number;
	color: string;
	icon: string;
	iconPosition: 'left' | 'right' | 'icon-only';
	variant: 'basic' | 'functional' | 'social';
}

interface iProps {
	size: 'x-small' | 'small' | 'medium' | 'large' | 'useLocation';
	color: 'primary' | 'secondary-dark' | 'secondary-light' | 'text-only' | 'grey-scale';
	hasIcon: boolean;
	iconProps?: iIconProps;
	isFullWidth?: boolean;
	isDisabled: boolean;
	btnText: string;
	onClickFunction: (val?: any) => void;
}

// removed
// const foucs =
// 	color === 'grey'
// 		? 'focus:border-4 focus:border-mwLightTeal-500 focus:bg-mwPrimary-900'
// 		: color == 'primary'
// 		? ' focus:border-4 focus:border-mwLightTeal-500 focus:bg-mwPrimary-900'
// 		: color === 'sec dark'
// 		? 'focus:bg-white focus:border-4 focus:border-mwLightTeal-200 focus:text-mwPrimary-900'
// 		: color === 'sec light'
// 		? ' focus:border-4 focus:border-mwLightTeal-200'
// 		: '';

const BG_GREY = 'bg-mwGrey-400 hover:bg-mwPrimary-800';
const BG_PRIME = 'bg-mwPrimary-900 hover:text-white hover:bg-mwPrimary-800';
const BG_SEC_DARK = 'bg-transparent border-2 border-mwPrimary-900 hover:text-white hover:bg-mwPrimary-900 hover:border-mwPrimary-900 ';
const BG_SEC_LIGHT = 'bg-transparent border-2 border-white hover:bg-mwPrimary-900 hover:border-mwPrimary-900';

const TEXT_SEC_DARK = 'text-mwPrimary-900 hover:text-white ';

const BG_PRIME_DISABLE = 'bg-mwLightTeal-100 border-mwLightTeal-100  text-white';
const BG_SEC_DARK_DISABLE = 'bg-white border-2 border-mwPrimary-200 text-mwPrimary-200';
const BG_SEC_LIGHT_DISABLE = 'bg-transparent border-2 border-mwPrimary-200 text-mwPrimary-200';

export default function MwebButton(props: iProps) {
	const {btnText, color, hasIcon, iconProps, isDisabled, isFullWidth, onClickFunction, size} = props;

	useEffect(() => {}, [btnText]);

	/* Coloration */
	let bgColor =
		color === 'primary' ? BG_PRIME : color === 'secondary-dark' ? BG_SEC_DARK : color === 'secondary-light' ? BG_SEC_LIGHT : color === 'grey-scale' ? BG_GREY : 'bg-none';

	let txtColor =
		color === 'primary'
			? 'text-white'
			: color === 'secondary-dark'
			? TEXT_SEC_DARK
			: color === 'secondary-light'
			? 'text-white'
			: color === 'grey-scale'
			? 'text-mwGrey-300'
			: color === 'text-only' && isDisabled
			? 'text-mwGrey-300'
			: 'text-mwPrimary-900';

	let txtSize =
		size === 'x-small'
			? 'text-mwCaptionMedium'
			: size === 'small'
			? 'text-mwButtonTextSmall'
			: size === 'medium'
			? 'text-mwButtonTextMedium'
			: size === 'large'
			? 'text-mwButtonTextLarge'
			: size === 'useLocation'
			? 'lg:text-mwTextParaBase text-mwTextParaSmall'
			: ' text-mwButtonTextMedium';

	let disabled =
		color === 'primary'
			? BG_PRIME_DISABLE
			: color === 'secondary-dark'
			? BG_SEC_DARK_DISABLE
			: color === 'secondary-light'
			? BG_SEC_LIGHT_DISABLE
			: color === 'text-only'
			? ''
			: 'bg-none text-mwPrimary-200';

	const BASIC_PADDING = size === 'large' ? 'px-8 py-4' : size === 'medium' ? 'px-6 py-[14px]' : 'px-6 py-3';
	const SHAPE_BASIC = size === 'x-small' ? 'rounded-lg p-2 pb-[7px] text-white' : color === 'text-only' ? 'px-0 py-0' : `rounded-full ${BASIC_PADDING}`;
	const SHAPE_ICON_ONLY = size === 'x-small' ? 'rounded-full p-[2.5px]' : size === 'small' ? 'rounded-full p-[14px]' : 'rounded-full p-[12.8px]';

	let basicDisabled =
		hasIcon && iconProps && iconProps.iconPosition === 'icon-only'
			? `${isFullWidth ? 'w-full' : ''} ${SHAPE_ICON_ONLY} ${disabled} ${txtSize}`
			: `${isFullWidth ? 'w-full' : ''} ${SHAPE_BASIC} ${disabled} ${txtSize}`;

	let basic =
		hasIcon && iconProps && iconProps.iconPosition === 'icon-only'
			? `${isFullWidth ? 'w-full' : ''} ${SHAPE_ICON_ONLY} ${bgColor} ${txtColor} ${txtSize} md:border-4 ${color === 'primary' ? 'border-white' : ''}`
			: `${isFullWidth ? 'w-full' : ''} ${SHAPE_BASIC} ${bgColor} ${txtColor} ${txtSize} `;

	return (
		<button
			disabled={isDisabled}
			className={isDisabled ? basicDisabled : basic}
			onClick={(val) => {
				onClickFunction(val);
			}}
			data-btnsize={size}
		>
			<div className={color === 'text-only' ? 'w-full flex flex-row justify-start items-center ' : 'w-full flex flex-row justify-center items-center '}>
				{/*  */}

				{hasIcon && iconProps && iconProps.iconPosition === 'left' && (
					<MwebIcon variant={iconProps.variant} color={iconProps.color.length > 0 ? iconProps.color : color} iconType={iconProps.icon} size={iconProps.size} />
				)}

				{/*  */}
				{btnText.length > 2 && <div className={`flex flex-nowrap whitespace-nowrap ${(color === 'text-only' && !hasIcon ) ? 'pl-0' : hasIcon ? 'pl-2' : 'pl-0'}`}>{btnText}</div>}

				{hasIcon && iconProps && iconProps.iconPosition === 'icon-only' && (
					<MwebIcon variant={iconProps.variant} color={iconProps.color.length > 0 ? iconProps.color : color} iconType={iconProps.icon} size={iconProps.size} />
				)}

				{hasIcon && iconProps && iconProps.iconPosition === 'right' && (
					<MwebIcon variant={iconProps.variant} color={iconProps.color.length > 0 ? iconProps.color : color} iconType={iconProps.icon} size={iconProps.size} />
				)}

				{/*  */}
			</div>
		</button>
	);
}
