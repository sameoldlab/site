import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const resp = await fetch('/api/note')
	const entries = (await resp.json())
		.sort((a, b) => b.metadata.date.valueOf() - a.metadata.date.valueOf())

	return { entries }
}
/* const notes = (
	await getCollection('note', ({ data }) =>
		// This filters posts OUT
		import.meta.env.PROD ? data.draft !== true : true
	) */
