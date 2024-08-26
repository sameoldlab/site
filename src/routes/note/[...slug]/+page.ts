import type { PageLoad } from './$types';
import { backlinks } from '$lib/utils/getBacklinks';
export const prerender = true

export const load: PageLoad = async ({ params }) => {
	const entry = await import(`./../../../content/note/${params.slug}.md`)

	return {
		content: entry.default,
		entry,
		title: entry.metadata.title,
		related: backlinks?.get(params.slug)
	}
}

/*
	const blogEntries = await getCollection('note', ({ data }) =>
	import.meta.env.PROD ? data.draft !== true : true
*/

