import { defineConfig } from 'astro/config';
import { rehypeExternalLinks } from './.rex-plugins/rehype-links.mjs';
// import { remarkDeruntify } from './.rex-plugins/remark-derunt.mjs'
import { remarkModifiedTime } from './.rex-plugins/remark-modified-time.mjs';
import remarkWikilink from 'remark-wiki-link';
import customTheme from '.shiki/vesper.json';
// import compress from 'astro-compress'
import sitemap from '@astrojs/sitemap';
import serviceWorker from 'astrojs-service-worker';
import svelte from '@astrojs/svelte';

import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  assets: true,
  image: {
    service: {
      // https://docs.astro.build/en/guides/images/#add-simple-asset-support-for-cloudflare-deno-vercel-edge-and-netlify-edge
      entrypoint: 'astro/assets/services/noop'
    }
  },
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: true
  },
  site: 'https://notes.ibro.xyz',
  markdown: {
    shikiConfig: {
      theme: customTheme,
      wrap: true
    },
    rehypePlugins: [rehypeExternalLinks],
    remarkPlugins: [[remarkWikilink, {
      hrefTemplate: permalink => `/note/${permalink}`
    }], remarkModifiedTime]
  },
  integrations: [
  // compress(), /*  munmap_chunk(): invalid pointer */
  serviceWorker({
    // https://developer.chrome.com/docs/workbox/modules/workbox-build/
    workbox: {}
  }), sitemap(), svelte(), metaTags()]
});