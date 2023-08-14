import { useState } from 'react';
import { CgRadioCheck, CgRadioChecked } from 'react-icons/cg';

const RadioButton = ({
    isSelected,
    onBtnClick,
}: {
    isSelected: boolean;
    onBtnClick: () => void;
}) => {
    return (
        <button onClick={onBtnClick} className='outlined-none'>
            {isSelected ? <CgRadioChecked size={24} /> : <CgRadioCheck size={24} />}
        </button>
    );
};

export default RadioButton;
