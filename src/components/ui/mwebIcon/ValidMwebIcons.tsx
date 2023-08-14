import {
	EmptyCart,
	CartItem,
	LockIcon,
	CircleCheck,
	CircleMinus,
	CircleMultiply,
	CirclePlus,
	Edit,
	Info,
	Remove,
	VisibilityOff,
	VisibilityOn,
	LocationIcon,
	ErrorIcon,
} from './MwebBasicIcons';
import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	ArrowUp,
	Check,
	MenuIcon,
	MinusLarge,
	MinusSmall,
	Multiply,
	PlusLarge,
	PlusSmall,
	ArrowSolidDown,
	ArrowSolidUp,
	ArrowSolidLeft,
	ArrowSolidRight,
	Search,
} from './MwebFunctionalIcons';
import {FaceBook, Instagram, Twitter, YouTube} from './MwebSocialIcons';

import {Visa, MasterCard,StandardBank,Capitec,Fnb, Absa} from './BankIcons';
interface iIconEntry {
	name: string;
	lib: string;
	fullname: string;
	variant?: 'basic' | 'functional' | 'social';
}

export interface iIllustrationEntry {
	name: string;
	size: {width: number; height: number};
	imgUrl: string;
}

export interface iIconType {
	isValid: boolean;
	lib: string;
	icon: string;
}

/* LIST OF VALID MWEB ICONS THIS CAN BE EXTENDED HERE ONLY */
export const validMwebIcons: iIconEntry[] = [
	{variant: 'basic', name: 'plus', lib: 'ai', fullname: 'AiFillPlusCircle'},
	{variant: 'basic', name: 'info', lib: 'md', fullname: 'MdInfo'},
	{variant: 'basic', name: 'lock', lib: 'md', fullname: 'MdLock'},
	{variant: 'basic', name: 'view', lib: 'bs', fullname: 'BsEyeFill'},
	{variant: 'basic', name: 'hide', lib: 'bs', fullname: 'BsEyeSlashFill'},
	{variant: 'basic', name: 'error', lib: 'md', fullname: 'MdOutlineError'},
	{variant: 'basic', name: 'minus', lib: 'ai', fullname: 'AiFillMinusCircle'},
	{variant: 'basic', name: 'close', lib: 'md', fullname: 'MdCancel'},
	{variant: 'basic', name: 'check', lib: 'fa', fullname: 'FaCheckCircle'},
	{variant: 'basic', name: 'trash', lib: 'md', fullname: 'MdDeleteForever'},
	{variant: 'basic', name: 'circle', lib: 'fa', fullname: 'FaRegCircle'},
	{variant: 'basic', name: 'pencil', lib: 'fa', fullname: 'FaPen'},
	{variant: 'basic', name: 'location', lib: 'hi', fullname: 'HiLocationMarker'},

	{variant: 'basic', name: 'radio-checked', lib: 'cg', fullname: 'CgRadioChecked'},
	{variant: 'basic', name: 'radio-unchecked', lib: 'cg', fullname: 'CgRadioCheck'},

	{variant: 'functional', name: 'chevron-up', lib: 'fi', fullname: 'FiChevronUp'},
	{variant: 'functional', name: 'chevron-down', lib: 'fi', fullname: 'FiChevronDown'},
	{variant: 'functional', name: 'chevron-left', lib: 'fi', fullname: 'FiChevronLeft'},
	{variant: 'functional', name: 'chevron-right', lib: 'fi', fullname: 'FiChevronRight'},

	{variant: 'functional', name: 'arrow-up', lib: 'fi', fullname: 'FiArrowUp'},
	{variant: 'functional', name: 'arrow-down', lib: 'fi', fullname: 'FiArrowDown'},
	{variant: 'functional', name: 'arrow-left', lib: 'fi', fullname: 'FiArrowLeft'},
	{variant: 'functional', name: 'arrow-right', lib: 'fi', fullname: 'FiArrowRight'},

	{variant: 'functional', name: 'drop-up', lib: 'md', fullname: 'MdArrowDropUp'},
	{variant: 'functional', name: 'drop-down', lib: 'md', fullname: 'MdArrowDropDown'},
	{variant: 'functional', name: 'drop-left', lib: 'md', fullname: 'MdArrowLeft'},
	{variant: 'functional', name: 'drop-right', lib: 'md', fullname: 'MdArrowRight'},

	{variant: 'functional', name: 'plus', lib: 'fi', fullname: 'FiPlus'},
	{variant: 'functional', name: 'plus-bold', lib: 'fa', fullname: 'FaPlus'},
	{variant: 'functional', name: 'minus', lib: 'fi', fullname: 'FiMinus'},
	{variant: 'functional', name: 'minus-bold', lib: 'fa', fullname: 'FaMinus'},

	{variant: 'functional', name: 'close', lib: 'md', fullname: 'MdClose'},
	{variant: 'functional', name: 'check', lib: 'md', fullname: 'MdCheck'},
	{variant: 'functional', name: 'menu', lib: 'fi', fullname: 'FiMenu'},

	{variant: 'social', name: 'facebook', lib: 'fa', fullname: 'FaFacebook'},
	{variant: 'social', name: 'twitter', lib: 'fa', fullname: 'FaTwitter'},
	{variant: 'social', name: 'instagram', lib: 'fi', fullname: 'FiInstagram'},
	{variant: 'social', name: 'youtube', lib: 'fa', fullname: 'FaYoutube'},
];

