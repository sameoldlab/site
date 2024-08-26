import type { Note } from '$lib/types';
import type { PageLoad } from './$types';
export const prerender = true

export const load: PageLoad = async ({ fetch, params }) => {
	const resp = await fetch('/api/note')
	const entries = (await resp.json() as Note[])
		.filter((e) => e.metadata.tags?.map((t) => t.replace(' ', '-')).includes(params.tag))

	return { entries, title: params.tag }
}
/* export async function getStaticPaths() {
	const blogEntries = await getCollection('note', ({ data }) =>
		import.meta.env.PROD ? data.draft !== true : true
	)
	return blogEntries.map((entry) => ({
		params: { slug: entry.slug },
		props: { entry }
	}))
} */

