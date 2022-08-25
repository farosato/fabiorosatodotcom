import { ogImageGenerator } from './utilities';

export const SITE_URL = 'https://fabiorosato.com';
export const APPROVED_POSTERS_GH_USERNAME = ['farosato'];
export const GH_USER_REPO = 'farosato/fabiorosatodotcom'; // used for pulling github issues and offering comments
export const REPO_URL = 'https://github.com/' + GH_USER_REPO;
export const SITE_TITLE = 'Fabio Rosato';
export const SITE_DESCRIPTION = "Fabio Rosato's Digital Garden";
export const MY_TWITTER_HANDLE = 'fab_rosato';
export const MY_TWITTER_PROFILE_PIC =
	'https://pbs.twimg.com/profile_images/1443710468426768385/VFjYjDGu_400x400.jpg';
export const DEFAULT_OG_IMAGE = ogImageGenerator({
	title: 'Fabio Rosato',
	bio: 'Visual Creator | Software Engineer | Project Management Professional • Following my curiosity and sharing what I learn along the way 🧭',
	image: MY_TWITTER_PROFILE_PIC
});

// don't forget process.env.GH_TOKEN
// if supplied, raises rate limit from 60 to 5000
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
