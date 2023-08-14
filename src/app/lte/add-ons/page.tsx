import VasSelectionAddOn from '@/components/add-ons/VasSelection';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import { getLTECheckoutContent } from '@/services/LteCheckoutService';
import React from 'react';

export default async function AddOnsPage() {
	// Get fibre craft data
  const lteCheckoutContent = await getLTECheckoutContent();
  
	const headingTitle = lteCheckoutContent[0]?.lteCheckoutAddOnsPageHeading;
  return (
    <MwebSliceContainer sectionId='' bgColor='' padding=''>
      <VasSelectionAddOn addOnHeading={headingTitle} />
    </MwebSliceContainer>
  );
}
