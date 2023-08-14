export interface ILandingPageProduct {
    __typename: string
    heading?: string
    description?: string
    filter?: ProductFilter[]
    callToActionText?: string
    callToActionUrl: any
}

export interface ILandingPageProductContent {
    header : ILandingPageProductsHeader
    filters: ILandingPageProductsFilter[]
    cta: ILandingPageProductsCta
}

export interface ILandingPageProductsHeader {
    __typename: string
    heading?: string
    description?: string
}

export interface ILandingPageProductsFilter {
    displayName: string
    filterKey: string
    filterUrl: string
}

export interface ILandingPageProductsCta {
    __typename: string
    callToActionText?: string
    callToActionUrl?: any
}


export interface ProductFilter {
    displayName: string
    filterKey: string
    filterUrl: string
}
