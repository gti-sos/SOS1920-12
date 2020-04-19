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
	
	</script>

<main>

	{#await overdose_deaths}
		Loading overdose deaths...
	{:then overdose_deaths}
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
						<td><input bind:value="{newOverdoseDeath.country}"></td>
						<td><input bind:value="{newOverdoseDeath.year}"></td>
						<td><input bind:value="{newOverdoseDeath.death_male}"></td>
						<td><input bind:value="{newOverdoseDeath.death_female}"></td>
						<td><input bind:value="{newOverdoseDeath.death_total}"></td>
						<td><input bind:value="{newOverdoseDeath.mean_age}"></td>
						<td><Button color= "primary" outline on:click={insertOverdoseDeath}>Insert</Button></td>
					</tr>
				{#each overdose_deaths as overdose_death}
					<tr>
						<td>{overdose_death.country}</td>
						<td>{overdose_death.year}</td>
						<td>{overdose_death.death_male}</td>
						<td>{overdose_death.death_female}</td>
						<td>{overdose_death.death_total}</td>
						<td>{overdose_death.mean_age}</td>
						<td><Button color="danger" outline>Delete</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
</main>
