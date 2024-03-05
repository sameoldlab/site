import { defineConfig } from 'astro/config'
import { rehypeLinks } from './.rex-plugins/rehype-links.mjs'
import { remarkDeruntify } from './.rex-plugins/remark-derunt.mjs'
import remarkWikilink from 'remark-wiki-link'

import customTheme from '.shiki/vesper.json'
// import compress from 'astro-compress'
import sitemap from '@astrojs/sitemap'
import serviceWorker from 'astrojs-service-worker'

// https://astro.build/config
export default defineConfig({
	assets: true,
	prefetch: true,
	site: 'https://notes.ibro.xyz',
	markdown: {
		shikiConfig: {
			theme: customTheme,
			wrap: true,
		},
		rehypePlugins: [rehypeLinks],
		remarkPlugins: [
			remarkDeruntify,
			[
				remarkWikilink,
				{
					hrefTemplate: permalink => `/note/${permalink}`,
				},
			],
		],
	},
	integrations: [
		rome(),
		// compress(), /*  munmap_chunk(): invalid pointer */
		serviceWorker({
			// https://developer.chrome.com/docs/workbox/modules/workbox-build/
			workbox: {},
		}),

		sitemap(),
	],
})
