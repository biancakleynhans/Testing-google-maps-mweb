 export interface IAboutUs {
    simpleBanner:IBannerImage[]; 
    aboutUsImageSlice:IBannerImage[];
    vasProductUseCases:IVasProductUseCases[];
    bannerInfo: [];
    
  }
  export interface IVasProductUseCases {
      useCaseMainDescription: string;
      useCaseMainHeading:string;
      useCaseImage: {
          path: string;
          width:number;
          height:number;
      }[];
      milestoneImage:{
        path: string;
        width:number;
        height:number;
    }[];
  }
  export interface IBannerImage {
    backgroundImage: {
      path: string;
      width:number;
      height:number;
  }[];
    imageItem1: {
      path: string;
      width:number;
      height:number;
  }[];
    imageItem2: {
      path: string;
      width:number;
      height:number;
  }[];
    slideReference:string;
    summary:string;
    imageItem1Url:string;
    imageItem2Url:string;
    bannerHeading:string;
  }
  async function getAboutUsContent(): Promise<IAboutUs[]> {
    let mainAboutUsData: IAboutUs[] = [];
  
  
  try{ 
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
  
      var graphql = JSON.stringify({
        query: `query MwebHome2023 {
          entries(section: "pages", slug: "mweb-home-2023") {
            title
            slug
            ... on pages_aboutUsLanding_Entry {
              seoPageTitle
              seoPageDescription
              
              simpleBanner {
                ... on simpleBanner_banner_BlockType {
                  __typename
                  bannerHeading
                  bannerDescription
                  backgroundImage {
                    path
                    width
                    height
                  }
                  bannerCtaText
                  bannerCtaUrl
                }
              }
              
              vasProductUseCases {
                ... on vasProductUseCases_useCase_BlockType {
                  __typename
                  useCaseMainHeading
                  useCaseMainDescription
                  useCaseHeading
                  useCaseList {
                      useCaseItem
                  }
                  useCaseImagePosition
                  useCaseImage {
                    path
                    width
                    height
                  }
                }
              }
              
              aboutUsImageSlice {
                ... on aboutUsImageSlice_imageSlice_BlockType {
                  __typename
                  slideReference
                  useBackgroundImage
                  backgroundImage {
                    path
                    width
                    height
                  }
                  useHeaderImage
                  headerImage {
                    path
                    width
                    height
                  }
                  summary
                  imageItem1 {
                    path
                    width
                    height
                  }
                  imageItem1Url
                  imageItem2 {
                    path
                    width
                    height
                  }
                  imageItem2Url
                  imageItem3 {
                    path
                    width
                    height
                  }
                  imageItem3Url
                }
              }
            }
          }
        }
        `,
        variables: {},
      });
  
      const revalidateTime = parseInt(process.env.NEXT_PUBLIC_SERVER_REVALIDATE_VALUE ?? '300', 10);
      const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow',
        next: { revalidate: revalidateTime },
      });
  
      const results = await response.json();
  
      const AboutUsContent: IAboutUs[] = results.data.entries ?? [];
  
      mainAboutUsData = AboutUsContent;
  
      console.log(mainAboutUsData)
  
      } catch (error) {
      console.log(`\n---\about us service failed due to: \n ${error} \n`);
      }
    return mainAboutUsData;
  }
  
  
  export { getAboutUsContent };
  