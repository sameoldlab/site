/** @type {import("prettier").Config} */
const config = {
	plugins: ['prettier-plugin-astro'],
	trailingComma: 'es5',
	quoteProps: 'consistent',
	semi: false,
	singleQuote: true,
	useTabs: true,
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro'
			}
		}
	]
}

export default config
