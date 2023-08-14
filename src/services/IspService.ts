interface iImage {
	filename: string;
	height: number;
	path: string;
	width: number;
}

export interface IISP {
	coverageRef: string;
	displayPromoBanner: boolean;
	friendlyName: string;
	heroImage: iImage[];
	image: iImage[];
	promoBannerContent: {} | null;
	promoBannerRibbonColor: string;
	promoBannerRibbonText: string | null;
	promoBannerRibbonTextColor: string;
	promoImage: iImage[];
	providerBannerImage: iImage[];
	providerProductBlockHeroText: string | null;
	providerSearchRef: string;
	services: string[];
	showOnProviderCarousel: boolean;
	slugifyName: string;
	solidName: string;
	switchEnabled: boolean;
	usePromoImage: boolean;

	providerConnectivityType: string[];
	slug: string;

	hasAddressList: boolean;
}

const FibreGraphql = JSON.stringify({
	query: `query InfrastructureProviderFullData {
    entries(
      section: "infrastructureProviders"
      providerConnectivityType: "fibre"
    ) {
      ... on infrastructureProviders_default_Entry {
        slug
        providerConnectivityType
        infrastructureProvider {
          ... on infrastructureProvider_provider_BlockType {
            friendlyName
            coverageRef
            providerSearchRef
            solidName
            slugifyName
            switchEnabled
			hasAddressList
            showOnProviderCarousel
            image {
              path
              width
              height
              filename
            }
            heroImage {
              path
              width
              height
              filename
            }
            usePromoImage
            promoImage {
              path
              width
              height
              filename
            }
            services
            displayPromoBanner
            promoBannerRibbonColor
            promoBannerRibbonText
            promoBannerRibbonTextColor
            promoBannerContent
            providerBannerImage {
              path
              width
              height
              filename
            }
            providerProductBlockHeroText
          }
        }
      }
    }
  }`,
	variables: {},
});

const LteGraphql = JSON.stringify({
	query: `query InfrastructureProviderFullData {
    entries(
      section: "infrastructureProviders"
      providerConnectivityType: "lte"
    ) {
      ... on infrastructureProviders_default_Entry {
        slug
        providerConnectivityType
        infrastructureProvider {
          ... on infrastructureProvider_provider_BlockType {
            friendlyName
            coverageRef
            providerSearchRef
            solidName
            slugifyName
            switchEnabled
			hasAddressList
            showOnProviderCarousel
            image {
              path
              width
              height
              filename
            }
            heroImage {
              path
              width
              height
              filename
            }
            usePromoImage
            promoImage {
              path
              width
              height
              filename
            }
            services
            displayPromoBanner
            promoBannerRibbonColor
            promoBannerRibbonText
            promoBannerRibbonTextColor
            promoBannerContent
            providerBannerImage {
              path
              width
              height
              filename
            }
            providerProductBlockHeroText
          }
        }
      }
    }
  }`,
	variables: {},
});

