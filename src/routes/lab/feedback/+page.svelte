<script lang="ts">
	import { MATHS, editor } from './helpers'
	import { createHighlighter, type HighlighterCore } from 'shiki'
	import { onMount } from 'svelte'
	import { Debounced } from 'runed'
	import { page } from '$app/stores'

	let err = $state('')
	// Math.sqrt(x*x + y*y) > (Math.cos(x + t) + 1) / 2 * 5  ? Math.random(x + t, y + t) * 0.3 : 1
	let script = $state(
		$page.url.hash !== ''
			? decodeURIComponent($page.url.hash).slice(1)
			: '(x * 8) - i + t * sin(5)'
	)
	$effect(() => {
		window.location.hash = encodeURIComponent(debounced.current)
	})

	const debounced = new Debounced(() => script, 500)
	let canvas: HTMLCanvasElement | undefined = $state()
	let shiki: HighlighterCore | undefined = $state()
	let highlighted = $derived(
		!shiki
			? ''
			: shiki.codeToHtml(script, {
					lang: 'javascript',
					theme: 'vesper'
				})
	)

	const size = 1080
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
		const radius = cellSize * 0.69

		let frameId: number
		let lastFrame = 0
		const FPS = 1000 / 24

		const animate = (time: number) => {
			frameId = requestAnimationFrame(animate)
			if (time - lastFrame >= FPS) {
				lastFrame = time
				t = frameId / 36
				ctx.clearRect(0, 0, size, size)
				draw()
			}
		}
		animate(0)

		let inputScript = Function(
			't, i, x, y',
			`const { ${MATHS}} = Math;
				return ${script}
					`
		)
		let result = 0

		function update(fn: Function, script: string) {
			try {
				const test = Function(
					't, i, x, y',
					`const { ${MATHS}} = Math;
					return ${script}
					`
				)
				err = ''
				test(0, 0, 0, 0)
				return test
			} catch (e) {
				err = e
				return fn
			}
		}

		function draw() {
			let i = 0
			inputScript = update(inputScript, debounced.current)

			for (let y = 1; y < gridSize - 1; y++) {
				for (let x = 1; x < gridSize - 1; x++) {
					const centerX = (x + 0.5) * cellSize
					const centerY = (y + 0.5) * cellSize
					result = inputScript(t, i, x, y)

					const angle = result * (Math.PI / 180)
					const endX = centerX + Math.cos(angle) * radius
					const endY = centerY + Math.sin(angle) * radius

					ctx.beginPath()
					ctx.moveTo(centerX, centerY)
					ctx.lineTo(endX, endY)
					ctx.stroke()
					ctx.strokeStyle = `oklch(0.8 0.9 ${(result % 90) + 270})`
					ctx.lineWidth = 16
					i++
				}
				i++
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

		<p><code>{@html '(t,i,x,y) =>'}</code></p>

		<div class="code-input">
			<!-- <input type="textarea" bind:value={script} spellcheck="false" /> -->
			<textarea
				use:editor
				name="script"
				spellcheck="false"
				id="script"
				bind:value={script}
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
