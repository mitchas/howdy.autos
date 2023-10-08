<script>
	import { page } from '$app/stores';
	import { user } from '../stores/user.store.js';
	import logo from '$lib/branding/logo.svg';
	import { page_title } from '../stores/ui.store.js';
	import Modal from "./Modal.svelte";

</script>

<header id="top">
	<!-- Logo -->
	<a href="/" id="logo">
		<img src={logo} alt="Howdy.autos"/>
		<!-- <object data={logo} type="image/svg+xml" title="Howdy.autos logo"/> -->
	</a>

	<!-- Title -->
	<!-- <h1>{$page_title}</h1> -->

	<!-- Actions -->
	<!-- <div id="headerActions">
			<a href="/sign/up/" aria-current={$page.url.pathname === '/sign/up' ? 'page' : undefined}>
				<span>Sign Up</span>
			</a>
	</div> -->
</header>

<style lang="scss">

	header#top {
		display: flex;
		width: 100%;
		height: var(--topBarHeight);
		border-bottom: var(--borderWidth) solid var(--borderLight);
		box-sizing: border-box;
		justify-content: center;
		position: fixed;
		top: 0;
		// position: sticky;
		// top: 0;
		background-color: var(--background);
		z-index: 100;
		#logo {
			img,object{
				height: 56px;
				width: auto;
				box-sizing: border-box;
				padding: 16px;

				@media (max-width: $screenSM) {
					padding: 0px 0 0 0;
					height: 28px;
					margin: 10px 0 0 0;
				}
			}
		}

		h1 {
			margin: 0;
			padding: 0;
			font-size: 0.975rem;
			font-weight: 500;
			letter-spacing: -0.2px;
			line-height: 1rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex-grow: 3;

			@media (max-width: $screenSM) {
				font-size: 0.9rem;
			}
		}

		#headerActions {
			display: flex;
			gap: 8px;
			box-sizing: border-box;
			padding-right: 20px;

			@media (max-width: $screenSM) {
				gap: 10px;
				padding-right: 13px;
			}

			a {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 0.8rem;
				font-weight: var(--lightweight);
				color: var(--text);
				padding: 0 10px;

				@media (max-width: $screenSM) {
					font-size: 0.8rem;
				}

				&[aria-current='page'] {
					color: var(--primary1);
				}

				&:hover,
				&:focus {
					text-decoration: underline;
				}
			}

			// Header Profile Button
			#headerProfileButton{
				padding: 0;

				&:hover,
				&:focus{
					filter: brightness(110%);
					transform: scale(1.05);
				}
			}
		}
	}

</style>
