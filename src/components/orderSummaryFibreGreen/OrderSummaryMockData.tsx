import { IMainProduct, IAddedProduct, IProducts, IContinueShopping, ITillSlip, IVoucher } from '@/models/OrderSummaryService';

// mock data for the fibre green page order summary

const heading = [
  {
    heading: 'Your Order Summary',
  },
];

const productsSummary: IProducts[] = [
  {
    heading: [{ heading: 'Your Order Summary' }],

    order_type: [{ order_type: 'Connectivity Solution' }],

    main_product: [
      {
        powered: 'POWERED BY OPENSERVE',
        product_name: '25Mbps Uncapped Fibre',
        payment_term: 'Payment term: Monthly',
        Terms_text: ' Terms & Conditions',
        Price: 'R499pm',
      },
    ],

    added_product: [
      {
        payment_term: 'Payment term: Once-off',
        item_name: 'Zyxel EMG 3525 Router',
        Terms_text: ' Terms & Conditions',
        Price: 'FREE',
        saved_note: 'You saved R699',
      },
    ],
    continue_shopping: [
      {
        interested: 'Interested in more of our products?',
        continue: 'Continue shopping',
      },
    ],
  },
];
const added_product: IAddedProduct[] = [
  {
    item_name: 'Zyxel EMG 3525 Router',
    payment_term: 'Payment term: Once-off',
    Terms_text: ' Terms & Conditions',
    Price: 'FREE',
    saved_note: 'You saved R699',
  },
];

const continue_shopping: IContinueShopping[] = [
  {
    interested: 'Interested in more of our products?',
    continue: 'Continue shopping',
  },
];

const tillSlip: ITillSlip[] = [
  {
    slip_heading: 'ORDER SUMMARY',
    monthly_total_title: 'Your monthly total',
    monthly_total: 'R499',
    once_off_total_title: 'Your once-off total',
    once_off_total: 'R0',
    delivery_installation_title: 'Delivery and installation',
    Delivery_installation: 'FREE',
    proceed_title: 'Proceed To Checkout',
    items: 'items',
    two: 2,
    edit_order: 'Edit order',
  },
];

const voucher_part: IVoucher[] = [
  {
    voucher_title: 'Do you have a voucher code?',
    placeholder: 'Enter your code',
    Apply: 'APPLY',
  },
];

export { productsSummary, tillSlip, voucher_part };
