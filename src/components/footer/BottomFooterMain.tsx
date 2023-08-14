'use client';
import styles from './Footer.module.css';

import React, {Fragment} from 'react';
import Link from 'next/link';
interface IProps {
	variant: 'full' | 'condensed' | 'banner';
	bgColor?: string;
}
/**
 *
 * @param footerContent: IFooterCategory[]
 * @returns HTML:  Renders the categories and links in a structured manner.
 */
const Links = [
	{
		label: 'About Us',
		url: '/about-us',
	},
	{
		label: 'Legal Notices',
		url: '/legal-notices/home',
	},
	{
		label: 'Privacy Policy',
		url: '/legal-notices/policies/privacy-policy',
	},
	{
		label: 'Acceptable Use Policy',
		url: '/legal-notices/policies/acceptable-use-policy',
	},
];
// { footerContent }: { footerContent: IFooterCategory[] }
function BottomFooterMain({variant, bgColor}: IProps) {
	return (
		<Fragment>
			{/**  Bottom Section that contains About Us, Privacy Policy links*/}
			<section className={`flex flex-col md:flex-row justify-between gap-4 py-8 desktop:py-12   ${variant === 'condensed' && !bgColor && 'border-t-[1px] border-mwPrimary-200 '}`}>
				{/**  Links and copywrite  */}
				<div
					className={`flex flex-col justify-start items-left md:items-start gap-2 ${variant === 'condensed' ? 'text-mwGrey-600' : 'text-white'}`}
					data-testid='second_part_of_the_footer_section'
				>
					{/** LINKS */}
					<div className='flex flex-col justify-start items-start  gap-2'>
						<div className='laptop:text-left'>
							{Links.map((item, index) => {
								return (
									<div className={`${styles.links}  text-mwTextParaXSmall md:text-mwTextParaSmall inline-block`} key={index}>
										<Link href={item.url}>{item.label}</Link>
									</div>
								);
							})}
						</div>
					</div>

					{/** COPYWRITE */}
					<p className='text-left text-mwTextParaXSmall md:text-mwTextParaSmall' data-testid='footer-copywirte'>
						©Mweb. Trading as a division of Internet Solutions Digital (Pty) Ltd. All rights reserved.
					</p>
				</div>

				{/** ISP Logo */}
				<div data-testid='ISP_Logo'>
					<svg width={44} height={41} viewBox='0 0 44 41' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-11 h-10 relative' preserveAspectRatio='none'>
						<path
							d='M0 39.7434H3.55215V0.449243H0V39.7434ZM11.2009 0.109375C7.41544 0.109375 5.54861 2.04401 5.54861 5.9133V10.593C5.60047 12.3708 6.09311 14.0963 7.00059 15.6126L12.2381 24.8153C12.9122 25.9656 13.2493 27.2466 13.2493 28.58V34.0963C13.2493 36.0309 12.5233 36.9983 11.0972 36.9983C9.67118 36.9983 8.89334 36.0309 8.84149 34.0963V28.9198H5.34119V34.3055C5.34119 38.1747 7.25987 40.1094 11.0972 40.1094C14.9346 40.1094 16.8533 38.1747 16.8533 34.3055V28.1094C16.8533 26.41 16.4125 24.763 15.5569 23.3251L9.90454 13.5211C9.33412 12.4231 9.04891 11.2205 9.10077 9.96559V5.83487C9.10077 4.05709 9.80083 3.1682 11.2009 3.1682C12.6011 3.1682 13.3011 4.05709 13.3011 5.83487V10.6192H16.8533V5.59957C16.8533 1.93944 14.9864 0.109375 11.2009 0.109375V0.109375ZM24.2946 0.449243H18.6423V39.7434H22.1945V22.044H24.2946C25.954 22.227 27.6394 21.7564 28.9617 20.7368C29.921 19.3774 30.3618 17.7041 30.1544 16.0571V6.41003C30.3359 4.73683 29.8692 3.06362 28.8839 1.73029C27.5875 0.736825 25.9281 0.266237 24.2946 0.449243V0.449243ZM26.68 16.5538C26.68 18.2009 25.7725 19.0113 23.9316 19.0113H22.1945V3.50807H23.9316C25.7725 3.50807 26.68 4.31853 26.68 5.96558V16.5538ZM39.7996 11.3773C39.7996 11.9264 40.2404 12.397 40.8108 12.397C41.3813 12.397 41.822 11.9525 41.822 11.3773C41.822 10.8283 41.3813 10.3577 40.8108 10.3577C40.2404 10.3577 39.7996 10.8283 39.7996 11.3773ZM41.0701 0.8414V9.80872C41.7183 9.93944 42.211 10.4362 42.3406 11.0898H43.9222V5.83487C43.9222 4.91983 43.9222 1.88715 41.0701 0.8414V0.8414ZM40.7849 12.946C39.9034 12.946 39.2033 12.214 39.2033 11.3251C39.2033 10.5669 39.7478 9.9133 40.4997 9.75643V0.606107C39.9552 0.475388 39.3848 0.423099 38.8144 0.449243H38.2958V13.5211C38.944 13.6519 39.4367 14.1486 39.5663 14.8022H44V11.6388H42.4184C42.2369 12.4231 41.5628 12.9721 40.7849 12.946ZM34.0955 18.7499C34.0955 19.2989 34.5362 19.7695 35.1067 19.7695C35.6771 19.7695 36.1179 19.3251 36.1179 18.7499C36.1179 18.2009 35.6771 17.7303 35.1067 17.7303C34.5362 17.7303 34.0955 18.2009 34.0955 18.7499ZM36.9735 15.0898C36.9735 15.6388 37.4143 16.1094 37.9847 16.1094C38.5292 16.1094 38.9959 15.6649 38.9959 15.0898C38.9959 14.5407 38.5551 14.0702 37.9847 14.0702C37.4402 14.0702 36.9735 14.4885 36.9735 15.0375V15.0898V15.0898ZM35.1067 20.3447C34.2251 20.3447 33.525 19.6126 33.525 18.7238C33.525 17.9656 34.0695 17.312 34.8215 17.1551V0.893689C32.2546 2.04402 32.2286 4.94598 32.2286 5.80872V39.6911H35.7808V21.9917H40.3441V39.6911H43.9222V18.959H36.6364C36.5068 19.7172 35.8586 20.2662 35.1067 20.2662V20.3447V20.3447ZM37.9847 16.6845C37.1031 16.6845 36.4031 15.9525 36.4031 15.0636C36.4031 14.3055 36.9476 13.6519 37.6995 13.495V0.4231H37.3624C36.6883 0.4231 36.0141 0.501531 35.3659 0.684538V17.129C36.0141 17.2597 36.5068 17.7564 36.6364 18.41H43.9222V15.3251H39.5144C39.3848 16.0832 38.7107 16.6323 37.9588 16.6323L37.9847 16.6845Z'
							fill={`${variant === 'condensed' ? '#475467' : '#FFFFFF'}`}
						/>
					</svg>
				</div>
			</section>
		</Fragment>
	);
}

export default BottomFooterMain;
