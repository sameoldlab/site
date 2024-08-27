<script lang="ts">
	import type { MetaProps, Note, Entry } from '../types'

	interface Props {
		entries: Array<Entry<Note>>
		// <'note'>[]
		collapsed?: boolean | undefined
		title: string
		meta?: MetaProps
		collection: string
	}

	const {
		entries,
		title,
		collection,
		collapsed = false,
		meta
	}: Props = $props()

	let collapse = $state(collapsed)
	const toggle = () => {
		collapse = !collapse
	}
</script>

<!--<Layout
	{title}
	description={`Collected notes${
		title.includes('tag') ? ': ' + title.substring(6) : ''
	}`}
	image={meta?.image}
>
-->
<main>
	<header class="main">
		<h1>{title}</h1>
		<button
			onclick={() => (collapse = !collapse)}
			id="toggleCollapse"
			class="text"
			title="Collapse entries"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
			>
				{#if collapse}
					<path d="m7 15 5 5 5 -5" />
					<path d="m7 9 5-5 5 5" />
				{:else}
					<path d="m7 20 5 -5 5 5" />
					<path d="m7 4 5 5 5-5" />
				{/if}
			</svg>
		</button>
	</header>
	<div class={`articles ${collapse ? 'collapsed' : ''}`}>
		{#each entries as entry}
			<article class="note">
				<header>
					<h2>
						<a class="" href={`/note/${entry.slug}`}>
							{entry.metadata.title}
						</a>
					</h2>
					<!-- <p> <time datetime={entry.data.date.toISOString()}>
							<!--Only show date when page is untitled --
							{entry.data.title !== "" && entry.data.date.toLocaleDateString()}
						</time> </p> -->
				</header>
				<div class="content">
					<div class="toggle">
						<svelte:component this={entry?.default} />
					</div>
				</div>
			</article>
		{/each}
	</div>
</main>

<style>
	#toggleCollapse {
		color: var(--t-high);
		/* background: var(--bg); */
		padding: 0.25em;
		border-radius: 4px;
		border: 0px;
		/* outline: 1px solid var(--bg-high); */
		cursor: pointer;

		& > svg {
			width: 16px;
			height: 16px;
		}

		&:hover {
			background-color: var(--bg-high);
		}
	}

	main > header {
		display: flex;
		justify-content: space-between;
		/* align-items: baseline; */
		gap: 0.5rem;
		max-width: var(--width);
		margin-inline: auto;

		h1 {
			padding: 0;
		}
	}

	.articles {
		max-width: var(--width);
		margin-inline: auto;

		header {
			text-align: left;
			transition: padding var(--ease);
		}
		h2 {
			transition: font-size var(--ease);
			padding-block: 0em;
		}
		.content {
			display: grid;
			grid-template-rows: 0fr;
			transition: grid-template-rows 13s ease; /* var(--ease); */
		}
		.toggle {
			transition: opacity 300s ease; /* var(--ease); */
			/* transition: grid-template-rows 1s ;var(--ease); */
		}
	}

	.articles.collapsed {
		color: var(--t-high);
		transition: color var(--ease);

		header,
		article {
			padding: 0;
		}
		article {
			border-block-end: 1px solid var(--t-low);
		}

		h2 {
			font-size: 1rem;
			font-weight: 400;
			color: inherit;

			a {
				padding-block: 1rem;
				width: 100%;
				display: inline-block;
				color: inherit;
				&:hover {
					color: inherit;
				}
			}
		}

		/* very extra hover as seen on paco.me */
		&:hover {
			color: var(--t-low);

			article:hover {
				border-color: var(--t-high);
				color: var(--t-high);
			}
		}
		.toggle {
			opacity: 0;
			overflow: hidden;
			display: none;
		}
	}
</style>
