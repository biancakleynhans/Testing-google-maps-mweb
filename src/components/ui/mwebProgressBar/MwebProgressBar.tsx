import { useEffect, useState } from "react";

// Creating a TypeScript interface `IProps` to define the props that `MwebProgressBar` component accepts
interface IProps {
    //size: "small"|"medium"|"large"
    color?: string;
    curentStep: number;
    totalSteps: number;
}

// Defining a React functional component `MwebProgressBar` that accepts `IProps` as its props
export default function MwebProgressBar({
    color,
    curentStep=0,
    totalSteps=1
}: IProps) {

    const [completed, setCompleted] = useState(0);

    useEffect(() => {
        setCompleted(Math.floor(((curentStep) / totalSteps) * 100))
    }, [curentStep]);
    return (
        <div className="w-full bg-mwPrimary-50 rounded-full h-1.5">
            <div className={`${color ? color : "bg-mwPrimary-900"}  h-1.5 rounded-r-[10px] `} style={{ "width": `${completed}%` }}></div>
        </div>
    );
}
