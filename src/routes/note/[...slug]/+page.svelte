<script lang="ts">
	import Article from '$lib/layouts/article.svelte'
	let { data } = $props()

	const { content: Content, entry, related } = $derived(data)
	export const title = 'hello'
</script>

<Article {entry} modified={new Date(data.modified)} {related}>
	<svelte:component this={Content} />
</Article>
