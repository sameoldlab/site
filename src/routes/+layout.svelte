<script lang="ts">
	import '$lib/css/main.css'
	import Nav from '$lib/components/nav.svelte'
	import Meta from '$lib/components/meta.svelte'
	import type { MetaProps } from '$lib/types'
	import type { Snippet } from 'svelte'

	interface Props extends MetaProps {
		children: Snippet
	}
	const { children, ...props }: Props = $props()
</script>

<svelte:head>
	<title>{props.title}</title>
	<Meta {...props} />
</svelte:head>

<Nav />
{@render children()}
