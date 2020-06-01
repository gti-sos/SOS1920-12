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
	import AnalyticsDrugOffences from "./analytics/do/DrugOffencesAnalytics.svelte";

	import AnalyticsAll from "./analytics/AnalyticsAll.svelte";
	
	//Imports para integrations
	import Integrations from "./integrations/allIntegrations.svelte";
	import IntegrationExample from "./integrations/od/integracionejemplo.svelte";
	import IntegrationGeoDb from "./integrations/od/integracionGeoDb.svelte";
	import IntegrationQuote from "./integrations/od/integracionQuote.svelte";
	import IntegrationWikihow from "./integrations/od/integracionWikihow.svelte";
	/* A INTRODUCIR 
	import sdAnalytics from "./analytics/sd/XXXXXXXXXXXXXXX";
	import doAnalytics from "./analytics/do/YYYYYYYYYYYYYYY";
	*/
	let isOpen=false;
	
	const routes = {
		"/": Home,
		"/overdose-deaths/:country/:year": EditOverdoseDeath,
		"/overdose-deaths": OverdoseDeaths,
		"/analytics/overdose-deaths": AnalyticsOverdoseDeaths,
		"/integrations/ejemplo":IntegrationExample,
		"/integrations/GeoDb":IntegrationGeoDb,
		"/integrations/Quote":IntegrationQuote,
		"/integrations/Wikihow":IntegrationWikihow,

		"/drug-offences/:country/:year": EditDrugOffences,
		"/drug-offences": DrugOffences,
		"/analytics/drug-offences": AnalyticsDrugOffences,
		
		"/school-dropouts/:country/:year": EditSchoolDropout,
		"/school-dropouts": SchoolDropouts,
		"/integrations":Integrations,
		
		"/analytics": AnalyticsAll,

		"*": NotFound
	};
	

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
			  <DropdownItem href= "#/analytics/drug-offences">Delitos vinculados con drogas</DropdownItem>
			  <DropdownItem divider />
			  <DropdownItem href="#/analytics">Todos</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		<NavItem>
			<NavLink  href="#/integrations">Integraciones</NavLink>
		  </NavItem>

		<NavItem>
			<NavLink disabled href="#/drug-offences">Videos</NavLink>
		  </NavItem>
		
		</Nav>
	</Navbar>

</body>

<Router {routes}> </Router>
</main>
