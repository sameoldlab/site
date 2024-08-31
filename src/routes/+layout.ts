export const prerender = true
import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async ({ params }) => {
  if (!params?.slug) return
  return {
    ogImage: {
      url: '/og/' + params.slug + '.png',
      type: 'image/png',
      width: 1200,
      height: 600,
    }
  }
}
