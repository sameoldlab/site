<script lang="ts">
	import { page } from '$app/stores'
	import Collection from '$lib/layouts/collection.svelte'
	import og_image from './_og.png'

	let { data } = $props()

	// console.log(entries[0])
	let collapse = $state(true)
	const title = 'Notes'

	const tags = new Set($page.url.searchParams.get('tag')?.split(','))
	const entries = tags.size
		? data.entries.filter(
				(e) =>
					new Set(
						e.metadata.tags?.map((t) => t.replaceAll(' ', '-'))
					).intersection(tags).size
			)
		: data.entries
</script>

<Collection title="Notes" collection="note" collapsed {entries} />
