<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import {Alert} from 'sveltestrap';
	import { pop } from "svelte-spa-router";


	let school_dropouts = [];
	let newSchoolDropout = {
		country: "",
		year: "",
		sd_all:"",
		sd_mas:"",
		sd_fem:"",
	}

	//Pagination
	let limit = 10;
	let offset = 0;
	let moreDropouts = true;
	let currentPage=1; 
	
	//Search variables
	let searchCountry= "";
	let searchYear = "";

	//Message variables
	let okayMsg = "";
	let errorMsg = "";


	onMount(getSchoolDropouts);
	
	async function loadSchoolDropouts(){
	
		console.log("Fetching school dropouts...");
		const res = await fetch("/api/v3/school-dropouts/loadInitialData").then(function(res){
			if (res.ok){
				console.log("OK");
				getSchoolDropouts();
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

	async function getSchoolDropouts(){
	
		console.log("Fetching school dropouts...");
		var url = "/api/v3/school-dropouts?limit="+limit+"&offset="+(offset*limit);
		var urlAfter = "/api/v3/school-dropouts?limit="+limit+"&offset="+(limit*(offset+1));
		if(searchCountry!="" &&searchCountry!=null){
			url = url+"&country="+searchCountry;
			urlAfter= urlAfter+"&country="+searchCountry;
		}
		

		if(searchYear!="" && searchYear!=null){
			url = url+"&year="+searchYear;
			urlAfter= urlAfter+"&year="+searchYear;
		}

		const res = await fetch(url);
		const after =  await fetch(urlAfter);

		if(res.ok && after.ok){
			console.log("OK");
			const json = await res.json();
			const jsonAfter = await after.json();
			school_dropouts = json;
			
			if(jsonAfter.length ==0){
				moreDropouts=false;
			}
			else{
				moreDropouts=true;
			}
			console.log("Received "+ school_dropouts.length +" school dropouts." )
		}
		else{
			console.log("ERROR");
			errorMsg= "Fallo del servidor en la solicitud"
		}
			
		
	}
	
	async function insertSchoolDropout(){
		 
		console.log("Inserting school dropouts...");

		if (newSchoolDropout.country == "" || newSchoolDropout.country == null || newSchoolDropout.year == "" || newSchoolDropout.year == null) {
			alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
		}
		else{
			const res = await fetch("/api/v3/school-dropouts",{
			method:"POST",
			body:JSON.stringify(newSchoolDropout),
			headers:{
				"Content-Type": "application/json"
			}
			}).then(function (res) {
				if(res.status == 201){
					getSchoolDropouts();
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

	async function deleteSchoolDropouts() {
		console.log("Deleting school dropouts...");

		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all school dropouts...");
			const res = await fetch("/api/v3/school-dropouts/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
					getSchoolDropouts();
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

	async function deleteSchoolDropout(country,year) {
		console.log("Inserting school dropout...");
		if(confirm("¿Está seguro de que desea eliminar esta entrada?")){
			console.log("Deleting school dropout...");
			const res = await fetch("/api/v3/school-dropouts/" + country + "/"+year,{
				method:"DELETE"
			}).then(function (res) {
				if(res.ok){
					getSchoolDropouts();
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

	async function searchDropout(country,year){
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
		offset += increment;
		currentPage += increment;
		getSchoolDropouts();
	}
	</script>


	

<main>
	{#await school_dropouts}
		Loading school dropouts...
	{:then school_dropouts}
	

	<Form class="form-inline" >
		<Label for="country" class="mb-2 mr-sm-2">Busqueda por Pais:</Label>
		<Input type="text" class="form-control mb-2 mr-sm-2" id="country" placeholder="Introduzca un país" name="country" bind:value="{searchCountry}"/>
		<Label for="year" class="mb-2 mr-sm-2">y Año:</Label>
		<Input type="number" class="form-control mb-2 mr-sm-2" id="year" placeholder="Introduzca un año" name="year" bind:value="{searchYear}"/>   
	</Form>
	<Button class="button-search" on:click="{getSchoolDropouts}" >Buscar</Button>

	<Button outline color= "primary"  on:click="{loadSchoolDropouts}">Cargar</Button>
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
					<th>Total abandonos</th>
					<th>Hombres abandonos</th>
					<th>Mujeres abandonos</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
					<tr>
						<td><Input type="text" placeholder="Vatican City" bind:value="{newSchoolDropout.country}"/></td>
						<td><Input type="number" placeholder="2019" min=1990 bind:value="{newSchoolDropout.year}"/></td>
						<td><Input type="number" placeholder="20" min=0 bind:value="{newSchoolDropout.sd_all}"/></td>
						<td><Input type="number" placeholder="10" min=0 bind:value="{newSchoolDropout.sd_mas}"/></td>
						<td><Input type="number" placeholder="30" min=0 bind:value="{newSchoolDropout.sd_fem}"/></td>
						<td><Button outline color= "primary"  on:click={insertSchoolDropout}>Insertar</Button></td>
					</tr>
				{#each school_dropouts as school_dropout}
					<tr>
						<td>
							<a href= "#/school-dropouts/{school_dropout.country}/{school_dropout.year}">{school_dropout.country} </a>
						</td>
						<td>{school_dropout.year}</td>
						<td>{school_dropout.sd_all}</td>
						<td>{school_dropout.sd_mas}</td>
						<td>{school_dropout.sd_fem}</td>
						<td><Button outline color="danger" on:click="{deleteSchoolDropout(school_dropout.country, school_dropout.year)}">Eliminar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	<Pagination ariaLabel="Web pagination">
		<PaginationItem class="{currentPage===1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/school-dropouts" on:click="{() => changePage(-1)}" />
		</PaginationItem>
		{#if moreDropouts}
		<PaginationItem>
		  	<PaginationLink next href="#/school-dropouts" on:click="{() => changePage(1)}" />
		</PaginationItem>
		{/if}
	  </Pagination>

	<Button outline color="secondary" on:click="{pop}"> Atrás</Button>
	<Button block outline on:click={deleteSchoolDropouts} color="danger">  Eliminar todo </Button>
</main>
