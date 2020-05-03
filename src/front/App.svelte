<script>
	import OverdoseDeathsTable from './OverdoseDeathsTable.svelte';
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte' ;  
	import EditOverdoseDeath from './EditOverdoseDeath.svelte';

	const routes = {
		"/": OverdoseDeathsTable,
		"/overdose-deaths/:country": EditOverdoseDeath,
		"*": NotFound
	};
</script>

<main>
	<h1> Overdose Deaths Manager</h1>
	
	<Router {routes}> </Router>


</main>
