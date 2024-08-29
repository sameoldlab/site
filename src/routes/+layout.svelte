<script lang="ts">
	import '$lib/css/main.css'
	import '$lib/css/type.css'
	import Nav from '$lib/components/nav.svelte'
	import Meta from '$lib/components/meta.svelte'
	import { page } from '$app/stores'
	import type { MetaProps } from '$lib/types'
	import { fade } from 'svelte/transition'
	import { circIn, circOut } from 'svelte/easing'

	let { data, children } = $props()
</script>

<svelte:head>
	<title>{$page.data.title}</title>
	<Meta {...$page.data} />
</svelte:head>
{#key data.currentRoute}
	<div
		out:fade={{ duration: 40, easing: circOut }}
		in:fade={{ duration: 260, delay: 81, easing: circIn }}
	>
		{@render children()}
	</div>
{/key}
<Nav />
