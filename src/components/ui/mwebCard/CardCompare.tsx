import React from 'react';
import { containerBasic, hover, iCardFullProps, iCompareCardDetails, padDisplay } from './CardStyles';
import MwebButton from '../mwebButtons/MwebButtonMain';
import MwebIcon from '../mwebIcon/MwebIcon';
import MwebIconIllustration from '../mwebIcon/MwebIconIllustration';

interface iProps extends iCardFullProps {
  cardDetails: iCompareCardDetails;
}

export default function CardCompare(props: iProps) {
  const { cardDetails, onClickCallback, size } = props;
  const { btnText, details, label, price, type } = cardDetails;

  const sizeContainer = size === 'large' || size === 'medium' ? 'w-full' : 'w-full';
  const containerFull = `${containerBasic} bg-white border-transparent`;

  const headerHeight = size === 'large' || size === 'medium' ? 'h-[144px]' : 'h-[104px]';

  const detailText = size === 'large' || size === 'medium' ? 'text-base' : 'text-sm';
  const labelTopText = size === 'large' || size === 'medium' ? 'text-mwmd' : 'text-mwsm';
  const labelBottomText = size === 'large' || size === 'medium' ? 'text-mw4xl' : 'text-mw2xl';

  // const illusSize = size === 'large' || size === 'medium' ? '3x-large' : '2x-large';
  const illustrationSize = size === 'large' || size === 'medium' ? 112 : 88;

  return (
    <div className={`${containerFull} ${sizeContainer}`}>
      <div
        className={`w-full ${headerHeight} rounded-t-2xl flex flex-row justify-evenly items-center bg-gradient-to-r from-mwTealGradientFromLeft to-mwTealGradientToRight`}
      >
        <div className='w-1/2 pl-6 pt-8 flex flex-col justify-start items-start gap-y-0 text-white'>
          <div className={`${labelTopText} py-0 my-0 font-semibold`}>{label}</div>
          <div className={`${labelBottomText} py-0 my-0 font-black`}>R{price}pm</div>
        </div>
        <div className='w-1/2 flex flex-row justify-end items-end pr-6'>
          <MwebIconIllustration illustrationName={type} size={illustrationSize} />
        </div>
      </div>

      <div className='pl-7 pt-8 flex flex-col gap-4'>
        {details.map((val, i) => (
          <div key={i} className='w-full flex flex-row justify-start items-center'>
            <MwebIcon color='text-mwLightTeal-900' iconType='circle-check' size={20} variant='basic' />
            <div className={`${detailText} text-mwGrey-600 ml-[10px]`}>{val}</div>
          </div>
        ))}
      </div>

      <div className={`py-6 ${padDisplay} justify-center items-center`}>
        <MwebButton isFullWidth={true} btnText={btnText} color='primary' hasIcon={false} isDisabled={false} size={size} onClickFunction={() => onClickCallback()} />
      </div>
    </div>
  );
}