async function getIspContent(): Promise<IISP[]> {
	let ispContent: IISP[] = [];

	// create headers
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	// Get revalidate time from ENV, with fallback to 5 mins if not found
	const revalidateTime = parseInt(process.env.NEXT_PUBLIC_SERVER_REVALIDATE_VALUE ?? '300', 10);

	// FIBRE ISP's
	try {
		// make an API request to the server
		const responseFibre = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
			method: 'POST',
			headers: myHeaders,
			body: FibreGraphql,
			redirect: 'follow',
			next: {revalidate: revalidateTime},
		});

		const result = await responseFibre.json();

		// check if we get valid response data
		if (result?.data?.entries?.length > 0) {
			// format response data

			result.data.entries.forEach((isp: any) => {
				let obj = {
					slug: isp.slug,
					providerConnectivityType: isp.providerConnectivityType,
					coverageRef: isp.infrastructureProvider[0].coverageRef,
					displayPromoBanner: isp.infrastructureProvider[0].displayPromoBanner,
					friendlyName: isp.infrastructureProvider[0].friendlyName,
					heroImage: isp.infrastructureProvider[0].heroImage,
					image: isp.infrastructureProvider[0].image,
					promoBannerContent: isp.infrastructureProvider[0].promoBannerContent,
					promoBannerRibbonColor: isp.infrastructureProvider[0].promoBannerRibbonColor,
					promoBannerRibbonText: isp.infrastructureProvider[0].promoBannerRibbonText,
					promoBannerRibbonTextColor: isp.infrastructureProvider[0].promoBannerRibbonTextColor,
					promoImage: isp.infrastructureProvider[0].promoImage,
					providerBannerImage: isp.infrastructureProvider[0].providerBannerImage,
					providerProductBlockHeroText: isp.infrastructureProvider[0].providerProductBlockHeroText,
					providerSearchRef: isp.infrastructureProvider[0].providerSearchRef,
					services: isp.infrastructureProvider[0].services,
					showOnProviderCarousel: isp.infrastructureProvider[0].showOnProviderCarousel,
					slugifyName: isp.infrastructureProvider[0].slugifyName,
					solidName: isp.infrastructureProvider[0].solidName,
					switchEnabled: isp.infrastructureProvider[0].switchEnabled,
					usePromoImage: isp.infrastructureProvider[0].usePromoImage,
					hasAddressList: isp.infrastructureProvider[0].hasAddressList ?? false,
				} as IISP;

				ispContent.push(obj);
			});

			// ispContent = result?.data?.entries;
		}
	} catch (error) {
		console.log(`\n---\n failed to get ISP content from craft due to: \n ${error} \n`);
	}

	try {
		// make an API request to the server
		const responseLte = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
			method: 'POST',
			headers: myHeaders,
			body: LteGraphql,
			redirect: 'follow',
			next: {revalidate: revalidateTime},
		});

		const result = await responseLte.json();

		// check if we get valid response data
		if (result?.data?.entries?.length > 0) {
			// format response data

			result.data.entries.forEach((isp: any) => {
				let obj = {
					slug: isp.slug,
					providerConnectivityType: isp.providerConnectivityType,
					coverageRef: isp.infrastructureProvider[0].coverageRef,
					displayPromoBanner: isp.infrastructureProvider[0].displayPromoBanner,
					friendlyName: isp.infrastructureProvider[0].friendlyName,
					heroImage: isp.infrastructureProvider[0].heroImage,
					image: isp.infrastructureProvider[0].image,
					promoBannerContent: isp.infrastructureProvider[0].promoBannerContent,
					promoBannerRibbonColor: isp.infrastructureProvider[0].promoBannerRibbonColor,
					promoBannerRibbonText: isp.infrastructureProvider[0].promoBannerRibbonText,
					promoBannerRibbonTextColor: isp.infrastructureProvider[0].promoBannerRibbonTextColor,
					promoImage: isp.infrastructureProvider[0].promoImage,
					providerBannerImage: isp.infrastructureProvider[0].providerBannerImage,
					providerProductBlockHeroText: isp.infrastructureProvider[0].providerProductBlockHeroText,
					providerSearchRef: isp.infrastructureProvider[0].providerSearchRef,
					services: isp.infrastructureProvider[0].services,
					showOnProviderCarousel: isp.infrastructureProvider[0].showOnProviderCarousel,
					slugifyName: isp.infrastructureProvider[0].slugifyName,
					solidName: isp.infrastructureProvider[0].solidName,
					switchEnabled: isp.infrastructureProvider[0].switchEnabled,
					usePromoImage: isp.infrastructureProvider[0].usePromoImage,
					hasAddressList: isp.infrastructureProvider[0].hasAddressList ?? false,
				} as IISP;

				ispContent.push(obj);
			});

			// ispContent = result?.data?.entries;
		}
	} catch (error) {
		console.log(`\n---\n failed to get ISP content from craft due to: \n ${error} \n`);
	}

	return ispContent;
}

export {getIspContent};
