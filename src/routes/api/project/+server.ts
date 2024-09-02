import { getCollection } from '$lib/utils/getCollection'
import { json } from '@sveltejs/kit'
export const prerender = true

export async function GET() {
	const collectionFiles = import.meta.glob(`/src/content/project/*.json`)
	const collection = await getCollection(collectionFiles)

	return json(collection.sort((a, b) => a.rank - b.rank))
}
