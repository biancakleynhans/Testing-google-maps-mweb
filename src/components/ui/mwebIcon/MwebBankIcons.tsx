'use client';

import React from 'react';
import {bankIconsComponents} from './ValidMwebIcons';

export interface iIconProps {
	iconType: string;
	height:number;
	width:number;
	alt:string;
}

export default function MwebBankIcon(props: iIconProps) {
	const {height, iconType, width,alt} = props;
	const selectedIcon = bankIconsComponents[iconType];
	if (selectedIcon) {
		return <div>{selectedIcon({height, width, alt})}</div>;
	} else {
		return <></>;
	}
}
