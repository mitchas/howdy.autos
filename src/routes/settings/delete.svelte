<script lang="ts">
	import { supabase } from '../../supabaseClient';
	import { user } from '../../stores/user.store.js';
	import { alert } from '../../stores/ui.store.js';
	import { goto } from '$app/navigation';

	let steps_checked = [false, false, false, false]
	let goodbye = "";

	async function requestDelete(){
		if(!$user.auth){
			$alert = { text: "You're not supposed to be able to do this lol.", class: "red small", icon: "la la-exclamation-circle"};
		}else{

			var data = {
				id: $user.auth.id,
				email: $user.auth.email,
			}

			const { error } = await supabase.from('delete_requests').insert(data);
			if(error){
				console.log(error);
				if(error.code && error.code == "23505"){
					$alert = { text: "Delete is still pending. It will be processed soon.", class: "red small", icon: "la la-exclamation-circle"};
					goto("/sign/out/forever")
				}else{
					$alert = { text: "There was a problem deleting your account. Try again shortly", class: "red small", icon: "la la-exclamation-circle"};
				}
			}else{
				$alert = { text: "Goodbye, friend", class: "red small", icon: "las la-frown"};
				goto("/sign/out/forever")
			}
			
		}

	}
</script>


<div class="setting-row">
	<input type="checkbox" class="check" bind:checked={steps_checked[0]} id="delcheck1"/>
	<label for="delcheck1"><small class="text-color">Your profile and saved data will all be deleted. Any events you created will be deleted.</small></label>
</div>
<div class="setting-row">
	<input type="checkbox" class="check" bind:checked={steps_checked[1]} id="delcheck2"/>
	<label for="delcheck2"><small class="text-color">Any things and places you have submitted will remain, but will no longer link to your profile</small></label>
</div>
<div class="setting-row">
	<input type="checkbox" class="check" bind:checked={steps_checked[2]} id="delcheck3"/>
	<label for="delcheck3"><small class="text-color">Your email address will be removed. You can sign up again with the same one later</small></label>
</div>
<div class="setting-row">
	<input type="checkbox" class="check" bind:checked={steps_checked[3]} id="delcheck4"/>
	<label for="delcheck4"><small class="bold text-color">This cannot be undone</small></label>
</div>
<div class="setting-row">
	<label for="delgoodbye"><small class="bold text-color">Type "Goodbye"</small></label>
	<input type="text" bind:value={goodbye} placeholder="Goodbye" class="center" id="delgoodbye"/>
</div>
<div class="setting-row">
	<button class="button red" id="deleteAcctButton" on:click={()=>requestDelete()} disabled={steps_checked.includes(false) || !goodbye.toLowerCase().includes("goodbye") }>
		Delete Account Forever
	</button>
</div>



<style lang="scss">
	#deleteAcctButton{
		background-color: var(--red1);
		color: var(--background);
		margin: 0 auto;

		&:disabled{
			background-color: var(--grey1);
			color: var(--textLighter);
		}
	}
</style>