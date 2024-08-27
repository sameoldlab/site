<script lang="ts">
	import { onMount, type Snippet } from 'svelte'
	// import { intersecting } from '$lib/actions/lazy-load'
	// import { thumbHashToDataURL } from '$lib/utils/thumbhashClient'

	type Props = {
		eager: boolean
		post:
			| {
					size: {
						height: number
						width: number
					}
					hash: string
					src: string
					project: string
					alt: string
			  }
			| {
					src: string
					project: string
					alt: string
			  }
		children: Snippet
	}
	let { eager = false, post, children }: Props = $props()
	// const thumbHashFromBase64 =  && Buffer.from(post.hash, 'base64')
	// const placeholderURL = 'hash' in post ? thumbHashToDataURL(post.hash) : undefined

	function isLoaded(element: HTMLImageElement | HTMLVideoElement) {
		if (element instanceof HTMLImageElement)
			return element.complete && element.naturalWidth !== 0

		if (element instanceof HTMLVideoElement)
			return element.readyState >= 3 && element.videoWidth !== 0

		return false
	}

	let item: HTMLDivElement
	let media: HTMLImageElement | HTMLVideoElement = $state()
	let nativeLoading: boolean

	onMount(async () => {
		console.log('mounted')

		nativeLoading = 'loading' in HTMLImageElement.prototype
		if (item && isLoaded(media)) {
			console.log('loaded')
			item.style.opacity = '1'
		}
	})

	const loadSrc = (img: HTMLImageElement) => {
		// img.classList.add('fade')
		img.src = post.src

		img.onload = () => {
			img.style.opacity = '1'
			img.style.filter = ''
		}
	}
</script>

<div class="media-item" bind:this={item} style="opacity: 1;">
	<!-- /* typeof url === 'object' */ -->
	{#if 'hash' in post}
		<enhanced:img
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : 'low'}
			src={post.src}
			alt={post.alt}
			{...post.size}
			style="opacity: 0; filter: blur(16px);"
			bind:this={media}
		/>
	{:else if ['webm', 'mp4'].includes(post.src.split('.')[1])}
		<video
			muted
			autoplay
			loop
			playsinline
			preload="metadata"
			bind:this={media}
			tabindex="0"
			onfocus={() => {
				media.controls = true
			}}
			onblur={() => {
				media.controls = false
			}}
			onmouseover={() => {
				media.controls = true
			}}
			onmouseout={() => {
				media.controls = false
			}}
		>
			<source src={post.src} type="video/mp4" />

			webkit...
		</video>
	{/if}
	<!-- <div class="deets"> -->
	<!-- <h2 class="title">{p.project ? `${p.project} - `: ''}</h2> -->
	<!-- <button>View</button> -->
	<!-- </div> -->
	<!-- <h2 class="title">{p.title}</h2> -->
</div>

<style>
	.grid-item {
		position: absolute;
		display: grid;
		/* gap: .5em; */

		/* Animate blocks on layout change */
		transition:
			opacity 280ms cubic-bezier(0.4, 0, 0.2, 1),
			top 220ms cubic-bezier(0.4, 0, 0.2, 1),
			left 220ms cubic-bezier(0.4, 0, 0.2, 1);

		/* Set the x position of blocks */
		--col-width: calc(
			100% / var(--cols) - var(--gap, var(--default-gap)) * (var(--cols) - 1) /
				var(--cols)
		);
		width: var(--col-width);
		left: calc(
			var(--col-width) * var(--col-i) + var(--gap, var(--default-gap)) *
				var(--col-i)
		);

		border-radius: 0.75em;
		overflow: hidden;
		border: 1px solid #222;
		padding: 4px;
	}

	.media-container {
		position: relative;

		width: 100%;
		height: 100%;
		border-radius: 0.5em;
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: contain;

		&::before {
			content: '';
			width: 100%;
			height: 50%;
			background: red;
			background: linear-gradient(#0000, #0009 75%);
			position: absolute;
			bottom: 0;
		}
	}

	h2.title {
		font-weight: 520;
		position: absolute;
		bottom: 0;
		padding-block-end: 0.25em;
		padding-inline: 0.5em;
	}

	p {
		margin: 0;
		text-wrap: pretty;
	}

	img {
		overflow: hidden;
		width: 100%;
		height: 100%;
		transition: all 500ms ease-in-out;
	}

	.grid-item {
		transition: opacity 200ms ease-in;

		& > button {
			border-radius: 0.5em;
			margin: 4px;
			background: #3336;
			transition: background-color 200ms ease-in-out;

			&:hover {
				background: #3338;
			}
		}
	}

	.deets {
		font-weight: 520;
		position: absolute;
		bottom: 0;
		padding-block-end: 0.5em;
		padding-inline: 0.5em;
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	/* .media-container button {
		padding: .2em 1.2em;
		border-radius: 4px;
		background-color: #222;
		border: 1px solid #3f3f3f;
	} */
</style>
