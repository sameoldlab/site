<script lang="ts">
	import Article from '$lib/layouts/article.svelte'
	let { data } = $props()

	const { content: Content, entry, related } = $derived(data)
</script>

<Article {entry} modified={new Date(data.modified)} {related}>
	<Content />
</Article>
