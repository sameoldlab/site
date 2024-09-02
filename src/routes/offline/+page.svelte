<script lang="ts">
	// Need a different filter method.
	// Or just delete this page? All data for pages gets included for <200kb in initial service worker cache
	// Not aware of any situation (testing locally) where this page shows up
	import { page } from '$app/stores'
	/*
	let pages: Request[] = $state([])
	const openCaches = () => {
		caches.keys().then((keys) => {
			keys.forEach(async (k) => {
				const cache = await caches.open(k)
				const keys = await cache.keys()
				console.log(keys)
				pages.push(
					...keys.filter(
						(k) => k.url.includes('html') && !k.url.includes('offline.html')
					)
				)
			})
		})
	}
	$effect.pre(openCaches) */
</script>

<div>
	<h1>You seem to be offline...</h1>
	<p>
		Feel free to stop here for a moment before returning online. What a radical
		act, it is to log off! You must be quite... Oh. Bad connection? I can't get
		you to <code> {$page.url} </code>, but you can go to any of the pages you've
		visited before:
	</p>

	<ul>
		<li><a href="/notes">Notes</a></li>
		<li><a href="/lab">Lab</a></li>
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
