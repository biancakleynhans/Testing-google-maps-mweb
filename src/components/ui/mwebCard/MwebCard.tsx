import React from 'react';
import {
	iCardFullProps,
	iCompareCardDetails,
	iFeatureCardDetails,
	iHDMCardDetails,
	iOptionCardDetails,
	iOrderSummaryCardDetails,
	iProductCardDetails,
	iTestimonialCardProps,
	iVasCardDetails,
	iVoucherCardDetails,
} from './CardStyles';
import CardProduct from './CardProduct';
import CardVas from './CardVas';
import CardOption from './CardOption';
import CardCompare from './CardCompare';
import CardHDM from './CardHDM';
import CardVoucher from './CardVoucher';
import CardFeauture from './CardFeauture';
import CardOrderSummary from './CardOrderSummary';
import CardTestimonial from './CardTestimonial';

interface iProps extends iCardFullProps {
	type: 'product' | 'product-vas' | 'option' | 'comparison' | 'HMD' | 'voucher' | 'feauture' | 'order-summary' | 'testimonial';
	cardDetails:
	| iProductCardDetails
	| iVasCardDetails
	| iOptionCardDetails
	| iCompareCardDetails
	| iHDMCardDetails
	| iVoucherCardDetails
	| iFeatureCardDetails
	| iOrderSummaryCardDetails
	| iTestimonialCardProps;
}

export default function MwebCard(props: iProps) {
	const { cardDetails, isPromo, size, type, isSelected, showButton, onClickCallback } = props;

	return (
		<>
			{(() => {
				switch (type) {
					case 'product':
						return <CardProduct cardDetails={cardDetails as iProductCardDetails} isPromo={isPromo} isSelected={isSelected} onClickCallback={() => onClickCallback()} showButton={showButton} size={size} />
					case 'product-vas':
						return <CardVas cardDetails={cardDetails as iVasCardDetails} isPromo={isPromo} isSelected={isSelected} onClickCallback={() => onClickCallback()} showButton={showButton} size={size} />
					case 'option':
						return <CardOption cardDetails={cardDetails as iOptionCardDetails} isSelected={isSelected} onClickCallback={() => onClickCallback()} size={size} />
					case 'comparison':
						return <CardCompare cardDetails={cardDetails as iCompareCardDetails} onClickCallback={() => onClickCallback()} size={size} isSelected={isSelected} />
					case 'HMD':
						return <CardHDM cardDetails={cardDetails as iHDMCardDetails} onClickCallback={() => onClickCallback()} size={size} isSelected={isSelected} />
					case 'voucher':
						return <CardVoucher cardDetails={cardDetails as iVoucherCardDetails} onClickCallback={() => onClickCallback()} size={size} />
					case 'feauture':
						return <CardFeauture cardDetails={cardDetails as iFeatureCardDetails} onClickCallback={() => onClickCallback()} size={size} />
					case 'order-summary':
						return <CardOrderSummary cardDetails={cardDetails as iOrderSummaryCardDetails} onClickCallback={() => onClickCallback()} size={size} />
					case 'testimonial':
						return <CardTestimonial cardDetails={cardDetails as iTestimonialCardProps} />
					default:
						break;
				}
			})()}

		</>
	);
}
