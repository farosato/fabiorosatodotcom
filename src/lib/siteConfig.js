export const SITE_URL = 'https://fabiorosato.com/';
export const APPROVED_POSTERS_GH_USERNAME = ['farosato'];
export const GH_USER_REPO = 'farosato/fabiorosatodotcom'; // used for pulling github issues and offering comments
export const REPO_URL = 'https://github.com/' + GH_USER_REPO;
export const SITE_TITLE = 'Fabio Rosato';
export const SITE_DESCRIPTION = "Fabio Rosato's site";

const BIO =
	'Visual Creator | Software Engineer | Project Management Professional • Following my curiosity and sharing what I learn along the way 🧭';
export const DEFAULT_OG_IMAGE = `https://typeshare-opengraphs-three.vercel.app/Fabio%20Rosato.png?theme=light&bio=${encodeURI(
	BIO
)}&images=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1443710468426768385%2FVFjYjDGu.jpg`;
export const MY_TWITTER_HANDLE = 'fab_rosato';

// don't forget process.env.GH_TOKEN
// if supplied, raises rate limit from 60 to 5000
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
