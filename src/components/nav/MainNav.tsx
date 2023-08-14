//specifying that this is a client component
'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useToggle} from '@/hooks/useToggle';
import styles from './MainNav.module.css';
import {INav, INavCategory} from '@/models/nav';

import MwebIcon from '@/components/ui/mwebIcon/MwebIcon';

//creating a handle click constant that will handle the onclick events on the link
const handleLinkClick = (item: INav, router: any) => {
	if (item?.externalLink) {
		window.open(item?.targetUrl ? item.targetUrl : '#', '_blank', 'noreferrer');
	} else {
		router.push(item?.targetUrl ? item.targetUrl : '#');
	}
};

//returning the data from INavCategory and structuring it for the mobile view
const MobileView = (props: {updateMenu: Function; openMenu: boolean; mainNavContent: INavCategory[] | undefined}) => {
	const router = useRouter();
	const { openMenu, mainNavContent, updateMenu } = props;
	function setItemActive(id: any) {
		let element = document.getElementById(id);
		element?.classList.toggle("open-dropdown-item");
	}
	return (
		<div className={`${openMenu ? `${styles.mobileDropdownsOpen} bg-mwPrimary-900` : ''} ${styles.mobileDropdowns}`}>
			{mainNavContent?.map((item) => (
				<div key={item.title} id={item.title} className={styles.dropdown} onClick={() => setItemActive(item.title)}>
					<input type='checkbox' id={item.analyticsId} className={styles.checkbox} />
					{item.categories.length > 0 ? (
						<label htmlFor={item.analyticsId} className={`${styles.label} text-mwTextParaBaseSemi ${item.analyticsId}`}>
							{item.title}
							<div className='relative'>
								<MwebIcon variant='functional' iconType={'chevron-down'} size={20} color='text-white' />
							</div>
						</label>
					) : (
						<Link
							href={item.targetUrl ? item.targetUrl : '#'}
							key={item.title}
							className={`${styles.label} ${item.analyticsId}`}
							data-testid={item.analyticsId}
							onClick={(e) => {
								e?.preventDefault();
								if (item?.targetUrl !== '') {
									updateMenu(!openMenu);
									handleLinkClick(item, router);
								}
							}}
						>
							{item.title}
						</Link>
					)}
					{item.categories.length > 0 ? (
						<div className={`${styles.mobileContent} flex flex-col space-y-4`}>
							{item.categories.map((sub: INav) => (
								<Link
									href=''
									key={sub.title}
									className={`${styles.buttonMobile} text-mwTextParaSmallSemi text-mwPrimary-100 ${item.analyticsId}`}
									data-testid={sub.analyticsId}
									onClick={(e) => {
										e?.preventDefault();
										if (sub?.targetUrl !== '') {
											updateMenu(!openMenu);
											handleLinkClick(sub, router);
										}
									}}
								>
									{sub.title}
								</Link>
							))}
						</div>
					) : null}
				</div>
			))}
		</div>
	);
};
//returning the data from INavCategory and structuring it for the desktop view
const DesktopMainView = (props: {openMenu: boolean; mainNavContent: INavCategory[] | undefined}) => {
	const router = useRouter();
	const {openMenu, mainNavContent} = props;
	return (
		<div className={`${openMenu ? styles.dropdownsOpen : ''} ${styles.dropdowns}`}>
			{mainNavContent?.map((item, i) => (
				<div key={item.title} className={`${styles.dropdown}  py-[20px] md:py-[22px]`}>
					<Link
						href={item.targetUrl ? item.targetUrl : '#'}
						className={`${styles.mainLink}  py-[20px] lg:py-[22px] lg:text-mwTextParaBaseSemi text-white hover:text-mwPrimary-100 ${item.analyticsId} ${
							i === mainNavContent?.length - 1 ? 'mr-0' : 'mr-8'
						}`}
						data-testid={item.analyticsId}
						onClick={(e) => {
							e?.preventDefault();
							if (item?.targetUrl !== '') handleLinkClick(item, router);
						}}
					>
						<span>{item.title}</span>
						{item.categories.length > 0 && (
							<div className='relative p-1'>
								<MwebIcon variant='functional' iconType={'chevron-down'} size={20} color='text-white' />
							</div>
						)}
					</Link>
					{item.categories.length > 0 ? (
						<div className={`${styles.dropdownMenu} rounded-2xl bg-mwBlueGrey-25`}>
							{item.categories.map(
								(sub: INav) =>
									!sub.mobileOnly && (
										<Link
											href={sub.targetUrl ? sub.targetUrl : '#'}
											key={sub.title}
											className={`whitespace-nowrap w-full block text-mwPrimary-900 text-mwTextParaSmallSemi p-4 bg-transparent hover:bg-white hover:rounded-lg ${item.analyticsId}`}
											data-testid={sub.analyticsId}
											onClick={(e) => {
												e?.preventDefault();
												if (sub?.targetUrl !== '') handleLinkClick(sub, router);
											}}
										>
											{sub.title}
										</Link>
									)
							)}
						</div>
					) : null}
				</div>
			))}
		</div>
	);
};

// main constant to be exported, that return the desktop and mobile view structure and retrieved data
const MainNav = ({mainNavContent}: {mainNavContent: INavCategory[] | undefined}) => {
	const [openMenu, seeMainNavMenu] = useToggle(); // mobile menu toggles

	return (
		<nav className={`${styles.navbar} px-4 md:px-20`}>
			<div className={`${styles.container}`}>
				<Link href='/' className={`${styles.logo} my-[20px] md:my-[22px]`}>
					<Image
						src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/mweb-logo-2020-white.png`}
						fill={true}
						sizes="(max-width: 768px) 91.333px, 137px"
						alt='Mweb logo'
						priority={true}
					/>
				</Link>

				<button onClick={seeMainNavMenu} className={`${openMenu ? styles.close : ''} ${styles.burger}`}>
					{openMenu ? (
						<MwebIcon variant='functional' iconType={'multiply'} size={24} color='text-white' />
					) : (
						<MwebIcon variant='functional' iconType={'menu'} size={24} color='text-white' />
					)}
				</button>

				<MobileView openMenu={openMenu} mainNavContent={mainNavContent} updateMenu={seeMainNavMenu} />
				<DesktopMainView openMenu={openMenu} mainNavContent={mainNavContent} />
			</div>
			<div className={styles.cart}>
				<div className='hidden md:flex'>
					 <MwebIcon variant='basic' iconType={'cart-empty'} size={24} color='text-white' />
				</div>
				<div className='flex md:hidden pt-[7px]'>
					 <MwebIcon variant='basic' iconType={'cart-empty'} size={20} color='text-white' />
				</div>
			</div>
		</nav>
	);
};

export default MainNav;
