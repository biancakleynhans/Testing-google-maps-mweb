import RouterSelectionAddOn from '@/components/add-ons/RouterSelection';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import { getLTECheckoutContent } from '@/services/LteCheckoutService';
import React from 'react';

export default async function RouterSelectionPage() {
	// Get fibre craft data
  const lteCheckoutContent = await getLTECheckoutContent();
  
	const headingTitle = lteCheckoutContent[0]?.lteCheckoutRouterSelectionPageHeading;
	return (
		<MwebSliceContainer sectionId='lte-router-selection' bgColor='' padding=''>
			<RouterSelectionAddOn pageHeading={headingTitle} />
		</MwebSliceContainer>
	);
}
