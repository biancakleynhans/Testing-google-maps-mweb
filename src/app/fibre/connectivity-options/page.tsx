import ConnectivityAvailability, { IConnectivityOption } from '@/components/connectivity-availability';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import { getFibreCheckoutContent } from '@/services/FibreCheckoutService';
import { ConnectivityService } from '@/services/ConnectivityService';
import React from 'react';
export default async function ConnectivityOptionsPage() {
	// Get fibre craft data
	const fibreCheckoutContent = await getFibreCheckoutContent();
	const pageContent =  ConnectivityService.getFibreConnectivityContentData(fibreCheckoutContent[0])
	
	return (
		<MwebSliceContainer sectionId='lte-router-selection' bgColor='' padding='lg:px-[182px] lg:py-16 px-4 py-8'>
			<ConnectivityAvailability pageContent={pageContent} />
		</MwebSliceContainer>
	);
}
