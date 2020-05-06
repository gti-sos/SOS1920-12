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
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

<body>
	<div class="jumbotron text-center display-3">
	<h1>SOS1920-12</h1>
	</div>
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
		<ul class="navbar-nav navbar-expand-sm ">
		  <li class="nav-item">
			<a class="nav-link" href="#/">Inicio</a>
		  </li>
		  <li class="nav-item">
			<a class="nav-link" href="#/overdose-deaths">Fallecimientos por sobredosis</a>
		  </li>
		  <li class="nav-item">
			<a class="nav-link" href="#/school-dropouts">Abandono escolar</a>
		  </li>
		  <li class="nav-item">
			<a class="nav-link" href="#/drug-offences">Delitos vinculados con drogas</a>
		  </li>
		</ul>
	</nav>

</body>
<Router {routes}> </Router>
</main>
