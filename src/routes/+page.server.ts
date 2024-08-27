import type { PageServerLoad } from "./$types"
export const prerender = false

export const load: PageServerLoad = async ({ url }) => {
  return {
    title: url.hostname
  }
}


