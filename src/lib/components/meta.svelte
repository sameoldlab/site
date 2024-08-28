<script lang="ts">
	import type { MetaProps } from '../types'
	import { page } from '$app/stores'
	let {
		title = 'ibro.xyz',
		description = 'Experiments, exploration, bean-feuled execution',
		type = 'website',
		image
	}: MetaProps = $props()

	const img = image || {
		url: `/og/temp?title=${title}`,
		type: 'image/png',
		width: 1200,
		height: 600
	}
</script>

<meta property="og:title" content={title} />
<meta
	property="og:url"
	content={'https://' + $page.url.hostname + $page.url?.pathname}
/>
<meta property="og:description" content={description} />
<meta name="description" content={description} />
<meta property="og:site_name" content="ibro.xyz" />
{#if type === 'website'}
	<meta property="og:type" content={type} />
{:else}
	<meta property="og:type" content="article" />
	<meta
		property="article:published_time"
		content={type.published_time.toISOString()}
	/>
	<meta
		property="article:modified_time"
		content={type.modified_time.toISOString()}
	/>
{/if}

{#if type !== 'website'}
	{#each type.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}{/if}

<meta property="og:image" content={img.url} />
<meta property="og:image:type" content={img.type} />
<meta name="twitter:card" content="summary_large_image" />
<meta property="og:image:width" content={`${img.width}`} />
<meta property="og:image:height" content={`${img.height}`} />

<meta name="twitter:title" content={title} />
<meta name="twitter:site" content="@sameoldlab" />
<meta name="twitter:creator" content="@sameoldlab" />
<meta name="twitter:image" content={img.url} />
<meta name="twitter:description" content={description} />
