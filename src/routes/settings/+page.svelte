<script lang="ts">
	import { page_title } from '../../stores/ui.store.js';
	import { user } from '../../stores/user.store.js';
	import Account from './account.svelte';
	import Appearance from './appearance.svelte';
	import Newsletters from './newsletters.svelte';
	import Notifications from './notifications.svelte';
	import Content from './content.svelte';
	import Location from './location.svelte';
	import Pro from './pro.svelte';
	import DeleteAccount from './delete.svelte';

	$page_title = "Settings"

</script>

<svelte:head>
	<title>Settings - Howdy.autos</title>
	<meta name="description" content="Chose how Howdy.autos looks and works for you." />
</svelte:head>

<div class="view-padded md">

	<!-- Not signed in -->
	{#if !$user.auth}

		<div class="callout bg-red mbottom-lg">
			<div class="callout-icon"><i class="la la-user-circle"></i></div>
			<p>
				You are not signed in, so your settings will not be remembered. <a href="/sign/up/">Create an account</a> or <a href="/sign/in/">sign in</a> to save your settings for next time, plus access a bunch of other cool stuff.
			</p>
		</div>

	{/if}

	{#if $user.auth}
		<!-- Account -->
		<div class="settings-display">
			<div class="setting-section">
				<h4>Account & Security</h4>
				<p>Manage your email address and password used to sign in.</p>
			</div>
			<div class="setting-section">
				<Account></Account>
			</div>
		</div>


		<!-- Location -->
		<div class="settings-display">
			<div class="setting-section">
				<h4>Default Location</h4>
				<p>We use this as your default area you visit Howdy.autos. This is private and not shown on your profile.</p>
			</div>
			<div class="setting-section">
				<Location/>
			</div>
		</div>

	{/if}

	<!-- Appearance -->
	<div class="settings-display">
		<div class="setting-section">
			<h4>Appearance</h4>
			<p>Control how Howdy.autos looks and works for you.</p>
		</div>
		<div class="setting-section">
			<Appearance/>
		</div>
	</div>


	<!-- Pro/Plus -->
	<div class="settings-display">
		<div class="setting-section">
			<h4>Nice Things</h4>
			<p>Upgrade your account to acces some additional features and support the project.</p>
			<p class="small text-light">This is not a subscription. It will not auto-renew, and we do not store your payment information.</p>
			<a href="/co/nice" class="button green mbottom-sm">What is Nice Things?</a>
		</div>
		<div class="setting-section">
			<Pro/>
		</div>
	</div>
	


	<!-- Content Settings -->
	<div class="settings-display">
		<div class="setting-section">
			<h4>Content Settings</h4>
			<p>Set your age, language, and other options that help us show you things you may be interested in.</p>
		</div>
		<div class="setting-section">
			<Content/>
		</div>
	</div>

	<!-- Newsletters -->
	<div class="settings-display">
		<div class="setting-section">
			<h4>Newsletters</h4>
			<p>Subscribe (or unsubsribe) to our email Newsletters.</p>
			<p class="smaller text-light">Newsletters will start on <b>October 1st</b>. They will begin as general Minnesota newsletters, but you will soon be able to customize them to your area.</p>
			<a class="button blue mbottom-sm" href="/subscribe">Learn about our Newsletters</a>
		</div>
		<div class="setting-section">
			<div class="ptop-xs"></div>
			<Newsletters/>
		</div>
	</div>


	<!-- Notifications -->
	<div class="settings-display">
		<div class="setting-section">
			<h4>Notifications</h4>
			<p>Push notifications are <b>coming soon</b> for upcoming events, saved places, and more.</p>
		</div>
		<div class="setting-section">
			<Notifications/>
		</div>
	</div>

	{#if $user.auth}

		<!-- DANGER -->
		<div class="settings-display">
			<div class="setting-section">
				<h4><span class="text-red bold">Delete your Account</span></h4>
				<p>
					This is permanent. Check all the boxes, type goodbye, then click the button to delete your account and data.
				</p>
				<p class="small text-lighter">It's an unusually short goodbye.</p>
			</div>
			<div class="setting-section">
				<DeleteAccount/>
			</div>
		</div>
	{/if}



</div>



<style lang="scss">
	.settings-display{
		display: flex;
		gap: var(--padding);
		margin-bottom: 100px;

		@media (max-width: $screenSM) {
			flex-wrap: wrap;
			flex-direction: column;
		}

		.setting-section{
			width: 50%;
			flex-grow: 3;
			
			@media (max-width: $screenSM) {
				width: 100%;
				min-height: 100px;
			}

			p{
				max-width: 350px;
				padding: 0;
				margin: 10px 0 10px 0;
				@media (max-width: $screenSM) {
					max-width: unset;
				}
			}
			
			h4{
				font-weight: 600;
			}


			&:nth-child(2){
				border-radius: var(--borderRadius);
				background-color: var(--light2);
				box-sizing: border-box;
				padding: 5px var(--padding);
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}

	}
</style>