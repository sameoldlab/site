import { defineConfig } from "astro/config"
import rome from "astro-rome"
import prefetch from "@astrojs/prefetch"
import { rehypeLinks } from "./.rex-plugins/rehype-links.mjs"
import { remarkDeruntify } from "./.rex-plugins/remark-derunt.mjs"
import remarkWikilink from "remark-wiki-link"

// https://astro.build/config
export default defineConfig({
    experimental: {
        assets: true
    },
  markdown: {
    shikiConfig: {
      theme: "material-theme-darker",
      wrap: true,
    },
    rehypePlugins: [rehypeLinks],
    remarkPlugins: [
      remarkDeruntify,
      [remarkWikilink, { hrefTemplate: ((permalink) => `/note/${permalink}`) }],
    ],
  },
  site: "https://notes.ibro.xyz",
  integrations: [rome(), prefetch()],
})
