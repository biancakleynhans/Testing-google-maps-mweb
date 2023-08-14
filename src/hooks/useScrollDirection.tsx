import {useEffect, useState} from 'react';

export default function useScrollDirection() {
	const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
	const [scrollYPos, setscrollYPos] = useState<number>(0);
	const [nextWindow, setNextWindow] = useState<Window | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setNextWindow(window);
		}
	}, []);

	useEffect(() => {
		if (nextWindow) {
			let lastScrollY = nextWindow.scrollY;

			const updateScrollDirection = () => {
				const scrollY = nextWindow.scrollY;
				const direction = scrollY > lastScrollY ? 'down' : 'up';

				if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
					setScrollDirection(direction);
				}

				lastScrollY = scrollY > 0 ? scrollY : 0;
				setscrollYPos(scrollY);
			};

			nextWindow.addEventListener('scroll', updateScrollDirection); // add event listener

			return () => {
				nextWindow.removeEventListener('scroll', updateScrollDirection); // clean up
			};
		}
	}, [nextWindow, scrollDirection]);

	return {scrollDirection, scrollYPos};
}
