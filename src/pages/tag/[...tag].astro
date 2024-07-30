---
import { getCollection } from 'astro:content'
import Layout from '../../_inc/layouts/collection.astro'

export async function getStaticPaths() {
	const notes = await getCollection('note', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true
	})
	const tags = [
		...new Set(
			notes.reduce((a: string[], { data: { tags } }) => {
				if (tags.length > 0) tags.forEach((t) => a.push(t))
				return a
			}, [])
		),
	]

	return tags.map((tag) => ({
		params: { tag: tag.split(' ').join('-') },
		props: {
			entries: notes
				.filter((v) => v.data.tags.includes(tag))
				.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()),
		},
	}))
}

const { entries } = Astro.props
const { tag } = Astro.params
---

<Layout title={'tag://' + tag.toLocaleLowerCase()} {entries} />
