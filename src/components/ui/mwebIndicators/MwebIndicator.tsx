'use client';
import { useState } from 'react';

export interface IndicatorProps {
  type: 'pill' | 'tag';
  size: 'xs' | 'sm' | 'md' | 'lg';
  label: string;
}

const MwebIndicator = ({ label, size, type }: IndicatorProps) => {
  // Map size prop to css style : For instance  'sm': 'text-base font-bold'
  const [textStyles] = useState<string>(() => {
    // check the size prop and return correct styling
    switch (size) {
      case 'xs':
        return 'text-mwCaptionXSmall py-1 px-2'; // style for small
      case 'sm':
        return 'text-mwCaptionSmall py-[6px] px-[10px]'; //
      case 'md':
        return 'text-mwCaptionMedium py-2 px-4';
      case 'lg':
        return 'text-mwCaptionLarge py-2 px-4';
      default:
        return 'text-mwCaptionMedium py-2 px-4';
    }
  });

  //condition to render the indicators either pill or tag if it is set to pill returns pillle else returns tag
  if (type === 'pill') {
    return (
      <div className={`bg-mwPrimary-50 rounded-full inline-block whitespace-no-wrap`}>
        <div className={`${textStyles}  text-mwGrey-600`}>{label}</div>
      </div>
    );
  }

  //
  return (
    <div className={`bg-mwLightTeal-900 rounded-bl-lg rounded-br-lg inline-block whitespace-no-wrap`}>
      <h2 className={`${textStyles}  text-white`}>{label}</h2>
    </div>
  );
};

export default MwebIndicator;
