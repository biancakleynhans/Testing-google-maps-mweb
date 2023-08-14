'use client';
import React from 'react';

// Input Field
function InputField({ placeholder }: { placeholder: string }) {
    const [text, setText] = React.useState('');

    return (
        <>
            <input
                placeholder={`${placeholder}`}
                className='py-[13px] px-[16px] border-[1px] border-[#BFBFBF] text-base text-black focus:outline-none'
            />
        </>
    );
}

export { InputField };
