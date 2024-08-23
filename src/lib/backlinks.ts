import { getCollection, type CollectionEntry } from "astro:content";
type Link = string
type Page = {
  body: string,
  title: string,
  slug: string
}

export const backlinks = await getBacklinks()

async function getBacklinks() {
  const pages = (await getCollection("note")).map(p => ({
    body: p.body,
    title: p.data.title,
    slug: p.slug
  }))

  const map = new Map<Link, Set<Page>>()
  for (const page of pages) {
    // console.log(`searching ${page.slug}...`)
    const links = extractLinks(page)
    for (const link of links) {
      if (!link) return
      const linked = map.get(link) || new Set()
      linked.add(page)
      // console.log({ link: link, slug: page.slug })
      map.set(link, linked)
      // console.log(map.get(link)?.size)
    }
  }
  [map.entries()].map(v => {
    // console.log(v[0])
  })
  return map
}

function extractLinks(page: Page) {
  const content = page.body
  const internalLinks = (content.match(/\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g) || [])
    .map(v => v.slice(2, -2).split(':')[0]?.trim())

  // console.log(page.slug, outbound)
  return internalLinks
}
