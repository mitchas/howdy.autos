<script lang="ts">
	import { user } from '../../stores/user.store.js';

	let fontSize = 3;
	$: fontSizeChange(fontSize)

	function fontSizeChange(size){
		$user.data.pref_font_size = size;
	}

</script>



<div class="setting-row">
	<label for="darkModeToggle">Dark Mode</label>
	<div>
		<input id="darkModeToggle" type="checkbox" class="toggle on-off" bind:checked={$user.data.pref_dark}/>
	</div>
</div>

<div class="setting-row">
	<label for="themeInput">Theme</label>
	<div>
		<select class="center w-150" bind:value={$user.data.pref_theme} id="themeInput">
			<option value="default">Standard</option>
			<option value="contrast">High Contrast</option>
			<option value="primary">Primary Colors</option>
			<option value="greys">Greys</option>
			<option value="barbie">Barbie™©®</option>
		</select>
	</div>
</div>

<div class="setting-row">
	<label for="fontButtons">Font</label>
	<div class="flex gap-xs" id="fontButtons">
		<button class="button small {$user.data.pref_font == 'sans' ? 'dark' : 'background'}" on:click={() => ($user.data.pref_font = 'sans')}>Sans</button>
		<button class="button small serif {$user.data.pref_font == 'serif' ? 'dark' : 'background'}" on:click={() => ($user.data.pref_font = 'serif')}>Serif</button>
		<button class="button small mono {$user.data.pref_font == 'mono' ? 'dark' : 'background'}" on:click={() => ($user.data.pref_font = 'mono')}>Mono</button>
	</div>
</div>

<div class="setting-row">
	<label for="fontSizeRange">Font Size</label>
	<input id="fontSizeRange" type="range" bind:value={fontSize} min=1 max=5 step="1" />
</div>

<div class="setting-row">
	<label for="roundCornerToggle">Round Corners</label>
	<input id="roundCornerToggle" type="checkbox" class="toggle on-off" bind:checked={$user.data.pref_round}/>
</div>

<div class="setting-row hide-sm">
	<label for="outlinesToggle">Input Outlines</label>
	<input id="outlinesToggle" type="checkbox" class="toggle on-off" bind:checked={$user.data.pref_outlines}/>
</div>

<div class="setting-row">
	<label for="motionToggle">Motion</label>
	<input id="motionToggle" type="checkbox" class="toggle on-off" bind:checked={$user.data.pref_motion}/>
</div>



