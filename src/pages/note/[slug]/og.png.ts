import { getCollection, type CollectionEntry } from 'astro:content'
import { readFileSync } from 'fs'
import { html } from 'satori-html'
import satori from 'satori'
import sharp from 'sharp'

interface Props {
	params: { slug: string }
	props: {
		post: CollectionEntry<'note'>
	}
}

export async function GET({ props }: Props) {
	const { post } = props

	const Literata = readFileSync(
		process.cwd() + '/public/fonts/Literata_60pt-LightItalic.ttf'
	)

	const markup = html(`
		<div
			class="w-full h-full flex items-center justify-center relative px-22 bg-[#141414]"
		>
			<div style="
				font-family: Literata;
				font-size: 81;
				display: flex;
				color: white;
				opacity: 0.88;

				position: absolute;
				margin-top: 40;
				width: 1000px;
				bottom: 1rem;
				left: 2rem;
			">
				${post.data.title}
			</div>
		</div>
		`)

	const svg = await satori(markup, {
		width: 1200,
		height: 600,
		fonts: [
			{
				name: 'Literata',
				data: Literata.buffer,
				style: 'italic',
			},
		],
	})

	const png = await sharp(Buffer.from(svg)).png().toBuffer()

	return new Response(png, {
		status: 200,
		statusText: 'OK',
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	})
}

export async function getStaticPaths() {
	const notes = await getCollection('note')
	return notes.map(post => ({
		params: { slug: post.slug },
		props: { post },
	}))
}
