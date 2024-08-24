import { unified } from 'unified'
import toMarkdownAST from 'remark-parse'
import toHtmlAST from 'remark-rehype'
import toHtmlString from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeShiki from '@shikijs/rehype'
import matter from 'gray-matter'
import vesper from './vesper.js'
import { remarkModifiedTime } from './remark-modified-time.mjs'
import { rehypeExternalLinks } from './rehype-links.mjs'


// https://github.com/joysofcode/sveltedown/blob/main/src/lib/sveltedown.js

/**
 * Markdown preprocessor.
 * @param {string} content
 */
async function parseMarkdown(content, filepath) {
  const tree = unified().use(toMarkdownAST)
  const processor = await tree
    .use([remarkGfm, remarkSmartypants, remarkModifiedTime])
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
      if (!filename.endsWith('.md')) return
      const { data, content } = matter(contents, {})
      const html = await parseMarkdown(content, filename)
      const code = escapeHtml(html)

      let d = `adafa dafdsafdsaf dsa
      fsfs`
      const script = `
        <script context="module">
          export const metadata = ${JSON.stringify(data)}
          export const raw = \`${d}\`
        </script>
      `
      return { code: script + code }
    }
  }
}

export default svMark
