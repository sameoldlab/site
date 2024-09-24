<script lang="ts">
	import { MATHS } from './helpers'
	import { codeToHtml, createHighlighter, type HighlighterCore } from 'shiki'
	import { onMount } from 'svelte'
	import { Previous, Debounced } from 'runed'
	import { page } from '$app/stores'
	import { replaceState } from '$app/navigation'
	let err = $state()
	// Math.sqrt(x*x + y*y) > (Math.cos(x + t) + 1) / 2 * 5  ? Math.random(x + t, y + t) * 0.3 : 1
	let script = $state(
		decodeURIComponent($page.url.hash).slice(1) ?? '(sin(t * 7) - t * i) / y'
	)
	$effect(() => {
		window.location.hash = encodeURIComponent(debounced.current)
	})

	const debounced = new Debounced(() => script, 500)
	const lastScript = new Previous(() => script)
	let canvas: HTMLCanvasElement | undefined = $state()
	let shiki: HighlighterCore | undefined = $state()
	let highlighted = $derived(
		!shiki
			? ''
			: shiki.codeToHtml(script, {
					lang: 'javascript',
					theme: 'vesper',
					transformers: [
						{
							code(node) {
								this.addClassToHast(node, 'language-js')
							},
							line(node, line) {
								node.properties['data-line'] = line
								if ([1, 3, 4].includes(line))
									this.addClassToHast(node, 'highlight')
							},
							span(node, line, col) {
								node.properties['data-token'] = `token:${line}:${col}`
							}
						}
					]
				})
	)

	const size = 1000
	onMount(async () => {
		shiki = await createHighlighter({
			themes: ['vesper'],
			langs: ['javascript']
		})
		const ctx = canvas && canvas.getContext('2d')
		if (!ctx) throw new Error('context not found')
		sketch(ctx)
	})

	function sketch(ctx: CanvasRenderingContext2D) {
		// $effect(() => console.log(script))
		// should control size, color, and spacing

		const gridSize = 12
		const cellSize = size / gridSize

		let t = $state(0)
		const radius = cellSize * 0.44

		let animationFrameId: number
		let lastFrame = 0
		const FPS = 1000 / 30

		const animate = (time: number) => {
			animationFrameId = requestAnimationFrame(animate)
			if (time - lastFrame >= FPS) {
				lastFrame = time
				t = animationFrameId / 8
				draw()
			}
		}
		animate(0)

		let last
		function draw() {
			let i = 0
			let inputScript
			try {
				inputScript = Function(
					's, x, y, i, t, Math',
					`const { ${MATHS}} = Math;
				
						let fn = () => ${debounced.current};
						return fn(); `
				)
				for (let y = 0; y < gridSize; y++) {
					for (let x = 0; x < gridSize; x++) {
						i++
						const centerX = (x + 0.5) * cellSize
						const centerY = (y + 0.5) * cellSize
						let result
						try {
							result = inputScript(gridSize, x, y, i, t, Math)
							// console.info(result)
							err = ''
						} catch (e) {
							console.error(e)
							err = e
						}
						ctx.fillStyle = `oklch(0.6 0.3 ${result})`
						ctx.strokeStyle = `oklch(0.6 0.3 ${result})`

						ctx.beginPath()
						ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
						ctx.stroke()
					}
					i++
				}
				last = inputScript
			} catch (e) {
				inputScript = last
				err = e
			}
		}
	}
</script>

<main>
	<div class="canvas-container">
		<canvas bind:this={canvas} width={size} height={size}> </canvas>
	</div>
	<div class="controls">
		<h1>Feedback</h1>

		<p><code>Code:</code></p>

		<div class="code-input">
			<!-- <input type="textarea" bind:value={script} spellcheck="false" /> -->
			<textarea name="script" spellcheck="false" id="script" bind:value={script}
			></textarea>
			{@html highlighted}
		</div>
		{#if err}
			<error>
				<code>
					{err}
				</code></error
			>
		{/if}
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
		margin-inline: auto;
		padding: 1rem;
		margin-block-start: 3rem;
	}
	.canvas-container {
		grid-column: 1;
		display: grid;
		justify-items: center;
	}
	error {
		color: oklch(0.8 0.3 30);
	}
	canvas {
		/* background: var(--bg-high); */
		width: min(100%, 500px);
		aspect-ratio: 1/1;
		border-radius: 0.25rem;
	}
	.controls {
		grid-column: 2;
	}
	@media (max-width: 800px) {
		main {
			grid-template-columns: 1fr;
		}
		.canvas-container {
			grid-row: 1;
		}
		.controls {
			grid-column: 1;
			grid-row: 2;
		}
	}
	.code-input {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		border: 1px solid var(--border-color);
		border-radius: 0.25rem;
		overflow: hidden;

		textarea,
		:global(pre) {
			padding: 0.5rem;
			grid-area: 1 / 1;
			background: transparent;
			border: none;
			border-radius: 0.25rem;
			font-family: 'Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Consolas',
				monospace;

			font-size: 14px;
			line-height: 1.5;

			width: 100%;
			height: 100%;
			box-sizing: border-box;
			white-space: pre-wrap;
			word-break: break-all;
			overflow: hidden;
		}

		textarea {
			color: transparent;
			caret-color: var(--t-high);
			z-index: 2;
			resize: none;
			&:focus {
				outline: none;
			}
		}
		textarea,
		:global(code) {
			font-size: 0.9rem;
		}
	}
</style>
