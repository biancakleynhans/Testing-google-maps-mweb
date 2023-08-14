import { IFooter, IFooterCategory, IFooterData, IMobileAppSliceFooter } from '@/models/Footer';
import { IImage, IMobileAppInfo, IMobileAppSlice } from '@/models/mobileAppSlice';

async function getFooterContent(): Promise<IFooterData> {
	//
	let footerData: IFooterData = {
		footerCategories: [],
		mobileAppSlice: {} as IMobileAppSlice
	};

	//  initiate a query[http: POST] to our graphql CMS server
	try {
		// create headers
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		//
		var graphql = JSON.stringify({
			query: `query FooterNav {
				categories(
				  group: "footerNavigation"
				) {
				  ...on footerNavigation_Category {
					__typename
					id
					level
					title
					mainLink
					targetUrl
					analyticsId
					externalLink
					mobileOnly
					parent {
					  ...on footerNavigation_Category {
						id
						title
					  }
					}
				  }
				
				}
				
				entries(
				  section: "contentBlocks"
				  slug: "web-2023-footer-mobile-app"
				) {
				  ... on contentblocks_footerMobileAppSlice2023_Entry {
					__typename
					mobileAppSlice {
					  ... on mobileAppSlice_header_BlockType {
						__typename
						heading
						description
					  }
					  ... on mobileAppSlice_mobileAppStore_BlockType {
						__typename
						mobileAppStoreName
						mobileAppStoreLogo {
						  path
						  width
						  height
						}
						mobileAppStoreUrl
					  }
					}
				  }
				}
			  }`,
			variables: {},
		});

		// Get revalidate time from ENV, with fallback to 5 mins if not found
		const revalidateTime = parseInt(process.env.NEXT_PUBLIC_SERVER_REVALIDATE_VALUE ?? '300', 10);

		// make and API request to the server
		const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
			method: 'POST',
			headers: myHeaders,
			body: graphql,
			redirect: 'follow',
			next: { revalidate: revalidateTime }
		});
		const results = await response.json();

		// extract footer data from Apollo client response
		const footerCategories: IFooter[] = results.data.categories ?? [];
		const mobileAppSliceContent: IMobileAppSliceFooter[] = results.data.entries[0].mobileAppSlice ?? [];
		// transform data to match Components Props interfaces
		const footerContent: IFooterCategory[] = footerCategories
			.filter(
				(footerItem) => footerItem.level === 1 // level 1 category
			)
			.map((currentFooterItem) => {
				//   extend Type to Component Props Interface
				const footerSection: IFooterCategory = {
					...currentFooterItem,
					categories: []
				};

				// update categories
				for (var footerItem of footerCategories) {
					if (footerItem.parent?.id === currentFooterItem.id) {
						footerSection.categories.push(footerItem);
					}
				}

				return footerSection;
			});
		let mobileAppSlice = {} as IMobileAppSlice;
		const mobileAppHeading = mobileAppSliceContent.find(a => !a.mobileAppStoreLogo)
		const mobileAppStoreLogos = (mobileAppSliceContent.filter(a => a.mobileAppStoreLogo))
		let appStoreLogos: IMobileAppInfo[] = []
		for (var footerItem of mobileAppStoreLogos) {
			if (footerItem.mobileAppStoreLogo) {
				const storelogo = footerItem.mobileAppStoreLogo[0]
						appStoreLogos.push({
					__typename: footerItem.__typename,
					targetUrl: footerItem.mobileAppStoreUrl ?? "",
					image: {
						__typename: footerItem.__typename,
						url: footerItem.mobileAppStoreUrl ?? "",
						path: storelogo.path ?? "",
						width: storelogo.width,
						height: storelogo.width,
					} as IImage
				})
			}


		}


		// update response value
		footerData = { 
			footerCategories: footerContent, 
			mobileAppSlice : {
				__typename: mobileAppHeading?.__typename??"",
				description: mobileAppHeading?.heading??"",
				mobileAppInfo:  appStoreLogos,
			}};
	} catch (error) {
		console.log(`\n---\nFooter service failed due to: \n ${error} \n`);
	}

	return footerData;
}

export { getFooterContent };
