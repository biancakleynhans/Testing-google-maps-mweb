
export interface IAddedProduct {
    payment_term:string;
    Terms_text:string;
    Price:string;
    item_name:string;
    saved_note:string;

}
export interface IMainProduct {
    powered:string;
    product_name:string;
    payment_term:string;
    Terms_text:string;
    Price:string;
}
export interface IHeading{
    heading:string;
}

export interface IOrderType{
    order_type:string;
}

export interface IProducts {
    main_product:IMainProduct[],
    added_product:IAddedProduct[],
    continue_shopping:IContinueShopping[],
    heading:IHeading[],
    order_type:IOrderType[],
}

export interface IContinueShopping{
    interested:string;
    continue:string;    
}

export interface ITillSlip{
    slip_heading:string;
    monthly_total_title:string;
    monthly_total:string;
    once_off_total_title:string;
    once_off_total:string;
    delivery_installation_title:string;
    Delivery_installation:string;
    proceed_title:string;
    items:string;
    two:number;
    edit_order:string;
}

export interface IVoucher{
    voucher_title:string;
    placeholder:string;
    Apply:string;
}
