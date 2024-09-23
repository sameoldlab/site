import type { Action } from 'svelte/action'

const sendError = () => {
	let v = $state()
	function get() {
		return v
	}
	function set(err) {
		console.log(err)
		v = err
	}
	return [get, set] as const
}
const [err, setError] = sendError()

const sketch: Action<HTMLCanvasElement, { script: { value: string } }> = (
	canvas: HTMLCanvasElement,
	{ script }
) => {
	console.log(canvas)
	return
	const ctx = canvas.getContext('2d')
	if (!ctx) throw new Error('context not found')

	const resizeCanvas = () => {
		const dpr = window.devicePixelRatio || 1
		const rect = canvas.getBoundingClientRect()
		const size = Math.min(rect.width, rect.height)
		canvas.width = size * dpr
		canvas.height = size * dpr
		ctx.scale(dpr, dpr)
		canvas.style.width = size + 'px'
		canvas.style.height = size + 'px'
		return size
	}
	let size = $state(resizeCanvas())


	const draw = () => {
		try {
			$effect(() => console.log(script.value))
			// should control size, color, and spacing
			//

			const inputScript = $derived(
				new Function('s', 'Math', 'return ' + script.value)
			)

			const gridSize = 12
			const cellSize = size / gridSize
			const radius = cellSize * 0.2

			const result = $derived(inputScript(gridSize, Math))
			$effect(() => console.log(result))
			ctx.fillStyle = 'oklch(0.6 0.3 29)'

			for (let x = 0; x < gridSize; x++) {
				for (let y = 0; y < gridSize; y++) {
					const centerX = (x + 0.5) * cellSize
					const centerY = (y + 0.5) * cellSize

					ctx.beginPath()
					ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
					ctx.fill()
				}
			}
		} catch (error) {
			setError(error)
		}
	}

	window.addEventListener('resize', () => {
		size = resizeCanvas()
	})
	let animationFrameId: number

	const animate = () => {
		draw()
		animationFrameId = requestAnimationFrame(animate)
	}

	animate()

	return {
		destroy() {
			cancelAnimationFrame(animationFrameId)
		}
	}
}
const MATHS = `E, LN10, LN2, LOG10E, LOG2E, PI, SQRT1_2, SQRT2, abs, acos, acosh, asin, asinh, atan, atan2, atanh, cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot, imul, log, log10, log1p, log2, max, min, pow, random, round, sign, sin, sinh, sqrt, tan, tanh, trunc, `

export { err, sketch, MATHS }
