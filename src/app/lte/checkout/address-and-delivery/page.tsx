import AddressAndDeliveryLanding from '@/components/address-and-delivery/AddressAndDeliveryLanding';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import React from 'react';

export default function AddressAndDeliviveryPage() {
	return (
		<MwebSliceContainer sectionId='address_and_delivery_section'
        padding='w-full pb-6 lg:px-0 lg:pb-24' bgColor='bg-mwBlueGrey-25'>
			<AddressAndDeliveryLanding/>
		</MwebSliceContainer>
	);
}
