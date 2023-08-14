import React from 'react';
import {containerBasic, iCardFullProps, iProductCardDetails, padDisplay} from './CardStyles';
import MwebButton from '../mwebButtons/MwebButtonMain';
import MwebIndicator from '../mwebIndicators/MwebIndicator';
import MwebIcon from '../mwebIcon/MwebIcon';

interface iProps extends iCardFullProps {
	cardDetails: iProductCardDetails;
}

export default function CardProduct(props: iProps) {
	const {cardDetails, isPromo, isSelected, onClickCallback, showButton, size} = props;

	const indicatorSize = size === 'large' ? 'lg' : size == 'medium' ? 'md' : 'sm';
	const indicatorSizePill = size === 'large' ? 'md' : size === 'medium' ? 'sm' : size === 'small' ? 'sm' : 'xs';

	const border = isSelected ? `ring-2 ring-mwPrimary-900 ring-offset` : `border-0 border-transparent md:border-b-[6px]`;
	const hover = isSelected ? `md:hover:border-2 md:hover:border-mwPrimary-900` : 'md:hover:border-b-[6px] hover:border-b-mwBlueGrey-100';

	const sizeContainer = size === 'large' ? 'w-[386px]' : size == 'medium' ? 'w-[318px]' : 'w-[328px]';

	const containerFull = isSelected
		? `${containerBasic} ${cardDetails.showBgColor ? 'bg-mwBlueGrey-25' : 'bg-white'}`
		: `${containerBasic} ${cardDetails.showBgColor ? 'bg-mwBlueGrey-25' : 'bg-white'}`;

	const promoText = size === 'large' || size == 'medium' ? 'text-mwTextParaLargeSemi' : 'text-mwTextParaSmallSemi';
	const priceText = size === 'large' ? 'text-mwTextDeskH2Bold' : size == 'medium' ? ' text-mwTextDeskH3Bold' : 'text-mwTextMobileH3Bold';
	const cardDetailsText = size === 'large' ? 'text-mwTextParaBase' : size == 'medium' ? ' text-mwTextParaSmall' : 'text-mwTextParaXSmall';
	const speedText = size === 'large' ? ' text-mwTextParaBaseSemi' : size == 'medium' ? 'text-mwTextParaSmallSemi' : 'text-mwTextParaXSmallSemi';
	const detailsText = size === 'large' ? 'text-mwTextParaLarge' : size == 'medium' ? ' text-mwTextParaBaseSemi' : 'text-mwTextParaSmallSemi';
	const detailsPadding = size === 'large' ? ' pt-8 pb-4' : 'pt-4 pb-2';

	return (
		<div
			className={`h-full flex justify-between ${containerFull} ${sizeContainer} ${hover} ${border}  ${showButton ? '' : 'cursor-pointer'}`}
			onClick={() => {
				if (!showButton) {
					onClickCallback();
				}
			}}
		>
			<div className='flex flex-col w-full'>
				{isPromo && (
					<div className={`pt-0 ${padDisplay} justify-end items-end `}>
						<MwebIndicator
							label={cardDetails.promoTag.slice(
								0,
								cardDetails.promoTag.toUpperCase().indexOf('OFF') !== -1
									? cardDetails.promoTag.toUpperCase().indexOf('OFF') + 4
									: cardDetails.promoTag.toUpperCase().indexOf('MONTH') !== -1
									? cardDetails.promoTag.toUpperCase().indexOf('MONTH') + 5
									: 8
							)}
							size={indicatorSize}
							type='tag'
						/>
					</div>
				)}

				<div className={`px-6 w-full text-mwGrey-600 ${speedText} ${isPromo ? 'pt-0' : 'pt-8'}`}>{cardDetails.speed}</div>

				<div className={`pb-6 w-full`}>
					<div className={`${padDisplay}  justify-start items-baseline gap-x-2`}>
						<div className={`text-mwPrimary-900 ${priceText}`}>R{isPromo ? cardDetails.promoPrice : cardDetails.price}pm</div>
						{isPromo && <div className={`text-mwPrimary-500 line-through decoration-mwPrimary-500 ${promoText}`}>R{cardDetails.price}pm</div>}
					</div>
					{cardDetails.deliveryNotes && <div className={`${padDisplay}  text-mwGrey-600 w-full ${cardDetailsText}`}>{cardDetails.deliveryNotes}</div>}
				</div>

				<div className='border-mwBlueGrey-100 w-full border-b mx-0 h-[1px]' />

				{isPromo ? <div className={`px-6 text-mwLightTeal-900 ${promoText} ${detailsPadding}`}>{cardDetails.details[0]}</div> : <div className='py-3' />}
			</div>
			<div className='flex flex-col w-full'>
				{cardDetails.details.slice(1).map((x, i) => (
					<div key={`mweb-card-details-${i}`}>
						{x?.length > 2 && (
							<div className={`${padDisplay} justify-start items-center gap-x-[10px] ${size === 'small' ? 'pb-[9px]' : 'pb-2'}`}>
								<MwebIcon color='text-mwLightTeal-900' iconType='circle-check' size={size === 'small' ? 20 : 24} variant='basic' />
								<div className={`text-mwGrey-600 ${cardDetailsText}`}>{x}</div>
							</div>
						)}
					</div>
				))}
				<div className={`${padDisplay} justify-start items-start pt-[5px] md:pt-2 ${showButton ? 'pb-0' : 'pb-3'}`}>
					<MwebIndicator label={`POWERED BY ${cardDetails.provider}`.toUpperCase()} size={indicatorSizePill} type='pill' />
				</div>

				{showButton && (
					<div className={`pt-6 pb-6 ${padDisplay} justify-center items-center`}>
						<MwebButton
							isFullWidth={true}
							btnText={cardDetails.btnText}
							color='primary'
							hasIcon={false}
							isDisabled={false}
							size={size}
							onClickFunction={(val) => {
								onClickCallback(val);
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
