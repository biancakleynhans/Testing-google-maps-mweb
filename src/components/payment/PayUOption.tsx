import React from 'react';
import IMAGE from '../../../public/banks/payUimg.png';
import Image from 'next/image';
import MwebRadioButton from '../ui/mwebRadioButton/MwebRadioButton';
import MwebBankIcon from '../ui/mwebIcon/MwebBankIcons';

const TypeList = [
  { name: 'visa', icon: <MwebBankIcon iconType='visa' alt='visa' height={8} width={26} /> },
  {
    name: 'mastercard',
    icon: <MwebBankIcon iconType='mastercard' alt='mastercard' height={14} width={24} />,
  },
];

interface iProps {
  isSelected: boolean;
  handleIsSelected: (choiceName: string) => void;
}

export default function PayUOption(props: iProps) {
  const { isSelected, handleIsSelected } = props;

  return (
    <div className='w-full flex flex-col justify-between border-t border-b border-[#bfbfbf]/50'>
      <div className=' px-4 md:px-6 w-full flex flex-row justify-between items-center'>
        <button className='w-1/3 flex flex-row justify-start items-center' onClick={() => handleIsSelected('Credit / Debit Card')}>
          <div className={`hidden md:flex -ml-6`}>
            <MwebRadioButton
                id={`payment-option-payu`}
                disabled={false}
                isSelected={isSelected}
                handleOnChange={(isSelected) => { }}
                label={"Credit / Debit Card"}
                variant={'standard'}
                size={'large'}
              />
          </div>
          <div className={`flex -ml-4 md:hidden`}>
            <MwebRadioButton
                id={`payment-option-payu`}
                disabled={false}
                isSelected={isSelected}
                handleOnChange={(isSelected) => { }}
                label={"Credit / Debit Card"}
                variant={'standard'}
                size={'small'}
            />
          </div>
        </button>


        <div className='w-full flex flex-row justify-end items-center gap-x-2'>
          {TypeList.map((entry, i) => (
            <div key={i} className='h-[24px] w-[38px] flex flex-col justify-center items-center rounded border border-mwGrey-300'>
              {entry.icon}
            </div>
          ))}
          <div className='text-mwTextParaXSmall text-mwGrey-400'>and more...</div>
        </div>
      </div>

      {isSelected && (
        <div className='w-full p-6 flex flex-col justify-center items-center'>
          <Image src={IMAGE} alt='image' width={146} height={83} />
          <div className='w-full text-center text-mwTextParaXSmall md:text-mwTextParaSmall mt-4'>After clicking “Confirm order”, you will be redirected to PayU to complete your purchase securely.</div>
        </div>
      )}
    </div>
  );
}
