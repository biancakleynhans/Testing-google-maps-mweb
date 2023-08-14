'use client';

import React, { useEffect, useState } from 'react';
import { BankListNames } from './DebitOption';
import MwebInput from '../ui/MwebInput/MwebInput';
import {IOrder, IOrderForm, OrderService} from "@/services/order.service";
import {
	IShoppingCartSession,
	IShoppingCartSessionUpdate,
	ShoppingCartSessionService
} from "@/services/shoppingCartSessionService";
import {usePathname} from "next/navigation";
import {useCoverage} from "@/context/CoverageContext";
import {TillSlipService} from "@/services/tillSlipService";

const AccTypes = ['Cheque', 'Savings Account', 'Debit', 'Credit'];
const DateTypes = ['1st of each month', '15th of each month', '30th of each month'];
interface iProps {
	canProceedCheckout: boolean
}
export default function DebitCaptureCard(props: iProps) {
	const pageUrl = usePathname();
	let {canProceedCheckout } = props;
	const [bankName, setBankName] = useState('');
	const [debitDate, setDebitDate] = useState('');
	const [accName, setAccName] = useState('');
	const [accType, setAccType] = useState('');
	const [accNumber, setAccNumber] = useState('');
	const [ranOnce, setRanOnce] = useState(false);
	const [canContinue, setCanContinue] = useState(false);

	let  order: IOrder;
	let orderForm:IOrderForm;

	useEffect(() => {

		const portalShoppingCartSessionKey = localStorage.getItem('portalShoppingCartSession') ||  ''; // ask localStorage for portalShoppingCartSession
		if (portalShoppingCartSessionKey !== '') {
			setCanContinue(true);
			const portalShoppingCartSessionFromStorage: IShoppingCartSession = JSON.parse(portalShoppingCartSessionKey); // convert shopping cart session to object
			// setPortalShoppingCartSession(portalShoppingCartSessionFromStorage);
			orderForm = portalShoppingCartSessionFromStorage.orderFormData
			order = orderForm?.order
			order.bankAccountNumber = accNumber
			order.bankName = bankName
			order.bankAccountType = accType
			order.bankAccountHolderName = order.firstName + " " + order.lastName
			if (order.bankName.toLowerCase() === 'capitec') {
				order.bankBranchCode = '470010'
			}
			if (order.bankName.toLowerCase() === 'absa') {
				order.bankBranchCode = '632005'
			}
			if (order.bankName.toLowerCase() === 'fnb') {
				order.bankBranchCode = '250655'
			}
			if (order.bankName.toLowerCase().includes('standard')) {
				order.bankBranchCode = '051001'
			}
			if (canProceedCheckout && !ranOnce) {
				OrderService.processOrder(order)
				setRanOnce(true)
			}

		}

	}, []);



	return (
		<div className='w-full flex flex-col justify-center items-center gap-y-3 '>
			<div className='lg:hidden w-full flex flex-col lg:flex-row justify-between items-center gap-y-3 lg:gap-4'>
				<MwebInput
					id='BankNamesMobile'
					options={BankListNames.map((x) => ({ label: x.toUpperCase(), value: x }))}
					errorText={bankName.length > 0 && bankName.length < 3 ? 'Please select your bank' : ''}
					helperText={''}
					labelText='Bank Name'
					placeHolderText=''
					type='select'
					inputValue={bankName}
					showIcon={false}
					isDisabled={false}
					handleChange={(e) => setBankName(e)}
				/>
			</div>

			<div className='hidden lg:inline-flex w-full'>
				<MwebInput
					isFullWidth={true}
					id='BankNamesDesktop'
					options={BankListNames.map((x) => ({ label: x.toUpperCase(), value: x }))}
					errorText={bankName.length > 0 && bankName.length < 3 ? 'Please select your bank' : ''}
					helperText={''}
					labelText='Bank Name'
					placeHolderText=''
					type='select'
					inputValue={bankName}
					showIcon={false}
					isDisabled={false}
					handleChange={(e) => setBankName(e)}
				/>
			</div>

			<div className='w-full flex flex-col lg:flex-row justify-between items-center gap-2'>
				<div className='w-full lg:w-1/2 lg:mr-1.5'>
					<MwebInput
						isFullWidth={true}
						id='Account Holder Name'
						errorText={accName.length > 0 && accName.length < 10 ? 'Please enter your name as it apears on your account ' : ''}
						helperText={''}
						labelText='Account Holder Name'
						placeHolderText=''
						type='text'
						inputValue={accName}
						showIcon={false}
						isDisabled={false}
						handleChange={(e) => setAccName(e)}
					/>
				</div>

				<div className='w-full lg:w-1/2 lg:ml-1.5'>
					<MwebInput
						id='Account Number'
						isFullWidth={true}
						errorText={accNumber.length > 0 && accNumber.length < 10 ? 'Required' : ''}
						helperText={''}
						labelText='Account Number'
						placeHolderText=''
						type='text'
						inputValue={accNumber}
						showIcon={false}
						isDisabled={false}
						handleChange={(e) => setAccNumber(e)}
					/>
				</div>
			</div>

			<div className='w-full flex flex-col lg:flex-row justify-between items-center gap-2'>
				<div className='w-full lg:w-1/2 lg:mr-1.5 '>
					<MwebInput
						isFullWidth={true}
						id='Account Types'
						options={AccTypes.map((x) => ({ label: x , value: x }))}
						errorText={accType.length === 1 ? 'Required' : ''}
						helperText={''}
						labelText='Account Type'
						placeHolderText=''
						type='select'
						inputValue={accType}
						showIcon={false}
						isDisabled={false}
						handleChange={(e) => setAccType(e)}
					/>
				</div>

				<div className='w-full lg:w-1/2 lg:ml-1.5 '>
					<MwebInput
						isFullWidth={true}
						id='Debit Dates'
						options={DateTypes.map((x) => ({ label: x, value: x }))}
						errorText={debitDate.length === 1 ? 'Required' : ''}
						helperText={''}
						labelText='Monthly Debit Date'
						placeHolderText=''
						type='select'
						inputValue={debitDate}
						showIcon={false}
						isDisabled={false}
						handleChange={(e) => setDebitDate(e)}
					/>
				</div>
			</div>
		</div>
	);
}
