import './globals.css';
import {Inter} from 'next/font/google';
import {Suspense} from 'react';
import {getMainNavContent} from '@/services/mainNavService';
import {getTopNavContent} from '@/services/topNavService';
import NavigationProvider from '@/context/NavigationContext';
import ClientJourneyContext from '@/context/ClientJourneyContext';
import CoverageContext from '@/context/CoverageContext';
import InternetServiceProvidersContext from '@/context/InternetServiceProvidersContent';
import ProductContext from '@/context/ProductContext';
import Analytics from '@/components/analytics/Analytics';
import ShoppingCartSession from '@/components/shoppingCartSession/ShoppingCartSession';
import {getIspContent} from '@/services/IspService';
import {getAllProducts} from '@/services/ProductDataService';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

/*
    <head /> will contain the components returned by the nearest parent
    head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
*/

export default async function RootLayout({children}: {children: React.ReactNode}) {
	const mainNavData = await getMainNavContent();
	const topNavData = await getTopNavContent();
	const ispData = await getIspContent();
	const productData = await getAllProducts();

	const [mainNav, topNav] = await Promise.all([mainNavData, topNavData]);

	return (
		<html lang='en'>
			<head />
			<body className={`${inter.variable} ${inter.className} font-sans`}>
				<ShoppingCartSession />
				<Suspense>
					<Analytics />
				</Suspense>

				<ClientJourneyContext>
					<InternetServiceProvidersContext ispArrayFromCraft={ispData}>
						<ProductContext products={productData}>
							<CoverageContext>
								<NavigationProvider mainNav={mainNav} topNav={topNav}>
									{children}
								</NavigationProvider>
							</CoverageContext>
						</ProductContext>
					</InternetServiceProvidersContext>
				</ClientJourneyContext>
			</body>
		</html>
	);
}
