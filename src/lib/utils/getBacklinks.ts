import type { Note, Page } from "$lib/types"

type Link = string
export const backlinks = getBacklinks()

function getBacklinks() {
  const noteFiles = import.meta.glob(`/src/content/note/*.md`, { eager: true })
  const pages = Object.entries(noteFiles).map(([path, module]) => {
    const { metadata, links } = module as Note
    return {
      title: metadata.title,
      slug: path.split('/').pop()?.split('.')[0],
      links
    }
  })

  const map = new Map<Link, Set<Page>>()
  for (const page of pages) {
    const { links } = page
    for (const link of links) {
      if (!link) break
      const linked = map.get(link) || new Set()
      linked.add(page)
      // console.log({ link: link, slug: page.slug })
      map.set(link, linked)
    }
  }
  return map
}
