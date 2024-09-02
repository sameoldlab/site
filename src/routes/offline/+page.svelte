<script lang="ts">
	import { page } from '$app/stores'
	let pages: Request[] = $state([])
	const openCaches = () => {
		caches.keys().then((keys) => {
			keys.forEach(async (k) => {
				const cache = await caches.open(k)
				const keys = await cache.keys()
				pages.push(
					...keys.filter(
						(k) => k.url.includes('html') && !k.url.includes('offline.html')
					)
				)
			})
		})
	}
	$effect.pre(openCaches)
</script>

<div>
	<h1>You have reached a REST point</h1>
	<p>
		Feel free to stop here for a moment before returning online. What a radical
		act, it is to log off! You must be quite... Oh. Bad connection? I can't get
		you to <code> {$page.url} </code>, but you can go to any of the pages you've
		visited before:
	</p>

	<ul>
		{#each pages as page}
			<li><a href={page.url}>{page.url}</a></li>
		{/each}
	</ul>
	<!-- list of 5 most recent posts -->
</div>

<style>
	div {
		padding-block-start: 8rem;
		width: min(50ch, 90%);
		margin: auto;
	}
	h1 {
		padding-block-end: 1em;
	}
</style>
