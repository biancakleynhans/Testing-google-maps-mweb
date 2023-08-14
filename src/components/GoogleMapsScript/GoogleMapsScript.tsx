'use client';

import Script from "next/script";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

export default function GoogleMapsScript() {
    const pathName = usePathname()
    const [scriptRequired, setScriptRequired] = useState<boolean>(false);

    const pathsRequiringGoogleMaps = ['/fibre', '/fibre/confirm-location', '/lte', '/lte/location'];

    useEffect(() => {
        if (pathName) {
            const pathMatch = pathsRequiringGoogleMaps.some((p) => pathName.includes(p));
            console.log('pathName');
            console.log(pathName);
            console.log('pathMatch');
            console.log(pathMatch);
            setScriptRequired(pathMatch);
        }
    }, [pathName]);

    return (
            scriptRequired ? (
                <>
                    <Script
                    src = {`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`}
                    defer={false}
                    />
                </>
            ) : (
                <></>
            )
    )
}
