<script lang="ts">
	import { supabase } from '../../supabaseClient';
	import { user } from '../../stores/user.store.js';
	import { alert } from '../../stores/ui.store.js';

	let email = "";
	let subs_fetched = false;
	$: email && email && (subs_fetched = false);

	let newsletters = [
		{
			title: "Cold Start",
			description: "Sent every Monday morning with everything you should know for the week ahead.",
			id: "coldstart",
		},
		{
			title: "Weekend Stuff",
			description: "Sent every Friday morning with everything you should know for the weekend.",
			id: "weekend",
		},
		{
			title: "Things Monthly",
			description: "Sent at the end of each month with things to look forward to in the next month - events, new & interesting places, etc.",
			id: "monthly",
		},
		{
			title: "Rewind",
			description: "Sent at the end of every month recapping music, art, books, and other media from the past month.",
			id: "rewind",
		},
		{
			title: "Product Updates",
			description: "Infrequent emails about what's going on at Howdy.autos. New features, how-to, behind the scenes, etc.",
			id: "product",
		},
	]



	// If not loaded, and authenticated
	if($user.auth && !$user.newsletter_subs.includes('loaded')){
		fetchSubscriptions()
	}

	// Fetch subs from db
	function fetchSubscriptions(){


		if($user.auth){
			email = $user.auth.email;
		}

		if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
			// Invalid email
			$alert = { text: "That email address looks wrong. Try again.", class: "red", icon: "la la-exclamation-circle"};
		}else{
			
			let sub_array = [];
			console.log('%cFetching Newsletters', 'color: white; background: blue; font-size: 14px');

			// Fetch
			supabase.from('newsletter_subs').select('*').eq('email', email).then(function (data) {
				sub_array = [];
				subs_fetched = true;
				// Error
				if (data.error) {
					console.log(data.error);
					$alert = { text: "We couldn't check your subscriptions right now.", class: 'red', icon: 'la la-plug' };
				// Has Subscriptions
				} else if (data.data && data.data[0]) {
					console.log("HAS SUBSCRIPTIONS")
					sub_array.push("loaded")
					data.data.forEach(function (value) {
						sub_array.push(value.newsletter);
					}); 	
				// No Subscriptions
				}else{
					console.log("NO SUBSCRIPTIONS")
					sub_array.push("loaded")
				}
				// Update User Store
				updateUserSubs(sub_array);
			});
		}

	}

	// Subscribe by id
	// Available:
	// coldstart
	// weekend
	// monthly
	// rewind
	// product
	function toggleSubscription(sub_id){

		// Already Subscribed
		if($user.newsletter_subs.includes(sub_id)){
			unsubscribe(sub_id)
		}else{

			if($user.auth){
				email = $user.auth.email;
			}

			var data = {
				id: email + sub_id,
				email: email,
				newsletter: sub_id,
			}

			if(data.email.length == 0){
				$alert = { text: "Please enter an email address", class: "red small", icon: "la la-exclamation-circle"};
			}
			else if(data.email.length <= 6){
				$alert = { text: "Email is too short", class: "red small", icon: "la la-exclamation-circle"};
			}
			else if(!data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
				// Invalid email
				$alert = { text: "That email looks wrong. Try again.", class: "red small", icon: "la la-exclamation-circle"};
			}else{
				supabase.from('newsletter_subs').insert(data, { returning: 'minimal' }).then(function (returnData) {
					// Errors
					if (returnData.error) {
						console.log("ERROR", returnData.error)
						if(returnData.error.code && returnData.error.message){
							$alert = {title: "Error " + returnData.error.code, text: returnData.error.message, class: "red", icon: "la la-exclamation-circle"};
						}else{
							$alert = {title: "Whoops", text: "Couldn't subscribe right now. Try again soon.", class: "red", icon: "la la-exclamation-circle"};
						}
						// Success
					} else {
						const temp_array = $user.newsletter_subs;
						temp_array.push(sub_id);
						updateUserSubs(temp_array);
						$alert = {text: "Subscribed!", class: "green small", icon: "la la-smile"};
					}
				});
			}

		}

	}

	async function unsubscribe(sub_id){
		if($user.auth){
			email = $user.auth.email;
		}

		// Delete
		let sub_email_id = email + sub_id;
		console.log("Unsubscribing id " + sub_email_id)
		const { error } = await supabase.from('newsletter_subs').delete().eq("id", sub_email_id).single();
		if (error) {
			console.error(error);
			$alert = { text: 'Error unsubscribing. Try again shortly.', class: 'red small', icon: 'la la-exclamation-circle' };
		} else {
			const temp_array = $user.newsletter_subs;
			const index = temp_array.indexOf(sub_id, 0);
			if (index > -1) {
				temp_array.splice(index, 1);
			}
			updateUserSubs(temp_array);
			$alert = { text: 'Unsubscribed successfully!', class: 'orange small', icon: 'la la-check-circle' };
		}

	}


	function updateUserSubs(data){
		console.log("UPDATING USER WITH SUBS ", data)
		user.update((oldUser) => {
			return {...oldUser, newsletter_subs: data};
		});
	}

</script>

<section>

	{#if !$user.auth}
		<label class="small" for="subAnonEmail">Enter your email</label>
		<form class="button-input mbottom-xs" on:submit|preventDefault={fetchSubscriptions}>
			<input type="email" bind:value={email} placeholder="pbunyan@trees.cut" id="subAnonEmail"/>
			<button class="button small blue" type="submit" disabled="{subs_fetched || !email.length}">Check</button>
		</form>
		<!-- Sub count -->
		{#if subs_fetched && $user.newsletter_subs.length}
			<div class="tag mtop-xxs {$user.newsletter_subs.length == 1 ? 'red' : 'green'}">You have {$user.newsletter_subs.length - 1} subscriptions</div>
		{/if}
	{/if}


	{#each newsletters as newsletter, index}

		<div class="setting-row">
			<label for="subNewsletter{index}">{newsletter.title}</label>
			<button id="subNewsletter{index}" class="button small {$user.newsletter_subs.includes(newsletter.id) ? 'red' : 'green'}" on:click={() => toggleSubscription(newsletter.id)} >
				{$user.newsletter_subs.includes(newsletter.id) ? 'Unsubscribe' : 'Subscribe'}
			</button>
		</div>
		<!-- <p class="block text-lighter small mbottom-sm">{newsletter.description}</p> -->

	{/each}



</section>