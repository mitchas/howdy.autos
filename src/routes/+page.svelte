<script lang="ts">
	import { page_title } from '../stores/ui.store.js';
	import { goto } from '$app/navigation';
	import Plate from "../components/Plate.svelte";

	$page_title = "Howdy Autos"

	let selectedState = "";
	let plateNumber = "";

	// Go to /<STATE ABBR>/<PLATE NUMBER>/
	function goToPlate() {
		goto("/" + selectedState + "/" + plateNumber.replace(/[^a-z0-9]/gi, '').toUpperCase());
		// goto("/" + selectedState.toUpperCase() + "/" + plateNumber.toUpperCase());
	}
</script>

<svelte:head>
	<title>Howdy Autos</title>
	<meta name="description" content="Howdy.autos" />
</svelte:head>


<section class="view-padded"> 


	<!-- Info Callout -->
	<div class="callout bg-grey fit margin-auto mbottom-md">
		<i class="iconoir-chat-bubble callout-icon"/>
		<p>
			<!-- <b class="text-bigger block">License Plate Messaging</b> -->
			Enter a license plate to read messages or leave your own.
		</p>
	</div>


	<!-- form -->
	<form on:submit|preventDefault={goToPlate}>

		<!-- State Picker -->
		<div class="mw-200 margin-auto mbottom-sm" id="stateSelector">
			<select class="center margin-auto" bind:value={selectedState}>
				<option value="">Choose a State</option>
				<option value="AL">Alabama</option>
				<option value="AK">Alaska</option>
				<option value="AZ">Arizona</option>
				<option value="AR">Arkansas</option>
				<option value="CA">California</option>
				<option value="CO">Colorado</option>
				<option value="CT">Connecticut</option>
				<option value="DE">Delaware</option>
				<option value="FL">Florida</option>
				<option value="GA">Georgia</option>
				<option value="HI">Hawaii</option>
				<option value="ID">Idaho</option>
				<option value="IL">Illinois</option>
				<option value="IN">Indiana</option>
				<option value="IA">Iowa</option>
				<option value="KS">Kansas</option>
				<option value="KY">Kentucky</option>
				<option value="LA">Louisiana</option>
				<option value="ME">Maine</option>
				<option value="MD">Maryland</option>
				<option value="MA">Massachusetts</option>
				<option value="MI">Michigan</option>
				<option value="MN">Minnesota</option>
				<option value="MS">Mississippi</option>
				<option value="MO">Missouri</option>
				<option value="MT">Montana</option>
				<option value="NE">Nebraska</option>
				<option value="NV">Nevada</option>
				<option value="NH">New Hampshire</option>
				<option value="NJ">New Jersey</option>
				<option value="NM">New Mexico</option>
				<option value="NY">New York</option>
				<option value="NC">North Carolina</option>
				<option value="ND">North Dakota</option>
				<option value="OH">Ohio</option>
				<option value="OK">Oklahoma</option>
				<option value="OR">Oregon</option>
				<option value="PA">Pennsylvania</option>
				<option value="RI">Rhode Island</option>
				<option value="SC">South Carolina</option>
				<option value="SD">South Dakota</option>
				<option value="TN">Tennessee</option>
				<option value="TX">Texas</option>
				<option value="UT">Utah</option>
				<option value="VT">Vermont</option>
				<option value="VA">Virginia</option>
				<option value="WA">Washington</option>
				<option value="DC">Washington, D.C</option>
				<option value="WV">West Virginia</option>
				<option value="WI">Wisconsin</option>
				<option value="WY">Wyoming</option>
				<option disabled>---------</option>
				<option value="FED">Federal Government</option>
				<option value="AS">American Samoa</option>
				<option value="GU">Guam</option>
				<option value="CNMI">Northern Mariana Islands</option>
				<option value="PR">Puerto Rico</option>
				<option value="VI">US Virgin Islands</option>
			</select>
		</div>

		
		<!-- License Plate -->
		<div id="HomePlateDisplay">
			<!-- <img src={background} alt="License Plate Design"/> -->
			<Plate bind:abbr={selectedState}/>

			<!-- Input -->
			<div id="HomePlateInputWrapper">
				{#if selectedState}
					<input type="text" placeholder="ABC123" maxlength=8 bind:value={plateNumber} class="text-{selectedState} {plateNumber.length < 7 ? 'short-plate' : ''}"/>
				{/if}
			</div>

		</div>

		<!-- Submit / Find Plate -->
		<div class="mw-200 center margin-auto mtop-sm">
			<button class="button bigger dark" id="findPlateButton" disabled={!selectedState || plateNumber.length <= 1}>
				<div class="flex gap-sm">
					Find Plate
					<i class="iconoir-page-right"/>
				</div>
			</button>
		</div>

	</form>


		


	<!-- Footer -->
	<p class="small center mtop-xl margin-auto">
		A weird little app from <a href="https://hotdi.sh" target="_blank">hotdi.sh</a>
		<small class="block text-smaller flex gap center">
			<a href="/co/privacy" class="text-dark lightweight">Privacy Policy</a>
			<a href="/co/terms" class="text-dark lightweight">Terms of Service</a>
		</small>
	</p>

	
</section>



<style lang="scss">

	#stateSelector{
		position: relative;
		z-index: 50;
	}

	#HomePlateDisplay{
		display: block;
		height: auto;
		width: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// border-radius: 40px;
		margin: 0 auto;
		background-size:contain;
		background-repeat: no-repeat;
		background-position: center center;
		position: relative;
		height: fit-content;
		max-height: fit-content;
		width: 98%;
		max-width: 660px;

		// @media (max-width: 650px) {
		// 	height: 300px;
		// }
		// @media (max-width: 500px) {
		// 	height: 250px;
		// }
		@media (max-width: 430px) {
			// height: 210px;
			max-height: 200px;
		}

		img{
			display: block;
			max-width: 100%;
			width: 550px;
			height: auto;
		}


		#HomePlateInputWrapper{
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
		}
		input{
			font-size: 110px;
			box-sizing: border-box;
			font-weight: 700;
			padding: 0;
			width: 100%;
			padding-top: 5px;
			background-color: transparent;
			border: none;
			height: auto;
			text-align: center;
			text-transform: uppercase;
			transform: scaleY(1.3);

			@media (max-width: 650px) {
				font-size: 80px;
			}
			@media (max-width: 500px) {
				font-size: 70px;
			}
			@media (max-width: 450px) {
				font-size: 60px;
			}
			@media (max-width: 400px) {
				font-size: 54px;
			}
			@media (max-width: 350px) {
				font-size: 48px;
			}

			&.short-plate{
				transform: scale(1.2, 1.4);
			}
		}
	}


	#findPlateButton{
		transform: scale(1.5);
		margin-top: 30px;
	}

</style>
