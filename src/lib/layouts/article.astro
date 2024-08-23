---
import type { CollectionEntry } from 'astro:content'
import Layout from '../layouts/base.astro'
import '../css/type.css'
import { slide } from 'astro:transitions'
import { backlinks } from '../backlinks'
export interface Props {
	entry: CollectionEntry<'note'>
}

const { entry } = Astro.props
const { Content, remarkPluginFrontmatter } = await entry.render()

const modified = new Date(remarkPluginFrontmatter.modified)
---

<Layout 
	title={entry.data.title}  
	type={{
		published_time: entry.data.date,
		modified_time: modified,
		tags: entry.data.tags,
	}}
	image={{
		url: `${Astro.url}/og.png`,
		type: 'image/png',
		width: 1200,
		height: 600,
	}}
	>
	<main>
		<div>
			<!-- <a href='#' onclick='history.back()'> ⮌ Return</a> -->
			<article>
				<header>
					<h1> {entry.data.title} </h1>
					<p class="date"> <time>
						{ new Date(entry.data.date).toLocaleDateString()}–{modified.toLocaleDateString()}</time></p>
					<div class="tags">
						{
							entry.data.tags.map((tag) => {
								return (
									<a href={'/tag/'+tag.split(' ').join('-')}>{tag}</span></a>
								)
							})
						}
					</div>
				</header>
				<section class='content'>
					<Content/>
					{backlinks?.get(entry.slug) &&
						<aside id="related">
							<h2>Related</h2>
						{ [...backlinks.get(entry.slug)].map(link => <p><a href={link.slug}>{link.title}</a></p>)}
						</aside>
					}
				</section>
				{<aside id="backlinks">
				</aside>}
			</article>
		</div>
	</main>
</Layout>

<style is:global>
	#related {
		margin-block-start: 3rem;
		padding: 1.5rem;
		border-radius: .5rem;
		background: var(--bg-mid);

		h2 {
			font-size: 1.2rem;
			padding-block: 0 .25rem;
		}
	}
</style>
