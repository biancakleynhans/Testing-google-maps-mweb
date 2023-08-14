import { IUseCaseAccordion } from "@/components/ProductFeature/ProductFeature";
import { ITemplateBanner } from "@/models/TemplateBasedBanner";

export interface IHomePageContent {
    title:                    string;
    slug:                     string;
    templateBasedBanner:      ITemplateBanner[];
    helpMeDecide:             any[];
    useCaseAccordion:         IUseCaseAccordion[];
    productComparisonHeading: string;
    productComparisonCard:    any[];
    genericHeading:           string;
    templateBasedBannerTwo:   ITemplateBanner[];
    vasSectionHeader:         any[];
}

async function getHomeInternetLandingPageContent(): Promise<IHomePageContent> {
    let homeInternetLandingPageContent:IHomePageContent={
        title: "",
        slug: "",
        templateBasedBanner: [],
        helpMeDecide: [],
        useCaseAccordion: [],
        productComparisonHeading: "",
        productComparisonCard: [],
        genericHeading: "",
        templateBasedBannerTwo: [],
        vasSectionHeader: []
    };

    const graphqlQueryString = JSON.stringify({
        query: `query HomeInternetLandingPage2023 {
                                    entries(
                                        section: "connectivityLandingPages"
                                        slug: "home-internet-landing-page"
                                        limit: 1
                                        orderBy: "dateCreated DESC"
                                      ) {
                                        title
                                        slug
                                        ...on connectivityLandingPages_homeInternetLandingPage_Entry {
                                            templateBasedBanner {
                                                ...on templateBasedBanner_banner_BlockType {
                                                    __typename
                                                    templateType
                                                    useBackgroundImage
                                                    backgroundImageDesktop {
                                                        path
                                                        width
                                                        height
                                                    }
                                                    backgroundImageMobile {
                                                        path
                                                        width
                                                        height
                                                    }
                                                    bannerImage {
                                                        path
                                                        width
                                                        height
                                                    }
                                                    bannerHeading
                                                    bannerDescription
                                                    bannerTermsText
                                                    bannerCtaText
                                                    bannerCtaUrl
                                                }
                                            }
                                            helpMeDecide {
                                                ... on helpMeDecide_heading_BlockType {
                                                  __typename
                                                  heading
                                                  description
                                                }
                                                ... on helpMeDecide_internetUseOptions_BlockType {
                                                  __typename
                                                  option {
                                                    optionName
                                                    filterKey
                                                    mwebIcon
                                                  }
                                                }
                                                ... on helpMeDecide_callToAction_BlockType {
                                                  __typename
                                                  callToActionText
                                                  callToActionUrl
                                                }
                                              }
                                              useCaseAccordion {
                                                  ... on useCaseAccordion_useCase_BlockType {
                                                      __typename
                                                      useCaseImage {
                                                          path
                                                          width
                                                          height
                                                      }
                                                      useCaseImagePosition
                                                      useCaseMainHeading
                                                      useCaseMainDescription
                                                      useCaseItemList {
                                                          itemHeading
                                                          itemDescription
                                                      }
                                                  }
                                              }
                                              productComparisonHeading
                                              productComparisonCard {
                                                  ...on productComparisonCard_productCard_BlockType {
                                                      __typename
                                                      fromText
                                                      priceText
                                                      productIcon
                                                      productComparisonItems {
                                                          comparisonItem
                                                      }
                                                      productCtaText
                                                      productCtaUrl
                                                  }
                                              }
                                              genericHeading
                                              templateBasedBannerTwo {
                                                ...on templateBasedBannerTwo_banner_BlockType {
                                                    __typename
                                                    templateType
                                                    useBackgroundImage
                                                    backgroundImageDesktop {
                                                        path
                                                        width
                                                        height
                                                    }
                                                    backgroundImageMobile {
                                                        path
                                                        width
                                                        height
                                                    }
                                                    bannerImage {
                                                        path
                                                        width
                                                        height
                                                    }
                                                    bannerHeading
                                                    bannerDescription
                                                    bannerTermsText
                                                    bannerCtaText
                                                    bannerCtaUrl
                                                }
                                            }
                                              vasSectionHeader {
                                                  ... on vasSectionHeader_sectionHeader_BlockType {
                                                      __typename
                                                      sectionHeading
                                                      sectionDescription
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
            homeInternetLandingPageContent = result?.data?.entries[0];
        }
    } catch (error) {
        console.log(`\n---\n failed to get homeInternetLandingPageContent from craft due to: \n ${JSON.stringify(error)}`);
    }

    return homeInternetLandingPageContent;
}

export default getHomeInternetLandingPageContent;
