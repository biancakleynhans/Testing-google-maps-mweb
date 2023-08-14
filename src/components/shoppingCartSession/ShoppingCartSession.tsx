'use client';

import {
    ShoppingCartSessionService,
    IShoppingCartSession,
} from '@/services/shoppingCartSessionService';
import React, { useEffect } from 'react';

export default function ShoppingCartSession() {
    useEffect(() => {
        //
        const getShoppingCartSession = async (userIdentifier: string) => {
            const shoppingCartSession: IShoppingCartSession =
                await ShoppingCartSessionService.getShoppingCartSession(userIdentifier);
            if (shoppingCartSession) {
                localStorage.setItem(
                    'portalShoppingCartSession',
                    JSON.stringify(shoppingCartSession)
                );
            }
        };

        try {
            let userIdentifier: string = localStorage.getItem('userIdentifier') || '';

            if (userIdentifier === '') {
                userIdentifier = ShoppingCartSessionService.createUniqueUserIdentifier();
                localStorage.setItem('userIdentifier', userIdentifier);

                getShoppingCartSession(userIdentifier);
            }
        } catch (error) {
            console.log('Error getting portal shopping cart session: ', error);
        }

        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    return <></>;
}
