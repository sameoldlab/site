import type { LayoutServerLoad } from "./$types"
export const prerender = true

export const load: LayoutServerLoad = async ({ params }) => {
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
