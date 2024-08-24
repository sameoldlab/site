import { getCollection } from "$lib/utils/getCollection"
import { json } from "@sveltejs/kit"

export async function GET() {
  const collectionFiles = import.meta.glob(`/src/content/note/*.md`)
  const collection = await getCollection(collectionFiles)

  return json(collection)
}
