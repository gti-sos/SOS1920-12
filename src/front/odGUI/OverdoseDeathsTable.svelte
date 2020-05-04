<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";

	let overdose_deaths = [];
	let newOverdoseDeath = {
		country: "",
		year: "",
		death_male:"",
		death_female:"",
		death_total:"",
		mean_age:""
	}
	onMount(getOverdoseDeaths);

	async function getOverdoseDeaths(){
	
		console.log("Fetching overdose deaths...");
		//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda (para la iteración ...) solo después de completar cada solicitud.
		const res = await fetch("/api/v1/overdose-deaths");
		if(res.ok){
			console.log("OK");
			const json = await res.json();
			overdose_deaths = json;
			console.log("Received "+ overdose_deaths.length +" overdose deaths." )
		}
		else{
			console.log("ERROR");
		}
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
	</script>

<main>

	{#await overdose_deaths}
		Loading overdose deaths...
	{:then overdose_deaths}
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
						<td><input type="text" placeholder="South Korea" bind:value="{newOverdoseDeath.country}"></td>
						<td><input type="number" placeholder="2019" min=0 bind:value="{newOverdoseDeath.year}"></td>
						<td><input type="number" placeholder="20" min=0 bind:value="{newOverdoseDeath.death_male}"></td>
						<td><input type="number" placeholder="10" min=0 bind:value="{newOverdoseDeath.death_female}"></td>
						<td><input type="number" placeholder="30" min=0 bind:value="{newOverdoseDeath.death_total}"></td>
						<td><input type="number" placeholder="20.5" min=0 step=0.1  bind:value="{newOverdoseDeath.mean_age}"></td>
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
	<Button outline on:click={deleteOverdoseDeaths} color="danger">  Eliminar todo </Button>
</main>
