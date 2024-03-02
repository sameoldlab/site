import { defineConfig } from 'astro/config'
import rome from 'astro-rome'
import { rehypeLinks } from './.rex-plugins/rehype-links.mjs'
import { remarkDeruntify } from './.rex-plugins/remark-derunt.mjs'
import remarkWikilink from 'remark-wiki-link'
import customTheme from '.shiki/vesper.json'
import compress from 'astro-compress'
import sitemap from '@astrojs/sitemap'

import AstroPwa from '@vite-pwa/astro'

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
		compress(),
		AstroPwa({
			mode: 'development',
      base: '/',
      scope: '/',
			manifest: {
				name: 'Astro PWA',
				short_name: 'Astro PWA',
				theme_color: '#ffffff',
			},
			workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      }
		}),
		sitemap(),
	],
	vite: {
		logLevel: 'info',
		define: {
			__DATE__: `'${new Date().toISOString()}'`,
		},
	},
})