export const IconComponents: any = {
	search: (color: string, size: number) => Search(color, size),
	'cart-empty': (color: string, size: number) => EmptyCart(color, size),
	'cart-item': (color: string, size: number) => CartItem(color, size),
	lock: (color: string, size: number) => LockIcon(color, size),
	'circle-check': (color: string, size: number) => CircleCheck(color, size),
	'circle-minus': (color: string, size: number) => CircleMinus(color, size),
	'circle-multiply': (color: string, size: number) => CircleMultiply(color, size),
	'circle-plus': (color: string, size: number) => CirclePlus(color, size),
	edit: (color: string, size: number) => Edit(color, size),
	error: (color: string, size: number) => ErrorIcon(color, size),
	info: (color: string, size: number) => Info(color, size),
	location: (color: string, size: number) => LocationIcon(color, size),
	remove: (color: string, size: number) => Remove(color, size),
	'visibility-off': (color: string, size: number) => VisibilityOff(color, size),
	'visibility-on': (color: string, size: number) => VisibilityOn(color, size),

	multiply: (color: string, size: number) => Multiply(color, size),
	menu: (color: string, size: number) => MenuIcon(color, size),
	check: (color: string, size: number) => Check(color, size),

	'minus-large': (color: string, size: number) => MinusLarge(color, size),
	minus: (color: string, size: number) => MinusSmall(color, size),
	'plus-large': (color: string, size: number) => PlusLarge(color, size),
	plus: (color: string, size: number) => PlusSmall(color, size),

	'arrow-down': (color: string, size: number) => ArrowDown(color, size),
	'arrow-up': (color: string, size: number) => ArrowUp(color, size),
	'arrow-left': (color: string, size: number) => ArrowLeft(color, size),
	'arrow-right': (color: string, size: number) => ArrowRight(color, size),

	'arrow-solid-down': (color: string, size: number) => ArrowSolidDown(color, size),
	'arrow-solid-up': (color: string, size: number) => ArrowSolidUp(color, size),
	'arrow-solid-left': (color: string, size: number) => ArrowSolidLeft(color, size),
	'arrow-solid-right': (color: string, size: number) => ArrowSolidRight(color, size),

	'chevron-down': (color: string, size: number) => ChevronDown(color, size),
	'chevron-up': (color: string, size: number) => ChevronUp(color, size),
	'chevron-left': (color: string, size: number) => ChevronLeft(color, size),
	'chevron-right': (color: string, size: number) => ChevronRight(color, size),

	twitter: (color: string, size: number) => Twitter(color, size),
	facebook: (color: string, size: number) => FaceBook(color, size),
	instagram: (color: string, size: number) => Instagram(color, size),
	youtube: (color: string, size: number) => YouTube(color, size),
};


export const bankIconsComponents:any = {
	visa: (height:number, width:number, alt:string) => Visa({height,width,alt}),
	mastercard: (height:number, width:number, alt:string) => MasterCard({height,width,alt}),
	'standard-bank': (height:number, width:number, alt:string) => StandardBank({height,width,alt}),
	capitec: (height:number, width:number, alt:string) => Capitec({height,width,alt}),
	fnb: (height:number, width:number, alt:string) => Fnb({height,width,alt}),
	absa: (height:number, width:number, alt:string) => Absa({height,width,alt}),
}

/* LIST OF ILLUSTRATION ICONS THIS CAN BE EXTENDED HERE ONLY  */
export const validMwebIllustrations: iIllustrationEntry[] = [
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-step-one.png`,
		name: 'step-1',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-step-two.png`,
		name: 'step-2',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-step-three.png`,
		name: 'step-3',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-step-four.png`,
		name: 'step-4',
		size: {height: 48, width: 48},
	},
	{imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-video.png`, name: 'video', size: {height: 48, width: 48}},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-transport.png`,
		name: 'transport',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-streaming.png`,
		name: 'streaming',
		size: {height: 48, width: 48},
	},
	{imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-star.png`, name: 'star', size: {height: 48, width: 48}},
	{imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-music.png`, name: 'music', size: {height: 48, width: 48}},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-photos.png`,
		name: 'photos',
		size: {height: 48, width: 48},
	},
	{imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-home.png`, name: 'home', size: {height: 48, width: 48}},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-learning.png`,
		name: 'learnering',
		size: {height: 48, width: 48},
	},
	{imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-heart.png`, name: 'heart', size: {height: 48, width: 48}},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-gaming.png`,
		name: 'gaming',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-browsing.png`,
		name: 'browsing',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-basket.png`,
		name: 'basket',
		size: {height: 48, width: 48},
	},
	{imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/display-icon-badge.png`, name: 'badge', size: {height: 48, width: 48}},

	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-products-lte.png`,
		name: 'lte',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-products-hosting-and-domains.png`,
		name: 'hosting-domains',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-products-internet-security.png`,
		name: 'internet-security',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-products-fibre.png`,
		name: 'fibre',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-products-home-office.png`,
		name: 'home-office',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-products-entertainment.png`,
		name: 'entertainment',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-router-portable.png`,
		name: 'router-poritable',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-products-5g.png`,
		name: '5g',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-router-fixed.png`,
		name: 'router-fixed',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-router-both.png`,
		name: 'router-both',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-devices-4.png`,
		name: 'devices-4',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-devices-3.png`,
		name: 'devices-3',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-devices-2.png`,
		name: 'devices-2',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-devices-1.png`,
		name: 'devices-1',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-budget-3.png`,
		name: 'budget-3',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-budget-2.png`,
		name: 'budget-2',
		size: {height: 48, width: 48},
	},
	{
		imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/icons/illustrations/illustration-general-budget-1.png`,
		name: 'budget-1',
		size: {height: 48, width: 48},
	},
];
