import VasSelectionAddOn from '@/components/add-ons/VasSelection';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import { getFibreCheckoutContent } from '@/services/FibreCheckoutService';
import React from 'react';

export default async function AddOnsPage() {
	// Get fibre craft data
  const fibreCheckoutContent = await getFibreCheckoutContent();
  
	const headingTitle = fibreCheckoutContent[0]?.fibreCheckoutAddOnsPageHeading;
  return (
    <MwebSliceContainer sectionId='' bgColor='' padding=''>
      <VasSelectionAddOn addOnHeading={headingTitle} />
    </MwebSliceContainer>
  );
}
