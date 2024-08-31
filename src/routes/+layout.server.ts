import type { LayoutServerLoad } from "./$types"
import { existsSync } from 'fs'
export const prerender = true

export const load: LayoutServerLoad = async ({ url, params }) => {
  const path = url.pathname.split('/')
  const title = (params?.slug ?? path[path.length - 1]).replaceAll('-', ' ')
  const ogPath = `/og${path.join('/')}.png`

  if (!existsSync(`static${ogPath}`)) {
    const { renderCard } = await import('$lib/utils/renderCard')
    await renderCard(title, `static${ogPath}`)
  }

  return {
    ogImage: {
      url: ogPath,
      type: 'image/png',
      width: 1200,
      height: 600,
    }
  }
}
