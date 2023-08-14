'use client';
// Import the Image component from the next/image library
import Image from 'next/image';

// Import the interface for the mobile app slice model
import { IMobileAppSlice } from '@/models/mobileAppSlice';

// Define a functional component to display a mobile app slice
export default function MobileAppSlice({ mobileAppSlice }: { mobileAppSlice: IMobileAppSlice }) {
  // Render the mobile app slice UI
  return (
    // Wrap the UI in a div element with specific styles for different screen sizes
    <div className='py-8 md:py-8 desktop:py-10'>
      {/** The main section for the mobile app slice */}
      <section className='flex flex-col gap-y-6 md:gap-x-4 md:flex-row md:justify-between items-center'>
        {/** The container for the app store icons */}
        <ul
          // Apply styles to the container
          className='flex items-center gap-2'
          // Add a data-testid attribute for testing purposes
          test-dataid='appStoreImagesContainer'
        >
          {
            // Map over the array of mobile app info and display each app store icon
            mobileAppSlice.mobileAppInfo?.map((appInfo, idx) => (
              <li key={appInfo.image.url}>
                {/** Display the app store icon using the Image component  */}
                <Image
                  alt='appstore_icon' // Provide alt text for the icon
                  src={appInfo.image?.url} // Set the source URL for the icon
                  className='cursor-pointer' // Apply styles to the icon
                  data-testid={`appStoreIcon-${idx}`} // Add a data-testid attribute for testing purposes
                  // Specify the width and height of the icon
                  width={120}
                  height={41}
                  // Open the target URL when the icon is clicked
                  onClick={() => {
                    window.open(appInfo.targetUrl);
                  }}
                />
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}
