import type { Note, Page } from "$lib/types"
import { getCollection } from "./getCollection"

type Link = string
export const backlinks = getBacklinks()

function getBacklinks() {
  const noteFiles = import.meta.glob(`/src/content/note/*.md`, { eager: true })
  const pages = Object.entries(noteFiles)?.map(([path, module]) => {
    const { metadata, links } = module as Note
    const collectionPath = path
    const slug = path.split('/').pop()?.split('.')[0]
    return {
      title: metadata.title,
      slug,
      links
    }
  })

  const map = new Map<Link, Set<Page>>()
  for (const page of pages) {
    // console.log(`searching ${page.slug}...`)
    const { links } = page
    for (const link of links) {
      if (!link) return
      const linked = map.get(link) || new Set()
      linked.add(page)
      // console.log({ link: link, slug: page.slug })
      map.set(link, linked)
    }
  }
  return map
}
