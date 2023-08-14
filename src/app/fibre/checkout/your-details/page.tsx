'use client';
import React from 'react';
import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import YourDetailsLanding from '@/components/your-details/YourDetailsLanding';

export default function YourDetailsPage() {
  return (
    <MwebSliceContainer bgColor='bg-mwBlueGrey-25'  sectionId='your-details_section'
    padding='w-full pb-6 md:px-0 md:pb-24'>
      <YourDetailsLanding />
    </MwebSliceContainer>
  );
}
