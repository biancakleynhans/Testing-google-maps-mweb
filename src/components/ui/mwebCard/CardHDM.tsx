import React, {useState} from 'react';

import { iCardProps, iHDMCardDetails } from './CardStyles';
import MwebIcon from '../mwebIcon/MwebIcon';
import MwebIconIllustration from '../mwebIcon/MwebIconIllustration';
import styles from './hmdStyle.module.css';

interface iProps extends iCardProps {
	cardDetails: iHDMCardDetails;
}

export default function CardHDM(props: iProps) {
	const { cardDetails, onClickCallback, size, isSelected } = props;
	const { label, type } = cardDetails;

	const sizeContainer = size === 'large' || size === 'medium' ? 'w-[230px]' : 'w-[156px]';
	const containerBasic = 'rounded-2xl bg-mwBlueGrey-25 flex flex-col justify-center items-center gap-y-0';
	const [isHovered, setIsHovered] = useState(false);
	const [isAnimated, setIsAnimated] = useState(false);
	const handleMouseEnter = () => {
		setIsHovered(true);
		setIsAnimated(true);
	}

	const handleMouseLeave = () => {
		setIsHovered(false);
		setIsAnimated(false);
	}


	const hover = isSelected ? `` : 'hover:border-l-4 md:hover:border-l-[6px] hover:border-l-mwBlueGrey-100 hover:pl-[12px] md:hover:pl-[18px] transition delay-300 duration-300 ease-in-out';
	// const testHover = isHovered? `bg-blue-500`: `bg-yellow-600`
	const borderState = isSelected && isHovered ? `${styles['border-styling']}` : `border-0 border-b-4 md:border-b-[6px] border-b-mwBlueGrey-100`;
	const selectedBorder = isSelected ? `${styles['border-styling-default']}` : `border-0 border-b-4 md:border-b-[6px] border-b-mwBlueGrey-100`;
	const labelStyle = size === 'large' || size === 'medium' ? 'text-mwTextParaBaseSemi' : 'text-mwTextParaXSmallSemi';

	const img = size === 'large' || size === 'medium' ? 'w-14 h-14' : 'w-12 h-12';
	const illustrationSize = size === 'large' || size === 'medium' ? 56 : 48;

	return (
		<div id='card-container' className={`${containerBasic} ${styles['border']} ${sizeContainer} ${selectedBorder} ${borderState} ${hover} relative cursor-pointer p-4 pb-[14px] md:p-6 ${isSelected ? `pl-4 md:pl-6`: ''}`} 
		onClick={() => onClickCallback()}
		onMouseEnter={handleMouseEnter}
		onMouseLeave={handleMouseLeave}
		>
			{/* icon  */}
			<div className={`justify-end absolute md:top-4 md:right-4 top-[10px] right-[10px]  `}>
				<MwebIcon size={size === 'small' ? 20 : 24} color='text-mwPrimary-900' variant='basic' iconType={isSelected ? 'circle-check' : 'circle-plus'} />
			</div>
			<div className={`flex flex-col w-full gap-y-2 md:gap-y-4 `}>

				<div className={`w-full flex flex-row justify-center items-center ${img}`}>
					<MwebIconIllustration illustrationName={type} size={illustrationSize} />
				</div>

				<div className={`w-full text-center text-mwPrimary-900 ${labelStyle}`}>{label}</div>
			</div>
    	</div>
  );
}
