export interface iProductCardDetails {
  btnText: string;
  price: number | string;
  promoPrice: number | string;
  details: any[];
  speed: string;
  provider: string;
  promoTag: string;
  showBgColor?: boolean;
  deliveryNotes?:string;
}

export interface iVasCardDetails {
  price: number | string;
  productName: string;
  details: string;
  speed: string;
  provider: string;
  promoTagline: string;
}



export interface iOptionCardDetails {
  label: string;
  description?: string;
  price?: string;
  icon: string;
  iconType: 'illustration' | 'icon' | 'placeholder',
  iconColor?: string
}

export interface iCompareCardDetails {
  label: string;
  price: number | string;
  btnText: string;
  details: string[];
  type: 'fibre' | 'lte' | '5g';
}

export interface iHDMCardDetails {
  label: string;
  type: string;
}

export interface iVoucherCardDetails {
  btnLabel: string;
  inputValue: string;
  placeholderText?: string
  onClickCB: (val: any) => void;
}

export interface iFeatureCardDetails {
  btnLabel: string;
  header: string;
  details: string[];
  image: string;
}

export interface iOrderSummaryCardDetails {
  btnLabel: string;
  hasIcon: boolean;
  isDisabled: boolean;
  bgColor: string;

  iconProps?: {
    size: number;
    color: string;
    icon: string;
    iconPosition: 'left' | 'right' | 'icon-only';
    variant: 'basic' | 'functional' | 'social';
  };

  orderDetails: {
    monthly: number | string;
    onceOff: number | string;
    deliveryInstalation: number | string;
  };

  hasVoucher: boolean;
  voucherProps?: iVoucherCardDetails;

  showEdit: boolean;
  editAction: () => void;
}
export interface iTestimonialCardProps {
  size: 'small'  | 'large';
  icon: string;
  testimonialText: string;
  firstName:string
}

export interface iCardProps {
  size: 'small' | 'medium' | 'large';
  isSelected?: boolean;
  onClickCallback: (val?: any) => void;
}
export interface iTestimonialProps {
  __typename?: string;
  useIcon?: boolean;
  size: 'small' | 'large';
  icon: string;
  testimonialText: string;
  firstName:string
}

export interface iCardFullProps extends iCardProps {
  showButton?: boolean;
  isPromo?: boolean;
}

export const containerBasic = 'rounded-2xl flex flex-col justify-start items-start gap-y-0';
export const hover = 'hover:border-b-8 hover:border-mwBlueGrey-100';
export const padDisplay = 'px-6 w-full flex flex-row ';
