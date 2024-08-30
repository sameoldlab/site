import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { readFileSync } from 'fs'

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), readTtf()],
	server: {
		fs: {
			allow: ['..']
		}
	}
})

function readTtf() {
	return {
		name: 'vite=plugin-read-ttf',
		transform(code, id) {
			if (id.endsWith('.ttf')) {
				const buffer = readFileSync(id)
				return { code: `export default ${JSON.stringify(buffer)}`, map: null }
			}
		}
	}
}

