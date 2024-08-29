<script lang="ts">
	import Media from '$lib/components/MediaContainer.svelte'
	import { slide } from 'svelte/transition'
	// import Article from '$lib/layouts/article.svelte'
	let { data } = $props()
</script>

<main>
	<div>
		<!-- <a href='#' onclick='history.back()'> ⮌ Return</a> -->
		<article>
			<header>
				<h1 class="date">
					<time datetime={data.meta.date}>
						{new Date(data.meta.date).toLocaleDateString()}
					</time>
				</h1>
			</header>
			<section class="content">
				<svelte:component this={data.content} />
				<br />
				{#if data.meta.media}
					<div class="media" in:slide>
						{#each data.meta.media as src}
							<Media post={{ src }} />
						{/each}
					</div>
				{/if}
			</section>
		</article>
	</div>
</main>
<div class="divider">
	<hr />
</div>
<nav class="container">
	<div class="nav-item" id="prev">
		{#if data.prev}
			<a href={data.prev.slug}>
				<span>Previous</span>
				{data.prev.slug}
			</a>
		{/if}
	</div>
	<div class="nav-item" id="next">
		{#if data.next}
			<a href={data.next.slug}>
				<span>Next</span>
				{data.next.slug}
			</a>
		{/if}
	</div>
</nav>

<style>
	.divider {
		padding-block: 3rem 0;
		width: var(--width);
		margin-inline: auto;
		view-transition-name: nextprev-div;
	}
	header * {
		text-align: start;
		display: block;
	}
	h1 {
		font-style: normal;
		font-weight: 500;
		font-size: 1rem;
	}
	nav {
		view-transition-name: nextprev;
		display: flex;
		justify-content: space-between;
		padding-block-end: 3rem;
	}
	.nav-item {
		font-size: 0.85rem;
		a {
			display: grid;
		}
		a > span {
			color: var(--t-low);
		}
	}
</style>
