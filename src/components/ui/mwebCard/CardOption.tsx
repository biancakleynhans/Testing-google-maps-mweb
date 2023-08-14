import React from 'react';

import { iCardProps, iOptionCardDetails } from './CardStyles';
import MwebIcon from '../mwebIcon/MwebIcon';
import MwebIconIllustration from '../mwebIcon/MwebIconIllustration';

interface iProps extends iCardProps {
	cardDetails: iOptionCardDetails;
}

export default function CardOption(props: iProps) {
	const { cardDetails, onClickCallback, size, isSelected } = props;
	const { description, icon, iconType, label, price, iconColor } = cardDetails;
	const containerBasic = 'rounded-2xl bg-mwBlueGrey-25 flex flex-col justify-start items-center';
	const iconSize = size === 'large' ? 112 : 88




	return (
		<div className={`h-full p-4 md:p-5 w-[318px]  ${containerBasic} border-b-[6px] border-transparent ${isSelected ? `ring-2 ring-mwPrimary-900 ring-offset ` : `border-transparent hover:border-mwBlueGrey-100`} relative cursor-pointer`} onClick={() => onClickCallback()}>

			<div className={`h-full flex flex-col justify-center w-full gap-y-2 md:gap-y-4`}>
				<div className='h-full flex flex-col justify-start items-start'>
					{/* IMAGE ILLUSTRATION / ICON*/}

					<div className={`w-full flex flex-row justify-center items-center `}>
						{iconType === 'illustration' ?
							<MwebIconIllustration illustrationName={icon} size={iconSize} />
							: iconType === 'icon' ? <MwebIcon iconType={icon} size={iconSize} color={iconColor ? iconColor : 'text-mwGrey-600'} />
								: <div className={`rounded-lg bg-white h-[${iconSize}px] w-[${iconSize}px]`}></div>
						}
					</div>
					{/* CARD TEXT */}
					<div className={`h-full flex flex-col justify-between items-center w-full gap-y-2 md:gap-y-4`}>
						<div className='flex flex-col justify-center items-center w-full gap-y-2 md:gap-y-4'>
							<div className={`flex text-center text-mwPrimary-900 ${size !== 'small' ? 'text-mwTextParaBaseSemi' : 'text-mwTextParaSmallSemi'}`}>{label}</div>
							{
								description && <div className='flex text-center text-mwTextMobileH5Semi md:text-mwTextDeskH5Semi text-mwGrey-900'>{description}</div>
							}
						</div>

						{
							price && <span className='flex text-center text-mwTextParaSmall md:text-mwTextParaBase text-mwGrey-900'>Starting from <span className='ml-1 inline-block text-mwTextParaSmallSemi md:text-mwTextParaBaseSemi'>{`${price}`}</span></span>
						}
					</div>
				</div>


			</div>
		</div>
	);
}
