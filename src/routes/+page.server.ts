import type { PageServerLoad } from './$types'
import type { Note } from '$lib/types'

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const projects = await (await fetch('/api/project')).json()
		const notes = await (await fetch('/api/note')).json() as Note[]
		const tags = notes.reduce((acc, entry) => {
			entry.metadata.tags?.forEach((t) => {
				if (t === 'meta' || t === 'rabbithole') return
				let tag = acc.get(t)
				if (tag === undefined) tag = 0
				acc.set(t, tag + 1)
			})
			return acc
		}, new Map<string, number>())

		return {
			tags,
			projects,
			title: "same.supply",
		}
	} catch (e) {
		console.error(e)
	}
}
/*
let recent = notes.map(async (entry) => {
const { remarkPluginFrontmatter } = await entry.render()
const modified = new Date(remarkPluginFrontmatter.modified)
return {
	modified,
	title: entry.title,
	slug: entry.slug
}
}).sort(async (a, b) => {
const ar = await a
const br = await b
return ar.modified.getTimezoneOffset() - br.modified.getTimezoneOffset() 
}).filter((_,i) => i < 5)
*/
