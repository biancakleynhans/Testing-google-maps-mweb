import React from 'react';
import { iCardProps, iVoucherCardDetails } from './CardStyles';
import MwebInput from '../MwebInput/MwebInput';

interface iProps extends iCardProps {
	cardDetails: iVoucherCardDetails;
}

export default function CardVoucher(props: iProps) {
	const { cardDetails, onClickCallback, size } = props;
	const { btnLabel, inputValue, onClickCB, placeholderText } = cardDetails;

	const sizeContainer = size === 'large' || size === 'medium' ? 'w-full' : 'w-full';
	const containerBasic = 'rounded-2xl bg-mwBlueGrey-25 flex flex-col justify-start items-start gap-2';

	const textSize = size === 'large' || size === 'medium' ? 'text-mwTextParaBase' : 'text-mwTextParaSmall';
	const pad = size === 'large' || size === 'medium' ? 'p-6' : 'p-4';

	return (
		<div className={`${containerBasic} ${sizeContainer} ${pad} `}>
			<div className={`text-mwGrey-600 ${textSize}`}>Do you have a voucher code?</div>
			<MwebInput
				id={`promo-voucher`}
				errorText=''
				showIcon={false}
				type='voucher'
				buttonText={btnLabel}
				isDisabled={false}
				placeHolderText={placeholderText ?? ''}
				helperText=''
				labelText=''
				inputValue={inputValue}
				handleChange={(val) => onClickCB(val)}
				isFullWidth={true}
			/>
		</div>
	);
}
