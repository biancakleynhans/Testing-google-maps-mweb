import React from 'react';
import ConfirmLocation from '@/components/coverage/ConfirmLocation';
import {getFibreCheckoutContent} from '@/services/FibreCheckoutService';

export default async function ConfirmLocationPage() {
	const fibreContent = await getFibreCheckoutContent();
	const confirmLocationHeading = fibreContent[0].fibreCheckoutAddressConfirmationPageHeading;
	const fibreAdressConfirmText = fibreContent[0].fibreCheckoutAddressConfirmationSelectAddressText;

	return <ConfirmLocation headerText={confirmLocationHeading} subHeaderText={fibreAdressConfirmText} />;
}
