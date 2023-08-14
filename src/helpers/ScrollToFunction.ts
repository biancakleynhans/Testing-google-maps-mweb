export default function ScrollToPoint(point: string) {
	let doc = document.getElementById(point);

	console.log('????', doc);

	setTimeout(() => {
		if (doc !== null) {
			doc.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'start',
			});
		}
	}, 500);
}
