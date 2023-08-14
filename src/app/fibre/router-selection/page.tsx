import RouterSelectionAddOn from '@/components/add-ons/RouterSelection';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import { getFibreCheckoutContent } from '@/services/FibreCheckoutService';

export default async function RouterSelectionPage() {
	// Get fibre craft data
  const fibreCheckoutContent = await getFibreCheckoutContent();
  
	const headingTitle = fibreCheckoutContent[0]?.fibreCheckoutRouterSelectionPageHeading;
	return (
		<MwebSliceContainer sectionId='fibre-router-selection' bgColor='' padding=''>
			<RouterSelectionAddOn pageHeading={headingTitle} />
		</MwebSliceContainer>
	);
}
