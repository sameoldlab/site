import type { PageServerLoad } from './$types'
import { execSync } from 'child_process'
export const prerender = true

export const load: PageServerLoad = async ({ url, params }) => {
	const filepath = `src/content/note/${params.slug}.md`
	const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`)
	const title = url.hostname

	return {
		title,
		modified: result.toString(),
	}
}
