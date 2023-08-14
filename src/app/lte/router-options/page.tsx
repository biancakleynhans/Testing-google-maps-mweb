import React from 'react';
import RouterOption from '@/components/add-ons/RouterOption';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import { getLTECheckoutContent } from '@/services/LteCheckoutService';


export default async function AddOnsPage() {
	// Get fibre craft data
  
  const lteCheckoutContent = await getLTECheckoutContent();
  const headerTitle = lteCheckoutContent[0]?.lteCheckoutRouterOptionsPageHeading;
  return (
    <MwebSliceContainer sectionId='lte-router-options' bgColor='' padding='py-8 px-4 desktop:px-[182px] desktop:py-16'>
      <RouterOption headingTitle={headerTitle} />
    </MwebSliceContainer>
  );
}
