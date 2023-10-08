<script>
	import { onDestroy } from 'svelte';
	import { alert } from '../stores/ui.store.js';

	export let dismiss_time = 3500;
	let visible = false;
	let timeout = false;
	let alert_icon = "";

	const onAlertChange = (alert_body, dismiss_time) => {
		// Clear Timeout
		clearTimeout(timeout);
		// If empty, hide.
		if (!alert_body) {
			visible = false;
		} else {
			// Set Icon
			if(alert_body.icon){
				alert_icon = alert_body.icon;
			}else{
				alert_icon = null;
			}
			// Show Alert
			visible = true;
			// Hide after delay
			if (dismiss_time > 0) timeout = setTimeout(() => (visible = false), dismiss_time);
		}
	};

	// Run onAlertChange any time alert changes
	$: onAlertChange($alert, dismiss_time);

	// Clean up timeout
	onDestroy(() => clearTimeout(timeout));
</script>


{#if visible}
	<div role="alert" id="alert" class="bg-{$alert.class ? $alert.class : ''}">
		<button id="alert_inside" on:click={() => (visible = false)}>
			{#if alert_icon}
				<i class="{alert_icon}"/>
			{/if}
			<p>
				{#if $alert.title}
					<b>{$alert.title}</b>
				{/if}
				{$alert && $alert.text ? $alert.text : $alert}
			</p>
		</button>
	</div>
{/if}

<style lang="scss">
	#alert {
		position: fixed;
		cursor: pointer;
		right: 20px;
		top: var(--topBarHeight);
		top: calc(var(--topBarHeight) + 20px);
		border-radius: calc(var(--borderRadius) * 10);
		color: var(--text);
		box-sizing: border-box;
		z-index: 1050;
		opacity: 95%;
		border: 1px solid var(--borderDark);
		max-width: 300px;
		width: fit-content;
		transition: var(--transition);

        @media(max-width: $screenSM) {
			max-width: calc(100vw - 20px);
			width: 100vw;
			justify-content: center;
			right: 10px;
			top: calc(var(--topBarHeight) + 10px);
			padding: 14px 10px;
		}

		button{
			display: flex;
			border-radius: calc(var(--borderRadius) * 10);
			align-items: center;
			text-align: left;
			padding: 0;
			margin: 0;
			box-sizing: border-box;
			padding: 18px 13px;
		}

		&:hover,
		&:focus{
			transform: scale(1.025);
		}


		p{
			font-size: 0.9rem;
			line-height: 1.1rem;
			box-sizing: border-box;
			padding: 0 20px 0 20px;

			b{
				display: block;
				font-size: 1rem;
				padding: 0 0 2px 0;
			}
		}

		// Icon
		i{
			font-size: 2.1rem;
			margin: 0 0 0 20px;
		}

	}
</style>
