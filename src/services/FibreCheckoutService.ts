
export interface IFibreCheckout {
  fibreCheckoutProductSelectionPageHeading: string;
  fibreCheckoutAddressConfirmationPageHeading: string;
  fibreCheckoutAddressConfirmationSelectAddressText: string;
  fibreCheckoutRouterSelectionPageHeading: string;
  fibreCheckoutAddOnsPageHeading: string;

  // Fibre Amber - Connectivity Options Page
  fibreCheckoutConnectivityOptionsPageHeading: string; //Page heading

  // I want LTE
  fibreCheckoutConnectivityOptionsLteOptionHead: string; //Card heading small
  fibreCheckoutConnectivityOptionsLteOptionText: string; // Card heading giant

  // I want pre-order fibre
  fibreCheckoutConnectivityOptionsPreorderHead: string; //Card heading small
  fibreCheckoutConnectivityOptionsPreorderText: string; // Card heading giant


  // I want pre-order LTE while i wait for Fibre
  fibreCheckoutConnectivityOptionsBothOptionHead: string; //Card heading small
  fibreCheckoutConnectivityOptionsBothOptionText: string; // Card heading giant

  // FAQ
  fibreCheckoutConnectivityOptionsFaqHeading: string;
  fibreCheckoutConnectivityOptionsFaqText: string;
}

async function getFibreCheckoutContent(): Promise<IFibreCheckout[]> {
  let mainFibreCheckoutData: IFibreCheckout[] = [];

  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var graphql = JSON.stringify({
      query: `query FibreCheckoutJourney {
        entries(
          section: "checkoutJourneys"
          slug: "fibre-checkout-journey"
        ) {
          title
          slug
          ...on checkoutJourneys_fibreCheckout_Entry {
            fibreCheckoutProductSelectionPageHeading
            fibreCheckoutAddressConfirmationPageHeading
            fibreCheckoutAddressConfirmationSelectAddressText
            fibreCheckoutRouterSelectionPageHeading
            fibreCheckoutAddOnsPageHeading


            fibreCheckoutConnectivityOptionsPageHeading


            fibreCheckoutConnectivityOptionsLteOptionHead
            fibreCheckoutConnectivityOptionsLteOptionText


            fibreCheckoutConnectivityOptionsPreorderHead
            fibreCheckoutConnectivityOptionsPreorderText


            fibreCheckoutConnectivityOptionsBothOptionHead
            fibreCheckoutConnectivityOptionsBothOptionText

            
            fibreCheckoutConnectivityOptionsFaqHeading
            fibreCheckoutConnectivityOptionsFaqText
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

    const FibreCheckoutContent: IFibreCheckout[] = results.data.entries ?? [];

    mainFibreCheckoutData = FibreCheckoutContent;

    // console.log(mainFibreCheckoutData)

  } catch (error) {
    console.log(`\n---\nFibreCheckout service failed due to: \n ${error} \n`);
  }

  return mainFibreCheckoutData;
}

export { getFibreCheckoutContent };
