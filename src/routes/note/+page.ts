import type { Entry, Note } from '$lib/types'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
	const entries: Entry<Note>[] = []
	try {
		const resp = await fetch('/api/note')
		entries.push(...(await resp.json()))
	} catch (e) {
		console.error(e)
	}
	return { entries, title: 'Notes' }
}
