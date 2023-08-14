import {IProductFilter} from "@/models/ProductFilters";
import {
    ILandingPageProduct,
    ILandingPageProductContent,
    ILandingPageProductsFilter
} from "@/models/landingPageProducts";

// Convert the raw Landing Page Product Craft Data to an object that's easier to reference
function getLandingPageProductCraftData(landingPageProducts: ILandingPageProduct[]): ILandingPageProductContent {
    const productContent: ILandingPageProductContent = {
        header: { __typename: '', heading: '', description: ''},
        filters: [],
        cta: {__typename: '', callToActionText: '', callToActionUrl: ''}
    }

    if (landingPageProducts && landingPageProducts.length > 0) {
        for (const contentItem of landingPageProducts) {
            if (contentItem.__typename === 'landingPageProducts_heading_BlockType') {
                productContent.header = {
                    __typename: contentItem.__typename,
                    heading: contentItem.heading,
                    description: contentItem.description
                };
            }

            if (contentItem.__typename === 'landingPageProducts_productFilters_BlockType') {
                const productFilters: ILandingPageProductsFilter[] = [];
                if (contentItem.filter) {
                    for (const filter of contentItem.filter) {
                        const filterObject: ILandingPageProductsFilter = {
                            displayName: filter.displayName,
                            filterKey: filter.filterKey,
                            filterUrl: filter.filterUrl
                        }
                        productFilters.push(filterObject);
                    }
                }

                productContent.filters = productFilters;
            }

            if (contentItem.__typename === 'landingPageProducts_callToAction_BlockType') {
                productContent.cta = {
                    __typename: contentItem.__typename,
                    callToActionText: contentItem.callToActionText,
                    callToActionUrl: contentItem.callToActionText
                };
            }

        }
    }

    return productContent;
}

// Convert the raw product filter data from Craft to match the Interface created for the mocked data
function getProductFiltersFromCraftFilters(craftProductFilters: ILandingPageProductsFilter[]): IProductFilter[] {
    const productFilters: IProductFilter[] = []

    if (craftProductFilters && craftProductFilters.length > 0) {
        for (const productFilter of craftProductFilters) {
            const filter: IProductFilter = {
                code: productFilter.filterKey,
                displayName: productFilter.displayName,
                type: productFilter.filterKey
            }

            productFilters.push(filter);
        }
    }

    return productFilters;
}

export const ProductsService = {
    getLandingPageProductCraftData: getLandingPageProductCraftData,
    getProductFiltersFromCraftFilters: getProductFiltersFromCraftFilters
}
