'use client';

import React from 'react';
import {IconComponents} from './ValidMwebIcons';

export interface iIconProps {
	iconType: string;
	size: number;
	color: string;
	variant?: 'basic' | 'functional' | 'social';
}

export default function MwebIcon(props: iIconProps) {
	const {color, iconType, size} = props;
	const selectedIcon = IconComponents[iconType];
	if (selectedIcon) {
		return <div>{selectedIcon(color, size)}</div>;
	} else {
		return <></>;
	}
}
