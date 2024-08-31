import type { PageLoad } from './$types'
import type { MetaProps } from '$lib/types'
import { backlinks } from '$lib/utils/getBacklinks'

export const load: PageLoad = async ({ params }) => {
	const entry = await import(`./../../../content/note/${params.slug}.md`)

	const type: MetaProps['type'] = {
		tags: entry.metadata.tags,
		published_time: new Date(entry.metadata.date),
		modified_time: new Date(entry.modified)
	}
	console.log(type.modified_time)

	return {
		modified: type.modified_time,
		type,
		content: entry.default,
		entry,
		title: entry.metadata.title,
		related: backlinks.get(params.slug)
	}
}
