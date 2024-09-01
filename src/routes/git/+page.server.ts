import type { PageServerLoad } from "../$types";
import { execSync } from 'child_process'

export const load: PageServerLoad = () => {
  const result = execSync(`git log -40 --pretty=oneline`).toString()
  return { result }
}
