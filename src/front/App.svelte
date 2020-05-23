<script>
	import Router from 'svelte-spa-router';

	import NotFound from './NotFound.svelte' ;  
	import Home from './Home.svelte'
	import { Jumbotron } from "sveltestrap";
	import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'sveltestrap';
	//Imports para overdose-deaths
	import OverdoseDeaths from './odGUI/OverdoseDeathsTable.svelte';
	import EditOverdoseDeath from './odGUI/EditOverdoseDeath.svelte';

	
	//Imports para school-dropouts
	import SchoolDropouts from './sdGUI/SchoolDropoutsTable.svelte';
	import EditSchoolDropout from './sdGUI/EditSchoolDropout.svelte';

	//Imports para drug-offences
	import DrugOffences from './doGUI/DrugOffencesTable.svelte';
	import EditDrugOffences from './doGUI/EditDrugOffences.svelte';

	//Imports para analytics
	import AnalyticsOverdoseDeaths from "./analytics/od/OverdoseDeathsAnalytics.svelte";

	/* A INTRODUCIR 
	import sdAnalytics from "./analytics/sd/XXXXXXXXXXXXXXX";
	import doAnalytics from "./analytics/do/YYYYYYYYYYYYYYY";
	*/

	const routes = {
		"/": Home,
		"/overdose-deaths/:country/:year": EditOverdoseDeath,
		"/overdose-deaths": OverdoseDeaths,

		"/drug-offences/:country/:year": EditDrugOffences,
		"/drug-offences": DrugOffences,
		
		"/school-dropouts/:country/:year": EditSchoolDropout,
		"/school-dropouts": SchoolDropouts,

		"/analytics/overdose-deaths": AnalyticsOverdoseDeaths,
		/*
		"/analytics/drug-offences": AnalyticsDrugOffences,
		"/analytics/school-dropouts" AnalyticsSchoolDropouts,
		*/
		
		"*": NotFound
	};
	let isOpen=false;
</script>

<main>

<body >
	<Jumbotron class="p-5" >
		<h1 style="text-align:center;" class="display-3">SOS1920-12</h1>
	</Jumbotron>
	<Navbar color="dark" dark expand="md" >
		<Nav navbar >
		  <NavItem  >
			<NavLink  active href="#/">Inicio</NavLink>
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
		  <Dropdown  nav {isOpen} toggle="{() => isOpen = !isOpen}" >
			<DropdownToggle nav caret>
			  Analíticas
			</DropdownToggle>
			<DropdownMenu>
			  <DropdownItem header>Recursos</DropdownItem>
			  <DropdownItem href="#/analytics/overdose-deaths">Fallecimientos por sobredosis</DropdownItem>
			  <DropdownItem disabled>Abandono escolar</DropdownItem>
			  <DropdownItem disabled>Delitos vinculados con drogas</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		</Nav>
	</Navbar>

</body>
<Router {routes}> </Router>
</main>
