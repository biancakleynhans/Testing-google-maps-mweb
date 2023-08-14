'use client';

import React from 'react';
import {activeBtn, focusBtn, hoverBtn, labelLarge, labelSmall} from './ButtonSharedStyles';

interface iProps {
	size: 'small' | 'large';
	onClickFunc: (val?: any) => void;
	label: string;
	desc: string;
	isActive: boolean;
}

export default function MwebButtonForGroup(props: iProps) {
	const {size, desc, isActive, label, onClickFunc} = props;

	const descSize = size === 'small' ? 'text-mwTextParaXSmall' : 'text-text-mwTextParaSmall';
	const labelSize = size === 'small' ? 'text-mwCaptionMedium' : 'text-mwCaptionLarge';

	const container = `${size === 'large' ? 'px-6 py-[11.5px]' : 'px-4 py-[11px]'} rounded-full text-mwPrimary-900 ${hoverBtn} ${focusBtn}`;

	return (
		<button onClick={(val) => onClickFunc(val)} className={`${container} ${isActive ? 'bg-white border  border-mwPrimary-200' : 'border-none bg-transparent'}`}>
			<div className='w-full flex flex-row justify-center place-items-center '>
				<div className={`flex flex-nowrap whitespace-nowrap ${labelSize}`}>{label}</div>
				<div className={`flex flex-nowrap whitespace-nowrap ${descSize} ml-2 pb-0.5 ${desc ? 'inline' : 'hidden'}`}>{desc}</div>
			</div>
		</button>
	);
}
