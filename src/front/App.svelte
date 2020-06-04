<script>
	import Router from 'svelte-spa-router';

	import NotFound from './NotFound.svelte' ;  
	import Home from './Home.svelte';
	import About from './About.svelte';
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
	import AnalyticsSchoolDropouts from "./analytics/sd/SchoolDropoutsAnalytics.svelte";

	import AnalyticsAll from "./analytics/AnalyticsAll.svelte";
	import analiticad3js from "./analytics/od/MyGraph3.svelte"
	//Juanjo
	//Imports para integrations
	import Integrations from "./integrations/allIntegrations.svelte";
	import IntegrationCorona from "./integrations/od/integracionCorona.svelte";
	import IntegrationGeoDb from "./integrations/od/integracionGeoDb.svelte";
	import IntegrationQuote from "./integrations/od/integracionQuote.svelte";
	import IntegrationWikihow from "./integrations/od/integracionWikihow.svelte";
	import IntegrationDigimon from "./integrations/od/integracionDigimon.svelte";

	//De compis
	
	import IntegrationFormula from "./integrations/od/integracionFormula.svelte";
	import IntegrationLifeExpectancy from "./integrations/od/integracionLifeExpectancy.svelte";
	import IntegrationVehicles from "./integrations/od/integracionVehicles.svelte";
	import IntegrationVehicleStats from "./integrations/od/integracionVehicleStats.svelte";
	import IntegrationCyclingRoutes from "./integrations/od/integracionCyclingRoutes.svelte";
	import IntegrationLQ from "./integrations/od/integracionLQ.svelte";
	import IntegrationElectricity from "./integrations/od/integracionElectricity.svelte";
	import IntegrationEmigrants from "./integrations/od/integracionEmigrants.svelte";
	import IntegrationNotHospitalized from "./integrations/od/integracionNotHospitalized.svelte";
	import IntegrationHappinessRate from "./integrations/od/integracionHappinessRate.svelte";

	//Adria
	//De compis
	import IntegrationNuclearEnergy from "./integrations/do/integracionEnergiaNuclear.svelte";
	import IntegrationPovertyStats from "./integrations/do/integracionPovertyStats.svelte";
	import IntegrationSwimStats from "./integrations/do/integracionSwimStats.svelte";
	import IntegrationFireStats from "./integrations/do/integracionFireStats.svelte";
	import IntegrationTrafficInjuries from "./integrations/do/integracionTrafficInjuries.svelte";

	//De gente de fuera
	import IntegrationCovid from "./integrations/do/integracionCOVID19.svelte";
	import IntegrationChuckNorris from "./integrations/do/integracionChuckNorris.svelte";
	import IntegracionScoresStats from "./integrations/do/integracionScoresStats.svelte";
	import IntegracionSuicideStats from "./integrations/do/integracionSuicideStats.svelte";
	import IntegracionBeerConsume from "./integrations/do/integracionBeerConsume.svelte";
	import IntegrationPopStats from "./integrations/do/integracionPopStats.svelte";
	import IntegrationPublicSpending from "./integrations/do/integracionPublicSpending.svelte";
	import IntegracionIP from "./integrations/do/integracionIP.svelte";

	//Pascual
	//De compis
	import IntegrationRuralTourismStats from "./integrations/sd/integracionRuralTourismStats.svelte";
	import IntegrationCountriesForEqualityStats from "./integrations/sd/integracionCountriesForEqualityStats.svelte";
	import IntegrationNatalityStats from "./integrations/sd/integracionNatalityStats.svelte";
	import IntegrationCigarretesSales from "./integrations/sd/integracionCigarretesSales.svelte";

	/* A INTRODUCIR 
	import sdAnalytics from "./analytics/sd/XXXXXXXXXXXXXXX";
	import doAnalytics from "./analytics/do/YYYYYYYYYYYYYYY";
	*/
	let isOpen=false;
	
	const routes = {
		"/": Home,
		"/about":About,
		"/overdose-deaths/:country/:year": EditOverdoseDeath,
		"/overdose-deaths": OverdoseDeaths,
		"/analytics/overdose-deaths": AnalyticsOverdoseDeaths,
		"/integrations/Corona":IntegrationCorona,
		"/integrations/GeoDb":IntegrationGeoDb,
		"/integrations/Quote":IntegrationQuote,
		"/integrations/Wikihow":IntegrationWikihow,
		"/integrations/Formula":IntegrationFormula,
		"/integrations/LifeExpectancy":IntegrationLifeExpectancy,
		"/integrations/Vehicles":IntegrationVehicles,
		"/integrations/VehicleStats":IntegrationVehicleStats,
		"/integrations/CyclingRoutes":IntegrationCyclingRoutes,
		"/integrations/LQ":IntegrationLQ,
		"/integrations/Electricity":IntegrationElectricity,
		"/integrations/Emigrants":IntegrationEmigrants,
		"/integrations/NotHospitalized":IntegrationNotHospitalized,
		"/integrations/HappinessRate":IntegrationHappinessRate,
		"/integrations/EnergiaNuclear":IntegrationNuclearEnergy,
		"/integrations/Digimon":IntegrationDigimon,
		"/Integrations/PovertyStats":IntegrationPovertyStats,
		"/Integrations/SwimStats":IntegrationSwimStats,
		"/Integrations/FireStats":IntegrationFireStats,
		"/Integrations/TrafficInjuries":IntegrationTrafficInjuries,
		"/Integrations/Covid19":IntegrationCovid,
		"/Integrations/ChuckNorris":IntegrationChuckNorris,
		"/Integrations/ScoresStats": IntegracionScoresStats,
		"/Integrations/SuicideStats": IntegracionSuicideStats,
		"/Integrations/BeerConsume": IntegracionBeerConsume,
		"/Integrations/PopStats": IntegrationPopStats,
		"/integrations/PublicSpending":IntegrationPublicSpending,
		"/Integrations/IP": IntegracionIP,
		
		

		"/drug-offences/:country/:year": EditDrugOffences,
		"/drug-offences": DrugOffences,
		"/analytics/drug-offences": AnalyticsDrugOffences,
		
		"/school-dropouts/:country/:year": EditSchoolDropout,
		"/school-dropouts": SchoolDropouts,
		"/analytics/school-dropouts": AnalyticsSchoolDropouts,
		"/integrations/RuralTourismStats":IntegrationRuralTourismStats,
		"/integrations/CountriesForEqualityStats":IntegrationCountriesForEqualityStats,
		"/integrations/NatalityStats":IntegrationNatalityStats,
		"/integrations/CigarretesSales":IntegrationCigarretesSales,

		"/integrations":Integrations,
		"/d3js":analiticad3js,
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
			  <DropdownItem href="#/analytics/school-dropouts">Abandono escolar</DropdownItem>
			  <DropdownItem href= "#/analytics/drug-offences">Delitos vinculados con drogas</DropdownItem>
			  <DropdownItem divider />
			  <DropdownItem href="#/analytics">Todos</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		<NavItem>
			<NavLink  href="#/integrations">Integraciones</NavLink>
		  </NavItem>

		<NavItem>
			<NavLink href="#/about">Videos</NavLink>
		  </NavItem>
		
		</Nav>
	</Navbar>

</body>

<Router {routes}> </Router>
</main>
