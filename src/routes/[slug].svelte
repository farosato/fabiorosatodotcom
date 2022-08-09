<script context="module">
	// export const prerender = true; // you can uncomment to prerender as an optimization
	export const hydrate = true;
	import { MY_TWITTER_HANDLE, REPO_URL, SITE_URL } from '$lib/siteConfig';
	import Comments from '../components/Comments.svelte';
	export async function load({ url, params, fetch }) {
		const slug = params.slug;
		let res = null;
		try {
			res = await fetch(`/api/blog/${slug}.json`);
			if (res.status > 400) {
				return {
					status: res.status,
					error: await res.text()
				};
			}

			return {
				props: {
					json: await res.json(),
					slug,
					REPO_URL
				},
				cache: {
					maxage: 60 // 1 minute
				}
			};
		} catch (err) {
			console.error('error fetching blog post at [slug].svelte: ' + slug, res, err);
			return {
				status: 500,
				error: new Error('error fetching blog post at [slug].svelte: ' + slug + ': ' + res)
			};
		}
	}
</script>

<script>
	import 'prism-themes/themes/prism-shades-of-purple.min.css';
	import Newsletter from '../components/Newsletter.svelte';
	import Reactions from '../components/Reactions.svelte';
	import { page } from '$app/stores';

	/** @type {import('$lib/types').ContentItem} */
	export let json; // warning: if you try to destructure content here, make sure to make it reactive, or your page content will not update when your user navigates

	$: canonical = SITE_URL + $page.url.pathname;
</script>

<svelte:head>
	<title>{json.title}</title>
	<link rel="canonical" href={canonical} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={json.title + (json.subtitle ? ': ' + json.subtitle : '')} />
	<meta name="Description" content={json.description} />
	<meta property="og:description" content={json.description} />
	<meta name="twitter:card" content={json.image ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={json.title + (json.subtitle ? ': ' + json.subtitle : '')} />
	<meta name="twitter:description" content={json.description} />
	{#if json.image}
		<meta property="og:image" content={json.image} />
		<meta name="twitter:image" content={json.image} />
	{/if}
</svelte:head>

<article
	class="mx-auto mb-8 flex w-full max-w-2xl flex-col items-start justify-center px-4 sm:px-8"
>
	<h1 class="mb-8 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl ">
		{json.title}
	</h1>
	{#if json.subtitle}
		<p class="mb-4 italic tracking-tight md:text-xl">
			{json.subtitle}
		</p>
	{/if}
	<div
		class="bg mt-2 flex w-full justify-between sm:flex-col sm:items-start md:flex-row md:items-center"
	>
		<p class="flex items-center text-sm text-gray-700 dark:text-gray-300">Fabio Rosato</p>
		<p class="min-w-32 flex items-center text-sm text-gray-600 dark:text-gray-400 md:mt-0">
			<a href={json.ghMetadata.issueUrl} rel="external" class="no-underline" target="_blank">
				<span class="mr-4 font-mono text-xs text-gray-700 text-opacity-70 dark:text-gray-300"
					>{json.ghMetadata.reactions.total_count} reactions</span
				>
			</a>
			{new Date(json.date).toISOString().slice(0, 10)}
		</p>
	</div>
	<div
		class="-mx-4 my-2 flex h-1 w-[100vw] bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 sm:mx-0 sm:w-full"
	/>

	{#if json.frontmatter.disclosure}
		<p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
			<a
				aria-label="What is my disclosure policy?"
				target="_blank"
				title="What is my disclosure policy?"
				rel="noopener"
				href="{process.env.SITE_URL}/digital-garden-tos/#2-epistemic-disclosure"
				color="blue"
			>
				<span class="relative font-bold"
					>Disclosure<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						class="ml-1 inline"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#999"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
						<line x1="12" y1="17" x2="12" y2="17" />
					</svg></span
				></a
			>: {json.frontmatter.disclosure}
		</p>
	{/if}

	<div class="prose mt-8 mb-8 w-full max-w-none dark:prose-invert">
		{@html json.content}
	</div>
</article>
<div class="mx-auto max-w-prose">
	<Newsletter />
	<div class="prose mb-16 border-y border-blue-800 p-4 text-center dark:prose-invert sm:text-left">
		{#if json.ghMetadata.reactions.total_count > 0}
			Reactions: <Reactions
				issueUrl={json.ghMetadata.issueUrl}
				reactions={json.ghMetadata.reactions}
			/>
		{:else}
			<a href={json.ghMetadata.issueUrl}>Leave a reaction </a>
			if you liked this post! 🧡
		{/if}
	</div>
	<div class="prose mb-16">
		<Comments ghMetadata={json.ghMetadata} />
	</div>
</div>
