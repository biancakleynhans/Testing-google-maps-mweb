export interface IConfirmationPageService {
	thanks_note: string;
	order_number_text: string;
	order_number: number;
	sms_text: string;
	order_track: string;
	callout_text1: string;
	callout_text2: string;
	button_text: string;
	image_path: string;
}

const confirmationPageData: IConfirmationPageService[] = [
	{
		thanks_note: 'Your order is confirmed!',
		order_number_text: 'Your order number is: ',
		order_number: 564182,
		sms_text: 'We will keep you updated every step of the way, so sit tight and look out for any communication. Delivery and installation can take up to 10 days.',
		order_track: 'Track Order Online',
		callout_text1: 'Next Steps',
		callout_text2: 'Delivery and installation can take up to 10 days. Download our App for updates and look out for e-mail and SMS’s. ',
		button_text: 'Print Or Download',
		image_path: 'https://i.postimg.cc/JhWWYfTy/Call-To-Action.png',
	},
];

export {confirmationPageData};
