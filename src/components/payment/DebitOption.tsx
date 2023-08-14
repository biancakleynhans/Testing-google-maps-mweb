'use client'
import React, {useState,useEffect} from 'react';
import DebitCaptureCard from './DebitCaptureCard';
import MwebRadioButton from '@/components/ui/mwebRadioButton/MwebRadioButton';
import { IGeneralCheckout, getGeneralCheckoutContent } from '@/services/GeneralCheckoutService';
import MwebBankIcon from '../ui/mwebIcon/MwebBankIcons';
const BankList = [
  {
    name: 'absa',
    icon: <MwebBankIcon iconType='absa' alt='ABSA' height={16} width={16} />,
  },
  {
    name: 'fnb',
    icon: <MwebBankIcon iconType='fnb' alt='FNB' height={16} width={16} />,
  },
  {
    name: 'capitec',
    icon: <MwebBankIcon iconType='capitec' alt='Capitec' height={12} width={20} />,
  },
  {
    name: 'standard',
    icon: <MwebBankIcon iconType='standard-bank' alt='Standard' height={16} width={14} />,
  },
];

export const BankListNames = BankList.map((x) => x.name);

interface iProps {
  isSelected: boolean;
  handleIsSelected: (choiceName: string) => void;
  canProceedCheckout: boolean
}

export default function DebitOption(props: iProps) {
  const { handleIsSelected, isSelected, canProceedCheckout } = props;

  const [generalCheckoutContent, setGeneralCheckoutContent] = useState<IGeneralCheckout>();

  useEffect(() => {
    
    getGeneralCheckoutContent().then((data) => {
      setGeneralCheckoutContent(data[0])
    })
  },[])

  return (
    <div className='w-full flex flex-col justify-between'>
      <div className='px-4 md:px-6 w-full flex flex-row justify-between items-center'>
        <button className='flex gap-2' onClick={() => handleIsSelected('Debit')}>
          <div className={`hidden md:flex -ml-6`}>
            <MwebRadioButton
              id={`payment-option-debit-order`}
              disabled={false}
              isSelected={isSelected}
              handleOnChange={(isSelected) => { }}
              label={"Debit Order"}
              variant={'standard'}
              size={'large'}
            />
          </div>
          <div className={`flex md:hidden -ml-4`}>
            <MwebRadioButton
                id={`payment-option-debit-order`}
                disabled={false}
                isSelected={isSelected}
                handleOnChange={(isSelected) => { }}
                label={"Debit Order"}
                variant={'standard'}
                size={'small'}
            />
          </div>
        </button>

        <div className='hidden md:flex flex-row justify-end items-end gap-x-2'>
          {BankList.map((entry, i) => (
            <div key={i} className='h-[24px] w-[38px] flex flex-col justify-center items-center rounded border border-mwGrey-300'>
              {entry.icon}
            </div>
          ))}
          <div className='text-mwTextParaXSmall text-mwGrey-400 '>and more...</div>
        </div>

        <div className='md:hidden flex flex-row justify-end items-end gap-x-2'>
          {BankList.slice(0, 2).map((entry, i) => (
            <div key={i} className='h-[24px] w-[38px] flex flex-col justify-center items-center rounded border border-mwGrey-300'>
              {entry.icon}
            </div>
          ))}
          <div className='text-mwTextParaXSmall text-mwGrey-400 '>and more...</div>
        </div>
      </div>

      {isSelected && (
        <div className='px-4 pt-0 md:px-6 pb-4 md:pb-6 w-full flex flex-col justify-center items-center'>
          <div className='w-full text-left text-mwTextParaXSmall md:text-mwTextParaSmall mb-2 md:mb-4 text-mwGrey-600'>
            {generalCheckoutContent?.generalCheckoutPaymentOptionDebitOrderSummary}
          </div>

          <DebitCaptureCard canProceedCheckout={canProceedCheckout}  />
        </div>
      )}
    </div>
  );
}
