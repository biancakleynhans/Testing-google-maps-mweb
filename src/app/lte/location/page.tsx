import AddLocation from '@/components/coverage/AddLocation';
import {getLTECheckoutContent} from '@/services/LteCheckoutService';
import React from 'react';

export default async function LocationPage() {
	const lteContent = await getLTECheckoutContent();
	const confirmLocationHeading = lteContent[0].lteCheckoutLocationPageHeading;

	return <AddLocation providerType='lte' headerText={confirmLocationHeading} />;
}
