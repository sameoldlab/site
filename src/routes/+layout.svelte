<script lang="ts">
	import '$lib/css/main.css'
	import '$lib/css/type.css'
	import Nav from '$lib/components/nav.svelte'
	import Meta from '$lib/components/meta.svelte'
	import { page } from '$app/stores'
	import type { MetaProps } from '$lib/types'
	import type { Snippet } from 'svelte'
	import { fade, fly, slide } from 'svelte/transition'

	interface Props extends MetaProps {
		children: Snippet
	}
	const { children, ...props }: Props = $props()
	console.log($page.data)
	const meta: MetaProps = {
		title: $page.data?.title ?? 'ibro.xyz',
		description:
			$page.data?.description ??
			'Experiments, exploration, bean-feuled execution',
		type: 'website',
		image: {}
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<Meta {...meta} />
</svelte:head>

{#key $page.route.id}
	<div in:fade={{ duration: 260 }}>
		{@render children()}
	</div>
{/key}
<Nav />
