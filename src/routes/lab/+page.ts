import type { Log } from '$lib/types'
import { getCollection } from '$lib/utils/getCollection'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	const collectionFiles = import.meta.glob(
		`/src/content/stream/*.md`
	) as Record<string, () => Promise<Log>>
	const collection = await getCollection(collectionFiles)
	return {
		entries: collection.reverse(),
		title: 'Lab'
	}
}
