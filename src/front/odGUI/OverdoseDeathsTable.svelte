<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import {Alert} from 'sveltestrap';
	import { pop } from "svelte-spa-router";

	let overdose_deaths = [];
	let newOverdoseDeath = {
		country: "",
		year: "",
		death_male:"",
		death_female:"",
		death_total:"",
		mean_age:""
	}
	//Estas variables son para paginacion
	let limit = 10;
	let offset = 0;
	let moreDeaths = true;
	let currentPage=1; // No la utilizamos pero nos sirve para saber en que pagina estamos (quizas en un futuro)
	
	//Estas variables son para las busquedas
	let searchCountry= "";
	let searchYear = "";

	//Estas variables son para los errores
	let okayMsg = "";
	let errorMsg = "";


	onMount(getOverdoseDeaths);
	
	async function loadOverdoseDeaths(){
	
		console.log("Fetching overdose deaths...");
		//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda (para la iteración ...) solo después de completar cada solicitud.
		const res = await fetch("/api/v2/overdose-deaths/loadInitialData").then(function(res){
			if (res.ok){
				console.log("OK");
				getOverdoseDeaths();
				okayMsg= "Datos cargados correctamente."
			}
			else if(res.status == 409){
				errorMsg = "Ya hay datos cargados. Esta accion eliminaria los datos existentes. Si quiere cargar los datos iniciales, por favor, elimine todos los disponibles primero."
				console.log("ERROR ALREADY LOADED DATA");
			}
			else{
				console.log("ERROR");
			}
		});
		
	}

	async function getOverdoseDeaths(){
	
		console.log("Fetching overdose deaths...");
		var url = "/api/v2/overdose-deaths?limit="+limit+"&offset="+(offset*limit);
		var urlAfter = "/api/v2/overdose-deaths?limit="+limit+"&offset="+(limit*(offset+1));
		//Pero mira que bonico quedan asi los IF pero quieron poner dos cosas en la misma condicion asi que F
		//url= (country!="") ? url+"&country="+country : url;
		//url= (year!="") ? url+"&year="+year : url;
		if(searchCountry!="" &&searchCountry!=null){
			url = url+"&country="+searchCountry;
			urlAfter= urlAfter+"&country="+searchCountry;
		}
		

		if(searchYear!="" && searchYear!=null){
			url = url+"&year="+searchYear;
			urlAfter= urlAfter+"&year="+searchYear;
		}
		//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda (para la iteración ...) solo después de completar cada solicitud.
		const res = await fetch(url);
		//const res = await fetch("/api/v2/overdose-deaths?limit="+limit+"&offset="+(offset*limit)+"&country="+country);
		//Tenemos que preguntar tambien si hay mas datos, ya que, si no los hay, pasando de pagina estariamos haciendo una peticion a la api que nos devolveria un error, un 400 BAD REQUEST
		//data is empty
		const after =  await fetch(urlAfter);

		if(res.ok && after.ok){
			console.log("OK");
			const json = await res.json();
			const jsonAfter = await after.json();
			overdose_deaths = json;
			//Comprobamos si hay mas datos o no despues para activar o desactivar el boton
			if(jsonAfter.length ==0){
				moreDeaths=false;
			}
			else{
				moreDeaths=true;
			}
			console.log("Received "+ overdose_deaths.length +" overdose deaths." )
		}
		else{
			console.log("ERROR");
			errorMsg= "Fallo del servidor en la solicitud"
		}
			
		
	}
	
	async function insertOverdoseDeath(){
		 
		console.log("Inserting overdose deaths...");
		//Comprobamos que el año y la fecha no estén vacíos, ojo cuidao que el string vacio no es null
		if (newOverdoseDeath.country == "" || newOverdoseDeath.country == null || newOverdoseDeath.year == "" || newOverdoseDeath.year == null) {
			alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
		}
		else{
			const res = await fetch("/api/v2/overdose-deaths",{
			method:"POST",
			body:JSON.stringify(newOverdoseDeath),
			headers:{
				"Content-Type": "application/json"
			}
			}).then(function (res) {
				if(res.status == 201){
					getOverdoseDeaths();
					console.log("Data introduced");
					okayMsg="Entrada introducida correctamente a la base de datos";
				}
				else if(res.status == 400){
					console.log("ERROR Data was not correctly introduced");
					errorMsg= "Los datos de la entrada no fueron introducidos correctamente";
				}
			});	
		}
	}

	async function deleteOverdoseDeaths() {
		console.log("Deleting overdose deaths...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all overdose deaths...");
			const res = await fetch("/api/v2/overdose-deaths/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
					getOverdoseDeaths();
					offset = 0;
					currentPage = 1;
					okayMsg="Datos eliminados correctamente";
					console.log("OK All data erased");
				}
				else{
					console.log("ERROR Data was not erased");
					errorMsg= "No se han podido eliminar los datos";
				}
			});
		}
	}

	async function deleteOverdoseDeath(country,year) {
		console.log("Inserting overdose death...");
		if(confirm("¿Está seguro de que desea eliminar esta entrada?")){
			console.log("Deleting overdose death...");
			const res = await fetch("/api/v2/overdose-deaths/" + country + "/"+year,{
				method:"DELETE"
			}).then(function (res) {
				if(res.ok){
					getOverdoseDeaths();
					okayMsg="Entrada eliminada correctamente";
					console.log("OK data erased");
				}
				else if(res.status=404){
					errorMsg="La entrada que intenta eliminar no se encuentra en la base de datos";
					console.log("ERROR Data not found in database");
				}
				else{
					errorMsg="No se ha podido eliminar la entrada";
					console.log("ERROR");
				}
			});	
		}
	}

	async function searchDeath(country,year){
		if(searchCountry!=""){
			url = url+"&country="+searchCountry;
			urlAfter= urlAfter+"&country="+searchCountry;
		}
		

		if(searchYear!=""){
			url = url+"&year="+searchYear;
			urlAfter= urlAfter+"&year="+searchYear;
		}

	}

	function changePage(increment){
		//La variable se llama increment pero podria ser un numero negativo y asi cambiariamos a una pagina menor
		offset += increment;
		currentPage += increment;
		getOverdoseDeaths();
	}
	</script>


	

