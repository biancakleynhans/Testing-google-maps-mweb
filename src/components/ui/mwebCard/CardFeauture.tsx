import React from 'react';
import { iCardProps, iFeatureCardDetails } from './CardStyles';
import Image from 'next/image';
import MwebButton from '../mwebButtons/MwebButtonMain';
import MwebIcon from '../mwebIcon/MwebIcon';

interface iProps extends iCardProps {
  cardDetails: iFeatureCardDetails;
}

export default function CardFeauture(props: iProps) {
  const { cardDetails, onClickCallback, size } = props;
  const { btnLabel, details, header, image } = cardDetails;

  const sizing = 'w-full h-[328px] lg:w-[590px] lg:h-[590px]';
  const bgColor = 'bg-gradient-to-r from-mwTealGradientFromLeft to-mwTealGradientToRight';
  const shape1 = 'rounded-t-2xl lg:rounded-e-none lg:rounded-s-2xl lg:rounded-l-2xl';
  const shape2 = 'rounded-b-2xl lg:rounded-s-none lg:rounded-e-2xl lg:rounded-r-2xl';

  return (
    <div className='flex flex-col lg:flex-row justify-normal items-center '>
      <div className={`${sizing} ${bgColor} ${shape1} relative`}>
        {image.length > 2 && <Image src={image} alt={`image broken`} fill />}
      </div>

      <div className={`${sizing} h-fit bg-white ${shape2} flex flex-col justify-start items-start px-4 lg:px-20 `}>
        <div className='pb-2 lg:pb-8 lg:text-mw2xl text-mwlg font-semibold pt-4 lg:pt-12'>{header}</div>

        {details.map((entry, i) => (
          <div key={i} className='w-full flex flex-row flex-wrap justify-start items-start py-1 lg:py-2'>
            <MwebIcon color='text-mwLightTeal-900' iconType='circle-check' variant='basic' size={20} />
            <div className='w-10/12 text-mwGrey-600 text-mwsm lg:text-mwmd ml-2'>{entry}</div>
          </div>
        ))}

        <div className='hidden lg:block lg:pt-7'>
          <MwebButton btnText={btnLabel} color='primary' hasIcon={false} isDisabled={false} size={'medium'} onClickFunction={() => onClickCallback()} />
        </div>
        <div className='inline-flex w-full lg:hidden pb-6 lg:0 pt-4 lg:pt-0'>
          <MwebButton
            isFullWidth={true}
            btnText={btnLabel}
            color='primary'
            hasIcon={false}
            isDisabled={false}
            size={'medium'}
            onClickFunction={() => onClickCallback()}
          />
        </div>
      </div>
    </div>
  );
}
