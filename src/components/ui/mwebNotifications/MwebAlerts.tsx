import { useState } from 'react';
import { BsCircle } from 'react-icons/bs';

//interface to contol color, sizes and text
interface notificationProps {
    type?: 'success' | 'error';
    label?: string;
    notificationIcon?: React.ReactNode; //Render the icon as props
    NotificationButton?: React.ReactNode; // to import the button as props
}

//main component with props
const MwebAlerts = ({
    label,
    type,
    notificationIcon,
    NotificationButton,
}: notificationProps) => {

    //mobile and desktop Text and padding

    //different colors and sizes based on type
    const [Componentcolor] = useState(() => {
        switch (type) {
            case 'success':
                return 'w-full bg-mwSuccess-50 text-mwTextParaSmall text-mwSuccess-500 py-3 px-4';
            case 'error':
                return 'w-full bg-mwError-50 text-mwTextParaSmall text-mwError-500 py-3 px-4';
            default:
                return 'w-full bg-mwSuccess-50 text-mwTextParaSmall text-mwSuccess-500 py-3 px-4';
        }
    });

    return (
        //returning component 
        <div
            className={`${Componentcolor} flex items-center justify-start rounded-md max-w-[360px]`}
        >
            <span className='mr-2' >
                {notificationIcon ? notificationIcon : <BsCircle size={20} />} {/* Render the passed icon prop or the default icon */}
            </span>
            <div className="flex-grow ${Componentcolor} mr-10">{label}</div>
            {NotificationButton}
        </div>
    );
};

export default MwebAlerts;