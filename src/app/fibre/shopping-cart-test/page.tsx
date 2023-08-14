'use client';
import {useEffect, useState} from "react";
import Heading from "@/components/switchBlock/Heading";
import {TillSlipService} from "@/services/tillSlipService";
import {ShoppingCartSessionService, IShoppingCartSession, IShoppingCartSessionUpdate, IShoppingCart} from '@/services/shoppingCartSessionService';

export default function Page() {

    //Test Data
    const baseCart = {
        "shoppingCart": [
            {
                "products": [
                    {
                        "primary": true,
                        "saleType": "New",
                        "promoCode": "FTTH-VUMA-CLAWBACK-100MBUP",
                        "productCode": "FTTH-VUMA-10-10MB-UNC-APR20",
                        "parentContractId": 0
                    }
                ]
            }
        ]
    }
    const routerProduct = {
        "promoCode": "FTTH-HI-ROUTER",
        "productCode": "ZYXEL-EMG3525-FTTH-ROUTER",
    }
    const vasProduct = {
        "promoCode": "VAS-RECOMMEND-MSOFFICE365",
        "productCode": "MS-OFFICE-365-PERS-12MONTH-APR20",
    }

    //State
    const [shoppingCart, setShoppingCart] = useState(baseCart)
    const [cartDisplay, setCartDisplay] = useState(JSON.stringify(shoppingCart, null, 2))

    //Functions
    function addProductToCart(product: any){

        let cart: IShoppingCart = shoppingCart as IShoppingCart
        cart = ShoppingCartSessionService.addRecommendedProductToCart(product, cart)
        setShoppingCart(cart)
        setCartDisplay(JSON.stringify(cart, null, 2))
        console.log("Add to Cart: ", cart)
    }

    function resetCartToBaseProduct(){
        setShoppingCart(baseCart)
        setCartDisplay(JSON.stringify(baseCart, null, 2))
        console.log("Reset Cart: ", baseCart)
    }

    //UseEffect logic
    useEffect( () => {
        console.log("useEffect Called")

        let sessionUpdate: IShoppingCartSessionUpdate
        let portalShoppingCartSession: IShoppingCartSession;

        //Async function to set the shopping cart session
        const setShoppingCartSession = async (sessionUpdate: IShoppingCartSessionUpdate)=>{
            const updatedSession = await ShoppingCartSessionService.setShoppingCartSession(sessionUpdate)
            if (updatedSession){
                localStorage.setItem('portalShoppingCartSession', JSON.stringify(updatedSession));
            }
        }

        //Async function to get the till slip data from the shopping cart state
        const getTillSlip = async (shoppingCart: any) => {
            return TillSlipService.getTillSlip(shoppingCart)
        };

        //Get the shopping cart session from local storage
        const session: string = localStorage.getItem("portalShoppingCartSession") || '' ;

        //If the session exists, do a tillSlipCall update the shopping cart session with the shoppingCart and tillSlipData
        if (session !== '') {
            portalShoppingCartSession = JSON.parse(session)

            getTillSlip(shoppingCart).then(tillSlipData => {
                console.log("Tillslip data: ", tillSlipData)
                sessionUpdate = {
                    id: portalShoppingCartSession.id,
                    userIdentifier: portalShoppingCartSession.userIdentifier,
                    shoppingCart: shoppingCart as IShoppingCart,
                    tillSlipData: tillSlipData,
                    orderFormData: null,
                    currentCheckoutStep: "/fibre/some-page-path"
                }

                const shoppingCartSession = setShoppingCartSession(sessionUpdate)
                console.log("useEffect session update: ", sessionUpdate);
            })
        }
    },[addProductToCart, resetCartToBaseProduct])


    return (
        <div className='w-full flex flex-col justify-center items-center py-14 lg:pt-[86px] px-4 lg:pb-[96px]'>
            <Heading title="Shopping Cart Session Demo" className="pb-8 lg:pb-10"/>
            <div><pre>{cartDisplay}</pre></div>

            <div className={"h-56 grid grid-cols-3 gap-4 content-center"}>
                <button
                    onClick={() => addProductToCart(routerProduct)}
                    className=" rounded-full px-8 py-4 bg-mwPrimary-900 hover:text-white hover:bg-mwPrimary-800 focus:border-4 focus:border-mwLightTeal-500 focus:bg-mwPrimary-900 text-white text-mwButtonTextMedium ">
                    <div className="w-full flex flex-row justify-center items-center" >
                        <div className="flex flex-nowrap whitespace-nowrap pl-0">Add router to cart</div>
                    </div>
                </button>
                <button
                    onClick={() => addProductToCart(vasProduct)}
                    className=" rounded-full px-8 py-4 bg-mwPrimary-900 hover:text-white hover:bg-mwPrimary-800 focus:border-4 focus:border-mwLightTeal-500 focus:bg-mwPrimary-900 text-white text-mwButtonTextMedium ">
                    <div className="w-full flex flex-row justify-center items-center ">
                        <div className="flex flex-nowrap whitespace-nowrap pl-0" >Add vas to cart</div>
                    </div>
                </button>
                <button
                    onClick={() => resetCartToBaseProduct()}
                    className=" rounded-full px-8 py-4 bg-mwPrimary-900 hover:text-white hover:bg-mwPrimary-800 focus:border-4 focus:border-mwLightTeal-500 focus:bg-mwPrimary-900 text-white text-mwButtonTextMedium ">
                    <div className="w-full flex flex-row justify-center items-center ">
                        <div className="flex flex-nowrap whitespace-nowrap pl-0">Reset Cart</div>
                    </div>
                </button>
            </div>
        </div>
    );
}
