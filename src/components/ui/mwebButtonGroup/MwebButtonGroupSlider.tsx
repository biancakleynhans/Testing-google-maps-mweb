'use client';

import React, {useState, useEffect} from 'react';
import MwebButtonForGroup from './MwebButtonForGroup';
import MwebIcon from '../mwebIcon/MwebIcon';
import Slider from 'react-slick';

interface iProps {
	size: 'small' | 'large';
	hasDescription: boolean;
	buttons: {label: string; description: string; isActive: boolean}[];
	onClickFunc: (val?: any) => void;
}

export default function MwebButtonGroupSlider(props: iProps) {
	const {size, buttons, onClickFunc} = props;

	const [currslide, setcurrslide] = useState<number>(0);

	const slider = React.useRef<any>(null);

	const settings = {
		dots: false,
		arrows: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
		className: 'slider variable-width',
		variableWidth: true,
	};

	useEffect(() => {
		// console.log('current slide ', currslide);
	}, [currslide]);

	function handleChange(type: 'back' | 'next') {
		// next button
		if (type === 'next') {
			slider?.current?.slickNext();

			if (currslide === buttons.length / 2) {
				setcurrslide(buttons.length / 2);
			} else {
				setcurrslide(currslide + 1);
			}
		}
		// back button
		else {
			slider?.current?.slickPrev();

			if (currslide === 0) {
				setcurrslide(0);
			} else {
				setcurrslide(currslide - 1);
			}
		}
	}

	return (
		<div role='group' className='w-full flex flex-row justify-center items-center'>
			{/* Back */}
			{currslide > 0 && (
				<div className={`w-1/12 ${currslide > 0 ? 'cursor-pointer' : 'cursor-none'}`} onClick={() => handleChange('back')}>
					<MwebIcon color='text-mwPrimary-900' iconType='chevron-left' size={24} />
				</div>
			)}

			{/* Slider */}
			<div className={`w-full rounded-full bg-mwBlueGrey-50 ${size === 'large' ? 'p-2' : 'p-1'} overflow-hidden`}>
				<Slider ref={slider} {...settings}>
					{buttons.map((btn, i) => (
						<div key={i} style={{width: 'unset'}}>
							<MwebButtonForGroup isActive={btn.isActive} size={size} label={btn.label} desc={btn.description} onClickFunc={() => onClickFunc(btn)} />
						</div>
					))}
				</Slider>
			</div>

			{/* Next */}
			{currslide < buttons.length / 2 && (
				<div className={`w-1/12 ${currslide < buttons.length ? 'cursor-pointer' : 'cursor-none'}`} onClick={() => handleChange('next')}>
					<MwebIcon color='text-mwPrimary-900' iconType='chevron-right' size={24} />
				</div>
			)}
		</div>
	);
}
