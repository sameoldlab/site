<script lang="ts">
	import type { PageData } from './$types.js'
	export let data: PageData
	const { tags, projects } = data
</script>

<main>
	<section>
		<p class="">
			<em>Building interfaces to communicate data.</em> Exploring interactions
			for easier data-ownership, open protocols, privacy and hyperpads. If this
			<em>computer thing</em> doesn't pan out, I'll probably try metalwork or washing
			coffee again. Till then you can find me on the internet working with design,
			code, and the many little things in between.
		</p>
		<p class="">I'm Ibro. Welcome to my website. Hi.</p>
	</section>
	<div>
		<section id="projects">
			<h2 class="subhead">Recently working on</h2>
			{#each projects as entry}
				<p>
					{#if entry.links}
						<a class="" href={entry.links[0][1]}>
							<em class="title">{entry.title}</em>
							<span class="description"> — {entry.description}</span>
						</a>
					{:else}
						<em class="title">{entry.title}</em>
						<span class="description"> — {entry.description}</span>
					{/if}
				</p>
			{/each}
		</section>
		<section id="notes">
			<h2 class="subhead">and writing about</h2>
			<div class="row tags">
				{#each tags as [tag, count]}
					<a href={`/note/?tag=${tag.replaceAll(' ', '-')}`}>
						<em class="title">{tag}</em>{' '}
						<span class="description">{count}</span>
					</a>
				{/each}
			</div>
		</section>
	</div>
	<hr />
	<section id="socials">
		<div class="row">
			<p>
				Reach out by <a class="link" href="mailto:hey@same.supply">email</a>,
				<a
					class="link"
					href="https://www.are.na/sameoldlab"
					rel="noreferrer"
					target="_blank">are.na</a
				>, or
				<a
					class="link"
					href="https://github.com/sameoldlab"
					rel="noreferrer"
					target="_blank">github</a
				>.
			</p>
		</div>
	</section>
</main>

<style>
	main {
		padding-block-start: 5rem;
		padding-inline: 2rem;
		width: min(80ch, 100%);
		margin-inline: auto;
	}
	.tags {
		justify-content: start;
		padding-block-end: 1rem;
	}

	#socials {
		display: flex;
		padding-top: 2rem;
		padding-bottom: 4rem;
	}

	h2.subhead {
		font-size: 1rem;
		padding-top: 0.5rem;
		padding-block-end: 0.25rem;
		color: var(--t-high);
	}
	section {
		margin-top: 2em;
	}
	em {
		color: var(--t-high);
	}
	em + span {
		color: var(--t-low);
	}
	.row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
</style>
