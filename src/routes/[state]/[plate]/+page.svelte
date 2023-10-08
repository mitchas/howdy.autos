<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '../../../supabaseClient';
	import Plate from "../../../components/Plate.svelte";
	import { onMount } from 'svelte';
	import { alert } from '../../../stores/ui.store.js';
	import { goto } from '$app/navigation';
	import Modal from "../../../components/Modal.svelte";
	import Time from "svelte-time";

	// Page Title
	import { page_title } from '../../../stores/ui.store.js';
	$page_title = $page.params.state + "-" + $page.params.plate;

	// Definitions
	let abbreviations = [
		"AL", "AK", "AZ", "AR", "CA", "CO", "CT", 
		"DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS",
		"KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", 
		"NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
		"SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", 
		"FED", "AS", "GU", "CNMI", "PR", "VI"
	];
	let fullnames = [
		"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
		"Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
		"Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
		"Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
		"South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
		"Federal Government", "American Samoa", "Guam", "Northern Mariana Islands", "Puerto Rico", "US Virgin Islands"
	]

	// Params - passed state and plate
	let state = "";
	let plate = "";
	$: state = $page.params.state ? $page.params.state.toUpperCase() : '';
	$: plate = $page.params.plate ? $page.params.plate.toUpperCase() : '';

	// New Message
	let newMessageText = "";
	let newMessageName = "";
	let robotCheck = "";

	// Rules Modal
	let modalCurrentlyVisible = false;
	
	// Submitting Message
	let isLoading = false;
	let messageSuccess = null;

	// Loaded Messages
	let allMessages = [];
	
	// Show Terms / Rules
	function showTerms(){
		modalCurrentlyVisible = true;
	}

	// Submit message to Database
	function submitMessage(){

		// Create Message
		let messageData = {
			message: newMessageText,
			display_name: newMessageName,
			state: state,
			plate_number: plate
		}

		console.log("Posting message ", messageData)
		isLoading = true;

		// Submit to DB
		supabase.from('messages').insert(messageData).then(function (returnData) {
			// Errors
			if (returnData.error) {
				console.log("ERROR", returnData.error)
				if(returnData.error.code && returnData.error.message){
					$alert = {title: "Error " + returnData.error.code, text: returnData.error.message, class: "red", icon: "la la-exclamation-circle"};
				}else{
					$alert = {title: "Whoops", text: "Couldn't send that right now. Try again soon.", class: "red", icon: "la la-exclamation-circle"};
				}
				isLoading = false;
				// Success
			} else {
				$alert = {text: "Your message has been posted!", class: "green small", icon: "la la-smile"};
				modalCurrentlyVisible = false;
				isLoading = false;
				messageData["created_at"] = new Date;
				messageSuccess = messageData;
			}
		});
	}


	// On Mount, validate state and plate id
	onMount(() => {
		if(abbreviations.includes(state)){
			if(plate.length < 2 || plate.length > 8){
				$alert = {title:"Invalid Plate", text: plate + " is not a valid plate. Taking you home...", class: "red", icon: "la la-exclamation-circle"};
				goto("/");
			}else{
				// Fetch Messages
				fetchMessages();
			}
		}else{
			$alert = {title:"Invalid State", text: state + " is not a state. Taking you home...", class: "red", icon: "la la-exclamation-circle"};
			goto("/");
		}
	});


	// Fetch all messsages with state and plate #
	function fetchMessages(){

		supabase.from('messages').select('*').eq('state', state).eq('plate_number', plate).then(function (data) {
			// Error
			if (data.error) {
				console.log(data.error);
				$alert = { text: "We couldn't fetch the messages right now.", class: 'red', icon: 'la la-plug' };
				allMessages = [];
			// Has Messages
			} else if (data.data && data.data[0]) {
				allMessages = data.data;
			}else{
				console.log("No Messages")
				allMessages = [];
			}
		});

	}


	// Report Message
	let reportedMessages = [];
	async function reportMessage(message_id, message_flags){
		const { error } = await supabase.from('messages').update({ flags: message_flags+1 }).eq('id', message_id)
		if (error) {
			console.error(error);
			$alert = {
				text: error.message || 'Something went wrong',
				class: 'red',
				icon: 'la la-exclamation-circle'
			};
		} else {
			$alert = {
				text: 'Thanks for reporting!',
				class: 'green',
				icon: 'la la-check-circle'
			};
			reportedMessages = [...reportedMessages, message_id];
		}
	}

</script>



<svelte:head>
	<title>{state ? state + "-" + plate : "Howdy Autos"} - howdy.autos</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>



