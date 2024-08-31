<script lang="ts">
	import '$lib/css/main.css'
	import '$lib/css/type.css'
	import Nav from '$lib/components/nav.svelte'
	import Meta from '$lib/components/meta.svelte'
	import { page } from '$app/stores'
	import Vt from './ViewTransition.svelte'
	let { children, data } = $props()
	/* animations are not a good reason to rerender the entire page  {#key $page.data.title} <div  in:fade={{ duration: 260, delay: 81, easing: circInOut }} out:fade={{ duration: 40, easing: circOut }}  > {@render children()} </div> {/key} */
</script>

<svelte:head>
	<title>{$page.data.title}</title>
	<Meta {...$page.data} image={data.ogImage} />
</svelte:head>
<Vt>{@render children()}</Vt>
<Nav />
