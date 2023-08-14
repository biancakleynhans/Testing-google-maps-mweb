import React, {useEffect, useState} from 'react';
import {iProductsLayoutProps} from './ProductsLayout';
import ScrollToPoint from '@/helpers/ScrollToFunction';
import MwebButtonGroup from '../ui/mwebButtonGroup/MwebButtonGroup';
import MwebButton from '../ui/mwebButtons/MwebButtonMain';
import MwebCard from '../ui/mwebCard/MwebCard';
import {iProductCardDetails} from '../ui/mwebCard/CardStyles';
import {IProduct} from '@/models/Products';
import {useRouter} from 'next/navigation';
import {useClientJourney} from '@/context/ClientJourneyContext';
import {providerJourneyType} from '@/context/CoverageContext';

interface iProps extends iProductsLayoutProps {
	cardButtonText: string;
	providerType: providerJourneyType;
}

export default function ProductsLayoutLanding(props: iProps) {
	const {productFilters, products, headerText, onFilterClickedCB, descriptionText, cardButtonText, providerType} = props;
	const {handleSelectedProduct} = useClientJourney();

	const router = useRouter();

	const [isDisplayMoreBtn, setDisplayMoreBtn] = useState<boolean>(true);
	const [displayProducts, setDisplayProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		setDisplayProducts(products.slice(0, 3));
		setDisplayMoreBtn(products.length > 3);
	}, [products]);

	// Function to handle the button click and toggle the button mode
	function toggleShowMoreOrLess() {
		if (isDisplayMoreBtn) {
			setDisplayProducts(products.slice(0, 6));
			setDisplayMoreBtn(false);
		}
	}

	// onclick function for card cta
	function handleCtaClick(product: IProduct) {
		if (providerType === 'fibre') {
			handleSelectedProduct(product);
			ScrollToPoint('coverage-search-bar');
		}
		// lte logic go to next page
		else {
			handleSelectedProduct(product);
			router.push('/lte/location');
		}
	}

	return (
		<div className={`w-full flex flex-col flex-wrap break-words justify-center items-center py-14 lg:py-24`}>
			{/* Header and description  */}
			<div className='text-center text-mwGrey-900 text-mwTextMobileH1Bold lg:text-mwTextDeskH1Bold mb-2 px-4 lg:px-20'>{headerText}</div>
			{descriptionText && (
				<div className='flex flex-row justify-center items-center flex-wrap mb-10'>
					<span className='text-mwTextParaBase lg:text-mwTextParaXLarge text-center text-mwGrey-600'>{descriptionText}</span>
				</div>
			)}

			{/* enter address text */}
			{!descriptionText && (
				<div className='flex flex-row justify-center items-center flex-wrap mb-8 lg:mb-10 px-4 lg:px-20'>
					<span className='text-mwTextParaBase lg:text-mwTextParaXLarge text-center text-mwGrey-600'>
						<div className=''>
							<span className='text-mwTextLinkBase lg:text-mwTextLinkLarge hover:cursor-pointer inline text-mwPrimary-900' onClick={() => ScrollToPoint('coverage-search-bar')}>
								Enter your address{' '}
							</span>
							to view deals and plans in your area.
						</div>
					</span>
				</div>
			)}

			{/* filters Desktop */}
			<div className='w-full hidden md:flex flex-row justify-center items-center pb-8 px-20'>
				<MwebButtonGroup
					size='large'
					buttons={productFilters.map((x) => ({label: x.label, description: '', isActive: x.selected}))}
					hasDescription={false}
					onClickFunc={(code) => onFilterClickedCB(code)}
				/>
			</div>

			{/* filters Mobile */}
			<div className='w-full flex md:hidden flex-row justify-center items-center pb-6 px-4'>
				<MwebButtonGroup
					size='small'
					buttons={productFilters.map((x) => ({label: x.label, description: '', isActive: x.selected}))}
					hasDescription={false}
					onClickFunc={(code) => onFilterClickedCB(code)}
				/>
			</div>

			{displayProducts.length > 0 ? (
				<div className='w-full flex justify-center items-center mx-auto'>
					{/* Product Cards - Desktop  */}
					<div className='w-full hidden lg:grid grid-cols-3  items-stretch gap-4 lg:gap-6 px-20 lg:mb-10'>
						{displayProducts.map((product, i) => (
							<div key={`${providerType}-landing-product-card-${i}`}>
								<MwebCard
									type='product'
									size='large'
									showButton={true}
									isPromo={product.hasPreProduct}
									onClickCallback={() => handleCtaClick(product)}
									cardDetails={
										{
											btnText: cardButtonText,
											details: [product.highlight1, product.highlight2, product.highlight3, product.highlight4, product.highlight5, product.highlight6],
											price: Number(product.productPrice?.toFixed(2)),
											promoPrice: Number(product?.preProduct?.preProductDiscountedProductRate.toFixed(2)),
											provider: product.providerName,
											speed: `${product.downloadSpeedMbps?.toString()}Mbps`,
											promoTag: product.promoTagline,
											promoLine: product.promoTagline,
											deliveryNotes: product.deliveryNotes,
										} as iProductCardDetails
									}
								/>
							</div>
						))}
					</div>
					{/* Product Cards - Mobile  */}
					<div className='w-full lg:hidden  grid grid-cols-1 md:grid-cols-2 items-center gap-4 lg:gap-6 mb-6'>
						{displayProducts.map((product, i) => (
							<div className='flex justify-self-center' key={`${providerType}-landing-product-card-${i}`}>
								<MwebCard
									type='product'
									size='small'
									showButton={true}
									isPromo={product.hasPreProduct}
									onClickCallback={() => handleCtaClick(product)}
									cardDetails={
										{
											btnText: cardButtonText,
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
							</div>
						))}
					</div>
				</div>
			) : (
				<div className='w-full text-center text-mwTextParaLargeSemi text-mwError-500'>No products available for the selected filter </div>
			)}

			{/* Show more buttons  */}
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
	);
}
