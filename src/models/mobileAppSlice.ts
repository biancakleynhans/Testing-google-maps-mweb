export interface IMobileAppSlice {
    __typename: string;
    description: string;
    mobileAppInfo: IMobileAppInfo[];
}

export interface IMobileAppInfo {
    __typename: string;
    targetUrl: string;
    image: IImage;
}

export interface IImage {
    __typename: string;
    url: string;
    path: string;
    width: number;
    height: number;
}
