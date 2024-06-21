<script lang="ts">
	import type { Action } from 'svelte/action'

	let currentHover = ''
	let currentImg: string | undefined

	const onHover: Action<HTMLUListElement> = (el: HTMLUListElement) => {
		const handleMouseOver = (event: MouseEvent) => {
			console.log(event.target)

			currentHover = el.innerText
			currentImg = el.dataset.media
		}
		const handleMouseOut = () => {
			currentImg = undefined
			currentHover = ''
		}

		el.addEventListener('mouseover', handleMouseOver)
		el.addEventListener('mouseleave', handleMouseOut)
		return {
			destroy() {
				el.removeEventListener('mouseenter', handleMouseOver)
			},
		}
	}
</script>


<div class="grid">
	<div class="projects">
		<section>
			<ul>
				<li use:onHover class="link">
					<a href="https://github.com/sameoldlab/nft-folder-linux">
						nft-folder
					</a>
				</li>
				<li use:onHover data-media="smimg//" class="link">
					<a href="https://fractl.click"> fractl-ui </a>
				</li>
				<li use:onHover data-media="/src/assets/p/visor/ui.png" class="link">
					<a href="https://github.com/sameoldlab/visor"> visor </a>
				</li>
				<li use:onHover data-media="/src/assets/p/group/VisaGroups_VP9.mp4">
					groups
				</li>
				<!-- <li class="link"><a href="https://github.com/sameoldlab/nft-folder"> oriole </a></li> -->
			</ul>
		</section>
	</div>

	<section class="preview">
		{#if typeof currentImg === 'string' && currentImg !== ''}
			{#if ['png', 'webp'].includes(currentImg.split('.')[1])}
				<img src={currentImg} alt={currentHover} />
			{:else if ['webm', 'mp4'].includes(currentImg.split('.')[1])}
				<video muted autoplay loop playsinline preload="metadata">
					<source src={currentImg} type="video/mp4" />
					webkit...
				</video>
			{/if}
			<!-- <img src={currentImg} alt={currentHover} /> -->
		{/if}
	</section>
</div>

<style>
	.grid {
		display: grid;
		grid-auto-flow: row dense;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
		width: 100%;

		& section {
			display: flex;
			gap: 1rem;
		}
	}

	.preview {
		flex-grow: 1;
		grid-column: span 3 / span 3;
		transition-property: opacity;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
		transition-duration: 500ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-delay: 75ms;
		opacity: 0;

		@media (min-width: 768px) {
			display: flex;
			opacity: 1;
		}
	}
</style>
