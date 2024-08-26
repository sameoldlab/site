<script lang="ts">
	import Article from '$lib/layouts/article.svelte'

	export let data
	const { content: Content, entry, related } = data
	export const title = 'hello'
</script>

<Article {entry} {related}>
	<Content />
</Article>
