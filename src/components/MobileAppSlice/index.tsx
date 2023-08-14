"use client";
// Import the Image component from the next/image library
import Image from "next/image";

// Import the interface for the mobile app slice model
import { IMobileAppSlice } from "@/models/mobileAppSlice";
import MwebButtonAppStore from "../ui/mwebButtons/MwebButtonAppStore";

// Define a functional component to display a mobile app slice
export default function MobileAppSlice({
  mobileAppSlice,
}: {
  mobileAppSlice: IMobileAppSlice;
}) {
  // Render the mobile app slice UI
  return (
    // Wrap the UI in a div element with specific styles for different screen sizes
    // The main section for the mobile app slice
    <section className="flex flex-col gap-y-6 desktop:gap-x-4 desktop:flex-row desktop:justify-between items-center">
      {/** The description text */}
      <p
        data-testid="mobileAppSlice_description"
        className="grow text-mwTextMobileH6Semi md:text-mwTextDeskH6Semi text-center text-white desktop:text-left"
      >
        {mobileAppSlice?.description}
      </p>

      {/** The container for the app store icons */}
      <ul
        // Apply styles to the container
        className="flex items-center gap-4" // Change gap-2 to gap-4 to increase the gap to 16px
        // Add a data-testid attribute for testing purposes
        test-dataid="appStoreImagesContainer"
      >
        {
          // Map over the array of mobile app info and display each app store icon
          mobileAppSlice.mobileAppInfo?.map((appInfo, idx) => (
            <li key={appInfo.image.url} className="h-8 desktop:h-10">
              {/** Display the app store icon using the Image component  */}
              <Image
                alt="appstore_icon" // Provide alt text for the icon
                src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${appInfo.image?.path}`} // Set the source URL for the icon
                className="cursor-pointer" // Apply styles to the icon
                data-testid={`appStoreIcon-${idx}`} // Add a data-testid attribute for testing purposes
                width={120} // Set the width of the image
                height={40} // Set the height of the image
                layout="responsive"
                onClick={() => {
                  window.open(appInfo.targetUrl);
                }}
              />
            </li>
          ))
        }
      </ul>
    </section>
  );
}

// Map over the array of mobile app info and display each app store icon
// mobileAppSlice.mobileAppInfo?.map((appInfo, idx) => (
//     <li key={appInfo.image.url}>
//       {/** Display the app store icon using the Image component  */}
//       <Image
//         alt='appstore_icon' // Provide alt text for the icon
//         src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${appInfo.image?.url}`} // Set the source URL for the icon
//         className='cursor-pointer' // Apply styles to the icon
//         data-testid={`appStoreIcon-${idx}`} // Add a data-testid attribute for testing purposes
//         // Specify the width and height of the icon
//         width={120}
//         height={41}
//         // Open the target URL when the icon is clicked
//         onClick={() => {
//           window.open(appInfo.targetUrl);
//         }}
//       />
//     </li>
//   ))
