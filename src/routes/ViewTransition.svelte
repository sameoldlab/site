<script lang="ts">
	import { onNavigate } from '$app/navigation'
	let { children } = $props()

	onNavigate((nav) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await nav.complete
			})
		})
	})
</script>

<div id="vt-container">{@render children()}</div>

<style global>
	#vt-container {
		view-transition-name: main;
	}

	@media (prefers-reduced-motion) {
		::view-transition-group(*),
		::view-transition-old(*),
		::view-transition-new(*) {
			animation: none !important;
		}
	}
</style>
