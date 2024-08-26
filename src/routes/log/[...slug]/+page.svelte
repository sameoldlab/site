<script lang="ts">
	import '$lib/css/type.css'
	// import Article from '$lib/layouts/article.svelte'

	export let data
	const { content: Content, meta } = data
</script>

<main>
	<div>
		<!-- <a href='#' onclick='history.back()'> ⮌ Return</a> -->
		<article>
			<header>
				<h1 class="date">
					<time>
						{new Date(meta.date).toLocaleDateString()}
					</time>
				</h1>
				<div class="tags">
					{#each meta.tags as tag}
						<a href={'/tag/' + tag.split(' ').join('-')}>{tag}</a>
					{/each}
				</div>
			</header>
			<section class="content">
				<Content />
			</section>
		</article>
	</div>
</main>
