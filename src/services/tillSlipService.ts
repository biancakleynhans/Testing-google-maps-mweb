import { Utilities } from '@/utils/Utilities';
import { IShoppingCart, IShoppingCartProduct } from '@/services/shoppingCartSessionService';

const tillSlipURL = `${process.env.NEXT_PUBLIC_APIGW_BAAS_BASE_URL}/sales/tillslip`;

interface IBasketLineItem {
  parentContractId: number;
  primary: boolean;
  saleType: string;
  productCode: string;
  promoCode: string;
}

interface IChargeSection {
  chargeTypeSection: string
  chargeLines: IChargeLine[]
  totalChargeLines: ITotalChargeLine[]
  totalVatDescription: string
}

interface IChargeLine {
  productName: string
  billingPeriod?: string
  productCode?: string
  quantity: number
  itemChargeExclVat?: string
  itemChargeInclVat?: string
  chargeInclVat: string
  chargeExclVat: string
  discountDescription?: string
  discountAmountExclVat?: string
  discountAmountInclVat?: string
}

interface ITotalChargeLine {
  totalChargeDescription: string
  totalChargeAmount: string
}

async function getTillSlip(shoppingCart: any) {
  const headers = { 'Content-Type': 'application/json', Accept: '*/*' };
  const response = await fetch(tillSlipURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(shoppingCart),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(JSON.stringify(shoppingCart));
    console.error(error);
    throw new Error(`HTTP Error ${response.status}: ${error}`);
  }

  const data = await response.json();
  return data;
}


function isPrimaryProduct(productCode: string, basket: any): boolean {
  const matchedProduct = basket.shoppingCart[0].products.find((p: IShoppingCartProduct) => p.productCode === productCode && p.primary);
  return !!matchedProduct;
}

function isDiscountedRecurringChargeLine(chargeLine: any): boolean {
  return chargeLine?.productName.toLowerCase().includes('discount');
}

function isFreeChargeLine(chargeLine: any): boolean {
  let fullPrice = chargeLine?.chargeInclVat;
  let discountAmountInclVat = chargeLine.discountAmountInclVat ? chargeLine.discountAmountInclVat : '0';

  fullPrice = Utilities.removeRand(fullPrice);
  discountAmountInclVat = Utilities.removeRand(discountAmountInclVat);

  if (discountAmountInclVat.toString().includes('-')) {
    return fullPrice + discountAmountInclVat === 0;
  } else {
    return fullPrice - discountAmountInclVat === 0;
  }
}

function getOnceOffChargeDisplayValue(chargeLine: IChargeLine) {
  const chargeInclVat = chargeLine.chargeInclVat ? Utilities.removeRand(chargeLine.chargeInclVat) : 0;
  const discountInclVat = chargeLine.discountAmountInclVat ? Utilities.removeRand(chargeLine.discountAmountInclVat) : 0;

  let finalAmountInclVat: number = 0;

  if (typeof chargeInclVat === "string" && typeof discountInclVat === "string") {
      finalAmountInclVat = parseInt(chargeInclVat, 10) + parseInt(discountInclVat, 10);
    }

  // console.log('===== charge line =====');
  // console.log('chargeInclVat');
  // console.log(chargeInclVat);
  // console.log('discountInclVat');
  // console.log(discountInclVat);
  // console.log('finalAmountInclVat');
  // console.log(finalAmountInclVat);

  return isFreeChargeLine(chargeLine) || chargeLine.chargeInclVat.toLowerCase() === 'free' || (chargeLine.billingPeriod == null && chargeLine.productCode == null)
      ? 'FREE'
      : `R${Utilities.parseDecimal(finalAmountInclVat, 0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          .replace('-', '')
          .replace(',', ' ')
          .replace('.00', '')}`;
}

function getFormattedChargeLine(chargelineInclRandSymbol: string) {
  const fullPrice = Utilities.removeRand(chargelineInclRandSymbol);

  if (typeof fullPrice === "number") {

    return chargelineInclRandSymbol.toLowerCase() === 'free' ? 'FREE' : `R${Utilities.parseDecimal(fullPrice, 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .replace('-', '')
        .replace(',', ' ')
        .replace('.00', '')}`;
  }
}

function getStrikeThroughDisplayValue(chargeLine: any): string {
  // console.log('HELLLOOOOO');
  const chargeInclVat = Utilities.removeRand(chargeLine.chargeInclVat);
  let dispplayValue = '';

  if (chargeLine.discountAmountInclVat || (!chargeLine.billingPeriod && !chargeLine.productCode)) {
    let tempChargeInclVat = chargeInclVat;

    if (!chargeLine.billingPeriod && !chargeLine.productCode) {
      tempChargeInclVat = parseInt(chargeInclVat.toString().replace('-', ''));
    }

    return `${Utilities.currencyFormat(tempChargeInclVat, 2)}`;
  } else if (chargeLine.chargeExclVat.toLowerCase() === 'free') {
    return '';
  }else {
    return '';
  }
}

