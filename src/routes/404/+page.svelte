<script lang="ts">
	import { page } from '$app/stores'
	console.log($page)
</script>

<div>
	{#if $page.error?.message}
		<h1>Woe and misfortune!</h1>
		<p>
			The page you are looking is not here. Perhaps it was lost in the cloud and
			seeking to circle back home, was assailed by an unwell email. Perhaps you
			have made a mistake in the page whiich you seek, and by terrible chance
			fallen upon this dark, and desolate crevice. Does this url match that
			which you seek:
			<code>
				{$page.url}
			</code>?
		</p>
		<p>
			Or most woefully of all, perhaps the error is mine dear visitor. Through
			ignorance or negligence I have created a false trail, or killed a once
			lively, young link. If this is the case I apologize sincerely.
		</p>
		<p>
			Consider circling back to the
			<a href="/">the start</a> or if the spirit of adventure still lives within
			you, traversing <a href="/lab">another route</a> instead.
		</p>
		<!-- list of 5 most recent posts -->
	{:else}
		<h1>Error: {$page.error?.message}</h1>
	{/if}
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
