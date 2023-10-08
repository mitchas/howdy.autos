import { supabase } from '../supabaseClient';
import { writable } from "svelte/store";
import { get } from 'svelte/store'


const defaultUser = {
	// User ready, display page
	ready: false,
	// Supabase Authentication
	auth: null,
	// Private data & Preferences
	data: {
		pref_motion: true,
		pref_outlines: true,
		pref_theme: "default",
		pref_dark: false,
		pref_round: true,
		pref_font: "sans",
		pref_font_size: 3,
	},
	// Newsletter Subscriptions
	newsletter_subs: [],
}

export const user = writable(defaultUser);


// Auth Change
// Auth Change
// Auth Change
supabase.auth.onAuthStateChange((event, session) => {
	console.log('%cAuth Changed', 'color: white; background: red; font-size: 18px');

	if (event == 'SIGNED_IN') {
		console.log('%cSigned In', 'color: white; background: green; font-size: 14px');
		
		user.update((oldUser) => {
			return {...oldUser, auth: session.user};
		});

		if(!get(user).data.id){
			fetchSignedInUser(session.user.id);
		}

	} else if (event == 'SIGNED_OUT') {
		console.log('%cSigned Out', 'color: white; background: orange; font-size: 14px');
		user.set(defaultUser); // set the store to the default value
	}else{
		console.log('%c' + event, 'color: black; background: yellow; font-size: 14px');
	}

	// User Ready
	if(event == "INITIAL_SESSION"){
		user.update((oldUser) => {
			return {...oldUser, ready: true};
		});
	}
});



// Fetch Signed In User
// Fetch Signed In User
// Fetch Signed In User
export const fetchSignedInUser = async function(uid) {

	console.log('%cFetching User', 'color: white; background: blue; font-size: 14px');

	const { data, error } = await supabase
	.from('user_private')
	.select(`
		*,
		user_public (
		*
		),
		user_profile (
			*
		) 
	`).eq("id", uid).single();

	// const { error, data } = await supabase.from('user_private').select("*").eq("id", uid).single();
	if(error){
		console.error(error);
	}else if(data){
		console.log("User Data Found", data)
		user.update((oldUser) => {
			return {
				...oldUser,
				data: data
			};
		});
	}

}



