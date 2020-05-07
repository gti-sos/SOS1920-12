<script>

    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte"; 
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};

    let drug_offence = {};
    let updatedCountry= "";
    let updatedYear = 0;
    let updatedCannabisOffences = 0;
    let updatedOffencesUse = 0;
    let updatedOffencesSupply = 0;

    let okayMsg = "";
    let errorMsg = "";

    onMount(getDrugOffence);
    async function getDrugOffence(){

        console.log("Fetching drug offences...");
        const res = await fetch("/api/v1/drug_offences/" + params.country+ "/" + params.year);
        if(res.ok){
            console.log("OK");
            const json = await res.json();
            drug_offence = json;

            updatedCountry = drug_offence.country;
            updatedYear = drug_offence.year;
            updatedCannabisOffences = drug_offence.cannabis_offences;
            updatedOffencesUse = drug_offence.offences_use;
            updatedOffencesSupply = drug_offence.offences_supply;

            console.log("Received drug offences.");
        }
        else if(res.status == 404){
            errorMsg = "La entrada que está buscando no existe";
            console.log("ERROR " + res.status + ": " + res.statusText);
        }
    }
    async function updateDrugOffence(){
        if(confirm("¿Está seguro de que desea actualizar esta entrada?")){
            console.log("Updating drug offence..." + params.country + " " +params.year);
            	const res = await fetch("/api/v1/drug_offences/"+ params.country +"/"+params.year,{
                method:"PUT",
                body:JSON.stringify({
                    country:params.country,
                    year:parseInt(params.year),
                    cannabis_offences: updatedCannabisOffences,
                    offences_use:updatedOffencesUse,
                    offences_supply:updatedOffencesSupply
                }),
                headers:{
                    "Content-Type": "application/json"
                }
            }).then(function(res){
                if(res.ok){
                    getDrugOffence();
                    okayMsg="Entrada actualizada";
                }
                else if(res.status = 400){
                    errorMsg = "La entrada que está actualizando no existe"
                }
            });
        }
    }
</script>

<main>

	<h3> Editar entrada: Detenciones relacionadas con estupefacientes en:  <strong>{params.country}</strong> en el año <strong>{params.year}</strong></h3>
	{#if errorMsg}
		<p style="color: red">ERROR: {errorMsg}</p>
		
	{/if}
	{#if okayMsg}
	<p style="color: green">OK: {okayMsg}</p>
	{/if}
    {#await drug_offence}
		Loading drug offences...
	{:then drug_offence}
		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Detenciones por cannabis</th>
					<th>Detenciones por uso</th>
					<th>Detenciones por Tráfico</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody> 
					<tr>
						<td>{updatedCountry}</td>
						<td>{updatedYear}</td>
						<td><input type="number" placeholder="00" min=0 bind:value="{updatedCannabisOffences}"></td>
						<td><input type="number" placeholder="00" min=0 bind:value="{updatedOffencesUse}"></td>
						<td><input type="number" placeholder="30" min=0 bind:value="{updatedOffencesSupply}"></td>
						<td><Button outline color= "warning"  on:click={updateDrugOffence}>Actualizar</Button></td>
					</tr>
			</tbody>
		</Table>
    {/await}

    <button outline color="secondary" on:click="{pop}"> Atrás</button>
</main>