'use client';

import { useState, useEffect, useCallback } from 'react';
import { Transition } from '@headlessui/react';

import { ISEO } from '@/models/SEO';

// React component for displaying SEO information
export default function SEOSlice({ seo }: { seo: ISEO }) {
	// Maximum number of characters to be displayed for sectionDescription
	const totalCharsLimit = 500;
	const charLimitBefore = 150;
	const [sectionDescriptionMaxChars] = useState(charLimitBefore);

	// State for deciding whether to display the 'More' or 'Less' button
	const [isDisplayMoreButn] = useState<boolean>(() => {
		// check if seo sectionDescription chars is greater than sectionDescriptionMaxChars
		const wordsCount = seo?.sectionDescription.length > sectionDescriptionMaxChars ? true : false;

		return wordsCount;
	});

	// State for the mode of the button (either 'More' or 'Less')
	const [buttonMode, setButtonMode] = useState<'More' | 'Less'>('More');

	// Function to handle the button click and toggle the button mode
	function toggleShowMoreOrLess() {
		setButtonMode((bntModeState) => {
			return bntModeState === 'More' ? 'Less' : 'More';
		});
	}

	// helper function to truncate seo sectionDescription
	const handleSEOTruncate = useCallback((): string => {
		// get seo sectionDescription substring of form (0,sectionDescriptionMaxChars+1)
		const seosectionDescription = seo.sectionDescription.substring(0, sectionDescriptionMaxChars);

		return seosectionDescription;
	}, [sectionDescriptionMaxChars, seo.sectionDescription]);

	// State for the sectionDescription to be displayed
	const [seosectionDescription, setSeosectionDescription] = useState<string>(isDisplayMoreButn ? handleSEOTruncate() : seo.sectionDescription);

	// Effect to update the sectionDescription based on the button mode
	useEffect(() => {
		switch (buttonMode) {
			case 'More':
				setSeosectionDescription(handleSEOTruncate());
				break;
			case 'Less':
				setSeosectionDescription(seo.sectionDescription);
				break;
			default:
				setSeosectionDescription(seo.sectionDescription);
				break;
		}
	}, [buttonMode, seo.sectionDescription]);

	// Render the SEO information
	return (
		<div className='flex flex-col justify-start items-start  gap-2 px-4 py-6 md:px-[15px] md:py-8 desktop:px-20 desktop:py-10'>
			{/** */}
			<div className='flex flex-col justify-start items-start '>
				<h1 className='text-mwGrey-600 text-mwTextParaSmallSemi md:text-mwTextParaBaseSemi' data-testid='seo_sectionHeading'>
					{seo.sectionHeading}
				</h1>

				<p className='break-all text-mwGrey-600 text-mwTextParaSmall md:text-mwTextParaBase' data-testid='seo_sectionDescription'>
					{seosectionDescription.slice(0,totalCharsLimit)}
					<span>{isDisplayMoreButn && buttonMode === 'More' ? <>...</> : null}</span>
				</p>
			</div>

			{/** Render the 'More' or 'Less' button if necessary */}
			<Transition
				show={isDisplayMoreButn}
				enter='transition duration-200 ease-out'
				enterFrom='transform scale-95 opacity-0'
				enterTo='transform scale-200 opacity-100'
				leave='transition duration-200 ease-out'
				leaveFrom='transform scale-100 opacity-100'
				leaveTo='transform scale-95 opacity-0'>
				<div>
					<button
						onClick={toggleShowMoreOrLess}
						className='text-mwPrimary-900 text-mwButtonTextSmall md:text-mwButtonTextMedium'
						data-testid='seo_call_to_action'>
						{buttonMode}
					</button>
				</div>
			</Transition>
		</div>
	);
}
