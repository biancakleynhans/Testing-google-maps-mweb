import { useState } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

//interface to contol color, sizes and text
interface notificationProps {
    device?: 'desktop' | 'mobile';
    label?: string;
    NotificationButton?: React.ReactNode;
}

//main component with props
const MwebNotification = ({
    label,
    NotificationButton,
    device,
}: notificationProps) => {

    //mobile and desktop Text and padding
    const [textStyles] = useState(() => {
        switch (device) {
            case 'desktop':
                return 'w-full text-mwTextParaBase p-4 ';
            case 'mobile':
                return 'w-full text-mwTextParaSmall py-3 px-4';
            default:
                return 'w-full text-mwTextParaBase';
        }
    });


    //different colors and sizes based on type
    return (
        //returning component 
        <div
            className={`${textStyles} bg-mwPrimary-50 text-mwGrey-600 flex items-center justify-start rounded-md max-w-[360px]`}
        >
            <div className="flex-grow ${textStyles} mr-20">{label}</div>
            {NotificationButton}
        </div>
    );
};

export default MwebNotification;