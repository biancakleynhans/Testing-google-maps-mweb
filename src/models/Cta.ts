export interface ICta {
    __typename: string;
    action: 'scroll' | 'redirect';
    callToActionHeading: string;
    callToActionButtonText: string;
    callToActionUrl: string;
    useBackground: boolean;
    backgroundLaptop: IBackgroundImage[];
    backgroundMobile: IBackgroundImage[];
}

export interface IBackgroundImage {
    path: string;
    width: number;
    height: number;
}