function getMonthlyCharge(recurringChargesSection: IChargeSection, isPrimaryProduct: boolean, itemPrice:string) {
  let monthlyCharge = Utilities.removeRand(itemPrice);

  if (recurringChargesSection) {
    for (const monthlyProductChargeLine of recurringChargesSection.chargeLines) {
      if (monthlyProductChargeLine.chargeInclVat !== 'Free') {
        if (monthlyProductChargeLine.discountAmountInclVat && isPrimaryProduct) {
          const discountAmount = Utilities.removeRand(monthlyProductChargeLine.discountAmountInclVat);

          if (discountAmount !== 0) {
            /* discountAmount is a negative number, therefore needs to be added to the price to show subtraction. */
            // @ts-ignore
            monthlyCharge = monthlyCharge + discountAmount;
          }
        }
      }
    }
  }

  // @ts-ignore
  if (monthlyCharge % 1 != 0) {
    if (typeof monthlyCharge === "string") {
      monthlyCharge = parseFloat(monthlyCharge);
    }
    monthlyCharge = monthlyCharge.toFixed(2);
  }

  // return monthlyCharge;
  return monthlyCharge
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .replace('-', '')
      .replace(',', ' ')
      .replace('.00', '');
}

function getTotalChargeAmount(tillSlip: any, section: string) {
  let sectionChargeTotal = 0;
  const chargeSection = tillSlip['chargeSections'].find((c: IChargeSection) => c.chargeTypeSection.toLowerCase().includes(section));
  if (chargeSection) {
    const totalChargeLines = chargeSection.totalChargeLines.find(
        (t: ITotalChargeLine) => t.totalChargeDescription.toLowerCase().includes('incl') && t.totalChargeDescription.toLowerCase().includes('vat')
    );

    if (totalChargeLines) {
      const textTotal = totalChargeLines.totalChargeAmount;

      sectionChargeTotal = textTotal;

      return sectionChargeTotal
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '')
        .replace('-', '')
        .replace(',', ' ')
        .replace('.00', '');
    }
  }

  return Utilities.removeRand(sectionChargeTotal.toString());
}

function isMandatoryProductChargeLine(chargeLineProductCode: string, promoCodeDeals: Array<any>): boolean {
  let isMandatoryProductChargeLine: boolean = false;

  // @ts-ignore
  const mandatoryDeals: Array<any> = promoCodeDeals['deals'].filter((p) => p.minProductsRequiredOSU === 1
      || (p.dealPromoCodeSubcategory.toLowerCase() === 'payment plan'
          || p.dealPromoCodeSubcategory.toLowerCase().includes('router')
          || p.dealPromoCodeSubcategory.toLowerCase().includes('hardware')));


  if (mandatoryDeals.length > 0) {
    for (const mandatoryDeal of mandatoryDeals) {
      for (const promoProduct of mandatoryDeal['promoProducts']) {
        if (promoProduct['productCode'] === chargeLineProductCode) {
          isMandatoryProductChargeLine = true;
        }
      }
    }
  }

  return isMandatoryProductChargeLine;
}

function isProductInBasket(productCode: any, basket: any): boolean {
  const matchedProduct = basket.shoppingCart[0].products.find((p: IShoppingCartProduct) => p.productCode === productCode);

  return !!matchedProduct;
}

function addRecommendedProductToCart(recommendedProduct: any, basket: any) {
  if (!isProductInBasket(recommendedProduct, basket)) {
    const tempBasket = basket;

    const productToAdd: IBasketLineItem = {
      parentContractId: 0,
      primary: false,
      saleType: 'New',
      productCode: recommendedProduct.productCode,
      promoCode: recommendedProduct.promoCode,
    };

    if (productToAdd && tempBasket) {
      // Add router to Shopping Cart
      tempBasket.shoppingCart[0].products.push(productToAdd);
      return basket;
    }
  }

  return basket;
}

function addRecommendedProductToCarts(recommendedProduct: any, tillSlips: Array<any>, selectedTillSlipData: any): Array<any> {
  let updatedTillSlips: any[] = [];

  if (tillSlips?.length > 0) {
    tillSlips.forEach((tillSlipData) => {
      const basket = tillSlipData.tillSlip.basket;

      if (!isProductInBasket(recommendedProduct, basket)) {
        const tempBasket = basket;

        const productToAdd: IBasketLineItem = {
          parentContractId: 0,
          primary: false,
          saleType: 'New',
          productCode: recommendedProduct.productCode,
          promoCode: recommendedProduct.promoCode,
        };

        if (productToAdd && tempBasket) {
          // Add router to Shopping Cart
          tempBasket.shoppingCart[0].products.push(productToAdd);
          tillSlipData.tillSlip.basket = tempBasket;

          if (tillSlipData.key !== selectedTillSlipData.key) {
            tillSlipData.requiresRefresh = true;
          }
        }
      }

      updatedTillSlips.push(tillSlipData);
    });
  }

  return updatedTillSlips;
}

function removeRecommendedProductToCart(recommendedProduct: any, basket: any) {
  if (isProductInBasket(recommendedProduct.productCode, basket)) {
    const tempBasket = basket;

    tempBasket.shoppingCart[0].products = tempBasket.shoppingCart[0].products.filter((p: IShoppingCartProduct) => p.productCode !== recommendedProduct.productCode);
    return tempBasket;
  }

  return basket;
}

