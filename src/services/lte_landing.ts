import type { ISEO } from '@/models/SEO';
import type { IFaq } from '@/models/faq';
import type { ICta } from '@/models/Cta';
import type { IVasSwitchBlock, IVasSwitchBlockHeading } from '@/models/Switch';
import {ILandingPageProduct} from "@/models/landingPageProducts";
import {IHelpMeDecide} from "@/models/helpMeDecideBlock";

// interface for Lte page cms content: TODO: move to models
export interface ILteContent {
    landingPageProducts: ILandingPageProduct[]
    helpMeDecide: IHelpMeDecide[]
    vasSectionHeader: ISEO[];
    useCaseAccordion: any[];
    simpleBanner: any[];
    vasFaqs: IFaq[];
    vasCallToActionSection: ICta[];
    vasFeatureDescription: IVasSwitchBlock[] | IVasSwitchBlockHeading[];
    // TODO: add more types as ypu add slices: To avoid build errors
}
async function getLteLandingPageContent(): Promise<ILteContent[]> {
    let lteLandingPageContent: ILteContent[] = [];

    // create headers
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    //
    let graphql = JSON.stringify({
        query: `query LteLandingPage2023 {
            entries(
                section: "connectivityLandingPages"
                slug: "lte-2023-landing-page"
                limit: 1
                orderBy: "dateCreated DESC"
            ) {
                title
                slug
                ... on connectivityLandingPages_lte2023_Entry {
                    __typename
                    seoPageTitle
                    seoPageDescription
                    simpleBanner {
                        ... on simpleBanner_banner_BlockType {
                            __typename
                            bannerHeading
                            bannerDescription
                            backgroundImage {
                                path
                                width
                                height
                            }
                            bannerCtaText
                            bannerCtaUrl
                        }
                    }
                      landingPageProducts {
                      ... on landingPageProducts_heading_BlockType {
                        __typename
                        heading
                        description
                      }
                      ... on landingPageProducts_productFilters_BlockType {
                        __typename
                        filter {
                          displayName
                          filterKey
                          filterUrl
                        }
                      }
                      ... on landingPageProducts_callToAction_BlockType {
                        __typename
                        callToActionText
                        callToActionUrl
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
                    vasCallToActionSection {
                        ... on vasCallToActionSection_callToActionSection_BlockType {
                            __typename
                            callToActionHeading
                            callToActionButtonText
                            callToActionUrl
                            useBackground
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
                    }
                    vasFaqs {
                        ... on vasFaqs_faqsSectionHeading_BlockType {
                            __typename
                            faqsSectionHeading
                            faqsSectionDescription
                            faqsSectionLinkText
                            faqsSectionLinkUrl
                        }
                        ... on vasFaqs_faqsItem_BlockType {
                            __typename
                            faqItemHeading
                            faqItemDetails
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
        } `,
        variables: {},
    });

    // Get revalidate time from ENV, with fallback to 5 mins if not found
    const revalidateTime = parseInt(
        process.env.NEXT_PUBLIC_SERVER_REVALIDATE_VALUE ?? '300',
        10
    );

    try {
        // make an API request to the server
        const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow',
            next: { revalidate: revalidateTime },
        });
        const result = await response.json();

        // check if we get valid response data
        if (result?.data?.entries?.length > 0) {
            lteLandingPageContent = result?.data?.entries;
        }
    } catch (error) {
        console.log(
            `\n---\n failed to get LtePage content from craft due to: \n ${error} \n`
        );
    }

    return lteLandingPageContent;
}
export { getLteLandingPageContent };
