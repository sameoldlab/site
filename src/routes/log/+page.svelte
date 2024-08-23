---
import { getCollection } from 'astro:content'
import og_image from './_og.png'
import Layout from '../../_inc/layouts/base.astro'
import '../../_inc/css/type.css'

const entires = (await getCollection('stream')).sort(
	(a, b) => b.data.date.valueOf() - a.data.date.valueOf()
)
---

<Layout
	title="Log"
	description={`Exploration log}`}
	image={{
		url: og_image.src,
		type: 'image/' + og_image.format,
		width: og_image.width,
		height: og_image.height,
	}}
>
	<main>
		<header class="main">
			<h1>log</h1>
		</header>
		<div class="articles">
			{
				entires.map(async (entry) => {
					const { Content } = await entry.render()
					const mediaType =
						entry.data.media &&
						entry.data.media.map((m) =>
							m.split('.').includes('mp4') ? 'video' : 'image'
						)
					return (
						<article class="note" transition:name={entry.id}>
							<header>
								<h2>
									{entry.data.date.toLocaleDateString()}
									{/* <a class="" href={`/log/${entry.slug}`}> </a>{' '} */}
								</h2>
								{entry.data.tags.map((t) => (
									<span class="tag-item">#{t}</span>
								))}
							</header>
							<div class="content">
								{entry.data.media && (
									<div class="media">
										{entry.data.media.map((src, i) => (
											<div class="media-item">
												{mediaType[i] === 'video' ? (
													<video muted loop autoplay>
														<source {src} />
													</video>
												) : (
													<img {src} />
												)}
											</div>
										))}
									</div>
								)}
								<Content />
							</div>
						</article>
					)
				})
			}
		</div>
	</main>
	<script>
		;(function (window) {
			function setupVideo() {
				let v = document.querySelectorAll('video')
				v.forEach((v) => {
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
				})
			}

			window.addEventListener('load', setupVideo, false)
		})(window)
	</script>
</Layout>

<style is:global>
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
		margin-inline: auto;

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
			font-size: 1.125rem;
			color: var(--text);
		}
	}

	div.media {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
		padding-block: 1.2rem;
	}
	.media-item {
		/*grid-column: 1/-1;*/
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
