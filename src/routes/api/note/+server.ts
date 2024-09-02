import { getCollection } from '$lib/utils/getCollection'
import { json } from '@sveltejs/kit'
import type { Note } from '$lib/types'
export const prerender = true

export async function GET() {
	const collectionFiles = import.meta.glob(`/src/content/note/*.md`) as Record<
		string,
		() => Promise<Note>
	>
	const collection = await getCollection(collectionFiles)

	return json(
		collection
			.filter((c) => c.metadata?.draft !== true)
			.sort(
				(a, b) =>
					new Date(b.metadata.date).valueOf() -
					new Date(a.metadata.date).valueOf()
			)
	)
}
