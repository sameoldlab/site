<script lang="ts">
	import og_image from './_og.png'
	import Collection from '$lib/layouts/collection.svelte'

	let { data } = $props()
	const { entries } = data
	/* ;(function (window) {
			function setupVideo() {
				let v = document.getElementById('videoElement')
				v.addEventListener(
					'mouseover',
					function () {
						this.controls = true
					},
					false
				)
				v.addEventListener(
					'mouseout',
					function () {
						this.controls = false
					},
					false
				)
			}
			window.addEventListener('load', setupVideo, false)
		})(window) */
	console.log(entries)
</script>

<main>
	<header class="main">
		<h1>log</h1>
	</header>
	<div class="articles">
		{#each entries as entry}
			<article class="note">
				<header>
					<h2>
						<a class="" href={`/log/${entry.slug}`}>
							{new Date(entry.metadata.date).toLocaleDateString()}
						</a>
					</h2>
					{#each entry.metadata.tags as tag}
						#{tag}
					{/each}
				</header>

				{#if entry.metadata.media}
					<div class="media">
						{#each entry.metadata.media as media}
							<video src={media} muted autoplay loop> </video>
						{/each}
					</div>
				{/if}
				<div class="content">
					<svelte:component this={entry.default} />
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
