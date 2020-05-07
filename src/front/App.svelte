<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte' ;  
	import Home from './Home.svelte'
	import { Jumbotron } from "sveltestrap";
	import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'sveltestrap';
	//Imports para overdose-deaths
	import OverdoseDeaths from './odGUI/OverdoseDeathsTable.svelte';
	import EditOverdoseDeath from './odGUI/EditOverdoseDeath.svelte';

	
	//Imports para school-dropouts
	//import XXXXXXXX from './sdGUI/XXXXXXXXXXXXX.svelte';

	//Imports para drug-offences
	//import YYYYYYYYY from './doGUI/YYYYYYYYYYYYYY.svelte';
	import DrugOffences from './doGUI/DrugOffencesTable.svelte';
	import EditDrugOffences from './doGUI/EditDrugOffences.svelte';

	//Aqui se deben de añadir el resto de rutas de la pagina

	const routes = {
		"/": Home,
		"/overdose-deaths/:country/:year": EditOverdoseDeath,
		"/overdose-deaths": OverdoseDeaths,

		"/drug-offences/:country/:year": EditDrugOffences,
		"/drug-offences": DrugOffences,
		"*": NotFound
	};
</script>

<main>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

<body>
	<Jumbotron class="p-"  >
		<h1 style="text-align:center;" class="display-3">SOS1920-12</h1>
	</Jumbotron>
	<Navbar color="dark" dark expand="md" >
		<Nav navbar >
		  <NavItem active >
			<NavLink href="#/">Inicio</NavLink>
		  </NavItem>
		  <NavItem>
			<NavLink href="#/overdose-deaths">Fallecimientos por sobredosis</NavLink>
		  </NavItem>
		  <NavItem>
			<NavLink href="#/school-dropouts">Abandono escolar</NavLink>
		  </NavItem>
		  <NavItem>
			<NavLink href="#/drug-offences">Delitos vinculados con drogas</NavLink>
		  </NavItem>
		</Nav>
	</Navbar>

</body>
<Router {routes}> </Router>
</main>
