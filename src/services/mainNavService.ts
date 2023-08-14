import { INav, INavCategory, INavParent } from '@/models/nav';

//Retrieving the main navigation data from the mweb GraphQL CMS server and returning it as an array of INavCategory objects.
async function getMainNavContent(): Promise<INavCategory[]> {
  // an empty array to hold the returned data
  let mainNavData: INavCategory[] = [];

  try {
    // creating header constant that specifies the type of content that is being added to the request content
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    //creating a Graphql query string for retrieving the navigation data
    var graphql = JSON.stringify({
      query: `query MainNav {
                            categories(group: "mainNavigation") {
                                    ... on mainNavigation_Category {
                                            id
                                            level
                                            title
                                            mainLink
                                            targetUrl
                                            analyticsId
                                            externalLink
                                            mobileOnly
                                            parent {
                                                    ... on mainNavigation_Category {
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
    // making an API request to the GraphQL server
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
      next: { revalidate: revalidateTime },
    });

    const results = await response.json();

    // extracting nav data
    const mainNavCategories: INav[] = results.data.categories ?? [];

    // transforming data to match Component Props interfaces
    const mainNavContent: INavCategory[] = mainNavCategories
      .filter(
        (navItem) => navItem.level === 1 // level 1 category
      )
      .map((currentNavItem) => {
        //   extend Type to Component Props Interface
        const mainNavSection: INavCategory = {
          ...currentNavItem,
          categories: [],
        };

        // update categories
        for (var navItem of mainNavCategories) {
          if (navItem.parent?.id === currentNavItem.id) {
            mainNavSection.categories.push(navItem);
          }
        }

        return mainNavSection;
      });

    // update response value
    mainNavData = mainNavContent;
  } catch (error) {
    console.log(`\n---\nmainNavbar service failed due to: \n ${error} \n`);
  }

  //returning the main data to be exported
  return mainNavData;
}

export { getMainNavContent };
