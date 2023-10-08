<script lang="ts">
	import { page } from '$app/stores';

	import SelectAState from '$lib/plates/SelectAState.svg';
	import Alabama from '$lib/plates/Alabama.svg';
	import Alaska from '$lib/plates/Alaska.svg';
	import Arizona from '$lib/plates/Arizona.svg';
	import Arkansas from '$lib/plates/Arkansas.svg';
	import California from '$lib/plates/California.svg';
	import Colorado from '$lib/plates/Colorado.svg';
	import Connecticut from '$lib/plates/Connecticut.svg';
	import Delaware from '$lib/plates/Delaware.svg';
	import Florida from '$lib/plates/Florida.svg';
	import Georigia from '$lib/plates/Georgia.svg';
	import Hawaii from '$lib/plates/Hawaii.svg';
	import Idaho from '$lib/plates/Idaho.svg';
	import Illinois from '$lib/plates/Illinois.svg';
	import Indiana from '$lib/plates/Indiana.svg';
	import Iowa from '$lib/plates/Iowa.svg';
	import Kansas from '$lib/plates/Kansas.svg';
	import Kentucky from '$lib/plates/Kentucky.svg';
	import Louisiana from '$lib/plates/Louisiana.svg';
	import Maine from '$lib/plates/Maine.svg';
	import Maryland from '$lib/plates/Maryland.svg';
	import Massachusetts from '$lib/plates/Massachusetts.svg';
	import Michigan from '$lib/plates/Michigan.svg';
	import Minnesota from '$lib/plates/Minnesota.svg';
	import Mississippi from '$lib/plates/Mississippi.svg';
	import Missouri from '$lib/plates/Missouri.svg';
	import Montana from '$lib/plates/Montana.svg';
	import Nebraska from '$lib/plates/Nebraska.svg';
	import Nevada from '$lib/plates/Nevada.svg';
	import NewHampshire from '$lib/plates/NewHampshire.svg';
	import NewJersey from '$lib/plates/NewJersey.svg';
	import NewMexico from '$lib/plates/NewMexico.svg';
	import NewYork from '$lib/plates/NewYork.svg';
	import NorthCarolina from '$lib/plates/NorthCarolina.svg';
	import NorthDakota from '$lib/plates/NorthDakota.svg';
	import Ohio from '$lib/plates/Ohio.svg';
	import Oklahoma from '$lib/plates/Oklahoma.svg';
	import Oregon from '$lib/plates/Oregon.svg';
	import Pennsylvania from '$lib/plates/Pennsylvania.svg';
	import RhodeIsland from '$lib/plates/RhodeIsland.svg';
	import SouthCarolina from '$lib/plates/SouthCarolina.svg';
	import SouthDakota from '$lib/plates/SouthDakota.svg';
	import Tennessee from '$lib/plates/Tennessee.svg';
	import Texas from '$lib/plates/Texas.svg';
	import Utah from '$lib/plates/Utah.svg';
	import Vermont from '$lib/plates/Vermont.svg';
	import Virginia from '$lib/plates/Virginia.svg';
	import Washington from '$lib/plates/Washington.svg';
	import WestVirginia from '$lib/plates/WestVirginia.svg';
	import Wisconsin from '$lib/plates/Wisconsin.svg';
	import Wyoming from '$lib/plates/Wyoming.svg';
	import DC from '$lib/plates/DC.svg';
	import FED from '$lib/plates/FED.svg';
	import AmericanSamoa from '$lib/plates/AmericanSamoa.svg';
	import Guam from '$lib/plates/Guam.svg';
	import NorthernMariana from '$lib/plates/NorthernMariana.svg';
	import PuertoRico from '$lib/plates/PuertoRico.svg';
	import VirginIslands from '$lib/plates/VirginIslands.svg';


	export let abbr = "";
	$: abbr && userChangedState(abbr.toUpperCase());

	let background = SelectAState;

	function userChangedState(state){

		if(state == "AL"){background = Alabama;}
		else if(state == "AK"){background = Alaska;}
		else if(state == "AZ"){background = Arizona;}
		else if(state == "AR"){background = Arkansas;}
		else if(state == "CA"){background = California;}
		else if(state == "CO"){background = Colorado;}
		else if(state == "CT"){background = Connecticut;}
		else if(state == "DE"){background = Delaware;}
		else if(state == "FL"){background = Florida;}
		else if(state == "GA"){background = Georigia;}
		else if(state == "HI"){background = Hawaii;}
		else if(state == "ID"){background = Idaho;}
		else if(state == "IL"){background = Illinois;}
		else if(state == "IN"){background = Indiana;}
		else if(state == "IA"){background = Iowa;}
		else if(state == "KS"){background = Kansas;}
		else if(state == "KY"){background = Kentucky;}
		else if(state == "LA"){background = Louisiana;}
		else if(state == "ME"){background = Maine;}
		else if(state == "MD"){background = Maryland;}
		else if(state == "MA"){background = Massachusetts;}
		else if(state == "MI"){background = Michigan;}
		else if(state == "MN"){background = Minnesota;}
		else if(state == "MS"){background = Mississippi;}
		else if(state == "MO"){background = Missouri;}
		else if(state == "MT"){background = Montana;}
		else if(state == "NE"){background = Nebraska;}
		else if(state == "NV"){background = Nevada;}
		else if(state == "NH"){background = NewHampshire;}
		else if(state == "NJ"){background = NewJersey;}
		else if(state == "NM"){background = NewMexico;}
		else if(state == "NY"){background = NewYork;}
		else if(state == "NC"){background = NorthCarolina;}
		else if(state == "ND"){background = NorthDakota;}
		else if(state == "OH"){background = Ohio;}
		else if(state == "OK"){background = Oklahoma;}
		else if(state == "OR"){background = Oregon;}
		else if(state == "PA"){background = Pennsylvania;}
		else if(state == "RI"){background = RhodeIsland;}
		else if(state == "SC"){background = SouthCarolina;}
		else if(state == "SD"){background = SouthDakota;}
		else if(state == "TN"){background = Tennessee;}
		else if(state == "TX"){background = Texas;}
		else if(state == "UT"){background = Utah;}
		else if(state == "VT"){background = Vermont;}
		else if(state == "VA"){background = Virginia;}
		else if(state == "WA"){background = Washington;}
		else if(state == "WV"){background = WestVirginia;}
		else if(state == "WI"){background = Wisconsin;}
		else if(state == "WY"){background = Wyoming;}
		else if(state == "DC"){background = DC;}
		else if(state == "FED"){background = FED;}
		else if(state == "AS"){background = AmericanSamoa;}
		else if(state == "GU"){background = Guam;}
		else if(state == "CNMI"){background = NorthernMariana;}
		else if(state == "PR"){background = PuertoRico;}
		else if(state == "VI"){background = VirginIslands;}
	}


</script>




<img src={background} alt="License Plate Design"/>



<style lang="scss">
	
	img{
		display: block;
		max-width: 100%;
		height: auto;
		width: auto;
	}
</style>
