import { TillSlipService } from '@/services/tillSlipService';

// Utilities
const Utilities = {
    mapProductsfromPromo: (pc: any) => {
        //
        const product = pc.promoProducts.map((p: any) => {
            // build router options  list item
            const name = p.friendlyName ? p.friendlyName : p.productName;
            const price = p.productRate;
            const displayPrice = p.displayPrice;
            const discount = p.productDiscountAmount;
            const productCode = p.productCode;
            const promoCode = pc.dealPromoCode;
            const subcategory = p.subcategory;
            const onceOffCharge = p.onceOffCharge;
            const dealPromoCodecategory = 'to-be-computed';
            const summary = p.summary;
            const highlights = p.highlights;
            const productDescriptionAlternative = p?.productDescriptionAlternative;
            const fullHighlights = 'to-be-computed';
            const image = 'to-be-computed';
            const isAddedToCart = false;
            const chargedPeriod = p.chargePeriod;
            const minimumContractMonths = p.minimumContractMonths;

            return {
                name,
                price,
                image,
                discount,
                summary,
                highlights,
                subcategory,
                displayPrice,
                promoCode,
                productCode,
                fullHighlights,
                onceOffCharge,
                chargedPeriod,
                isAddedToCart,
                dealPromoCodecategory,
                minimumContractMonths,
                productDescriptionAlternative,
            };
        });

        return product;
    },
};

function buildProductsFromPromoDeals(
    primaryProduct: { productCode: string; promoCode: string; name: string },
    promoCodeDeals: any[]
): { computedRouterOptions: any[]; computedVasProductsOptions: any[] } {
    /**
     * Get  Vas Products from deals
     *  */
    const vasPromoDeals = promoCodeDeals.filter(
        (deal: any) => deal.minProductsRequiredOSU == 0 && !deal.dealDescription.toLowerCase().includes('router')
    );
    const vasProductsOptions: any[] = vasPromoDeals.flatMap(Utilities.mapProductsfromPromo);

    /**
     * Get Routers
     */
    let routerOptions: any[] = [];
    // Check for Mandatory Devices : filter out deals based on description contains "router" and minProductsRequiredOSU===1
    const mandatoryDeviceDeals = promoCodeDeals?.find(
        (deal: any) => deal.dealDescription.toLowerCase().includes('router') && deal.minProductsRequiredOSU === 1
    );
    const mandatoryDeviceCount =
        mandatoryDeviceDeals && mandatoryDeviceDeals.promoProducts.length > 0
            ? mandatoryDeviceDeals.promoProducts.length
            : null;

    //  Do we need to force add a non-mandatory device
    //  But only if there are no mandatory devices
    // AND don't auto-add for Switch Promo
    let index = 0;
    const _fsForceNoMandatoryDevice = true;

    if (_fsForceNoMandatoryDevice && !mandatoryDeviceCount) {
        // remove No Router select option
        const promoDeals = promoCodeDeals?.filter((deal: any) => deal.minProductsRequiredOSU === 0);

        const fibreOptionalProducts = promoDeals.flatMap(Utilities.mapProductsfromPromo);

        fibreOptionalProducts.forEach((optionProduct: any) => {
            if (optionProduct.name.toLowerCase().includes('router')) {
                index++;

                optionProduct.id = index;
                optionProduct.title = primaryProduct.name;
                optionProduct.image = 'To-be-computed';
                optionProduct.primaryProductCode = primaryProduct.productCode;
                optionProduct.primaryPromoCode = primaryProduct.promoCode;
                optionProduct.isMandatoryRouterOption = false;
                // (optionProduct.Code = optionProduct.primaryPromoCode),
                //
                routerOptions.push(optionProduct);
            }
        });
    }

    if (mandatoryDeviceCount > 0) {
        const promoDeals = promoCodeDeals.filter(
            (deal) =>
                deal.minProductsRequiredOSU === 1 &&
                (deal.dealDescription.toLowerCase().includes('router') ||
                    deal.dealDescription.toLowerCase().includes('hardware'))
        );

        const lteOptionalProducts = promoDeals.flatMap(Utilities.mapProductsfromPromo);

        lteOptionalProducts.forEach((optionProduct: any) => {
            index++;

            optionProduct.id = index;
            optionProduct.title = primaryProduct.name;
            optionProduct.image = 'to-be-computed';
            optionProduct.primaryProductCode = primaryProduct.productCode;
            optionProduct.primaryPromoCode = primaryProduct.promoCode;
            optionProduct.isMandatoryRouterOption = true;

            routerOptions.push(optionProduct);
        });
    }

    return { computedRouterOptions: routerOptions, computedVasProductsOptions: vasProductsOptions };
}

//
interface IOrderCharges {
    monthlyTotal: string;
    onceOffTotal: string;
    installationFee: string;
}

function getOrderCharges(shoppingCart: any, shoppingCartSession: any): IOrderCharges {
    const tillSlip = shoppingCartSession.tillSlipData;

    //  Monthly charges : Recurring Charges
    const recurringChargesSection = tillSlip.chargeSections?.find(
        (charge: any) => charge.chargeTypeSection === 'Recurring Charges'
    );
    const isPrimaryProduct = tillSlip.products[0]?.productCode === shoppingCartSession.primaryProductCode;
    const itemPrice = tillSlip.products[0].price;

    const monthlyCharge = TillSlipService.getMonthlyCharge(recurringChargesSection, isPrimaryProduct, itemPrice);

    // Once off charge contains installation fee, delivery
    const onceOffChargesSection = tillSlip.chargeSections?.find(
        (charge: any) => charge.chargeTypeSection === 'Once-off Charges'
    );

    // look for installation fee
    let installationFee = 'FREE';
    let onceOffCharges = 'FREE';

    onceOffChargesSection?.chargeLines?.forEach((chargeLine: any, index: number) => {
        // check if chrageLine is an installation then update installation field
        if (chargeLine.productName.toLowerCase().includes('Installation')) {
            installationFee = TillSlipService.getFormattedChargeLine(chargeLine) ?? 'Free';
        }

        const fee = TillSlipService.getOnceOffChargeDisplayValue(chargeLine);
        // If fee is a number and not zero then we can add all the charges
        if (parseInt(fee.replace('R', '')) > 0) onceOffCharges += parseInt(fee.replace('R', ''));
        else onceOffCharges = fee;
    });

    //
    return {
        monthlyTotal: monthlyCharge,
        onceOffTotal: onceOffCharges,
        installationFee: installationFee,
    };
}

const FibreRouterService = {
    Utilities: Utilities,
    getOrderCharges: getOrderCharges,
    buildProductsFromPromoDeals: buildProductsFromPromoDeals,
};

export default FibreRouterService;
export type { IOrderCharges };
