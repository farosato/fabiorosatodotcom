<script>
	import { onMount } from 'svelte';

	let isNewsletterOpen = true;
	let isSubscribed = 'no';
	let error = null;
	function getSubscribedStatus() {
		return localStorage.getItem('isSubscribed');
	}
	function setSubscribedStatus() {
		isSubscribed = 'subscribed';
		localStorage.setItem('isSubscribed', isSubscribed);
	}
	onMount(() => {
		isSubscribed = getSubscribedStatus();
		if (isSubscribed === 'subscribed') isNewsletterOpen = false;
	});
	function toggleNewsletter() {
		isNewsletterOpen = !isNewsletterOpen;
	}
	async function onSubmit(event) {
		error = null;
		const formData = new FormData(event.target);
		const body = {
			email: formData.get('email')
		};
		const response = await fetch('/api/subscribe', {
			method: 'post',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			setSubscribedStatus();
			toggleNewsletter();
		} else {
			const responseData = await response.json();
			error = responseData.error.email || responseData.error;
		}
	}
</script>

<section class="mb-16 w-full" id="newsletter">
	<div
		class="my-4 w-full border-y border-blue-200 bg-blue-50 p-6 dark:border-gray-600 dark:bg-gray-800 sm:rounded sm:border-x"
	>
		<div class="flex items-center justify-between space-x-4 text-gray-900 dark:text-gray-100">
			{#if isSubscribed === 'subscribed'}
				<p class="md:text-xl">Thanks for subscribing to the newsletter!</p>
			{:else}
				<p class="text-lg font-bold md:text-xl">Subscribe to the newsletter</p>
			{/if}

			<button
				aria-label="Toggle Newsletter CTA"
				class="flex h-9 w-9  items-center justify-center rounded-lg ring-gray-300 transition-all hover:ring-2"
				on:click={toggleNewsletter}
			>
				{#if isNewsletterOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</button>
		</div>
		{#if isNewsletterOpen}
			<p class="my-1 text-gray-800 dark:text-gray-200">
				Want <span class="font-bold">exclusive</span> early access to my best content to help you live
				a happier, healthier, and more productive life?
			</p>

			<form class="relative my-4" on:submit|preventDefault={onSubmit}>
				<input
					type="email"
					name="email"
					aria-label="Email for newsletter"
					placeholder="your@email.com"
					autocomplete="email"
					required={true}
					class="block w-full rounded-md border-gray-300 bg-white px-4 py-2 pr-32 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
				/>
				<button
					class="absolute right-0 top-0 flex min-h-full items-center justify-center rounded bg-zinc-100 px-4 font-medium text-gray-900 hover:text-amber-600 dark:bg-zinc-700 dark:text-gray-100 hover:dark:text-amber-500"
					type="submit">Subscribe</button
				>
			</form>
			{#if error}
				<p class="my-3 text-red-600 dark:text-red-600">{error}</p>
			{/if}
			<p class="text-sm text-gray-800 dark:text-gray-200">1000+ subscribers including my mom</p>
		{/if}
	</div>
</section>
