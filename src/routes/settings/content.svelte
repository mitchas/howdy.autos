<script lang="ts">
	import { content_age, content_language, content_business_owner, content_student, content_veteran } from '../../stores/ui.store.js';
	import { user } from '../../stores/user.store.js';

</script>


<section>
	{#if $user.auth && $user.data}

		<div class="setting-row">
			<label for="ageRangeSelect">Age Range</label>
			<div>
				<select id="ageRangeSelect" class="center w-150" bind:value={$content_age}>
					<option disabled>Under 13 (not allowed)</option>
					<option value="0">13-18</option>
					<option value="1">19-21</option>
					<option value="2">22-29</option>
					<option value="3">30-49</option>
					<option value="4">50-64</option>
					<option value="5">65+</option>
				</select>
			</div>
		</div>


		<div class="setting-row">
			<label for="businessOwnerCheck">Business Owner</label>
			<div>
				<input id="businessOwnerCheck" type="checkbox" class="toggle yes-no" bind:checked={$content_business_owner}/>
			</div>
		</div>

		<div class="setting-row">
			<label for="studentCheck">Student</label>
			<div>
				<input id="studentCheck" type="checkbox" class="toggle yes-no" bind:checked={$content_student}/>
			</div>
		</div>

		<div class="setting-row">
			<label for="veteranCheck">Veteran</label>
			<div>
				<input id="veteranCheck" type="checkbox" class="toggle yes-no" bind:checked={$content_veteran}/>
			</div>
		</div>

		<div class="setting-row">
			<label for="languageSelect">Language</label>
			<div>
				<select id="languageSelect" class="center w-150" bind:value={$content_language}>
					<option value="english">English</option>
					<option value="spanish">Spanish</option>
					<option value="Somali">Somali</option>
					<option value="hmong">Hmong</option>
					<option value="Karen">Karen</option>
					<option value="Vietnamese">Vietnamese</option>
					<option value="indigenous">Indigenous</option>
					<option value="other">Other</option>
				</select>
			</div>
		</div>
		<div class="setting-row">
			<p class="smaller text-lighter tight">
				Only English is supported at this time. Choosing your language will help us determine future support.
			</p>
		</div>


		
	{:else}
		<p>Sign in to change content settings</p>
	{/if}




</section>
