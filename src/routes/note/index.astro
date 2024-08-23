---
import { getCollection } from 'astro:content'
import Collection from '../../_inc/layouts/collection.astro'
import og_image from './_og.png'

const notes = (
	await getCollection('note', ({ data }) =>
		// This filters posts OUT
		import.meta.env.PROD ? data.draft !== true : true
	)
).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
---

<Collection
	title="Notes"
	entries={notes}
	collapsed
	meta={{
		image: {
			url: og_image.src,
			type: 'image/' + og_image.format,
			width: og_image.width,
			height: og_image.height,
		},
	}}
/>
