'use client';
import { useState, useEffect } from 'react';


import * as yup from 'yup';
import { useFormik } from 'formik';
import RadioButton from '../shared/forms/RadioButton';
import MwebInput from '../ui/MwebInput/MwebInput';
import MwebRadioButton from '@/components/ui/mwebRadioButton/MwebRadioButton';
import Residential from './Residential';
import Business from './Business';
//
interface IProps {
    onHandleStateChange: (value: boolean) => void
}

export default function DeliveryToDifferentAddress({ onHandleStateChange }: IProps) {
    const [placeType, setPlaceType] = useState<'Residential' | 'Business'>('Residential');

    useEffect(() => {
        onHandleStateChange(false)
    }, [placeType]);

    return (
        <div className='flex flex-col gap-4'>
            <section className='grid grid-cols-2 gap-2 lg:gap-4'>
                <div className={`hidden md:flex`}>
                    <MwebRadioButton
                        id={"Residential"}
                        disabled={false}
                        isSelected={placeType === 'Residential'}
                        handleOnChange={(value) => setPlaceType("Residential")}
                        label={"Residential"}
                        variant={'fill'}
                        size={'large'}
                    />
                </div>

                <div className={`hidden md:flex`}>
                    <MwebRadioButton
                        id={"Business"}
                        disabled={false}
                        isSelected={placeType === 'Business'}
                        handleOnChange={(value) => setPlaceType("Business")}
                        label={"Business"}
                        variant={'fill'}
                        size={'large'}
                    />
                </div>

                <div className={`flex md:hidden`}>
                    <MwebRadioButton
                        id={"Residential"}
                        disabled={false}
                        isSelected={placeType === 'Residential'}
                        handleOnChange={(value) => setPlaceType("Residential")}
                        label={"Residential"}
                        variant={'fill'}
                        size={'small'}
                    />
                </div>

                <div className={`flex md:hidden`}>
                    <MwebRadioButton
                        id={"Business"}
                        disabled={false}
                        isSelected={placeType === 'Business'}
                        handleOnChange={(value) => setPlaceType("Business")}
                        label={"Business"}
                        variant={'fill'}
                        size={'small'}
                    />
                </div>
            </section>
            {placeType === "Residential" && <Residential updateValidationState={(value) => {onHandleStateChange(value)
             }} />}
            {placeType === "Business" && <Business updateValidationState={(value) => { onHandleStateChange(value)
            }} />}




        </div>
    );
}
