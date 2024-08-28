<script lang="ts">
	import '$lib/css/main.css'
	import '$lib/css/type.css'
	import Nav from '$lib/components/nav.svelte'
	import Meta from '$lib/components/meta.svelte'
	import { page } from '$app/stores'
	import type { MetaProps } from '$lib/types'
	import { fade } from 'svelte/transition'

	const { children } = $props()

	const meta: MetaProps = $derived({
		title: $page.data?.title ?? 'ibro.xyz',
		description: $page.data?.description ?? 'Recover, Remix, Resuscitate',
		type: $page.data?.type ?? 'website'
	})
</script>

<svelte:head>
	<title>{meta.title}</title>
	<Meta {...meta} />
</svelte:head>

{#key $page.route.id}
	<div in:fade={{ duration: 160 }}>
		{@render children()}
	</div>
{/key}
<Nav />
