'use client';
import { useState, useEffect } from 'react';
import MwebInput from '@/components/ui/MwebInput/MwebInput';

//
interface IProps {
    updateValidationState:(value: boolean)=>void
}

//
interface IAddressDetails {
    businessType:string;
    blockNumber: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
}
//
const initialValues = {
    businessType: '',
    streetAddress: '',
    city: '',
    blockNumber: '',
    province: '',
    postalCode: '',
};

export default function Business({ updateValidationState }: IProps) {

    const [addressDetails, setFormData] = useState<IAddressDetails>(initialValues);
    const onHandleChange = (key: any, value: any) => {
        setFormData({ ...addressDetails, [key]: value });

    };

    useEffect(() => {
        updateValidationState(validateForm())
    }, [addressDetails]);

    // Handle the change in the selected province
    function handleSelectChange(event: string, key:string) {
        setFormData({ ...addressDetails, [key]: event as string });
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
                id={`dwelling-type-business`}
                options={
                    [
                       
                        {
                            value: 'Business Complex',
                            label: 'Business Complex'
                        }
                    ]
                }
                errorText={''}
                helperText={''}
                labelText='Type of residence'
                placeHolderText=''
                type='select'
                isFullWidth
                inputValue={addressDetails.businessType}
                showIcon={false}
                isDisabled={false}
                handleChange={(e) => handleSelectChange(e, "businessType")}
            />
            <MwebInput
                id={`business-street-address`}
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
                id={`business-block-number`}
                labelText='Block, suite, floor etc.'
                iconPostion=''
                showIcon={false}
                type='text'
                isDisabled={false}
                placeHolderText=''
                inputValue={addressDetails.blockNumber}
                handleChange={(value) => onHandleChange("blockNumber", value)}
                errorText={addressDetails.blockNumber.length === 0 ? 'This field is required' : ''}
                helperText={''} />

            <section className='grid grid-cols-3 gap-4'>
                <div className='col-span-3 md:col-span-1'>
                    <MwebInput
                        id={`business-city`}
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
                        id={`business-province`}
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
                        handleChange={(e) => handleSelectChange(e, "province")}
                    />
                </div>
                <div className='col-span-3 md:col-span-1'>

                    <MwebInput
                        id={`business-postal-code`}
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
