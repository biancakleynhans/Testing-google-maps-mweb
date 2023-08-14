import { useEffect, useState } from "react";
interface Props {
    images: { path: string, width: number, height: number }[];
    showSlider?:boolean
}

export default function MwebCarouselIndicator({controlsLength=0, selectedIndex}:{controlsLength: number, selectedIndex: number}) {
    const [controls, setSelected] = useState<{ index: number, isSelected: boolean }[] | []>([]);

    useEffect(() => {
        const values = []
      if (controlsLength>0) {
         for (let index = 0; index < controlsLength; index++) {
           values.push({index, isSelected:false})
         }
      }
      setSelected(values)
    }, [controlsLength])
    return (
       <div className="inline-flex flex-start gap-2">
         {controls.map((a)=>{
            return<div key={a.index} className={`h-2  bg-white ${selectedIndex===a.index?"w-8 rounded-[20px] ":"w-2 rounded-full "}`}></div>
         })}
       </div>
    );
}
