import type { Entry, Log } from '$lib/types'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
	const entry: Entry<Log> = await import(
		`../../../content/stream/${params.slug}.md`
	)
	let prev: Entry<Log> | undefined
	let next: Entry<Log> | undefined
	try {
		const data = (await (await fetch('/api/stream')).json()) as Entry<Log>[]
		const index = data.findIndex((v) => v.slug === params.slug)
		prev = index === 0 ? undefined : data[index - 1]
		next = index === data.length - 1 ? undefined : data[index + 1]
	} catch (e) {
		console.error(e)
	}

	return {
		content: entry.default,
		meta: entry.metadata,
		title: `${entry.metadata.date} | Lab`,
		prev,
		next,
	}
}
