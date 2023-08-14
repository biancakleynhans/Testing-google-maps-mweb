'use client';

import MwebButton from "@/components/ui/mwebButtons/MwebButtonMain";

const CTAButton = (props: {
    action: any;
    copyText: string;
    color: 'primary' | 'secondary-dark' | 'secondary-light' | 'text-only' | 'grey-scale'
    ctaBtnText: string;
    targetUrl?: any;
    onClickFunction?: () => any
}) => {
    const { action, copyText, ctaBtnText, targetUrl, onClickFunction, color } = props;
    const handleClick = () => {

        if (onClickFunction) {
            onClickFunction()
        }
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="font-semibold text-mw5xl text-center text-black px-20">
                {copyText}
            </div>
            <div className='flex md:hidden min-w-[184px]'>
                <MwebButton
                    isFullWidth
                    color={color}
                    size='medium'
                    btnText={ctaBtnText}
                    hasIcon={false}
                    isDisabled={false}
                    onClickFunction={handleClick}
                />
            </div>
            <div className='md:flex hidden min-w-[224px]'>
                <MwebButton
                    isFullWidth
                    color={color}
                    size='large'
                    btnText={ctaBtnText}
                    hasIcon={false}
                    isDisabled={false}
                    onClickFunction={handleClick}
                />
            </div>

        </div>
    );
};

export default CTAButton;
