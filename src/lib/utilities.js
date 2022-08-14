export function ogImageGenerator(params) {
	const OG_IMAGE_SAAS_URL = 'https://typeshare-opengraphs-three.vercel.app';
	const title = encodeURIComponent(params.title);
	const type = params.type;
	const date = encodeURIComponent(
		new Date(params.date).toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})
	);
	const name = encodeURIComponent(params.name);
	const handle = encodeURIComponent(params.handle);
	const bio = encodeURIComponent(params.bio);
	const image = encodeURIComponent(params.image);
	return `${OG_IMAGE_SAAS_URL}/${title}.png?theme=light&${type ? `type=${type}&` : ''}${
		date ? `date=${date}&` : ''
	}${name ? `name=${name}&` : ''}${handle ? `handle=${handle}&` : ''}&bio=${bio}&images=${image}`;
}
