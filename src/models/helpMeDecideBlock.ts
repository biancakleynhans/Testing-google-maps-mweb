export interface IHelpMeDecide {
    __typename: string
    heading?: string
    description?: string
    option?: HelpMeDecideOption[]
}

export interface HelpMeDecideOption {
    optionName: string
    filterKey: string
    mwebIcon: string
}
