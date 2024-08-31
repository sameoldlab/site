<script lang="ts">
	import og_image from './_og.png'
	import Collection from '$lib/layouts/collection.svelte'
	import Media from '$lib/components/MediaContainer.svelte'

	let { data } = $props()
	const { entries } = data
</script>

<main>
	<header class="main">
		<h1>lab</h1>
	</header>
	<div class="articles">
		{#each entries as entry}
			{@const Content = entry.default}
			<article class="note">
				<header>
					<h2>
						<a class="" href={`/lab/${entry.slug}`}>
							{new Date(entry.metadata.date).toLocaleDateString()}
						</a>
					</h2>
					{#each entry.metadata?.tags as tag}
						#{tag}
					{/each}
				</header>

				<div class="content">
					{#if entry.metadata.media}
						<div class="media">
							{#each entry.metadata.media as src}
								<Media post={{ src }} />
							{/each}
						</div>
					{/if}
					<Content />
				</div>
			</article>
			<hr />
		{/each}
	</div>
</main>

<style>
	main,
	article {
		padding-block: 1rem 1.5rem;
	}
	main > header {
		display: flex;
		justify-content: space-between;
		/* align-items: baseline; */
		gap: 0.5rem;
		max-width: var(--width);
		margin-inline: auto;
	}

	article {
		max-width: var(--width);
		padding-inline: 0;

		header {
			text-align: left;
			padding: 0;
			display: flex;
			gap: 1em;
			align-items: baseline;
		}
		.content {
			display: grid;
			grid-template-rows: 0fr;
		}
		h2 {
			padding: 0;
			font-size: 1rem;
			color: var(--text);
		}
	}

	div.media {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
		padding-block: 1.2rem;
	}
	.tag-item {
		font-size: 0.9rem;
		color: var(--t-low);
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	img {
		padding: 0;
		border-radius: 0;
	}
</style>
