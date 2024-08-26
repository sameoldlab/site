<script lang="ts">
	import Collection from '$lib/layouts/collection.svelte'

	export let data
	const { entries } = data
</script>

<Collection title="Notes" {entries} collection="note" collapsed />
