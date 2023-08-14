import React from 'react';
import ProgressionHeader from '../ClientJourneyLayout/ProgressionHeader';
import DefaultHeader from './DefaultHeader';

import {INavCategory} from '@/models/nav';
import {providerJourneyStatus, providerJourneyType} from '@/context/CoverageContext';
import {NavigationHeaderTypes, iNavContent} from '@/constants/NavJourneySets';

interface iProps {
	navState: iNavContent;
	navType: providerJourneyType;
	mainNav: INavCategory[];
	topNav: INavCategory[];
	currentProviderStatus: providerJourneyStatus;
}

export default function Header(props: iProps) {
	const {navState, currentProviderStatus, navType, mainNav, topNav} = props;

	// const {scrollDirection, scrollYPos} = useScrollDirection();
	// const [scroll, setscroll] = useState<number>(0);

	// const STICKY = 'sticky z-[500]';
	// const defualt = scrollDirection === 'down' ? 'relative top-auto' : `${STICKY} top-0`;
	// const journey = `${STICKY} top-0`;

	// useEffect(() => {
	// 	// console.log('VAL ===', -scrollYPos);

	// 	// use val between 100 and 0
	// 	if (scrollYPos >= -185 && scrollYPos <= 185) {
	// 		// if scrolling down needs to be negative
	// 		if (scrollDirection === 'down') {
	// 			setscroll(-scrollYPos);
	// 		}
	// 		// if scroling up we need to go negative 100 - scrollY till 0
	// 		else {
	// 			setscroll(-scrollYPos);
	// 		}
	// 	}
	// }, [scrollDirection, scrollYPos]);

	return (
		<section
			// style={{transition: 'transform 0.3s ease 0s', transform: `translateY(${scroll}%)`}}
			// className={navState && navState.headerType !== NavigationHeaderTypes.Default ? journey : defualt}
			className='sticky top-0 z-[500]'
		>
			{navState && navState.headerType !== NavigationHeaderTypes.Default ? (
				<ProgressionHeader navType={navType} statusType={currentProviderStatus} />
			) : (
				<DefaultHeader mainNav={mainNav} topNav={topNav} />
			)}
		</section>
	);
}
