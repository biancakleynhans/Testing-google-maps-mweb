import React from 'react';
import { iCardFullProps, iVasCardDetails } from './CardStyles';
import MwebIndicator from '../mwebIndicators/MwebIndicator';
import MwebButton from '../mwebButtons/MwebButtonMain';

interface iProps extends iCardFullProps {
  cardDetails: iVasCardDetails;
}

export default function CardVas(props: iProps) {
  const { cardDetails, isPromo, isSelected, onClickCallback, showButton, size } = props;

  const sizeContainer =
    size === 'large' || size === 'medium' ? `${showButton ? 'h-[328px]' : 'h-[249px]'} max-w-[318px]` : `${showButton ? 'h-[284px]' : 'h-[220px]'} max-w-[328px]`;
  const indicatorSize = size === 'large' || size === 'medium' ? 'md' : 'sm';
  const indicatorSizePill = size === 'large' || size === 'medium' ? 'sm' : 'xs';

  const priceText = size === 'large' || size === 'medium' ? 'text-mwTextParaLargeSemi' : 'text-mwTextParaBaseSemi';
  const nameText = size === 'large' || size === 'medium' ? 'text-mwTextDeskH4Bold' : 'text-mwTextMobileH4Bold';

  return (
    <div className={`w-full px-6 pb-6 bg-mwBlueGrey-25 rounded-2xl flex flex-col justify-start items-start border-b-8 border-transparent ${isSelected ? `ring-2 ring-mwPrimary-900 ring-offset ` : `border-transparent hover:border-mwBlueGrey-100`} ${showButton ? '' : 'cursor-pointer'}`}>
    <div
         className={`${sizeContainer} flex flex-col justify-between `}
         onClick={() => {
           if (!showButton) {
             onClickCallback();
           }
         }}
       >
         {isPromo && (
           <div className={`pt-0 w-full flex flex-row justify-end items-end ${size === 'large' || size === 'medium' ? 'text-mwCaptionMedium' : 'text-mwCaptionSmall'}`}>
             <MwebIndicator label={cardDetails.promoTagline.slice(0, 14)} size={indicatorSize} type='tag' />
           </div>
         )}
          <div className='flex flex-col'>
         <div className={`w-full text-mwPrimary-900 mb-1 ${nameText} ${isPromo ? 'pt-0' : 'pt-6'}`}>{cardDetails.productName}</div>
         <div className={`py-0  w-full text-mwGrey-600 ${priceText}`}>+R{cardDetails.price}pm</div>
         </div>

         <div className='flex flex-col justify-between gap-y-8 h-[92px] '>

         <div className='w-full flex flex-col text-mwTextParaSmall text-mwGrey-600 min-h-[44px] line-clamp-3'>{cardDetails.details}</div>
         
         
         <div className='inset-x-0 absolete bottom-0 '>
           {cardDetails?.provider?.length > 2 ? (
             <div className={`${showButton ? 'pt-6' : ''} w-full flex flex-row justify-start items-start`}>
               <MwebIndicator label={`POWERED BY ${cardDetails.provider}`.toUpperCase()} size={indicatorSizePill} type='pill' />
             </div>
           ) : (
             <div className={`${showButton ? 'pt-6' : ''} w-full flex flex-row justify-start items-start`} />
           )}
 
           {showButton && (
             <div className={`pt-6 w-full flex flex-row justify-center items-center`}>
               <MwebButton isFullWidth={true} btnText='Button Text' color='primary' hasIcon={false} isDisabled={false} size={size} onClickFunction={() => onClickCallback()} />
             </div>
           )}
         </div>

         </div>
 
       </div>
 
    </div>
  );
}
