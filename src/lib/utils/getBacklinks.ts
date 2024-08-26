import type { Note, Page } from "$lib/types"
import { getCollection } from "./getCollection"

type Link = string
export const backlinks = await getBacklinks()

async function getBacklinks() {
  const noteFiles = import.meta.glob(`/src/content/note/*.md`) as Record<string, () => Promise<Note>>

  const notes = await getCollection(noteFiles)

  const pages = notes.map((p) => ({
    title: p.metadata.title,
    slug: p.slug,
    links: p.links,
  }))

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

function extractLinks(page: Page) {
  const content = page?.body
  const internalLinks = (content.match(/\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g) || [])
    .map(v => v.slice(2, -2).split(':')[0]?.trim())

  console.log(page.slug, internalLinks)
  return internalLinks
}
