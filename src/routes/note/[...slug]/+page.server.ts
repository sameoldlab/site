import type { PageServerLoad } from "./$types"
import { execSync } from "child_process";

export const load: PageServerLoad = async ({ url, params }) => {
  const entry = await import(`./../../../content/note/${params.slug}.md`)
  const filepath = `src/content/note/${params.slug}.md`
  const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);

  return {
    title: url.hostname,
    modified: result.toString()
  }
}
