<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte"; 
    import Button from "sveltestrap/src/Button.svelte";
    
    
    export let params = {};

    let overdose_death = {};
    let updatedCountry = "Japan";
    let updatedYear = 2014;
    let updatedDeathTotal = 2;
    let updatedDeathMale = 2;
    let updatedDeathFemale = 0;
    let updatedMeanAge = 37.5;
    let errorMsg = "";

    onMount(getOverdoseDeath);
	async function getOverdoseDeath(){
	
		console.log("Fetching overdose deaths...");
		//Awaits lo que hace es esperar la finalización de la solicitud HTTP. El código se reanuda (para la iteración ...) solo después de completar cada solicitud.
		const res = await fetch("/api/v1/overdose-deaths/"+params.country);
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
		else{
            errorMsg = res.status + ": " + res.statusText;
			console.log("ERROR" + errorMsg);
		}
    }
    async function updateOverdoseDeath(){
        console.log("Updating overdose death..." + params.country);
		const res = await fetch("/api/v1/overdose-deaths/"+ params.country,{
			method:"PUT",
			body:JSON.stringify({
                country: params.country,
                year: updatedYear,
                death_male: updatedDeathMale,
                death_female: updatedDeathFemale,
                death_total: updatedDeathTotal,
                mean_age: updatedMeanAge
            }),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(function (res) {
			getOverdoseDeath();
		});	

    }
</script>
<main>
    <h3> Edit Overdose Deaths <strong>{params.country} </strong></h3>
    {#await overdose_death}
		Loading overdose death...
	{:then overdose_death}
		<Table bordered>
			<thead>
				<tr>
					<th>Country</th>
					<th>Year</th>
					<th>Death-male</th>
					<th>Death-female</th>
					<th>Death-total</th>
					<th>Mean-age</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody> 
					<tr>
						<td>{updatedCountry}</td>
						<td>{updatedYear}</td>
						<td><input bind:value="{updatedDeathMale}"></td>
						<td><input bind:value="{updatedDeathFemale}"></td>
						<td><input bind:value="{updatedDeathTotal}"></td>
						<td><input bind:value="{updatedMeanAge}"></td>
						<td><Button outline color= "primary"  on:click={updateOverdoseDeath}>Update</Button></td>
					</tr>
			</tbody>
		</Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR:{errorMsg}</p>
    {/if}

    <button outline color="secondary" on:click="{pop}"> Back</button>
</main>