import { useEffect, useState } from 'react';
import { MdCheck, MdIndeterminateCheckBox } from 'react-icons/md';
import { BsDashLg } from 'react-icons/bs';
import styles from './checkbox.module.css';
import iconCreatorAndValidator from '@/components/ui/mwebIcon/MwebIcon';
import MwebIcon from '@/components/ui/mwebIcon/MwebIcon';
import parse from 'html-react-parser';

//interface for the props to be accepted on the button component
interface checkProps {
	isChecked: boolean;
	selectedKey: number;
	disabled: boolean;
	label: string;
	onStateChange: (newState: string, selectedKey: number) => void;
}
//main function that renders the checkbox button
function MwebCheckbox({ isChecked, selectedKey, disabled, label, onStateChange }: checkProps) {
	const [checkBoxState, setCheckBoxState] = useState('unchecked');
	
	useEffect(() => {
		setCheckBoxState(isChecked ? 'checked' : 'unchecked')
	}, [isChecked])
	//a handle click function for changing the the updating and changing the state of the input/button
	const handleClick = () => {
		let newState = checkBoxState;
		if (checkBoxState === 'unchecked') {
			newState = 'checked';
		} else {
			newState = 'unchecked';
		}
		setCheckBoxState(newState);
		onStateChange(newState, selectedKey);
	};

	//a function to get the input content for a specific state
	const getInputContent = () => {
		switch (checkBoxState) {
			case 'unchecked':
				return null;
			case 'checked':
				return (
					<MdCheck
						className='checkbox-icon'
						style={{
							opacity: disabled ? 0.2 : 1,
							cursor: disabled ? 'not-allowed' : 'pointer',
						}}
					/>
				);
		}
	};

	//return the main UI for the checkbox button
	return (
		<div className='w-full flex items-start gap-2'>
			<div className='min-w-[20px] mt-px' id={styles['checkbox-container']} onClick={handleClick}>
				<input type='checkbox' className='checkbox' id={styles['checkbox-input']} checked={checkBoxState === 'checked'} onChange={() => { }} />
				{getInputContent()}
			</div>
			<div className='text-mwTextParaSmall justify-start items-start text-mwGrey-900'>{parse(label)}</div>
		</div>
	);
}

export default MwebCheckbox;
