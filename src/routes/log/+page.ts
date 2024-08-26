import type { Log } from '$lib/types';
import { getCollection } from '$lib/utils/getCollection';
import type { PageLoad } from './$types';
export const trailingSlash = 'always'

export const load: PageLoad = async ({ fetch }) => {
	const collectionFiles = import.meta.glob(`/src/content/stream/*.md`) as Record<string, () => Promise<Log>>
	const collection = (await getCollection(collectionFiles))
		.toSorted((a, b) => {
			const rank = new Date(b.metadata.date).valueOf() - new Date(a.metadata.date).valueOf()
			return rank
		})

	return {
		entries: collection
	}
}
