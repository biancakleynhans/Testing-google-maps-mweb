import { getCookie, setLocalStorageItem } from '../services/storage-service';
export interface CustomerAccountProfileLite {
    firstName: string;
    lastName: string;
    emailAddress: string;
    otpMobileNumber: string;
    accessLevel: string;
    accessPermissions: string[];
    canCancelAnyProducts: boolean;
    canReactivateAccount: boolean;
    canReconnectAccount: boolean;
    canViewAllServiceAccounts: boolean;
    canMFA: boolean;
    isMfaComplete: boolean;
    canElevateAccessLevel: boolean;
    isAccountOwner: boolean;
    contactPersonId: number;
    agentLogin: boolean;
    agentName: string;
    disableSales: boolean;
    isCorporateAccount: boolean;
    serviceAccountCount: number;
    activeOrders: number;
    accountStatus: string;
    username: string;
}

export interface IServiceResponse {
    responseBody: any;
    responseObject: any;
    httpStatusCode: number;
    httpStatusText: string;
}

async function performLogin(username: string, password: string) {
    try {
        const loginResponse = await fetch(`${process.env['NEXT_PUBLIC_BAAS_BASE_URL']}proxy/authentication/customer/login`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ user_id: username, passwd: password }),
            credentials: 'include',
        });

        return {
            responseBody: await loginResponse.json(),
            responseObject: loginResponse,
            httpStatusCode: loginResponse.status,
            httpStatusText: loginResponse.statusText,
        };
    } catch (error) {
        console.error('performLogin ::: Error ::\n' + error);
        return {
            responseBody: '',
            responseObject: error,
            httpStatusCode: 400,
            httpStatusText: '',
        };
    }
}

async function getAccount(liteMode: boolean) {
    const includeServiceAccounts = liteMode ? 'false' : 'true';

    try {
        const response = await fetch(`${process.env['NEXT_PUBLIC_BAAS_BASE_URL']}proxy/customer/accounts?includeServiceAccounts=${includeServiceAccounts}`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('getAccount ::: Unable to retrieve Customer Account');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('getAccount ::: Unable to retrieve Customer Account\n', error);
    }
}

async function requestOtp(username: string) {
    const otpPostData: any = {
        userId: username,
    };

    try {
        const otpRequestResponse = await fetch(`${process.env['NEXT_PUBLIC_BAAS_BASE_URL']}${process.env.NEXT_PUBLIC_API_AUTHENTICATION_OTP_REQUEST}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(otpPostData),
        });

        if (!otpRequestResponse.ok) {
            console.error('Unable to retrieve OTP Ref');
        }

        return await otpRequestResponse.json();
    } catch (error) {
        console.error('Unable to retrieve OTP Ref\n', error);
    }
}

async function submitOtp(otpValue: string, otpRef: string) {
    const otpVerificationRequest: any = {
        otp: otpValue,
        otpRef: otpRef,
    };

    try {
        const otpResponse = await fetch(`${process.env['NEXT_PUBLIC_BAAS_BASE_URL']}${process.env.NEXT_PUBLIC_API_CUSTOMER_OTP_VERIFICATION}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(otpVerificationRequest),
        });

        if (!otpResponse.ok) {
            console.error('An error occurred submitting the OTP');
        }

        return await otpResponse.json();
    } catch (error) {
        console.error('An error occurred submitting the OTP\n', error);
    }
}

function getJwtCookie() {
    return getCookie('jwt');
}

async function refreshJwtToken(refreshToken: string) {
    const request = `{"refreshToken" : "${refreshToken}"}`;
    const jwtRefreshUrl = `${process.env.NEXT_PUBLIC_BAAS_PROXY_BASE_URL}${process.env.NEXT_PUBLIC_API_AUTHENTICATION_JWT_REFRESH}`;

    try {
        const jwtRefreshResponse = await fetch(jwtRefreshUrl, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-type': 'application/json',
            },
            body: request,
            credentials: 'include',
        });

        return {
            responseBody: await jwtRefreshResponse.json(),
            responseObject: jwtRefreshResponse,
            httpStatusCode: jwtRefreshResponse.status,
            httpStatusText: jwtRefreshResponse.statusText,
        };
    } catch (error) {
        console.error('Unable to Refresh JWT Token\n', error);
    }
}

export const AuthenticationService = {
    performLogin: performLogin,
    getAccount: getAccount,
    requestOtp: requestOtp,
    submitOtp: submitOtp,
    getJwtCookie: getJwtCookie,
    refreshJwtToken: refreshJwtToken,
};
