export interface ILead {
    title: string | undefined
    firstName: string | undefined;
    lastName: string | undefined;
    mobileNumber: string | undefined;
    emailAddress: string | undefined;
    optInSms: boolean | undefined;
    optInWhatsApp: boolean | undefined;
    optInEmails: boolean | undefined;
    optInCalls: boolean | undefined;
}

export class Lead implements ILead {
    public title: string | undefined;
    public firstName: string | undefined;
    public lastName: string | undefined;
    public mobileNumber: string | undefined;
    public emailAddress: string | undefined;
    public optInSms: boolean | undefined;
    public optInWhatsApp: boolean | undefined;
    public optInEmails: boolean | undefined;
    public optInCalls: boolean | undefined;
    constructor(

    ) {}
}
