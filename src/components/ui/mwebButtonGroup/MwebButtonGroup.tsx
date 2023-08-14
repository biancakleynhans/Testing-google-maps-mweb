'use client';

import React from 'react';
import {activeContainer, focusContainer, baseContainer, hoverContainer, trans} from './ButtonSharedStyles';
import MwebButtonForGroup from './MwebButtonForGroup';
import MwebButtonGroupSlider from './MwebButtonGroupSlider';

interface iProps {
    size: 'small' | 'large';
    hasDescription: boolean;
    buttons: {label: string; description: string; isActive: boolean}[];
    onClickFunc: (val?: any) => void;
}

function MwebButtonGroupFixed(props: iProps) {
    const {size, buttons, onClickFunc} = props;

    return (
		// The value of gap-1 will add a gap of 4px on each child element
        <div className={`rounded-full bg-mwBlueGrey-50 ${size === 'large' ? 'p-2' : 'p-1'} overflow-hidden flex gap-1`} role='group'>
            {buttons.map((btn, i) => (
                <MwebButtonForGroup isActive={btn.isActive} key={i} size={size} label={btn.label} desc={btn.description} onClickFunc={(val) => onClickFunc(btn)} />
            ))}
        </div>
    );
}

export default function MwebButtonGroup(props: iProps) {
    const {size, buttons, onClickFunc, hasDescription} = props;

    return (
        <>
            {/* Desktop  */}
            <div className='hidden w-full md:flex flex-row justify-center items-center'>
                {buttons.length > 14 ? (
                    <MwebButtonGroupSlider hasDescription={hasDescription} buttons={buttons} size={size} onClickFunc={(val) => onClickFunc(val)} />
                ) : (
                    <MwebButtonGroupFixed hasDescription={hasDescription} buttons={buttons} size={size} onClickFunc={(val) => onClickFunc(val)} />
                )}
            </div>

            {/* Mobile  */}
            <div className='md:hidden w-full flex flex-row justify-center items-center'>
                <MwebButtonGroupSlider hasDescription={hasDescription} buttons={buttons} size={size} onClickFunc={(val) => onClickFunc(val)} />
            </div>
        </>
    );
}
