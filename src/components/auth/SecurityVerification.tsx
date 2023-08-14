import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

//
const OTPInitialValues = {
    otpDigitA: '',
    otpDigitB: '',
    otpDigitC: '',
    otpDigitD: '',
    otpDigitE: '',
    otpDigitF: '',
};

const OTPValidationSchema = yup.object({
    otpDigitA: yup.number().required('required'),
    otpDigitB: yup.number().required('required'),
    otpDigitC: yup.number().required('required'),
    otpDigitD: yup.number().required('required'),
    otpDigitE: yup.number().required('required'),
    otpDigitF: yup.number().required('required'),
});

/**
 *
 * @param param0
 * @returns
 */

export default function SecurityVerification({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [isCheckingForOTPLoading, setIsCheckingForOTPLoading] = React.useState(false);

    // contains goodies information
    const formik = useFormik({
        initialValues: OTPInitialValues,
        validationSchema: OTPValidationSchema,
        onSubmit: (values) => {
            console.log('do something with form values');
            console.table(values);
        },
    });

    /**
     *  close the form automatically when all fields are validated
     */
    useEffect(() => {
        // TODO check if fields are valided properly
        if (allFieldsField(formik.values)) {
            setIsCheckingForOTPLoading(true);

            // simulate API ca;;
            setTimeout(() => {
                onClose();
                setIsCheckingForOTPLoading(false);
            }, 5 * 1000);
        }
    }, [formik.values]);

    // automically close Modal after the last digit

    // checks if an object is empty
    const allFieldsField = (obj: any) => {
        for (let key in obj) {
            if (obj[key] == '') return false;
        }

        return true;
    };

    return (
        <Transition
            show={isOpen}
            enter='transition-opacity duration-75'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            className='fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/60'
        >
            <div className='w-5/12 bg-white px-12 pb-14 pt-8 flex flex-col gap-6 relative'>
                <section className='flex justify-end'>
                    <button onClick={onClose}>
                        <svg
                            width='24'
                            height='25'
                            viewBox='0 0 24 25'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 text-gray-600'
                            preserveAspectRatio='xMidYMid meet'
                        >
                            <g clipPath='url(#clip0_9029_112704)'>
                                <mask id='path-1-inside-1_9029_112704' fill='white'>
                                    <path d='M19 6.91L17.59 5.5L12 11.09L6.41 5.5L5 6.91L10.59 12.5L5 18.09L6.41 19.5L12 13.91L17.59 19.5L19 18.09L13.41 12.5L19 6.91Z'></path>
                                </mask>
                                <path
                                    d='M19 6.91L17.59 5.5L12 11.09L6.41 5.5L5 6.91L10.59 12.5L5 18.09L6.41 19.5L12 13.91L17.59 19.5L19 18.09L13.41 12.5L19 6.91Z'
                                    fill='black'
                                ></path>
                                <path
                                    d='M19 6.91L21.8284 9.73843L24.6569 6.91L21.8284 4.08157L19 6.91ZM17.59 5.5L20.4184 2.67157L17.59 -0.156854L14.7616 2.67157L17.59 5.5ZM12 11.09L9.17157 13.9184L12 16.7469L14.8284 13.9184L12 11.09ZM6.41 5.5L9.23843 2.67157L6.41 -0.156854L3.58157 2.67157L6.41 5.5ZM5 6.91L2.17157 4.08157L-0.656854 6.91L2.17157 9.73843L5 6.91ZM10.59 12.5L13.4184 15.3284L16.2469 12.5L13.4184 9.67157L10.59 12.5ZM5 18.09L2.17157 15.2616L-0.656854 18.09L2.17157 20.9184L5 18.09ZM6.41 19.5L3.58157 22.3284L6.41 25.1569L9.23843 22.3284L6.41 19.5ZM12 13.91L14.8284 11.0816L12 8.25315L9.17157 11.0816L12 13.91ZM17.59 19.5L14.7616 22.3284L17.59 25.1569L20.4184 22.3284L17.59 19.5ZM19 18.09L21.8284 20.9184L24.6569 18.09L21.8284 15.2616L19 18.09ZM13.41 12.5L10.5816 9.67157L7.75315 12.5L10.5816 15.3284L13.41 12.5ZM21.8284 4.08157L20.4184 2.67157L14.7616 8.32843L16.1716 9.73843L21.8284 4.08157ZM14.7616 2.67157L9.17157 8.26157L14.8284 13.9184L20.4184 8.32843L14.7616 2.67157ZM14.8284 8.26157L9.23843 2.67157L3.58157 8.32843L9.17157 13.9184L14.8284 8.26157ZM3.58157 2.67157L2.17157 4.08157L7.82843 9.73843L9.23843 8.32843L3.58157 2.67157ZM2.17157 9.73843L7.76157 15.3284L13.4184 9.67157L7.82843 4.08157L2.17157 9.73843ZM7.76157 9.67157L2.17157 15.2616L7.82843 20.9184L13.4184 15.3284L7.76157 9.67157ZM2.17157 20.9184L3.58157 22.3284L9.23843 16.6716L7.82843 15.2616L2.17157 20.9184ZM9.23843 22.3284L14.8284 16.7384L9.17157 11.0816L3.58157 16.6716L9.23843 22.3284ZM9.17157 16.7384L14.7616 22.3284L20.4184 16.6716L14.8284 11.0816L9.17157 16.7384ZM20.4184 22.3284L21.8284 20.9184L16.1716 15.2616L14.7616 16.6716L20.4184 22.3284ZM21.8284 15.2616L16.2384 9.67157L10.5816 15.3284L16.1716 20.9184L21.8284 15.2616ZM16.2384 15.3284L21.8284 9.73843L16.1716 4.08157L10.5816 9.67157L16.2384 15.3284Z'
                                    fill='black'
                                    mask='url(#path-1-inside-1_9029_112704)'
                                ></path>
                            </g>
                            <defs>
                                <clipPath id='clip0_9029_112704'>
                                    <rect
                                        width='24'
                                        height='24'
                                        fill='white'
                                        transform='translate(0 0.5)'
                                    ></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </section>

                <section className='flex flex-col items-center gap-y-4'>
                    <h3 className='text-center text-[25px] text-black font-semibold'>
                        Security Verification
                    </h3>
                    <div className='text-center text-base text-black'>
                        <p>We’ve sent a six digit pin to *** *** 1681.</p>
                        <p>Please enter the pin below to help us verify your identity.</p>
                    </div>
                </section>

                <form className='py-6 grid grid-cols-6 gap-4'>
                    <TextField
                        id='otpDigitA'
                        variant='outlined'
                        value={formik.values.otpDigitA}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.otpDigitA && Boolean(formik.errors.otpDigitA)
                        }
                        helperText={formik.touched.otpDigitA && formik.errors.otpDigitA}
                    />
                    <TextField
                        id='otpDigitB'
                        variant='outlined'
                        value={formik.values.otpDigitB}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.otpDigitB && Boolean(formik.errors.otpDigitB)
                        }
                        helperText={formik.touched.otpDigitB && formik.errors.otpDigitB}
                    />
                    <TextField
                        id='otpDigitC'
                        variant='outlined'
                        value={formik.values.otpDigitC}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.otpDigitC && Boolean(formik.errors.otpDigitC)
                        }
                        helperText={formik.touched.otpDigitC && formik.errors.otpDigitC}
                    />
                    <TextField
                        id='otpDigitD'
                        variant='outlined'
                        value={formik.values.otpDigitD}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.otpDigitD && Boolean(formik.errors.otpDigitD)
                        }
                        helperText={formik.touched.otpDigitD && formik.errors.otpDigitD}
                    />
                    <TextField
                        id='otpDigitE'
                        variant='outlined'
                        value={formik.values.otpDigitE}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.otpDigitE && Boolean(formik.errors.otpDigitE)
                        }
                        helperText={formik.touched.otpDigitE && formik.errors.otpDigitE}
                    />
                    <TextField
                        id='otpDigitF'
                        variant='outlined'
                        value={formik.values.otpDigitF}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.otpDigitF && Boolean(formik.errors.otpDigitF)
                        }
                        helperText={formik.touched.otpDigitF && formik.errors.otpDigitF}
                    />
                </form>

                <section className='self-center text-balck font-semibold text-base'>
                    <button>Resend pin</button>
                </section>

                {isCheckingForOTPLoading && (
                    <section className='absolute inset-0 z-50 flex flex-col items-center justify-center  bg-black/60'>
                        <p className='text-white font-semibold text-lg'>Loading...</p>
                    </section>
                )}
            </div>
        </Transition>
    );
}
