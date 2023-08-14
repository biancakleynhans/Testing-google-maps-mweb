'use client';

import React, { useState, useEffect, Fragment } from 'react';
import Provider, { useClientJourney } from '@/context/ClientJourneyContext';
import { useNavContext } from '@/context/NavigationContext';
import { IRouter } from '@/models/Routers';
import MwebButtonGroup from '@/components/ui/mwebButtonGroup/MwebButtonGroup';
import RouterSelectionSkeleton from './RouterSelectionSkeleton';
import RouterService from '@/helpers/RouterService';
import MwebRadioButton from '@/components/ui/mwebRadioButton/MwebRadioButton';
import parse from 'html-react-parser';
import CARD_PLACEHOLDERIMAGE from '../shared/CARD_PLACEHOLDERIMAGE';
import RouterImageSlider from './RouterImageSlider';
import { IProduct } from '@/models/Products';
import { AnalyticsService } from '@/services/analyticsService';
import useCheckoutProcess from '@/hooks/useCheckoutProcess';
import { providerJourneyType, useCoverage } from '@/context/CoverageContext';
import { IVasProduct } from '@/models/Vas';
import { eRouterOptions } from './RouterOption';

import { SELECTED_PRODUCT_LOOKUP_KEY, ADD_ONS_LOOKUP_KEY } from '@/services/Constants';

interface iBtn {
    key: string;
    label: string;
    selected: boolean;
}

interface iBtnOptionTop {
    label: string;
    description: string;
    isActive: boolean;
}

const Options: iBtn[] = [
    { key: 'include', label: 'Included with your selected Fibre plan', selected: true },
    {
        key: 'exclude',
        label: 'No thanks, I have my own Fibre router',
        selected: false,
    },
];

interface ICraftRouter {
    title: string;
    date_published: string;
    date_modified: string;
    expiry_date: string | null;
    lists: any[];
    slug: string;
}

interface iProps {
    pageHeading: string;
}

/* RAY CHATGTP: get selected product information and it's associated promocode_deals : We mostly interested in routers deals: */
async function getRouterInformation(selectedProduct: IProduct) {
    console.log('%c 1. Selected Product ', 'color:hotpink', selectedProduct);

    let allRouters: IRouter[] = [];
    let allVasRecommend: IVasProduct[] = [];

    try {
        /* Build EndPoint URL endpoint to get selected product router details */
        let endPointUrl = `${process.env.NEXT_PUBLIC_PRODUCT_DETAIL_URL}/${selectedProduct?.promoCode}/${selectedProduct?.productCode}?includeComprehensiveDetails=true`;

        const productDataRes = await fetch(endPointUrl, { method: 'GET' });
        const productData = await productDataRes.json();

        //console.log('%c 2. Products Data raw ', 'color:hotpink', productData);

        /* Get Promocode Deals */
        const result = productData['result'];
        const promoCodeDeals = result?.promocode_deals;
        const promoCodeDetails = result?.promocode_details || { deals: [] };
        // const isSwitchUrl = result.isSwitchUrl;
        const product = result?.product;

        // console.log('%c 3. Product', 'color:hotpink', product);

        /* Get router options */
        const routerOptions: any[] = RouterService.buildRouterOptions({
            promoCodeDeals,
            promoCodeDetails,
            product,
        });

        //console.log('%c 4. ROuter options pre craft', 'color:hotpink', routerOptions);

        /* CRAFT -> Build routers endpoint i.e /zywl-router,qywlq-router  */
        const routerOptionsProductCode: string = routerOptions
            .map((item: any) => {
                return item.productCode.toLowerCase();
            })
            ?.join();

        //console.log('%c 4.1. routerOptionsProductCode', 'color:hotpink', routerOptionsProductCode);

        const craftRouterEndPointUrl = `${process.env.NEXT_PUBLIC_CRAFT_API_URL}/lists/${routerOptionsProductCode}`;
        const craftResp = await fetch(craftRouterEndPointUrl);
        const routerDetailsData: any = await craftResp.json();

        // console.log('%c 5. Craft before clean up', 'color:hotpink', routerDetailsData);

        /* Clean up data and transform it into IRouter object -> Find out which router from craft correspond to router product object from comprehensive API call */
        const routersInfo: any = routerDetailsData.data.map((item: ICraftRouter) => {
            // Build router object

            // Name
            const routerName = item.title;

            // Images
            const routerImages = item.lists.find((r: any) => r.type === 'imageList');
            const imageURLs = routerImages.listImages.map((image: any) => image.url) ?? [];

            // Description
            const highlights = item.lists.find((r: any) => r.type === 'textList');
            const description = highlights.listItems.join().replaceAll('<div>', '').replaceAll('</div>', '');

            /**
             * Find out which router from craft correspond to router product object from comprehensive API call
             * ICraftRouter slug correspind to IRecommendedRouterProduct productCode toLowerCase();
             */
            const routerOption: any | null = routerOptions.find(
                (routerOption) => routerOption.productCode.toLowerCase() === item.slug
            );

            //
            const IRouter = {
                name: routerName,
                desctription: description,
                images: imageURLs,
                price: routerOption.price,
                promoCode: routerOption.promoCode,
                productCode: routerOption.productCode,
            };

            //
            return IRouter;
        });

        const analyticsService = new AnalyticsService();
        analyticsService.pushViewItemListGA4Tracking(routersInfo);

        allRouters = routersInfo ?? [];

        //console.log('%c 6. Router info end ', 'color:hotpink', routersInfo);

        /* get recommended products */
        const promoDeals = promoCodeDeals.deals.filter(
            (p: any) => p.minProductsRequiredOSU == 0 && !p.dealDescription.toLowerCase().includes('router')
        );
        const recommendedProducts = promoDeals.flatMap(RouterService.Utilities.mapProductsfromPromo);

        allVasRecommend = recommendedProducts;
        //

        return { routers: allRouters, vas: allVasRecommend, status: 'ok', product: product };
    } catch (error) {
        console.log('no product info', error);
        return { routers: [], vas: [], status: error };
    }
}

