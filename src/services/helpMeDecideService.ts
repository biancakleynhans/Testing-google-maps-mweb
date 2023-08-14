
import {IHelpMeDecide} from '@/models/HelpMeDecideModels';

// Convert the raw Landing Page Product Craft Data to an object that's easier to reference
function getHelpMeDecideCraftData(helpMeDecide: any[]): IHelpMeDecide {
    let content: IHelpMeDecide = {
        heading: '', subHeading: '',
        supportText: '',
        choices: [],
        types: []
    }

    if (helpMeDecide && helpMeDecide.length > 0) {
        // console.log(helpMeDecide, "Help me decide")
        for (const contentItem of helpMeDecide) {
            if (contentItem.__typename === 'helpMeDecide_heading_BlockType') {
                content.heading= contentItem.heading
                content.subHeading= contentItem.description
                
            }
            if (contentItem.__typename === 'helpMeDecide_internetUseOptions_BlockType') {
                 const option = [];
                //  console.log(contentItem.option)
                if (contentItem.option) {
                    for (const filter of contentItem.option) {
                        const filterObject = {
                             text: filter.optionName, 
                             image: filter.mwebIcon
                        }
                        option.push(filterObject);
                    }
                }

                content.choices = option;
                content.types=option
            }
            if (contentItem.__typename === 'helpMeDecide_callToAction_BlockType') {
                content.cta = {
                    btnText: contentItem.callToActionText,
                    btnUrl: contentItem.callToActionUrl
                }
            }        
        }
    }

    return content;
}

export const HelpMeDecideService = {
    getHelpMeDecideCraftData
}
