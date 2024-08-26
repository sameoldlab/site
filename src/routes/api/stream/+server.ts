import type { Log } from "$lib/types"
import { getCollection } from "$lib/utils/getCollection"
import { json } from "@sveltejs/kit"

export async function GET() {
  const collectionFiles = import.meta.glob(`/src/content/stream/*.md`) as Record<string, () => Promise<Log>>
  const collection = await getCollection(collectionFiles)

  return json(collection
    .sort((a, b) => new Date(a.metadata.date).valueOf() - new Date(b.metadata.date).valueOf())
  )
}
