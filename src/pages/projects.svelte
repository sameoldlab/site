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

<section class="container">
	<p class="header">I'm Ibro. I make interfaces. Hi.</p>
	<!-- One day I will figure out a way to write this section that does not sound pretentious,
	  that day is not today 
		-->
	<!--
	<p class="mb-2 font-sans opacity-70">What, that's it???</p>
	<p class="mb-2">Well... yeah. Is there supposed to be something else?</p>
	<p class="mb-2 font-sans opacity-70">
		What about delight and solving problems? I don't even know who you are.
	</p>
	<p class="mb-2">
		I think design is about playing with constraints, function melts form, and
		"simple" should mean clear. I too nerd out over typography, caustics, and
		beziers, but also performance, privacy, and open protocols. If this computer
		thing doesn't work out... I'll probably try canning tomatoes or washing
		coffee cherries. If you want more rambling, please just see
	</p>
	<p class="mb-2 font-sans opacity-70">Well what about-</p>
	<p class="sol">
		Design for the Real World, Inventing on Principle, Supernormal Design, 
		Speculative Fiction, and The Ecosystem is Moving are all very good manifestos, 
		already
	</p> -->
	<br />
</section>

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
		<div class="socials">
			<p class="text-lg opacity-60 gap-4 flex-wrap">
				<a class="link" href="mailto:sameoldlab@proton.me">email</a>
				<br />

				<a
					class="link"
					href="https://www.are.na/sameoldlab"
					rel="noreferrer"
					target="_blank">are.na</a
				>
				<br />

				<a
					class="link"
					href="https://github.com/sameoldlab"
					rel="noreferrer"
					target="_blank">github</a
				>
				<br />
			</p>
		</div>
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

	.socials {
		display: flex;
		padding-top: 2rem;
		padding-bottom: 4rem;
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
	.header {
		font-style: italic;
		font-weight: 400;
		font-variation-settings: 'opsz' 128;
		font-size: 1.75rem;
		line-height: 1.5em;		
	}

	.opacity-70 {
		opacity: 0.7;
	}
	.font-sans {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
