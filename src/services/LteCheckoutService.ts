
export interface ILTECheckout {
  lteCheckoutProductSelectionPageHeading: string;
  lteCheckoutLocationPageHeading:string;
  lteCheckoutRouterOptionsPageHeading:string;
  lteCheckoutRouterOptionsFAQHeading:string;
  lteCheckoutRouterOptionsFaqText:string;
  lteCheckoutRouterSelectionPageHeading:string;
  lteCheckoutAddOnsPageHeading:string;
}

async function getLTECheckoutContent(): Promise<ILTECheckout[]> {
  let mainLTECheckoutData: ILTECheckout[] = [];

  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var graphql = JSON.stringify({
      query: `query LteCheckoutJourney {
        entries(
            section: "checkoutJourneys"
            slug: "lte-checkout-journey"
          ) {
            title
            slug
          ...on checkoutJourneys_lteCheckout_Entry {
            lteCheckoutProductSelectionPageHeading
            lteCheckoutLocationPageHeading
            lteCheckoutRouterOptionsPageHeading
            lteCheckoutRouterOptionsFixedOptionText
            lteCheckoutRouterOptionsPortableOptionText
            lteCheckoutRouterOptionsBothOptionText
            lteCheckoutRouterOptionsFAQHeading
            lteCheckoutRouterOptionsFaqText
            lteCheckoutRouterSelectionPageHeading
            lteCheckoutAddOnsPageHeading
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

    const LTECheckoutContent: ILTECheckout[] = results.data.entries ?? [];

    mainLTECheckoutData = LTECheckoutContent;

    // console.log(mainLTECheckoutData)
    
  } catch (error) {
    console.log(`\n---\nFibreCheckout service failed due to: \n ${error} \n`);
  }

  return mainLTECheckoutData;
}

export { getLTECheckoutContent };
