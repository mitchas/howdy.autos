<script lang="ts">
    import { page } from '$app/stores';
</script>

<section class="view-padded">
	<h1>Ope.</h1>
	<h4 class="mtop-xs">Error {$page.status}</h4>
	<h5 class="mtop-xxs">{$page.error.message || ""}</h5>
</section>