<script lang="ts">
	import { supabase } from '../../supabaseClient';
	import { user } from '../../stores/user.store.js';
	import { alert } from '../../stores/ui.store.js';

	let changeEmail = false;
	let new_email = "";

	let changePassword = false;
	let new_password = "";
	let new_password_confirm = "";


	function toggleChangeEmail(){
		changeEmail = true;
		new_email = $user.auth.email;
	}
	async function updateUserEmail(){
		const { data, error } = await supabase.auth.updateUser({email: new_email})
		if(error){
			console.error(error)
			$alert = { text: error.message || "Something went wrong", class: "red", icon: "la la-exclamation-circle"};
		}else{
			$alert = { title: "Email changed", text: "Check your email to confirm the change", class: "green", icon: "la la-check-circle"};
			changeEmail = false;
		}
	}


	async function updateUserPassword(){

		if(new_password.length < 6){
			$alert = { text: "Password must be 6 characters.", class: "red", icon: "la la-exclamation-circle"};
		}else{
			const { data, error } = await supabase.auth.updateUser({password: new_password})
			if(error){
				console.error(error)
				$alert = { text: error.message || "Something went wrong", class: "red", icon: "la la-exclamation-circle"};
			}else{
				$alert = { text: "Your password has been changed!", class: "green", icon: "la la-check-circle"};
				changePassword = false;
			}
		}
		
	}
</script>

<section>
	{#if $user.auth && $user.data}

		<!-- Change Email -->
		{#if changeEmail}
			<div class="label mtop-lg">New Email</div>
			<input type="text" bind:value={new_email} placeholder="pbunyan@trees.cut"/>
			<div class="flex end mtop-md mbottom-md gap-sm">
				<button class="button light" on:click={()=>changeEmail = false}>Cancel</button>
				<button class="button green" on:click={()=>updateUserEmail()} disabled={new_email.length < 5 || new_email == $user.auth.email}>Submit</button>
			</div>

		<!-- Change Password -->
		{:else if changePassword}
			<div class="label mtop-lg">New Password</div>
			<input type="password" bind:value={new_password} placeholder="••••••"/>
			<div class="label mtop-sm">Retype New Password</div>
			<input type="password" bind:value={new_password_confirm} placeholder="••••••"/>
			<div class="flex end mtop-md mbottom-md gap-sm">
				<button class="button light" on:click={()=>changePassword = false}>Cancel</button>
				<button class="button green" on:click={()=>updateUserPassword()} disabled={new_password != new_password_confirm}>Submit</button>
			</div>
		{:else}

		<!-- Default View -->
			<div class="setting-row">
				<div class="label">Username</div>
				<p class="bold">@{$user.data.username ? $user.data.username : 'Unavailable'}</p>
			</div>
			
			<div class="setting-row">
				<div class="label">Profile</div>
				<a href="/hi/{$user.data.username}" target="_blank" class="button small background">Howdy.autos/hi/{$user.data.username}</a>
			</div>

			<div class="setting-row">
				<div class="label">Email</div>
				<p class="bold">{$user.auth.email ? $user.auth.email : 'Unavailable'}</p>
				<button class="button small background" on:click={()=>toggleChangeEmail()}>Change</button>
			</div>
			

			<div class="setting-row">
				<div class="label">Password</div>
				<p class="bold">******</p>
				<button class="button small background" on:click={()=>changePassword = true}>Change</button>
			</div>
		{/if}


	{:else}

	<p>You are not signed in</p>

	{/if}
</section>
