'use client';
import React from 'react';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import PaymentLandingScreen from '@/components/payment/PaymentLandingScreen';

export default function AddressAndDelivery() {
  return (
    <MwebSliceContainer bgColor='bg-mwBlueGrey-25 ' sectionId='address-and-delivery_container'   padding='w-full pb-6 lg:px-0 lg:pb-24'>
      <PaymentLandingScreen />
    </MwebSliceContainer>
  );
}
