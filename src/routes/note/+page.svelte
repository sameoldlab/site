<script lang="ts">
	import Collection from '$lib/layouts/collection.svelte'
	import og_image from './_og.png'

	let { data } = $props()

	const { entries } = data
	// console.log(entries[0])
	let collapse = $state(true)
	const title = 'Notes'
</script>

<Collection title="Notes" collection="note" collapsed {entries} />
