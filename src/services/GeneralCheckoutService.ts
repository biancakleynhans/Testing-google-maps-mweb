
export interface IGeneralCheckout {
    GeneralCheckoutProductSelectionPageHeading: string;
    GeneralCheckoutAddressConfirmationPageHeading:string;
    GeneralCheckoutAddOnsPageHeading:string;
    generalCheckoutOrderSummaryPageHeading:string;
    generalCheckoutOrderSummaryContinueShoppingText:string;
    generalCheckoutOrderSummaryCtaText:string;
    generalCheckoutOrderSummaryVoucherCodeLabel:string;
    generalCheckoutYourDetailsPageHeading:string;
    generalCheckoutYourDetailsRegisterHeading:string; 
    generalCheckoutYourDetailsRegisterSummary:string;
    generalCheckoutYourDetailsCommunicationHeading:string;
    generalCheckoutYourDetailsCommunicationSummary:string;
    generalCheckoutYourDetailsCtaText:string;
    generalCheckoutAddressDeliveryPageHeading:string;
    generalCheckoutAddressProductAddressSummary:string;
    generalCheckoutAddressProductAddressHeading:string;
    generalCheckoutAddressDeliveryAddressHeading:string;
    generalCheckoutAddressDeliveryAddressSummary:string;
    generalCheckoutAddressDeliveryCtaText:string;
    generalCheckoutPaymentPageHeading:string;
    generalCheckoutPaymentOptionMainHeading:string;
    generalCheckoutPaymentOptionMainSummary:string;
    generalCheckoutPaymentTermsHeading:string;
    generalCheckoutPaymentCtaText:string;
    generalCheckoutPaymentOptionDebitOrderSummary:string;
    generalCheckoutOrderConfirmationPageHeading:string;
    generalCheckoutOrderConfirmationThanksText:string;
    generalCheckoutOrderConfirmationTrackOrderCtaText:string;

    bannerHeading: string;
    bannerDescription: string;
    backgroundImage: IBannerImage[];
    mobileAppBanner: {
        bannerImage: { path: string; width: number; height: number }[];
        mobileAppStoreLogo:{ path: string; width: number; height: number }[];
        bannerText: string;
        mobileAppStoreUrl: string
    }[];
    bannerCtaText: string;
    bannerCtaUrl: string;
    mobileAppStoreUrl:string;
}


export interface IBannerImage {
  path: string;
  width: number;
  height: number;
  sizes: string;
  mobileAppStoreUrl: string;
}

async function getGeneralCheckoutContent(): Promise<IGeneralCheckout[]> {
  let mainGeneralCheckoutData: IGeneralCheckout[] = [];


try{ 
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var graphql = JSON.stringify({
      query: `query GeneralCheckoutJourney {
        entries (
          section: "checkoutJourneys"
          slug: "general-checkout-journey"
        ) {
          title
          slug
          ...on checkoutJourneys_generalCheckout_Entry {
            generalCheckoutOrderSummaryPageHeading
            generalCheckoutOrderSummaryContinueShoppingText
            generalCheckoutOrderSummaryVoucherCodeLabel
            generalCheckoutOrderSummaryCtaText
            generalCheckoutYourDetailsPageHeading
            generalCheckoutYourDetailsRegisterSummary
            generalCheckoutYourDetailsRegisterHeading
            generalCheckoutYourDetailsIdTooltip
            generalCheckoutYourDetailsCommunicationHeading
            generalCheckoutYourDetailsCommunicationSummary
            generalCheckoutYourDetailsCtaText
            generalCheckoutAddressDeliveryPageHeading
            generalCheckoutAddressProductAddressHeading
            generalCheckoutAddressProductAddressSummary
            generalCheckoutAddressDeliveryAddressHeading
            generalCheckoutAddressDeliveryAddressSummary
            generalCheckoutAddressDeliveryCtaText
            generalCheckoutPaymentPageHeading
            generalCheckoutPaymentOptionMainHeading
            generalCheckoutPaymentOptionMainSummary
            generalCheckoutPaymentOptionDebitOrderSummary
            generalCheckoutPaymentTermsHeading
            generalCheckoutPaymentCtaText
            generalCheckoutOrderConfirmationPageHeading
            generalCheckoutOrderConfirmationThanksText
            generalCheckoutOrderConfirmationTrackOrderCtaText
            generalCheckoutOrderConfirmationTrackOrderCtaUrl
            mobileAppBanner {
              ...on mobileAppBanner_banner_BlockType {
                __typename
                bannerText
                backgroundLaptop {
                  path
                  width
                  height
                }
                backgroundMobile {
                  path
                  width
                  height
                }
              }
              ...on mobileAppBanner_mobileAppStores_BlockType {
                __typename
                mobileAppStoreName
                mobileAppStoreLogo {
                  path
                  width
                  height
                }
                mobileAppStoreUrl
              }
            }
            
          }
          
        }
      }`,
      variables: {},
    });

    const revalidateTime = parseInt(process.env.NEXT_PUBLIC_SERVER_REVALIDATE_VALUE ?? '300', 10);
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
      next: { revalidate: revalidateTime },
    });

    const results = await response.json();

    const GeneralCheckoutContent: IGeneralCheckout[] = results.data.entries ?? [];

    mainGeneralCheckoutData = GeneralCheckoutContent;

    console.log(mainGeneralCheckoutData)

    } catch (error) {
    console.log(`\n---\nFibreCheckout service failed due to: \n ${error} \n`);
    }
  return mainGeneralCheckoutData;
}


export { getGeneralCheckoutContent };
