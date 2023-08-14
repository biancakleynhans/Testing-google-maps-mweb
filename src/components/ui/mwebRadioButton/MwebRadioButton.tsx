import { useRef } from "react";
import styles from "./radiobutton.module.css";
import parse from 'html-react-parser';

// interface for the radio buton props
interface MwebRadioButtonProps {
  id: any,
  disabled: boolean;
  handleOnChange: (isSelected: boolean ) => void
  label: string;
  isSelected: boolean;
  variant: 'standard' | 'fill';
  size: 'large' | 'small';
}


// main function that renders the radio button
function MwebRadioButton({ id, disabled, handleOnChange, label, isSelected=false, variant='standard', size='large' }: MwebRadioButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  function handleClick() {
    const value = inputRef?.current?.checked
    handleOnChange(value? value: false)
   }

   const baseFont = isSelected ? 'text-mwTextParaSmallSemi' : 'text-mwTextParaSmall';
    let containerPadding = '';
    let containerStyle = '';
    let fontStyle = '';

   // Standard Variant
   if (variant === 'standard') {
     containerStyle = 'inline-block relative flex w-full';
     containerPadding = size === 'large' ? 'p-6' : 'p-4';

     if (disabled) {
       fontStyle = 'text-mwGrey-300 hover:cursor-none';
     } else {
         fontStyle = 'text-mwGrey-900 hover:text-mwPrimary-900 hover:cursor-pointer';
     }


   }

   // Fill Variant
   if (variant === 'fill') {
     containerStyle = `inline-block relative ${isSelected ? 'bg-mwBlueGrey-25' : 'bg-white'} hover:bg-mwBlueGrey-25 rounded-2 hover:cursor-pointer`;
     containerPadding = size === 'large' ? 'p-4' : 'p-3';

       if (disabled) {
           fontStyle = 'text-mwGrey-300 cursor-none';
       } else {
           fontStyle = 'text-mwGrey-900 cursor-pointer';
       }


   }

   const labelStyle = `${baseFont} ${fontStyle}`;
   const containerStyling = `${containerStyle} ${containerPadding}`;

  //returning the radio button UI
  return (
    <div className={`flex flex-row gap-2 items-center rounded-lg w-full ${containerStyling}`} onClick={handleClick}>
    <div className={styles["radio-button-container"]}>
      <input
       ref={inputRef}
        disabled={disabled}
        className={styles["radio-button-input"]}
        type="radio"
        id={id}          
        readOnly
        checked={isSelected}
      />
    </div>
    <label className={`${labelStyle} truncate`}>{parse(label)}</label>
  </div>

  );
}

export default MwebRadioButton;

