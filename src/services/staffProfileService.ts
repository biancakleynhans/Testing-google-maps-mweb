 export interface IStaffProfile {
    title: string;
    jobTitle: string;
    firstName: string;
    biography: string;
    lastName: string;
    image: string;
    profilePicture:[{
        path: string;
        width:number;
        height:number;
    }]
  }


  async function getStaffProfileContent(): Promise<IStaffProfile[]> {
    let staffProfileData: IStaffProfile[] = [];
  
  
  try{ 
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
  
      var graphql = JSON.stringify({
        query: `query StaffProfiles {
            entries(section: "staffprofiles", orderBy: "displaySortOrder ASC") {
              title
              slug
              ... on staffProfiles_staffProfiles_Entry {
                firstName
                lastName
                displaySortOrder
                jobTitle
                biography
                profilePicture {
                  path
                  width
                  height
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
  
      const staffProfileContent: IStaffProfile[] = results.data.entries ?? [];
  
      staffProfileData = staffProfileContent;
  
      console.log(staffProfileData)
  
      } catch (error) {
      console.log(`\n---\staff service failed due to: \n ${error} \n`);
      }
    return staffProfileData;
  }
  
  
  export { getStaffProfileContent };
  