function removeRecommendedProductToCarts(recommendedProduct: any, tillSlips: Array<any>, selectedTillSlipData: any): Array<any> {
  let updatedTillSlips: any[] = [];

  if (tillSlips?.length > 0) {
    tillSlips.forEach((tillSlipData) => {
      const basket = tillSlipData.tillSlip.basket;

      if (isProductInBasket(recommendedProduct.productCode, basket)) {
        basket.shoppingCart[0].products = basket.shoppingCart[0].products.filter((p: IShoppingCartProduct) => p.productCode !== recommendedProduct.productCode);
        tillSlipData.tillSlip.basket = basket;

        if (tillSlipData.key !== selectedTillSlipData.key) {
          tillSlipData.requiresRefresh = true;
        }
      }

      updatedTillSlips.push(tillSlipData);
    });
  }

  return updatedTillSlips;
}

function applyPromoVoucherToCarts(promoVoucherCode: string, tillSlips: Array<any>, selectedTillSlipData: any): Array<any> {
  let updatedTillSlips: any[] = [];

  if (tillSlips?.length > 0) {
    tillSlips.forEach((tillSlipData) => {
      const tempBasket = tillSlipData.tillSlip.basket;

      if (tempBasket) {
        tempBasket['promoVoucher'] = promoVoucherCode;
        tillSlipData.tillSlip.basket = tempBasket;

        if (tillSlipData.key !== selectedTillSlipData.key) {
          tillSlipData.requiresRefresh = true;
        }
      }

      updatedTillSlips.push(tillSlipData);
    });
  }

  return updatedTillSlips;
}


function buildTillSlip(primaryProductCode: string, primaryPromoCode: string, additionalProducts: any[]) {
  let tillSlip = {
    currentQuoteId: null,
    shoppingCart: [
      {
        products: [
          {
            parentContractId: 0,
            primary: true,
            productCode: primaryProductCode,
            promoCode: primaryPromoCode,
            saleType: 'New',
          },
        ],
      },
    ],
  };

  if (additionalProducts && additionalProducts.length > 0) {
    additionalProducts.forEach((product) => {
      tillSlip.shoppingCart[0].products.push({
        parentContractId: 0,
        primary: false,
        productCode: product.productCode,
        promoCode: product.promoCode,
        saleType: 'New',
      });
    });
  }

  return tillSlip;
}

function buildUpgradeTillSlip(parentContractId: number,
                              salesType: string,
                              primaryProductCode: string,
                              primaryPromoCode: string,
                              additionalProducts: any[],
                              subSaleType = '',
                              cancellationDate = ''): { promoVoucher: null; currentQuoteId: null; shoppingCart: { products: IShoppingCartProduct[] }[] } {
  const primaryProduct: IShoppingCartProduct = {
    parentContractId: parentContractId,
    primary: true,
    productCode: primaryProductCode,
    promoCode: primaryPromoCode,
    saleType: salesType,
  };

  if (subSaleType) {
    primaryProduct.subSaleType = subSaleType;
  }

  if (cancellationDate) {
    primaryProduct.metadata = {
      cancellationDate: cancellationDate,
    };
  }

  let shoppingCart = {
    currentQuoteId: null,
    shoppingCart: [
      {
        products: [primaryProduct],
      },
    ],
    promoVoucher: null,
  };

  if (additionalProducts && additionalProducts.length > 0) {
    additionalProducts.forEach((product) => {
      shoppingCart.shoppingCart[0].products.push({
        parentContractId: parentContractId,
        primary: false,
        productCode: product.productCode,
        promoCode: product.promoCode,
        saleType: salesType,
        subSaleType: subSaleType,
      });
    });
  }

  return shoppingCart;
}

export const TillSlipService = {
  buildTillSlip: buildTillSlip,
  buildUpgradeTillSlip: buildUpgradeTillSlip,
  getTillSlip: getTillSlip,
  getMonthlyCharge: getMonthlyCharge,
  getTotalChargeAmount: getTotalChargeAmount,
  getOnceOffChargeDisplayValue: getOnceOffChargeDisplayValue,
  getStrikeThroughDisplayValue: getStrikeThroughDisplayValue,
  addRecommendedProductToCart: addRecommendedProductToCart,
  addRecommendedProductToCarts: addRecommendedProductToCarts,
  removeRecommendedProductToCart: removeRecommendedProductToCart,
  removeRecommendedProductToCarts: removeRecommendedProductToCarts,
  applyPromoVoucherToCarts: applyPromoVoucherToCarts,
  isProductInBasket: isProductInBasket,
  isPrimaryProduct: isPrimaryProduct,
  isMandatoryProductChargeLine: isMandatoryProductChargeLine,
  isDiscountedRecurringChargeLine: isDiscountedRecurringChargeLine,
  isFreeChargeLine: isFreeChargeLine,
  getFormattedChargeLine: getFormattedChargeLine
};

