import { writable } from "svelte/store";

// Debug Mode
// Triggered with SHIFT+CMD+0
export const debug_mode = writable(false);
// Page Title
export const page_title = writable("Howdy.autos");
// Loading
export const page_loading = writable(false);
// Fullscreen
export const is_fullscreen = writable(false);


// export const alert = writable("Welcome to the to-do list app!");
export const alert = writable(null);

// Preferences
export const dark_mode = writable(false);
export const round_borders = writable(true);
export const font = writable("sans");
export const theme = writable("default");
export const outlines = writable(true);
export const motion = writable(true);

// Content
export const content_age = writable(1);
export const content_language = writable("english");
export const content_business_owner = writable(false);
export const content_student = writable(false);
export const content_veteran = writable(false);

