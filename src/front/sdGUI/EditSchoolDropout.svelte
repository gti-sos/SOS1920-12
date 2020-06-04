<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte"; 
    import Button from "sveltestrap/src/Button.svelte";
    
    export let params = {};

    let school_dropout = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedDropoutTotal = 0;
    let updatedDropoutMasculine = 0;
    let updatedDropoutFemenine = 0;
	
	let okayMsg = "";
	let errorMsg = "";

	

    onMount(getSchoolDropout);
	async function getSchoolDropout(){
	
		console.log("Fetching school dropouts...");
		//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda (para la iteración ...) solo después de completar cada solicitud.
		const res = await fetch("/api/v2/school-dropouts/"+params.country+"/"+params.year);
		if(res.ok){
			console.log("OK");
			const json = await res.json();
            school_dropout = json;

            updatedCountry = school_dropout.country;
            updatedYear = school_dropout.year;
            updatedDropoutTotal = school_dropout.sd_all;
            updatedDropoutMasculine = school_dropout.sd_mas;
            updatedDropoutFemenine = school_dropout.sd_fem;

			console.log("Received school dropouts." );
		}
		else if(res.status==404){
            errorMsg = "La entrada que está buscando no existe";
			console.log("ERROR" + res.status + ": " + res.statusText);
		}
    }
    async function updateSchoolDropout(){
		if(confirm("¿Está seguro de que desea actualizar esta entrada?")){
			console.log("Updating school dropouts..." + params.country +" "+params.year);
			const res = await fetch("/api/v2/school-dropouts/"+ params.country +"/"+params.year,{
				method:"PUT",
				body:JSON.stringify({
					country: params.country,
					year: parseInt(params.year),
					sd_all: updatedDropoutTotal,
					sd_mas: updatedDropoutMasculine,
					sd_fem: updatedDropoutFemenine
				}),
				headers:{
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				if(res.ok){
					getSchoolDropout();
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

	<h3> Editar entrada: Abandonos escolares en  <strong>{params.country}</strong> en el año <strong>{params.year}</strong></h3>
	{#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
		
	{/if}
	{#if okayMsg}
	<p style="color: green">OK: {okayMsg}</p>
	{/if}
    {#await school_dropout}
		Loading school dropout...
	{:then school_dropout}
		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Abandonos Totales</th>
					<th>Abandonos Masculinos</th>
					<th>Abandonos Femeninos</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody> 
					<tr>
						<td>{updatedCountry}</td>
						<td>{updatedYear}</td>
						<td><input type="number" step="0.1" placeholder="10" min=0 bind:value="{updatedDropoutTotal}"></td>
						<td><input type="number" step="0.1" placeholder="10" min=0 bind:value="{updatedDropoutMasculine}"></td>
						<td><input type="number" step="0.1" placeholder="10" min=0 bind:value="{updatedDropoutFemenine}"></td>
						<td><Button outline color= "warning"  on:click={updateSchoolDropout}>Actualizar</Button></td>
					</tr>
			</tbody>
		</Table>
    {/await}

    <button outline color="secondary" on:click="{pop}"> Atrás</button>
</main>