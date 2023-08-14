'use client';
import { useState, useEffect } from 'react';
import MwebInput from '@/components/ui/MwebInput/MwebInput';

//
interface IProps {
    updateValidationState:(value: boolean)=>void
}

//
interface IAddressDetails {
    apartmentName: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
}
//
const initialValues = {
    streetAddress: '',
    city: '',
    apartmentName: '',
    province: '',
    postalCode: '',
};

export default function ApartmentOrComplex({ updateValidationState }: IProps) {

    const [addressDetails, setFormData] = useState<IAddressDetails>(initialValues);
    const onHandleChange = (key: any, value: any) => {
        setFormData({ ...addressDetails, [key]: value });

    };

    useEffect(() => {
        updateValidationState(validateForm())
    }, [addressDetails]);

    // Handle the change in the selected province
    function handleSelectProvinceChange(event: string) {
        setFormData({ ...addressDetails, ["province"]: event as string });
    }

    // If no input errors then  enable  Continue button

    const validateForm = () => {
        let isValid = true;
        Object.entries(addressDetails).forEach(entry => {
            const [key, value] = entry;
            if (value.length === 0) {
                isValid = false;
            }

        });
        return isValid
    }



    return (
        <div className='flex flex-col gap-4'>
            <MwebInput
                id={`apartment-street-address`}
                labelText='Street Address'
                iconPostion=''
                showIcon={false}
                type='text'
                isDisabled={false}
                placeHolderText=''
                inputValue={addressDetails.streetAddress}
                handleChange={(value) => onHandleChange("streetAddress", value)}
                errorText={addressDetails.streetAddress.length === 0 ? 'This field is required' : ''}
                helperText={''} />
            <MwebInput
                id={`apartment-apartment-name`}
                labelText='Apartment,suite,floor etc'
                iconPostion=''
                showIcon={false}
                type='text'
                isDisabled={false}
                placeHolderText=''
                inputValue={addressDetails.apartmentName}
                handleChange={(value) => onHandleChange("apartmentName", value)}
                errorText={addressDetails.apartmentName.length === 0 ? 'This field is required' : ''}
                helperText={''} />

            <section className='grid grid-cols-3 gap-4'>
                <div className='col-span-3 md:col-span-1'>
                    <MwebInput
                        id={`apartment-city`}
                        labelText='City'
                        iconPostion=''
                        showIcon={false}
                        type='text'
                        isDisabled={false}
                        placeHolderText=''
                        inputValue={addressDetails.city}
                        handleChange={(value) => onHandleChange("city", value)}
                        errorText={addressDetails.city.length < 1 ? 'This field is required' : ''}
                        helperText={''} />
                </div>
                <div className='col-span-3 md:col-span-1'>
                    <MwebInput
                        id={`apartment-province`}
                        options={
                            [
                                {
                                    value: '',
                                    label: ''
                                },
                                {
                                    value: 'Western Cape',
                                    label: 'Western Cape'
                                },
                                {
                                    value: 'Gauteng',
                                    label: 'Gauteng'
                                },
                                {
                                    value: 'Northern Cape',
                                    label: 'Northern Cape'
                                },
                            ]
                        }
                        errorText={''}
                        helperText={''}
                        labelText='Province'
                        placeHolderText=''
                        type='select'
                        isFullWidth
                        inputValue={addressDetails.province}
                        showIcon={false}
                        isDisabled={false}
                        handleChange={(e) => handleSelectProvinceChange(e)}
                    />
                </div>
                <div className='col-span-3 md:col-span-1'>

                    <MwebInput
                        id={`apartment-postal-code`}
                        labelText='Postal Code'
                        iconPostion=''
                        showIcon={false}
                        type='text'
                        isDisabled={false}
                        placeHolderText=''
                        inputValue={addressDetails.postalCode}
                        handleChange={(value) => onHandleChange("postalCode", value)}
                        errorText={addressDetails.postalCode.length === 0 ? 'This field is required' : ''}
                        helperText={''} />
                </div>
            </section>
        </div>

    );
}
