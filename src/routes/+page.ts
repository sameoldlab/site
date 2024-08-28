import type { Note } from '$lib/types'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
	try {
		const projectsRes = await fetch('/api/project')
		const projects = await projectsRes.json()
		const notes = ((await (await fetch('/api/note')).json()) as Note[]).filter(
			({ metadata }) => metadata.draft !== true
		)

		return {
			notes,
			projects
		}
	} catch (e) {
		console.log(e)
	}
}
