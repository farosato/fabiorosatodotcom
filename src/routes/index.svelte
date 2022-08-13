<script context="module">
	import {
		SITE_URL,
		REPO_URL,
		SITE_TITLE,
		SITE_DESCRIPTION,
		DEFAULT_OG_IMAGE,
		MY_TWITTER_HANDLE
	} from '$lib/siteConfig';
	export const prerender = true; // index page is most visited, lets prerender
</script>

<script>
	import Newsletter from '../components/Newsletter.svelte';
	import FeatureCard from '../components/FeatureCard.svelte';
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<link rel="canonical" href={SITE_URL} />
	<link rel="alternate" type="application/rss+xml" href={SITE_URL + '/api/rss.xml'} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={SITE_TITLE} />
	<meta name="Description" content={SITE_DESCRIPTION} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<!-- @html trick to avoid ampersand escaping in the image URL -->
	{@html `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<!-- @html trick to avoid ampersand escaping in the image URL -->
	{@html `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`}
</svelte:head>

<div
	class="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 px-4 pb-16 dark:border-gray-700 sm:px-8"
>
	<div class="items:start mb-16 flex flex-col-reverse sm:flex-row sm:items-center">
		<div class="flex flex-col sm:pr-6">
			<h1
				id="me"
				class="mb-6 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl"
			>
				Hi, I'm
				<span
					class="relative ml-2 inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-red-500"
				>
					<span class="relative skew-y-3 text-yellow-400">{SITE_TITLE}</span>
				</span>
			</h1>
			<h2 id="bio" class="mb-4 text-gray-700 dark:text-gray-200">
				<span class="font-bold">The Contrarian Engineer</span><br />
				Computer Science and Software Engineer, Project Management Professional, and consultant. Following
				my curiosity and sharing what I learn along the way 🧭
			</h2>
			<p class="text-gray-600 dark:text-gray-400">
				<a sveltekit:prefetch href="/about">More on About page</a>
			</p>
		</div>
		<img
			class="mb-8 w-[176px] rounded-full sm:mb-0"
			src="/Fabio.Portrait.LH.Paint.Logo.jpg"
			alt="A portrait of Fabio Rosato"
		/>
	</div>

	<section class="mb-16 w-full">
		<h3 class="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
			Featured Posts
		</h3>
		<div class="flex flex-col gap-6 md:flex-row">
			<FeatureCard title="Hello, World!" href="/hello-world" stringData="Aug 2022" />
			<FeatureCard
				title="Digital Garden Terms of Service"
				href="/digital-garden-tos"
				stringData="Aug 2022"
			/>
			<FeatureCard
				title="It's Always Day 1: Why I'm Starting the Ship 30 Challenge"
				href="/ship30-day1"
				stringData="Aug 2022"
			/>
		</div>
		<a
			class="mt-8 flex h-6 rounded-lg leading-7 text-gray-600 transition-all dark:text-gray-400 dark:hover:text-gray-200"
			href="/blog"
			>See latest posts<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="ml-1 h-6 w-6"
				><path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
				/></svg
			></a
		>
	</section>
	<Newsletter />
</div>
