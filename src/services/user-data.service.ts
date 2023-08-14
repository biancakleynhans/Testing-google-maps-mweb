
export class UserData {

    id: string;
    customerType: string;
    type: UserDataCustomerType;
    name: string;
    addressSearchMade: boolean;
    addressSearch: UserDataSearchAddress;
    options: UserDataOptions;
    dateCreated: any;
    dateModified: any;

    constructor(customerType: UserDataCustomerType, name: string) {

        this.id                = '';
        this.customerType      = '';
        this.type              = customerType;
        this.name              = name;
        this.addressSearchMade = false;
        this.addressSearch     = new UserDataSearchAddress();
        this.options           = new UserDataOptions();
        this.dateCreated       = new Date();
        this.dateModified      = new Date();
    }
}
export class UserDataSearchAddress {

    id: string
    complex: string;
    streetNumber: string;
    street: string;
    suburb: string;
    town: string;
    province: string;
    postalCode: string;

    latitude: string;
    longitude: string;
    locationType: string;
    locationTypes: Array<string>;
    formattedAddress: string;
    placeId: string;

    servicesAvailable: ICoverageDataService[];

    fibreAvailability: UserDataSearchAddressAvailability;
    lteAvailability: UserDataSearchAddressAvailability;
    pureDslAvailability?: UserDataSearchAddressAvailability;

    dateModified: any;

    constructor() {

        this.servicesAvailable = [];

        this.id = ''
        this.complex = '';
        this.streetNumber = '';
        this.street = ''
        this.suburb = '';
        this.town = '';
        this.province = '';
        this.postalCode = '';

        this.latitude = '';
        this.longitude = '';
        this.locationType = '';
        this.locationTypes  = [];
        this.formattedAddress =  '';
        this.placeId = ''
        this.fibreAvailability = UserDataSearchAddressAvailability.NotAvailable;
        this.lteAvailability   = UserDataSearchAddressAvailability.NotAvailable;
        this.pureDslAvailability = UserDataSearchAddressAvailability.NotAvailable;

        this.dateModified = new Date();
    }
}
export enum UserDataCustomerType {
    NEW               = 'NEW CUSTOMER',
    NEW_LEAD          = 'NEW CUSTOMER LEAD',
    EXISTING_CUSTOMER = 'EXISTING CUSTOMER'
}
export enum UserDataSearchAddressAvailability {
    NotAvailable = 'NOT AVAILABLE',
    ComingSoon   = 'COMING SOON',
    Available    = 'AVAILABLE'
}

export class UserDataOptions {

    darkMode: boolean;
    categoryListView: boolean;

    constructor() {

        this.darkMode = false;
        this.categoryListView = false;
    }
}

export interface ICoverageDataService {
    type:      string;
    providers: ICoverageDataProvider[];
}

export interface ICoverageDataProvider {
    location_result: [];
    provider: string;
    status:   string;
}

function setUserData(userData: UserData) {
    window?.localStorage?.setItem('UserData', JSON.stringify(userData));
}

function getUserData(): UserData {
   return  JSON.parse(window?.localStorage?.getItem('UserData') ?? "");
}
function customerLeadCreated(username: string) {

    const userData: UserData = getUserData();
    userData.customerType  = 'New Customer';
    userData.type          = UserDataCustomerType.NEW_LEAD;
    userData.name          = username;
    userData.dateModified  = new Date();

    window?.localStorage?.setItem('UserData', JSON.stringify(userData));
}

export const UserDataService  ={
    customerLeadCreated: customerLeadCreated
}