export default function RouterSelectionAddOn(props: iProps) {
    const { pageHeading } = props;

    const { handleIsNextActive } = useNavContext();
    const { primaryProductFromSession } = useCheckoutProcess();
    const { providerType } = useCoverage();
    const { selectedRouterOption, selectedRouter, handleSelectedRouter, handleSetRecommednedVasProducts } = useClientJourney(); // just context
    const { handleAddProductToShoppingCart, handleRemoveProductFromShoppingCart, selectedProduct } = useClientJourney(); //shopping cart api

    const [isLoading, setIsLoading] = useState(true);
    const [buttonsTop, setButtonsTop] = useState<iBtnOptionTop[]>([]);
    const [buttonsRight, setButtonsRight] = useState<iBtn[]>([]);
    const [allRouters, setAllRouters] = useState<IRouter[]>([]);
    const [activeRouterToDisplay, setactiveRouterToDisplay] = useState<IRouter | null>(null);

    /* Routers setup */
    useEffect(() => {
        handleIsNextActive(true);

        // Enhacement
        const selecteProducFromStorageKey = localStorage.getItem(SELECTED_PRODUCT_LOOKUP_KEY) || '';

        /**
         * CASE: User has never selected a primary product, show them empty page
         */
        if (selecteProducFromStorageKey === '') {
            setAllRouters([]);
            handleSetRecommednedVasProducts([]);
            setIsLoading(false);
            return;
        }

        /**
         * CASE: User has a primary product but might not have visited this page yet,
         *            then get fresh data else read from storage
         */
        const selectedProductfromStorage: IProduct = JSON.parse(selecteProducFromStorageKey);
        const addOnsStorageData = JSON.parse(localStorage.getItem(ADD_ONS_LOOKUP_KEY) ?? '{}');

        const hasUserSeenThisPageBefore = selectedProductfromStorage?.productCode === addOnsStorageData?.product?.productCode; // TODO

        if (hasUserSeenThisPageBefore) {
            // Read from the storage
            updateComponentStates(addOnsStorageData);
            return;
        } else {
            // Get fresh data from the storage
            getRouterInformation(selectedProductfromStorage)
                .then((res) => {
                    updateComponentStates(res);
                    return res;
                })
                .catch((err) => {
                    console.log('err', err);
                    setactiveRouterToDisplay(null);
                    setAllRouters([]);
                    setButtonsRight([]);
                    setButtonsTop([]);
                    handleSetRecommednedVasProducts([]);
                })
                .finally(() => {
                    setIsLoading(false);
                    handleIsNextActive(true);

                    return;
                });
        }
    }, [primaryProductFromSession, selectedRouterOption]);

    /**
     *
     */
    function updateComponentStates(res: any) {
        // console.log('getting routers and vases: ', res.routers.length, res.vas.length);

        const addOnsData = {
            ...res,
            providerType: providerType,
            product: res.product,
        };
        localStorage.setItem(ADD_ONS_LOOKUP_KEY, JSON.stringify(addOnsData));

        handleSetRecommednedVasProducts(res.vas);
        //
        if (providerType === providerJourneyType.fibre) {
            let selected = selectedRouter ? selectedRouter : res.routers[0];

            let btnsTop = res.routers.map((router: any, i: number) => ({
                label: router.name,
                description: router.price < 1 ? 'FREE' : `From R${router.price}`,
                isActive: selected.name === router.name ? true : false,
            }));

            console.log('FIBRE ', res.routers, selectedRouter, '>>>', selected);
            setButtonsTop(btnsTop);
            setButtonsRight(Options);
            setAllRouters(res.routers);
            setactiveRouterToDisplay(selected);
            RoutersShoppingCartAction(res.routers, selected.name);
        }
        //
        else if (providerType === providerJourneyType.lte) {
            // Do logic to create all the needed logic and values to run lte display
            // ROUTER OPTIONS: router-fixed, router-portable, router-both
            // TODO: when we have a field for fixed vs poritble update here as well!

            let data = generateLtePaymentPlansForRouters(res.routers, selectedRouterOption);

            console.log('LTE ', res.routers, selectedRouter, selectedRouterOption, '>>>>', data);

            setButtonsTop(data.top);
            setButtonsRight(data.right);
            setAllRouters(res.routers);
            handleSelectedRouter(data.first);
            setactiveRouterToDisplay(data.first);
            RoutersShoppingCartAction(res.routers, data.first ? data.first.name : '');
        }

        setIsLoading(false);
    }

    useEffect(() => {}, [buttonsRight, buttonsTop, activeRouterToDisplay]);

    /* Lte router logic TODO: add the selected type to logic ie fixed, portable, both, none router type */
    function generateLtePaymentPlansForRouters(allRouters: IRouter[], typeSelected: eRouterOptions) {
        // console.log('%c Start doing lte logic ', 'color:aqua', allRouters);

        let top: iBtnOptionTop[] = [];
        let right: iBtn[] = [];

        let use: IRouter[] =
            typeSelected === eRouterOptions.fixed
                ? allRouters.filter((x) => !x.name.toLowerCase().includes('lte'))
                : typeSelected === eRouterOptions.portable
                ? allRouters.filter((x) => x.name.toLowerCase().includes('lte'))
                : allRouters;

        let selected = selectedRouter ? selectedRouter : use[0];

        // get router names and conver to top btns
        use.forEach((router: IRouter) => {
            /* TOP */
            let i = router.name.indexOf('(');
            let ii = router.name.indexOf(')');
            let clean = router.name.slice(0, i !== -1 ? i : router.name.length);
            let desc = router.price < 1 ? 'FREE' : `From R${router.price}`;

            let state = selected && router?.productCode === selected?.productCode ? true : false;

            let curr: iBtnOptionTop = { description: desc, isActive: state, label: clean };

            let isThere = top.filter((t) => t.label === clean)[0];

            console.log('%c Router name ', 'color:lime', selected.name, clean, desc, state);

            /* TOP */
            if (!isThere) {
                top.push(curr);
            }

            /*RIGHT */
            if (selected && selected.name.includes(clean)) {
                // fmt-> R799 once off and R250pm x 6 months
                let time = router.name.slice(i + 1, ii);
                let isPm = time.includes('month');
                let fmt = isPm ? `R${router.price}pm x ${time}` : `R${router.price} once off`;
                let curr: iBtn = {
                    key: router.name,
                    label: fmt,
                    selected: selected && router?.productCode === selected?.productCode ? true : false,
                };

                // console.log('We HAVE A MATCH ', router, router.name, ' >> ', time, ' >> ', router.price, ' >> ', fmt);

                right.push(curr);
            }
        });

        if (top.length > 0) {
            let isA = top.filter((x) => x.isActive).length;
            console.log('do we have a preselected value???', isA);

            if (isA < 1) {
                top[0].isActive = true;
            }
        }

        if (right.length > 0) {
            let isA = right.filter((x) => x.selected).length;
            console.log('do we have a preselected value???', isA);

            if (isA < 1) {
                right[0].selected = true;
            }
        }

        console.log('%c DONE: ', 'color:hotpink', top, right);
        return { top: top, right: right, first: use[0] };
    }

    // when one of the routers available are selected from the router options at the top
    function handleFilterBtn(router: any) {
        handleIsNextActive(false);
        if (providerType === providerJourneyType.fibre) {
            let updated = allRouters.filter((a) => a.name.includes(router.label))[0];
            const analyticsService = new AnalyticsService();
            analyticsService.pushItemSelectGA4Tracking(updated);
            let top: iBtnOptionTop[] = [];

            buttonsTop.forEach((btn) => {
                console.log('???', btn.label, router.label, btn.label === router.label);

                if (btn.label === router.label) {
                    btn.isActive = !btn.isActive;
                } else {
                    btn.isActive = false;
                }

                top.push(btn);
            });

            console.log('FIBRE handleFilterBtn clicked ', router.label, router.description, '>>>', updated);

            setButtonsTop(top);
            setButtonsRight(Options);
            setactiveRouterToDisplay(updated);
            handleSelectedRouter(updated);
            RoutersShoppingCartAction(allRouters, updated.name);
            handleIsNextActive(true);
        }
        // LTE
        else if (providerType === providerJourneyType.lte) {
            // console.log('LTE handleFilterBtn clicked ', router.label, router.description, '>>', buttonsTop, buttonsRight);

            let top: iBtnOptionTop[] = [];
            let right: iBtn[] = [];

            buttonsTop.forEach((btn) => {
                if (btn.label === router.label) {
                    // console.log('match');
                    btn.isActive = !btn.isActive;
                } else {
                    btn.isActive = false;
                }

                top.push(btn);
            });

            let matched = allRouters.filter((a) => a.name.includes(router.label));

            matched.forEach((router: IRouter) => {
                // console.log('router in matched ', router.name, router.price);

                let i = router.name.indexOf('(');
                let ii = router.name.indexOf(')');

                // fmt-> R799 once off and R250pm x 6 months
                let time = router.name.slice(i + 1, ii);
                let isPm = time.includes('month');
                let fmt = isPm ? `R${router.price}pm x ${time}` : `R${router.price} once off`;
                let curr: iBtn = { key: router.name, label: fmt, selected: false };
                // console.log('We HAVE A MATCH ', router, router.name, ' >> ', time, ' >> ', router.price, ' >> ', fmt, '>>', curr);

                right.push(curr);

                if (right.length > 0) {
                    right[0].selected = true;
                }
            });

            setButtonsTop(top);
            setButtonsRight(right);
            setactiveRouterToDisplay(matched[0]);
            handleSelectedRouter(matched[0]);
            RoutersShoppingCartAction(allRouters, matched[0].name);
            handleIsNextActive(true);
        }
    }

    function RoutersShoppingCartAction(routers: IRouter[], selectedRouter: string) {
        // console.log('%c handle cart logic start: ', 'color: yellow', selectedRouter, routers);

        routers.forEach((router) => {
            // console.log(`%c Compare point selected: ${selectedRouter}, current: ${router.name}`, 'color:orange', router.productCode, router.promoCode);

            let shoppingCartProduct = {
                promoCode: router?.promoCode ?? '',
                productCode: router?.productCode ?? '',
            };

            // 2. Add the matched router to the cart
            if (router.name === selectedRouter) {
                console.log('%c 1. Matched need to be added ', 'color:lime', router.name, router.productCode);
                handleAddProductToShoppingCart(shoppingCartProduct);
            } else {
                console.log('%c 1. Unatched needs to be removed ', 'color:yellow', router.name, router.productCode);
                handleRemoveProductFromShoppingCart(shoppingCartProduct);
            }
        });
    }

    /* handles selected option */
    function handleButtonSelected(option: iBtn) {
        console.log(`%c Payment option button was clicked ${option.key}, ${option.label} OF `, 'color:lime', buttonsRight);
        handleIsNextActive(false);
        let rightButtonsArr: iBtn[] = [];

        buttonsRight.forEach((btn) => {
            // console.log('BTN ', btn.key, option.key, btn.key === option.key);

            if (btn.key === option.key) {
                option.selected = true;
                rightButtonsArr.push(option);
            } else {
                btn.selected = false;
                rightButtonsArr.push(btn);
            }
        });

        setButtonsRight(rightButtonsArr);
        /*Buttons updated */

        /*Shopping cart update via selected button */
        if (providerType === providerJourneyType.fibre) {
            handleSelectedRouter(activeRouterToDisplay);
            /* Update Shopping cart Find out which button was selected:*/
            const includeBtn: iBtn | undefined = buttonsRight.find((bnt) => bnt.key === 'include');
            const isIncludeBntSelected: boolean = includeBtn?.selected ?? false;

            const shoppingCartProduct = {
                promoCode: activeRouterToDisplay?.promoCode ?? '',
                productCode: activeRouterToDisplay?.productCode ?? '',
            };

            // Update shopping cart
            if (isIncludeBntSelected) {
                // add Vas to shopping cart
                handleAddProductToShoppingCart(shoppingCartProduct);
            } else {
                // Remove Vas from shopping cart
                handleRemoveProductFromShoppingCart(shoppingCartProduct);
            }
        }
        // lte routers
        else if (providerType === providerJourneyType.lte) {
            let selectedRouter = allRouters.filter((router) => router.name === option.key)[0];
            handleSelectedRouter(selectedRouter);
            RoutersShoppingCartAction(allRouters, option.key);
        }

        handleIsNextActive(true);
    }

    /*UI COMPONENTS */

    /*LEFT selected router Images */
    const LeftSideRouter = () => {
        // console.log('%c Active router to display', 'color:lime', activeRouterToDisplay);

        const outer = 'col-span-12 md:col-span-6';
        const container = 'h-full w-full flex flex-col justify-center items-center content-center bg-mwBlueGrey-25 rounded-lg';

        if (activeRouterToDisplay && activeRouterToDisplay?.images?.length > 0) {
            return (
                <RouterImageSlider
                    showFree={activeRouterToDisplay && activeRouterToDisplay?.price < 1 ? true : false}
                    images={activeRouterToDisplay.images}
                />
            );
        }
        // No images
        else {
            return (
                <div className={outer}>
                    <div className='md:w-[489px] md:h-[438px] w-[328px] h-[320px]  flex flex-col justify-center items-center content-center bg-mwBlueGrey-25 rounded-lg'>
                        <CARD_PLACEHOLDERIMAGE height='128' width='128' />
                    </div>
                </div>
            );
        }
    };

    /* RIGHT selected router content */
    const RightSideRouter = () => {
        let i = activeRouterToDisplay?.name.indexOf('(');
        let header = activeRouterToDisplay?.name.slice(0, i !== -1 ? i : activeRouterToDisplay?.name.length);

        console.log('ACTIVE ROUTER', activeRouterToDisplay?.name, '>>>', i, header);

        return (
            <div className='col-span-12 md:col-span-6 pl-0 pt-6 md:pt-0 md:pl-[72px]'>
                <div className='w-full flex flex-col justify-start items-start'>
                    <div className='text-mwTextMobileH3Bold md:text-mwTextDeskH3Semi text-mwGrey-900 pb-2'>
                        {header ? header : activeRouterToDisplay ? activeRouterToDisplay.name : ''}
                    </div>

                    <div
                        className='text-mwGrey-600 text-mwTextParaSmall md:text-mwTextParaBase pb-4 md:pb-6 '
                        style={{ lineClamp: 2 }}
                    >
                        {activeRouterToDisplay?.description && parse(activeRouterToDisplay?.description)}
                    </div>

                    {activeRouterToDisplay && (
                        <div className='text-mwTextParaSmallSemi md:text-mwTextParaLargeSemi text-mwGrey-900 pb-2 md:pb-4'>
                            {providerType === providerJourneyType.fibre
                                ? 'Choose an option:'
                                : 'How would you like to pay for your router?'}
                        </div>
                    )}

                    <ul className='flex flex-col gap-1 w-full'>
                        {buttonsRight.map((option: iBtn, i) => (
                            <Fragment key={i}>
                                {/* Desktop */}
                                <div className={`hidden md:flex`}>
                                    <MwebRadioButton
                                        id={`router-option-${option.label}`}
                                        disabled={false}
                                        handleOnChange={() => handleButtonSelected(option)}
                                        label={option.label}
                                        isSelected={option.selected}
                                        variant={'fill'}
                                        size={'large'}
                                    />
                                </div>

                                {/* Mobile */}
                                <div className={`flex md:hidden`}>
                                    <MwebRadioButton
                                        id={`router-option-${option.label}`}
                                        disabled={false}
                                        handleOnChange={() => handleButtonSelected(option)}
                                        label={option.label}
                                        isSelected={option.selected}
                                        variant={'fill'}
                                        size={'small'}
                                    />
                                </div>
                            </Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    /* TOP all routers available filter */
    const TopSideRouter = () => {
        return (
            <div className='w-full flex flex-row justify-center items-center'>
                {/* Desktop  */}
                {buttonsTop.length > 1 && (
                    <div className='hidden w-full md:flex  flex-row justify-center items-center'>
                        <MwebButtonGroup
                            size='large'
                            buttons={buttonsTop}
                            hasDescription={false}
                            onClickFunc={(router) => handleFilterBtn(router)}
                        />
                    </div>
                )}

                {/* Mobile  */}
                {buttonsTop.length > 1 && (
                    <div className='md:hidden w-full flex flex-row justify-center items-center'>
                        <MwebButtonGroup
                            size='small'
                            buttons={buttonsTop}
                            hasDescription={false}
                            onClickFunc={(router) => handleFilterBtn(router)}
                        />
                    </div>
                )}
            </div>
        );
    };

    /* Lte Layout */
    const LteLayout = () => {
        if (isLoading) {
            return <RouterSelectionSkeleton />;
        } else {
            return (
                <div className='w-full flex flex-col py-8 lg:py-16 px-4 lg:px-[182px] '>
                    <div className='w-full text-mwTextMobileH2Bold md:text-mwTextDeskH2Bold text-center text-mwGrey-900'>
                        {!isLoading && allRouters.length === 0 ? 'No router deals found for the selected product' : pageHeading}
                    </div>

                    {/* filter  */}
                    <div
                        className={`w-full flex flex-row justify-center items-center ${allRouters.length > 1 ? 'py-8' : 'pb-10'}`}
                    >
                        {allRouters.length > 1 && <TopSideRouter />}
                    </div>

                    {/* Desktop */}
                    <div className='w-full grid grid-cols-12 md:min-h-[250px]'>
                        {/* Left router images  */}
                        <LeftSideRouter />

                        {/* Right Router details  */}
                        <RightSideRouter />
                    </div>
                </div>
            );
        }
    };

    /* Fibre Layout */
    const FibreLayout = () => {
        if (isLoading) {
            return <RouterSelectionSkeleton />;
        } else {
            return (
                <div className='w-full flex flex-col py-8 lg:py-16 px-4 lg:px-[182px] '>
                    {/* Header */}
                    <div className='w-full text-mwTextMobileH2Bold md:text-mwTextDeskH2Bold text-center text-mwGrey-900'>
                        {!isLoading && allRouters.length === 0 ? 'No router deals found for the selected product' : pageHeading}
                    </div>

                    {/* filter  */}
                    <div
                        className={`w-full flex flex-row justify-center items-center ${allRouters.length > 1 ? 'py-8' : 'pb-10'}`}
                    >
                        {allRouters.length > 1 && <TopSideRouter />}
                    </div>

                    {/* Desktop */}
                    <div className='w-full grid grid-cols-12 md:min-h-[250px]'>
                        {/* Left router images  */}
                        <LeftSideRouter />

                        {/* Right === Router details  */}
                        <RightSideRouter />
                    </div>
                </div>
            );
        }
    };

    return providerType === providerJourneyType.fibre ? (
        <FibreLayout />
    ) : providerType === providerJourneyType.lte ? (
        <LteLayout />
    ) : (
        <></>
    );
}
