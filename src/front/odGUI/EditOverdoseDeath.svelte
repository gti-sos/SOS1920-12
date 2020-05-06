<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte"; 
    import Button from "sveltestrap/src/Button.svelte";
    
    export let params = {};

    let overdose_death = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedDeathTotal = 0;
    let updatedDeathMale = 0;
    let updatedDeathFemale = 0;
	let updatedMeanAge = 0.0;
	
	let okayMsg = "";
	let errorMsg = "";

	

    onMount(getOverdoseDeath);
	async function getOverdoseDeath(){
	
		console.log("Fetching overdose deaths...");
		//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda (para la iteración ...) solo después de completar cada solicitud.
		const res = await fetch("/api/v2/overdose-deaths/"+params.country+"/"+params.year);
		if(res.ok){
			console.log("OK");
			const json = await res.json();
            overdose_death = json;

            updatedCountry = overdose_death.country;
            updatedYear = overdose_death.year;
            updatedDeathTotal = overdose_death.death_total;
            updatedDeathMale = overdose_death.death_male;
            updatedDeathFemale = overdose_death.death_female;
            updatedMeanAge = overdose_death.mean_age;

			console.log("Received overdose deaths." );
		}
		else if(res.status==404){
            errorMsg = "La entrada que está buscando no existe";
			console.log("ERROR" + res.status + ": " + res.statusText);
		}
    }
    async function updateOverdoseDeath(){
		if(confirm("¿Está seguro de que desea actualizar esta entrada?")){
			console.log("Updating overdose death..." + params.country +" "+params.year);
			const res = await fetch("/api/v2/overdose-deaths/"+ params.country +"/"+params.year,{
				method:"PUT",
				body:JSON.stringify({
					country: params.country,
					year: parseInt(params.year),
					death_male: updatedDeathMale,
					death_female: updatedDeathFemale,
					death_total: updatedDeathTotal,
					mean_age: updatedMeanAge
				}),
				headers:{
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				if(res.ok){
					getOverdoseDeath();
					okayMsg="Entrada actualizada!";
				}
				else if(res.status == 400){
					errorMsg = "La entrada que está actualizando no existe";
				}
			});	
		}
    }
</script>
<main>

	<h3> Editar entrada: fallecimientos por sobredosis en  <strong>{params.country}</strong> en el año <strong>{params.year}</strong></h3>
	{#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
		
	{/if}
	{#if okayMsg}
	<p style="color: green">OK: {okayMsg}</p>
	{/if}
    {#await overdose_death}
		Loading overdose death...
	{:then overdose_death}
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
						<td>{updatedCountry}</td>
						<td>{updatedYear}</td>
						<td><input type="number" placeholder="20" min=0 bind:value="{updatedDeathMale}"></td>
						<td><input type="number" placeholder="10" min=0 bind:value="{updatedDeathFemale}"></td>
						<td><input type="number" placeholder="30" min=0 bind:value="{updatedDeathTotal}"></td>
						<td><input type="number" placeholder="20.5" min=0 step=0.1 bind:value="{updatedMeanAge}"></td>
						<td><Button outline color= "warning"  on:click={updateOverdoseDeath}>Actualizar</Button></td>
					</tr>
			</tbody>
		</Table>
    {/await}

    <button outline color="secondary" on:click="{pop}"> Atrás</button>
</main>