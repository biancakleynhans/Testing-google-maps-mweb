export interface IHelpMeDecide {
  heading: string;
  subHeading: string;
  supportText: string;
  choices: { text: string; image: string }[];
  types:{ text: string; image: string }[];
  cta?: IHelpMeDecideCTA
}

interface IHelpMeDecideCTA {
  btnUrl: string;
  btnText: string;
}