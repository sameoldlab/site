import { unified } from 'unified'
import toMarkdownAST from 'remark-parse'
import toHtmlAST from 'remark-rehype'
import toHtmlString from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeShiki from '@shikijs/rehype'
import matter from 'gray-matter'
import vesper from './vesper.js'
import { modifiedTime } from './modified-time.js'
import remarkWikiLink from 'remark-wiki-link'
import { rehypeExternalLinks } from './rehype-links.js'
import { renderCard } from './renderCard.js'

// https://github.com/joysofcode/sveltedown/blob/main/src/lib/sveltedown.js

/**
 * Markdown preprocessor.
 * @param {string} content
 */
async function parseMarkdown(content, filepath) {
	const processor = await unified()
		.use(toMarkdownAST)
		.use(remarkWikiLink, {
			pageResolver: (page) => [page],
			hrefTemplate: (permalink) => `/note/${permalink}`
		})
		.use([remarkGfm, remarkSmartypants])
		.use(toHtmlAST, { allowDangerousHtml: true })
		.use(rehypeShiki, { theme: vesper })
		.use(rehypeExternalLinks)
		.use(toHtmlString, { allowDangerousHtml: true })
		.process(content)
	return processor.toString()
}

/**
 * Replace characters with HTML entities.
 * @param {string} content
 */
function escapeHtml(content) {
	content = content.replace(/{/g, '&#123;').replace(/}/g, '&#125;')

	const componentRegex = /<[A-Z].*/g
	const components = content.match(componentRegex)
	components?.forEach((component) => {
		const replaced = component.replace('&#123;', '{').replace('&#125;', '}')
		content = content.replace(component, replaced)
	})

	return content
}

function extractLinks(content = '') {
	const internalLinks = (
		content.match(/\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g) || []
	).map((v) => v.slice(2, -2).split(':')[0]?.trim())

	return internalLinks
}

function svMark() {
	return {
		name: 'svmark',
		/**
		 * Convert Markdown to HTML
		 * @param {Object} param
		 * @param {string} param.content
		 * @param {string} param.filename
		 */
		async markup({ content: contents, filename }) {
			try {
				if (!filename.endsWith('.md')) return { code: contents }
				const { data, content } = matter(contents, {})
				const html = await parseMarkdown(content, filename)
				const code = escapeHtml(html)
				const links = extractLinks(content)
				const slug = filename.split('/').pop().split('.')[0]
				renderCard(data.title ?? data.date, `./static/og/${slug}.png`)
				const script = `
        <script module>
          export const metadata = ${JSON.stringify(data)}
          export const modified = ${modifiedTime(filename)}
          export const links = ${JSON.stringify(links)}
        </script>
      `
				return { code: script + code }
			} catch (e) {
				console.error(e)
			}
		}
	}
}

// export const raw = \`${escapeHtml(content)}\`
export default svMark
