import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface Button {
    btn: 'action' | 'dismiss'
    color?: 'success' | 'error' | 'notification' //prop for different color of buttons
}

export default function NotificationButton({ btn, color }: Button) {
    // colors for buttons depending on type name default is Notification color (text-mwPrimary-900)
    const [Componentcolor] = useState(() => {
        switch (color) {
            case 'success':
                return 'text-mwSuccess-500';
            case 'error':
                return 'text-mwError-500';
            case 'notification':
                return 'text-mwPrimary-900';
            default:
                return 'text-mwPrimary-900';
        }
    });

    // render close button if dismiss passed
    if (btn === 'dismiss') {
        return (
            <button className={`${Componentcolor}`}>
                <IoClose size={20} />
            </button>
        )
    }
    // action button default renderd
    return (
        <button className={`text-mwButtonTextSmall ${Componentcolor}`}>
            <div>
                Action
            </div>
        </button>
    )
}