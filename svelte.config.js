import adapter from '@sveltejs/adapter-auto'
import markdownPreprocess from './.rex-plugins/svMark.js'
import { sveltePreprocess } from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [markdownPreprocess(), sveltePreprocess()],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				if (
					['/note/nft-folder', '/note/visor', '/note/fractl-ui'].includes(path)
				)
					return

				console.error(`no page found for ${path} from ${referrer}\n${message}`)
			}
		}
	}
}

export default config
