<script>
	import { fade, fly, blur } from 'svelte/transition'
	// in:fly={{ duration: 70, delay: 140 }} out:fly={{ duration: 70 }}
	export let visible = false;
	import { is_fullscreen } from '../stores/ui.store.js';
	
	$: visible && visible && openModal();
	$: !visible && !visible && closeModal();

	function openModal(){
		$is_fullscreen = true;
		let backdropColor = getComputedStyle(document.documentElement).getPropertyValue('--backdrop');
		document.querySelector("meta[name='theme-color']").setAttribute("content",  backdropColor);
	}
	function closeModal(){
		$is_fullscreen = false;
		let backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background');
		document.querySelector("meta[name='theme-color']").setAttribute("content",  backgroundColor);
	}
</script>



<button class="modal-backdrop" on:click={() => visible = false} aria-label="Close Dialog" in:fly={{ duration:0}} out:fly={{ duration: 0}}/>
<div class="modal-wrapper" role="dialog">
	<div class="modal-body">
		<slot />
	</div>
</div>

