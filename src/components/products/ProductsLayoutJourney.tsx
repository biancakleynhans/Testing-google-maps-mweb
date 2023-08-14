import React, {useCallback, useEffect, useState} from 'react';
import {iProductsLayoutProps} from './ProductsLayout';
import {useClientJourney} from '@/context/ClientJourneyContext';
import {useNavContext} from '@/context/NavigationContext';
import MwebCard from '../ui/mwebCard/MwebCard';
import {iProductCardDetails} from '../ui/mwebCard/CardStyles';
import MwebButton from '../ui/mwebButtons/MwebButtonMain';
import MwebButtonGroup from '../ui/mwebButtonGroup/MwebButtonGroup';
import {IProduct} from '@/models/Products';
import {AnalyticsService, IItem} from '@/services/analyticsService';
import {providerJourneyType} from '@/context/CoverageContext';

interface iProps extends iProductsLayoutProps {
	providerType: providerJourneyType;
}

export default function ProductsLayoutJourney(props: iProps) {
	const {productFilters, products, headerText, onFilterClickedCB} = props;
	const {selectedProduct, handleSelectedProduct} = useClientJourney();
	const {handleIsNextActive} = useNavContext();
	const analyticsService = new AnalyticsService();
	const [ranonce, setRanonce] = useState(false);

	const [isDisplayMoreBtn, setDisplayMoreBtn] = useState<boolean>(true);
	const [displayProducts, setDisplayProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		if (selectedProduct !== null) {
			handleIsNextActive(true);
		} else {
			handleIsNextActive(false);
		}
	}, [selectedProduct]);

	useEffect(() => {
		// console.log('PRODUCT LENGTH', products);
		setDisplayProducts(products.slice(0, 3));
		setDisplayMoreBtn(products.length > 3);
	}, [products]);

	useEffect(() => {
		if (displayProducts.length > 0 && !ranonce) {
			// console.log('displayProducts', displayProducts);
			analyticsService.pushViewItemListGA4Tracking(displayProducts as IItem[]);
			setRanonce(true);
		}
	});

	// Function to handle the button click and toggle the button mode
	function toggleShowMoreOrLess() {
		if (isDisplayMoreBtn) {
			setDisplayMoreBtn(false);
			setDisplayProducts(products.slice(0, 6));
		}
	}

	function handleProductClicked(product: IProduct) {
		console.log('%c selected product is :', 'color:yellow', product.productCode, product.promoCode, product.campaignCode);
		handleSelectedProduct(product);
		analyticsService.pushItemSelectGA4Tracking(product);
	}

	return (
		<div className={`w-full flex flex-col flex-wrap break-words justify-center items-center py-8 md:py-16 px-4 md:px-24 desktop:px-[182px]`}>
			<div className='text-mwTextMobileH2Bold md:text-mwTextDeskH2Bold text-center text-mwGrey-900 pb-8 md:pb-10'>{headerText}</div>

			{/* filter  */}
			<div className='w-full flex flex-row justify-center items-center'>
				{/* Desktop  */}
				<div className='hidden md:flex w-full flex-row justify-center items-center pb-8'>
					<MwebButtonGroup
						size='large'
						buttons={productFilters.map((x) => ({label: x.label, description: '', isActive: x.selected}))}
						hasDescription={false}
						onClickFunc={(code) => onFilterClickedCB(code)}
					/>
				</div>
				{/* Mobile  */}
				<div className='flex md:hidden w-full flex-row justify-center items-center pb-6'>
					<MwebButtonGroup
						size='small'
						buttons={productFilters.map((x) => ({label: x.label, description: '', isActive: x.selected}))}
						hasDescription={false}
						onClickFunc={(code) => onFilterClickedCB(code)}
					/>
				</div>
			</div>

			{/* products  Desktop */}
			<div className='hidden md:flex justify-center'>
				{displayProducts.length > 0 ? (
					<div className='w-full grid grid-cols-1 lg:grid-cols-2 desktop:grid-cols-3 gap-4 md:gap-6 mb-8 lg:mb-10'>
						{displayProducts.map((product, i) => (
							<MwebCard
								key={`product-card-${i}`}
								type='product'
								size='medium'
								showButton={false}
								isSelected={product.productCode === selectedProduct?.productCode ? true : false}
								isPromo={product.hasPreProduct}
								onClickCallback={(prod) => handleProductClicked(product)}
								cardDetails={
									{
										showBgColor: true,
										btnText: '',
										details: [product.highlight1, product.highlight2, product.highlight3, product.highlight4, product.highlight5, product.highlight6],
										price: Number(product.productPrice?.toFixed(2)),
										promoPrice: Number(product?.preProduct?.preProductDiscountedProductRate.toFixed(2)),
										provider: product.providerName,
										speed: `${product.downloadSpeedMbps?.toString()}Mbps`,
										promoTag: product.promoTagline,
										promoLine: product.promoTagline,
									} as iProductCardDetails
								}
							/>
						))}
					</div>
				) : (
					<div className='w-full text-center text-mwTextParaLargeSemi text-mwError-500'>No products available for the selected filter </div>
				)}
			</div>

			{/* products Mobile  */}
			<div className='md:hidden flex justify-center'>
				{displayProducts.length > 0 ? (
					<div className='w-full grid grid-cols-1  gap-4 md:gap-6 mb-8 lg:mb-10'>
						{displayProducts.map((product, i) => (
							<MwebCard
								key={`product-card-${i}`}
								type='product'
								size='small'
								showButton={false}
								isSelected={product.productCode === selectedProduct?.productCode ? true : false}
								isPromo={product.hasPreProduct}
								onClickCallback={(prod) => handleProductClicked(product)}
								cardDetails={
									{
										showBgColor: true,
										btnText: '',
										details: [product.highlight1, product.highlight2, product.highlight3, product.highlight4, product.highlight5, product.highlight6],
										price: Number(product.productPrice?.toFixed(2)),
										promoPrice: Number(product?.preProduct?.preProductDiscountedProductRate.toFixed(2)),
										provider: product.providerName,
										speed: `${product.downloadSpeedMbps?.toString()}Mbps`,
										promoTag: product.promoTagline,
										promoLine: product.promoTagline,
									} as iProductCardDetails
								}
							/>
						))}
					</div>
				) : (
					<div className='w-full text-center text-mwTextParaLargeSemi text-mwError-500'>No products available for the selected filter </div>
				)}
			</div>

			{/* Show more buttons  */}
			<div className='w-full flex flex-row  justify-center items-center'>
				{isDisplayMoreBtn && (
					<>
						<div className='flex md:hidden'>
							<MwebButton color='text-only' btnText='Show More Plans' hasIcon={false} size='medium' isDisabled={false} onClickFunction={() => toggleShowMoreOrLess()} />
						</div>
						<div className='hidden md:flex'>
							<MwebButton color='text-only' btnText='Show More Plans' hasIcon={false} size='large' isDisabled={false} onClickFunction={() => toggleShowMoreOrLess()} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}
