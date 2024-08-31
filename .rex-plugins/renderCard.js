import { html } from 'satori-html'
import satori from 'satori'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
// import Literata from '../src/lib/Literata.ttf'
import card from './OgCard.js'
import { readFileSync, writeFile } from 'fs'

const Literata = readFileSync('.assets/Literata.ttf')
await initWasm(fetch('https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm'))

export const renderCard = async (title = '', path = '') => {
	const markup = html(card(title))
	const svg = await satori(markup, {
		width: 1200,
		height: 600,
		fonts: [
			{
				name: 'Literata',
				data: Literata.buffer,
				style: 'italic'
			}
		]
	})

	const image = new Resvg(svg, {
		logLevel: 'trace'
	}).render()

	return new Promise((resolve, reject) => {
		writeFile(path, image.asPng(), (err) => {
			console.error(err)
			reject(err)
		})
		resolve()
	})
} 
