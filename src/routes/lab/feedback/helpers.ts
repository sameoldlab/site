import type { Action } from 'svelte/action'

export const MATHS = `E, LN10, LN2, LOG10E, LOG2E, PI, SQRT1_2, SQRT2, abs, acos, acosh, asin, asinh, atan, atan2, atanh, cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot, imul, log, log10, log1p, log2, max, min, pow, random, round, sign, sin, sinh, sqrt, tan, tanh, trunc, `

export const editor: Action<HTMLTextAreaElement> = (ed) => {
	const keybinds = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === 'Enter') {
			location.reload()
		}
	}

	ed.addEventListener('keydown', keybinds)
	return {
		destroy() {
			ed.removeEventListener('keydown', keybinds)
		}
	}
}

