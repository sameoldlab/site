---
import { getCollection } from 'astro:content'
import Article from '../../../_inc/layouts/article.astro'

export async function getStaticPaths() {
	const blogEntries = await getCollection('stream', ({ data }) =>
		import.meta.env.PROD ? data.draft !== true : true
	)
	return blogEntries.map((entry) => ({
		params: { slug: entry.slug },
		props: { entry },
	}))
}

const { entry } = Astro.props
const { Content } = await entry.render()
---

<Article {entry}>
	<Content />
</Article>
