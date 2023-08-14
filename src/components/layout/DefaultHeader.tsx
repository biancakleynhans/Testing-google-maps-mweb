'use client';

import {INavCategory} from '@/models/nav';
import React from 'react';
import MainNav from '../nav/MainNav';
import TopNav from '../nav/TopNav';
import MwebSliceContainer from '../shared/MwebSliceContainer';

interface iProps {
	topNav: INavCategory[];
	mainNav: INavCategory[];
}

export default function DefaultHeader(props: iProps) {
	const {mainNav, topNav} = props;

	return (
		<>
			{/* PT2-635: Show Top-Nav */}
			<MwebSliceContainer sectionId={'topNav'} bgColor='bg-white'>
				<TopNav topNavContent={topNav} />
			</MwebSliceContainer>

			<MwebSliceContainer sectionId={'nav'} bgColor='bg-mwPrimary-900'>
				<MainNav mainNavContent={mainNav} />
			</MwebSliceContainer>
		</>
	);
}
