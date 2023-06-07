import { z, defineCollection } from "astro:content"

// src: https://github.com/chrismwilliams/astro-theme-cactus/blob/main/src/content/config.ts
function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
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
