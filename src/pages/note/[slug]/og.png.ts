import { getCollection, type CollectionEntry } from 'astro:content'
import { readFileSync } from 'fs'
import { ImageResponse } from '@vercel/og'

interface Props {
	params: { slug: string }
	props: {
		post: CollectionEntry<'note'>
	}
}

export async function GET({ props }: Props) {
	const { post } = props

	const LiterataItalic = readFileSync(
		process.cwd() + '/public/fonts/Literata_60pt-LightItalic.ttf'
	)

	const html = {
		type: 'div',
		props: {
			tw: 'w-full h-full flex items-center justify-center relative px-22',
			style: {
				background: '#141414',
				fontFamily: 'Literata',
			},
			children: [
				{
					type: 'div',
					props: {
						// tw: 'absolute left-[40px] bottom-[40px] flex items-center',
						style: {
							fontFamily: '"LiterataItalic"',
							marginTop: 40,
							color: 'white',
							position: 'absolute',
							width: '1000px',
							fontSize: 81,
							// top: `calc(50% - 290px/2 + 125px)`,
							bottom: '1rem',
							left: '2rem',
							opacity: 0.88,
							fontStyle: 'italic',
							fontWeight: 300,
						},
						children: post.data.title,
					},
				},
			],
		},
	}

	return new ImageResponse(html, {
		width: 1200,
		height: 600,
		fonts: [
			{
				name: 'LiterataItalic',
				data: LiterataItalic.buffer,
				style: 'italic',
			},
		],
	})
}

export async function getStaticPaths() {
	const notes = await getCollection('note')
	return notes.map(post => ({
		params: { slug: post.slug },
		props: { post },
	}))
}
