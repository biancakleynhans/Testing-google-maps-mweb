export interface IVasSwitchBlockHeading {
    __typename: string;
    heading: string;
}

export interface IVasSwitchBlock {
    __typename: string;
    featureIcon: null;
    featureName: string;
    featureDescription: string;
    useImage: boolean;
    featureImage: Image[];
}

export interface Image {
    path: string;
    width: number;
    height: number;
}
