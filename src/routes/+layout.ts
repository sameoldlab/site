import type { PageLoad } from "./$types"

export const load: PageLoad = ({ url }) => {
  const currentRoute = url.pathname

  return {
    currentRoute
  }
}

export const prerender = true
