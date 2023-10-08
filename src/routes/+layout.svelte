<script lang="typescript">
	import { supabase } from '../supabaseClient';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition'
	import { shortcut } from '../components/shortcuts.js'

	let umami_id = import.meta.env.VITE_UMAMI_ID;

	
	import Alert from '../components/Alert.svelte';
	
	import { alert } from '../stores/ui.store.js';
	import { page_loading } from '../stores/ui.store.js';
	import { onMount } from 'svelte';

	// User
	import { user } from '../stores/user.store.js';

	import Header from '../components/Header.svelte';

	import '../app.scss';

	// Line Awesome icons
	import '../../node_modules/line-awesome/dist/line-awesome/css/line-awesome.min.css';
	import '../../node_modules/iconoir/css/iconoir.css';

	// let windowHeight = window.innerHeight;
	// console.log(windowHeight)
	$: innerHeight = 0;


	// For route transitions
	export let data

</script>




<svelte:head>
	<!-- Umami -->
	<script async src="https://hi.Howdy.autos/script.js" data-website-id="{umami_id}"></script>
</svelte:head>





<svelte:window bind:innerHeight />


<div id="app" style="max-height: {innerHeight}px;">

	<!-- UI -->
	<Alert />


	{#if $page_loading}
		<div id="dataLoading"><div id="loaderElement" /></div>
	{/if}


	<div id="content" style="max-height: {innerHeight}px;">
		<Header />

			<!-- For page transitions -->
			{#if $user.ready}

				{#key data.pathname}
					<main id="scrollBox"
						in:fade={{ duration: 100, delay: 200 }} out:fade={{ duration: 100 }}
						style="max-height: calc({innerHeight}px - var(--topBarHeight)); min-height: calc({innerHeight}px - var(--topBarHeight));"
					>
						<slot />

					</main>
				{/key}
			{/if}


		</div>
</div>


<style lang="scss">
	#app {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 0;
		padding: 0;

		@media (max-width: $screenSM) {
			flex-direction: column-reverse;
		}
	}

	#content {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		flex-grow: 3;
		overflow: hidden;

		main {
			flex-grow: 3;
			overflow: auto;
		}
	}

	// Loader
	// Data Loader
	#dataLoading {
		display: block;
		position: fixed;
		bottom: 0;
		left: -5vw;
		width: 110vw;
		height: 6px;
		z-index: 1050;

		@media (max-width: $screenSM) {
			top: var(--mainNavHeight);
			height: 4px;
		}

		#loaderElement {
			display: block;
			position: absolute;
			left: 0;
			height: 100%;
			width: 0px;
			background-color: var(--blue1);
			margin: 0 auto;
			border-radius: 50px;
			animation: dataLoading 1.8s ease-in-out 0s infinite normal;
			border-radius: var(--borderRadius);
		}
	}
	@keyframes dataLoading {
		0.0% {
			width: 0px;
			left: 0%;
		}
		40% {
			width: 60vw;
		}
		60% {
			width: 40vw;
		}
		100% {
			width: 0px;
			left: 100%;
		}
	}

</style>
