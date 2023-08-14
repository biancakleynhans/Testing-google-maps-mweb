import React from 'react';
import { iCardProps, iOrderSummaryCardDetails, iVoucherCardDetails } from './CardStyles';
import CardVoucher from './CardVoucher';
import MwebButton from '../mwebButtons/MwebButtonMain';

interface iProps extends iCardProps {
	cardDetails: iOrderSummaryCardDetails;
}

export default function CardOrderSummary(props: iProps) {
	const { cardDetails, onClickCallback, size } = props;
	const { btnLabel, editAction, hasVoucher, isDisabled, showEdit, voucherProps, hasIcon, iconProps, orderDetails, bgColor } = cardDetails;
	const { deliveryInstalation, monthly, onceOff } = orderDetails;

	return (
		<div className=' flex flex-col justify-normal gap-y-4'>
			{/* CARD */}
			<div className={`rounded-2xl w-full h-fit ${bgColor?.length > 2 ? bgColor : 'bg-mwBlueGrey-25'} gap-y-3 gap-x-2`}>
				<div className='bg-mwLightTeal-900 w-full rounded-t-2xl p-2  text-center text-white text-mwTextParaSmallSemi'>ORDER SUMMARY</div>

				<div className='w-full px-6 flex flex-col justify-start items-start pt-6 pb-4 gap-y-2'>
					{/*  */}
					<div className='w-full flex flex-row justify-between items-center'>
						<div className='w-10/12 text-start text-mwTextParaBase text-mwGrey-600 '>Your monthly total</div>
						<div className='w-1/3 text-end text-mwTextParaBaseSemi text-mwGrey-900'>{monthly}</div>
					</div>

					<div className='w-full flex flex-row justify-between items-center'>
						<div className='w-10/12 text-start text-mwTextParaBase text-mwGrey-600 '>Your once-off total</div>
						<div className='w-1/3 text-end text-mwTextParaBaseSemi text-mwGrey-900 '>{onceOff}</div>
					</div>

					<div className='w-full flex flex-row justify-between items-center'>
						<div className='w-10/12 text-start text-mwTextParaBase text-mwGrey-600 '>Delivery and installation</div>
						<div className='w-1/3 text-end text-mwTextParaBaseSemi text-mwGrey-900 '>{deliveryInstalation}</div>
					</div>
				</div>

				<div className='w-full flex flex-row justify-center items-center px-6 pb-6'>
					<MwebButton
						btnText={btnLabel}
						color='primary'
						hasIcon={hasIcon}
						isDisabled={isDisabled}
						onClickFunction={onClickCallback}
						size='medium'
						isFullWidth={true}
						iconProps={iconProps ? iconProps : { color: '', icon: '', iconPosition: 'icon-only', size: 0, variant: 'basic' }}
					/>
				</div>
			</div>

			{hasVoucher &&
				<>
					<div className={`hidden md:flex`}>
						<CardVoucher onClickCallback={() => {}} size='large' cardDetails={voucherProps ? voucherProps : ({} as iVoucherCardDetails)}/>
					</div>
					<div className={`flex md:hidden`}>
						<CardVoucher onClickCallback={() => {}} size='small' cardDetails={voucherProps ? voucherProps : ({} as iVoucherCardDetails)}/>
					</div>
				</>
			}

			{showEdit && (
				<div className='w-full flex flex-row justify-start items-start ml-0 '>
					<MwebButton
						btnText='Edit Order'
						color='text-only'
						size='medium'
						hasIcon={true}
						iconProps={{ color: 'text-mwPrimary-900', icon: 'edit', iconPosition: 'left', size: 20, variant: 'basic' }}
						isDisabled={false}
						onClickFunction={() => editAction()}
					/>
				</div>
			)}
		</div>
	);
}
