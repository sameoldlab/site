import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const entry = await import(`../../../content/stream/${params.slug}.md`)

	console.log(entry)
	return {
		content: entry.default,
		meta: entry.metadata
	}
}

/* const notes = (
await getCollection('note', ({ data }) =>
	// This filters posts OUT
	import.meta.env.PROD ? data.draft !== true : true
) 
)
return blogEntries.map((entry) => ({
params: { slug: entry.slug },
props: { entry }
}))
} */
