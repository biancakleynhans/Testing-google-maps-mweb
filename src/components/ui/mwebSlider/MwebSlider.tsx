import { useEffect, useState } from "react";
import Image from 'next/image';
interface ToggleProps {
    images: { path: string, width: number, height: number }[];
    className?:string
}

export default function MwebSlider({ images, className }: ToggleProps) {
    const [selected, setSelected] = useState<{ path: string, width: number, height: number } | null>();

    useEffect(() => {
        setSelected(images.length > 0 ? images[0] : null)
    }, [images])
    return (
       <>
          <img src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${selected?.path}`} alt='' className='object-cover object-right-top w-full h-full cursor-pointer' onClick={() => console.log('banner clicked')} />
            
       </>
    );
}
