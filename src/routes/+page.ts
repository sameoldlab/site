import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {

  try {
    const projectsRes = await fetch('/api/project')
    const projects = (await projectsRes.json())
    const notes = (await (await fetch('/api/note')).json())
      .filter(({ metadata }) => metadata.draft !== true)

    console.log({ n: notes[0], p: projects[0] })

    return {
      notes,
      projects
    }
  } catch (e) {
    console.log(e)
  }
}

