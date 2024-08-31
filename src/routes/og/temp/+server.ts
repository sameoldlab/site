import { html } from 'satori-html'
import satori from 'satori'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import type { RequestHandler } from '@sveltejs/kit'
import Literata from '$lib/Literata.ttf'
import card from '$lib/OgCard.js'

export const prerender = false
await initWasm(fetch('https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm'))

export const GET = (async ({ url }) => {
	const title = url.searchParams.get('title') ?? ''
	const markup = html(card(title))
	const svg = await satori(markup, {
		width: 1200,
		height: 600,
		fonts: [
			{
				name: 'Literata',
				data: Buffer.from(Literata),
				style: 'italic'
			}
		]
	})

	const image = new Resvg(svg, {
		logLevel: 'trace'
	}).render()

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	})
}) satisfies RequestHandler
