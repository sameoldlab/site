import { z, defineCollection } from 'astro:content'

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

const stream = defineCollection({
	schema: z.object({
		date: z.date(),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
	}),
})

const project = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		links: z.array(z.tuple([z.string(), z.string().url()])),
		rank: z.number(),
		media: z
			.array(
				z.object({
					link: z.string(),
					// type: z.enum([z.literal('image'), z.literal('video')]),
					type: z.enum(['image', 'video']),
					alt: z.string(),
					description: z.string().optional(),
				})
			)
			.optional(),
	}),
})

export const collections = { note, stream, project }
