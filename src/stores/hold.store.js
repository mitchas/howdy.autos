import { writable } from "svelte/store";

const initial_load_date = new Date();

// Public User Uploads URL
export const uploads_url = import.meta.env.VITE_PUBLIC_STORAGE_URL + "user_uploads";

export const bust_avatar = writable(initial_load_date);