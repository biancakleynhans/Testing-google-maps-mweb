import { INav, INavCategory, INavParent } from '@/models/nav';

//Retrieving the TopNav data from the mweb graphQL api
async function getTopNavContent(): Promise<INavCategory[]> {
  //a new empty array that will hold the TopNav Content
  let topNavData: INavCategory[] = [];

  //  initiate a query[http: POST] to our graphql CMS server
  try {
    // create headers
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    //creating a graphql query string for retrieving the top nav data
    var graphql = JSON.stringify({
      query: `query TopNav {
                            categories(group: "topNavigation") {
                                    ... on topNavigation_Category {
                                            id
                                            level
                                            title
                                            mainLink
                                            targetUrl
                                            analyticsId
                                            externalLink
                                            mobileOnly
                                            parent {
                                                    ... on topNavigation_Category {
                                                            id
                                                            title
                                                    }
                                            }
                                    }
                            }
                    }`,
      variables: {},
    });

    // Get revalidate time from ENV, with fallback to 5 mins if not found
    const revalidateTime = parseInt(process.env.NEXT_PUBLIC_SERVER_REVALIDATE_VALUE ?? '300', 10);
    // make and API request to the server
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
      next: { revalidate: revalidateTime },
    });
    const results = await response.json();

    // extracting topnav data from the API response
    const topNavCategories: INav[] = results.data.categories ?? [];

    // transforming data to match Components Props interfaces
    const topNavContent: INavCategory[] = topNavCategories
      .filter(
        (navItem) => navItem.level === 1 // level 1 category
      )
      .map((currentNavItem) => {
        //   extend Type to Component Props Interface
        const topNavSection: INavCategory = {
          ...currentNavItem,
          categories: [],
        };

        // updating categories
        for (var navItem of topNavCategories) {
          if (navItem.parent?.id === currentNavItem.id) {
            topNavSection.categories.push(navItem);
          }
        }

        return topNavSection;
      });

    // updating response value
    topNavData = topNavContent;
  } catch (error) {
    console.log(`\n---\nTopNavbar service failed due to: \n ${error} \n`);
  }

  //returning the main data to be rendered
  return topNavData;
}

export { getTopNavContent };
