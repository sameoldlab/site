<script lang="ts">
	import type { Note, Page } from '$lib/types'
	import type { Snippet } from 'svelte'
	type Props = {
		entry: Note
		related?: Set<Page>
		children: Snippet
	}
	let { entry, related, children }: Props = $props()
	const modified = new Date()
</script>

<!--<Layout 
	title={entry.data.title}  
	type={{
		published_time: entry.data.date,
		modified_time: modified,
		tags: entry.data.tags,
	}}
	image={{
		url: `${$page.url}/og.png`,
		type: 'image/png',
		width: 1200,
		height: 600,
	}}
	>
-->
<main>
	<div>
		<!-- <a href='#' onclick='history.back()'> ⮌ Return</a> -->
		<article>
			<header>
				<h1>{entry.metadata.title}</h1>
				<p class="date">
					<time>
						{new Date(
							entry.metadata.date
						).toLocaleDateString()}–{modified.toLocaleDateString()}
					</time>
				</p>
				<div class="tags">
					{#each entry.metadata.tags as tag}
						<a href={'/tag/' + tag.split(' ').join('-')}>{tag}</a>
					{/each}
				</div>
			</header>
			<section class="content">{@render children()}</section>

			{#if related}
				<aside id="related">
					<h2>Related</h2>
					{#each related as rl}
						<p><a href={rl.slug}>{rl.title}</a></p>
					{/each}
				</aside>
			{/if}
		</article>
	</div>
</main>

<style global>
	#related {
		margin-block-start: 3rem;
		padding: 1.5rem;
		border-radius: 0.5rem;
		background: var(--bg-mid);

		h2 {
			font-size: 1.2rem;
			padding-block: 0 0.25rem;
		}
	}
</style>