<div class="margin-auto mw-600">
	<section class="view-padded">

		<!-- Header -->
		<div class="message-page-header flex-wrap">

			<!-- Plate -->
			<div class="small-plate-display">
				<Plate bind:abbr={state}/>
				<b class="text-{state} {plate.length < 7 ? 'short-plate' : ''} ">{plate}</b>
			</div>

			<!-- Text -->
			<p class="bigger center">
				<span>Messages for <b>{fullnames[abbreviations.indexOf(state)]}</b> plate <b>#{plate}</b></span>
			</p>

		</div>



		<!-- Leave a Message -->
		<form on:submit|preventDefault={showTerms} id="leaveAMessage" class="mtop-lg">
			
			<!-- Message -->
			<label for="newMessage">Leave a message</label>
			<textarea id="newMessage" bind:value={newMessageText} placeholder="Your driver side tail light is out..." disabled={messageSuccess}/>
			
			<!-- From -->
			<label for="newMessageNameInput">From - Your display name</label>
			<input type="text" maxlength="34" id="newMessageNameInput" placeholder="Guy you parked next to at target" bind:value="{newMessageName}" disabled={messageSuccess}/>

			<!-- Submit -->
			<button type="submit" class="button green mtop-xs" disabled={messageSuccess || newMessageText.length<5 || newMessageName.length < 2}>
				{messageSuccess ? 'Message Submitted' : 'Submit Message'}
			</button>
		</form>



		<!-- Messages -->
		<!-- Messages -->
		<!-- Messages -->
		<h4 id="messageHeader">Messages</h4>

		{#if allMessages.length || messageSuccess}

		<!-- Message loop -->
		<div class="all-messages">
			{#each allMessages as messageData, key}
				<div class="single-message">
					<p>On 
						<Time timestamp={messageData.created_at}  format="dddd, MMMM DD"/> at
						<Time timestamp={messageData.created_at}  format="h:mma"/>,
						<b>{messageData.display_name}</b> posted</p>
					<blockquote>
						<p>{messageData.message}</p>
					</blockquote>
					<!-- Report -->
					<button class="report-button" on:click={()=>reportMessage(messageData.id, messageData.flags)} disabled={reportedMessages.includes(messageData.id)}>
						{reportedMessages.includes(messageData.id) ? "Reported 👍" : "Report"}
					</button>
				</div>
			{/each}



			<!-- New posted message -->
			{#if messageSuccess}
				<div class="single-message">
					<p>You (<b>{messageSuccess.display_name}</b>) just posted</p>
					<blockquote>
						<p>{messageSuccess.message}</p>
					</blockquote>
				</div>
			{/if}
		</div>
		{:else}
			<div class="all-messages">
				<p class="big center text-red mtop-md bold">No messages have been left for this plate yet.</p>
			</div>
		{/if}


	</section>
</div>





<!-- Terms Modal -->
{#if modalCurrentlyVisible}
	<Modal bind:visible={modalCurrentlyVisible}>
		<div class="mw-400 margin-auto">
			<h3>A few rules... <i class="iconoir-check-circle text-blue"/></h3>
			<ul>
				<li>Don't be mean</li>
				<li>No personal information, unless it's your own and you want to share it for some reason</li>
				<li>Know that everything posted is public for anyone to see - not just the license plate owner</li>
				<li>Robot check - type <b>spooky</b> in the box below to continue.</li>
			</ul>
			<input type="text" placeholder="Robot Check" class="center" bind:value="{robotCheck}"/>
			<div class="flex vertical gap-sm mtop-sm">
				<button class="button green" on:click={()=>submitMessage()} disabled={robotCheck != 'spooky' || isLoading}>{isLoading ? "Loading..." : "Agreed. Submit my message"}</button>
				<button class="button grey" type="button" on:click={()=>modalCurrentlyVisible = false}>
					<span class="lightweight"> Go back and edit it</span>
				</button>
			</div>
		</div>
	</Modal>
{/if}




<!-- Footer -->
<p class="small center mtop-xl margin-auto">
	A weird little app from <a href="https://hotdi.sh" target="_blank">hotdi.sh</a>
	<small class="block text-smaller flex gap center">
		<a href="/co/privacy" class="text-dark lightweight">Privacy Policy</a>
		<a href="/co/terms" class="text-dark lightweight">Terms of Service</a>
	</small>
</p>



<!-- Spacer -->
<div class="mtop-xl"></div>




<style lang="scss">

	.small-plate-display{
		display: flex;
		margin: 0 auto;
		justify-content: center;
		position: relative;
		width: 98%;
		max-width: 300px;
		height: auto;
		height: 150px;
		padding: 0;

		object, img{
			width: 100%;
			margin: 0 auto;
		}


		@media (max-width: 430px) {

		}

		b{
			color: #FFFFFF;
			position: absolute;
			top: 0;
			font-size: 44px;
			font-weight: 800;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			color: var(--text);
			transform: scaleY(1.2);

			&.short-plate{
				font-size: 60px;
			}
		}
	}


	.message-page-header{
		display: flex;
		
		p{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex-grow: 3;
			box-sizing: border-box;
			padding-left: 15px;
		}
	}


	#messageHeader{
		display: block;
		background-color: var(--grey2);
		box-sizing: border-box;
		padding: 15px;
		margin-top: 80px;
		font-size: 20px;
		font-weight: 500;
		border-radius: var(--borderRadius);
		margin-bottom: 20px;
	}


	.all-messages{
		display: flex;
		flex-direction: column-reverse;
	}
	.single-message{
		margin-bottom: 45px;

		p.small{
			font-family: var(--monospace);
			padding: 0;
			margin-bottom: 4px;
		}

		blockquote{

			p{
				padding: 0;;
			}
		}
	}


	.report-button{
		color: var(--red1);
		font-size: 0.8rem;
		float: right;
		font-weight: 550;
		opacity: 0.4;

		&:hover,
		&:focus{
			opacity: 1;
			text-decoration: underline;
		}

		&:disabled{
			color: var(--text);
			opacity: 0.5;
			&:hover,
			&:focus{
				opacity: 0.5;
				text-decoration: none;
			}
		}
	}
 
	
</style>
