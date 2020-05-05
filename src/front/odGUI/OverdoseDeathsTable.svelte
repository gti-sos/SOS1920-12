<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';

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

	onMount(getOverdoseDeaths);
	
	async function loadOverdoseDeaths(){
	
	console.log("Fetching overdose deaths...");
	//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda (para la iteración ...) solo después de completar cada solicitud.
	const res = await fetch("/api/v1/overdose-deaths/loadInitialData");
	if(res.ok){
		console.log("OK");
		const json = await res.json();
		overdose_deaths = json;
		console.log("Loaded "+ overdose_deaths.length +" overdose deaths." )
	}
	else{
		console.log("ERROR");
	}
}

	async function getOverdoseDeaths(){
	
		console.log("Fetching overdose deaths...");
		//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda (para la iteración ...) solo después de completar cada solicitud.
		const res = await fetch("/api/v1/overdose-deaths?limit="+limit+"&offset="+(offset*limit));
		//Tenemos que preguntar tambien si hay mas datos, ya que, si no los hay, pasando de pagina estariamos haciendo una peticion a la api que nos devolveria un error, un 400 BAD REQUEST
		//data is empty
		const after =  await fetch("/api/v1/overdose-deaths?limit="+limit+"&offset="+(limit*(offset+1)));

		if(res.ok){
			console.log("OK");
			const json = await res.json();
			overdose_deaths = json;
		}
		else{
			console.log("ERROR");
		}
			//Si  le damos a siguiente pagina, ¿habran elementos?
		if(after.ok){
			moreDeaths = true;
			const jsonAfter = await after.json();
		}
		else{
			moreDeaths = false;
		}
			
		console.log("Received "+ overdose_deaths.length +" overdose deaths." )
	}
	
	async function insertOverdoseDeath(){
		 
		console.log("Inserting overdose deaths...");
		//Comprobamos que el año y la fecha no estén vacíos, ojo cuidao que el string vacio no es null
		if (newOverdoseDeath.country == "" || newOverdoseDeath.country == null || newOverdoseDeath.year == "" || newOverdoseDeath.year == null) {
			alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
		}
		else{
			const res = await fetch("/api/v1/overdose-deaths",{
			method:"POST",
			body:JSON.stringify(newOverdoseDeath),
			headers:{
				"Content-Type": "application/json"
			}
			}).then(function (res) {
				getOverdoseDeaths();
			});	

		}
		
	}

	async function deleteOverdoseDeaths() {
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all overdose deaths...");
			const res = await fetch("/api/v1/overdose-deaths/", {
				method: "DELETE"
			}).then(function (res) {
				getOverdoseDeaths();
			});
		}
	}

	async function deleteOverdoseDeath(country,year) {
		if(confirm("¿Está seguro de que desea eliminar esta entrada?")){
			console.log("Deleting overdose death...");
			const res = await fetch("/api/v1/overdose-deaths/" + country + "/"+year,{
				method:"DELETE"
			}).then(function (res) {
				getOverdoseDeaths();
			});	
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
		<Button outline color= "primary"  on:click={loadOverdoseDeaths}>Cargar</Button>
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
						<td><Input type="text" placeholder="South Korea" bind:value="{newOverdoseDeath.country}"/></td>
						<td><Input type="number" placeholder="2019" min=0 bind:value="{newOverdoseDeath.year}"/></td>
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

	<Button outline on:click={deleteOverdoseDeaths} color="danger">  Eliminar todo </Button>
</main>