<main>
	{#await overdose_deaths}
		Loading overdose deaths...
	{:then overdose_deaths}
	

	<Form class="form-inline" >
		<Label for="country" class="mb-2 mr-sm-2">Busqueda por Pais:</Label>
		<Input type="text" class="form-control mb-2 mr-sm-2" id="country" placeholder="Introduzca un país" name="country" bind:value="{searchCountry}"/>
		<Label for="year" class="mb-2 mr-sm-2">y Año:</Label>
		<Input type="number" class="form-control mb-2 mr-sm-2" id="year" placeholder="Introduzca un año" name="year" bind:value="{searchYear}"/>   
	</Form>
	<Button class="button-search" on:click="{getOverdoseDeaths}" >Buscar</Button>

	<Button outline color= "primary"  on:click="{loadOverdoseDeaths}">Cargar</Button>
	{#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
		
	{/if}
	{#if okayMsg}
	<p style="color: green">OK: {okayMsg}</p>
	{/if}

		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Hombres fallecidos</th>
					<th>Mujeres fallecidas</th>
					<th>Total fallecidos</th>
					<th>Edad media</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
					<tr>
						<td><Input type="text" placeholder="Vatican City" bind:value="{newOverdoseDeath.country}"/></td>
						<td><Input type="number" placeholder="2019" min=1990 bind:value="{newOverdoseDeath.year}"/></td>
						<td><Input type="number" placeholder="20" min=0 bind:value="{newOverdoseDeath.death_male}"/></td>
						<td><Input type="number" placeholder="10" min=0 bind:value="{newOverdoseDeath.death_female}"/></td>
						<td><Input type="number" placeholder="30" min=0 bind:value="{newOverdoseDeath.death_total}"/></td>
						<td><Input type="number" placeholder="20.5" min=0 step=0.1  bind:value="{newOverdoseDeath.mean_age}"/></td>
						<td><Button outline color= "primary"  on:click={insertOverdoseDeath}>Insertar</Button></td>
					</tr>
				{#each overdose_deaths as overdose_death}
					<tr>
						<td>
							<a href= "#/overdose-deaths/{overdose_death.country}/{overdose_death.year}">{overdose_death.country} </a>
						</td>
						<td>{overdose_death.year}</td>
						<td>{overdose_death.death_male}</td>
						<td>{overdose_death.death_female}</td>
						<td>{overdose_death.death_total}</td>
						<td>{overdose_death.mean_age}</td>
						<td><Button outline color="danger" on:click="{deleteOverdoseDeath(overdose_death.country, overdose_death.year)}">Eliminar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	<Pagination ariaLabel="Web pagination">
		<!-- Si estamos en la pagina 1, no podemos darle al boton que nos lleva una pagina atras, no tendria sentido que pudiesemos darle-->
		<PaginationItem class="{currentPage===1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/overdose-deaths" on:click="{() => changePage(-1)}" />
		</PaginationItem>
		{#if moreDeaths}
		<PaginationItem>
		  	<PaginationLink next href="#/overdose-deaths" on:click="{() => changePage(1)}" />
		</PaginationItem>
		{/if}
	  </Pagination>

	<Button outline color="secondary" on:click="{pop}"> Atrás</Button>
	<Button block outline on:click={deleteOverdoseDeaths} color="danger">  Eliminar todo </Button>
</main>
