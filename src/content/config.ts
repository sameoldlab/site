import { z, defineCollection } from "astro:content"

// src: https://github.com/chrismwilliams/astro-theme-cactus/blob/main/src/content/config.ts
function removeDupsAndLowerCase(array: string[]) {
  if (array.length === 0) return array
  return Array.from(new Set(array.map((str) => str.toLowerCase())))
}

const note = defineCollection({
  schema: z.object({
    title: z.string().optional().default(''),
    date: z.date(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    draft: z.boolean().optional(),
  }),
})

export const collections = { note }
