<script lang="ts">
    import { page } from '$app/stores';
</script>


<div class="mtop-lg"></div>

<section class="view-padded xxs center margin-auto">
	<h1>Whoops</h1>
	<h4 class="mtop-xs">Error {$page.status}</h4>
	<h6 class="mtop-xxs lightweight mtop-sm">{$page.error.message || ""}</h6>

	<a href="/" class="button margin-auto blue mtop-md">Go Home</a>
</section>