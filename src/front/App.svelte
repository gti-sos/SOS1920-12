<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte' ;  
	import Home from './Home.svelte'

	//Imports para overdose-deaths
	import OverdoseDeaths from './odGUI/OverdoseDeathsTable.svelte';
	import EditOverdoseDeath from './odGUI/EditOverdoseDeath.svelte';

	//Imports para school-dropouts
	//import XXXXXXXX from './sdGUI/XXXXXXXXXXXXX.svelte';

	//Imports para drug-offences
	//import YYYYYYYYY from './doGUI/YYYYYYYYYYYYYY.svelte';

	//Aqui se deben de añadir el resto de rutas de la pagina

	const routes = {
		"/": Home,
		"/overdose-deaths/:country/:year": EditOverdoseDeath,
		"/overdose-deaths": OverdoseDeaths,
		"*": NotFound
	};
</script>

<main>
	<h1> APIs Manager</h1>
	
	<Router {routes}> </Router>


</main>
