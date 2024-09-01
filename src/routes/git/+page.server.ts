import type { PageServerLoad } from "../$types";
import { execSync } from 'child_process'

export const load: PageServerLoad = () => {
  const result = execSync(`git log -40 --pretty=oneline`).toString()
  const vercel = process.env.VERCEL
  const cloudflare = process.env.CLOUDFLARE
  return { result, vercel, cloudflare }
}
