async function getTestimonials2023(): Promise<any | undefined> {
    let testimonials2023 = [];

    const graphqlQueryString = JSON.stringify({
        query: `query Testimonials2023 {
            entries(
                section: "Testimonials2023"
                orderBy: "dateCreated DESC"
              ) {
                title
                slug
                ...on testimonials2023_default_Entry {
                    testimonials2023 {
                        ...on testimonials2023_testimonial_BlockType {
                          __typename
                            useIcon
                            icon
                            testimonialText
                            firstName
                        }
                    }
                }
              }
          }`,
    });

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // Get revalidate time from ENV, with fallback to 5 mins if not found
    const revalidateTime = parseInt(process.env.NEXT_PUBLIC_SERVER_REVALIDATE_VALUE ?? '300', 10);

    try {
        // Make an API request to the serve
        const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
            method: 'POST',
            headers: myHeaders,
            body: graphqlQueryString,
            redirect: 'follow',
            next: { revalidate: revalidateTime },
        });
        const result = await response.json();

        // check if we get valid resposne data
        if (result?.data?.entries?.length > 0) {
            testimonials2023 = (result?.data?.entries.map((item:any)=> item.testimonials2023)).flat();
      }
    } catch (error) {
        console.log(`\n---\n failed to get homeInternetLandingPageContent from craft due to: \n ${JSON.stringify(error)}`);
    }

    return testimonials2023;
}

export default getTestimonials2023;
