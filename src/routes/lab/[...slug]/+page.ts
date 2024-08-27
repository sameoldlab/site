import type { Entry, Log } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const entry: Entry<Log> = await import(`../../../content/stream/${params.slug}.md`)
	const data = await (await fetch('/api/stream')).json() as Entry<Log>[]
	const index = data.findIndex((v) => v.slug === params.slug)

	return {
		content: entry.default,
		meta: entry.metadata,
		prev: index === 0 ? undefined : data[index - 1],
		next: index === (data.length - 1) ? undefined : data[index + 1],
	}
}

/* const notes = (
await getCollection('note', ({ data }) =>
	// This filters posts OUT
	import.meta.env.PROD ? data.draft !== true : true
} */
