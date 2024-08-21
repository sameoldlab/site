import { defineConfig } from 'astro/config'
import { rehypeExternalLinks } from './.rex-plugins/rehype-links.mjs'
import { remarkModifiedTime } from './.rex-plugins/remark-modified-time.mjs'
import remarkWikilink from 'remark-wiki-link'
import customTheme from '.shiki/vesper.json'
// import compress from 'astro-compress'
import sitemap from '@astrojs/sitemap'
import serviceWorker from 'astrojs-service-worker'
import svelte from '@astrojs/svelte'
import vercel from '@astrojs/vercel/static'
import metaTags from 'astro-meta-tags'

// https://astro.build/config
export default defineConfig({
	assets: true,
	output: 'static',
	adapter: vercel({
		imagesConfig: {
			sizes: [320, 640, 1280],
			domains: [],
		},
		imageService: true,
		devImageService: 'sharp',
		webAnalytics: { enabled: false },
	}),
	image: {
		domains: ['ibro.xyz'],
	},
	prefetch: {
		defaultStrategy: 'hover',
		prefetchAll: true,
	},
	site: 'https://ibro.xyz',
	markdown: {
		shikiConfig: {
			theme: customTheme,
			themes: {
				light: 'rose-pine-dawn',
				dark: 'poimandres',
			},
			wrap: true,
		},
		rehypePlugins: [rehypeExternalLinks],
		remarkPlugins: [
			[
				remarkWikilink,
				{
					hrefTemplate: permalink => `/note/${permalink}`,
				},
			],
			remarkModifiedTime,
		],
	},
	integrations: [
		// compress(), /*  munmap_chunk(): invalid pointer */
		serviceWorker({
			// https://developer.chrome.com/docs/workbox/modules/workbox-build/
			workbox: {
				cacheId: "ibro.xyz",
				runtimeCaching: [
					{
						urlPattern: /\/$/,
						handler: "NetworkFirst",
					},
					{
						urlPattern: /\.html$/,
						handler: 'StaleWhileRevalidate'
					},
					{
						// we serve stale copies of static assets while they're refreshed
						urlPattern:
							/^.*\.(ico|svg|json)$/,
						handler: "StaleWhileRevalidate",
					},
					{
						// Network wil not be used at all for assets which are unlikely to change
						urlPattern: /^.*\.(jpg|png|mp4|gif|webp|woff2)$/,
						handler: "CacheFirst",
					}
				],
			},
		}),
		sitemap(),
		svelte(),
		metaTags(),
	],
})
