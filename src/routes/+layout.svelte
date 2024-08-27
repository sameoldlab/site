<script lang="ts">
	import '$lib/css/main.css'
	import '$lib/css/type.css'
	import Nav from '$lib/components/nav.svelte'
	import Meta from '$lib/components/meta.svelte'
	import { page } from '$app/stores'
	import type { MetaProps } from '$lib/types'
	import type { Snippet } from 'svelte'
	import { fade } from 'svelte/transition'

	interface Props extends MetaProps {
		children: Snippet
	}
	const { children, ...props }: Props = $props()
	const meta: MetaProps = {
		title: $page.data?.title ?? 'ibro.xyz',
		description:
			$page.data?.description ??
			'Experiments, exploration, bean-feuled execution',
		type: 'website'
	}
</script>

<svelte:head>
	<title>{$page.data.title}</title>
	<Meta {...$page.data} />
</svelte:head>

{#key $page.route.id}
	<div in:fade={{ duration: 260 }}>
		{@render children()}
	</div>
{/key}
<Nav />
