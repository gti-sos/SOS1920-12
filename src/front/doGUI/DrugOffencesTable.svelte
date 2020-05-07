<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import {Alert} from 'sveltestrap';
	import { pop } from "svelte-spa-router";

	let drug_offences = [];
	let newDrugOffence = {
			country: "",
			year: "",
			cannabis_offences:"" ,
            offences_use: "",
			offences_supply: ""
    }
    	//Variables de paginacion
	let limit = 10;
	let offset = 0;
	let moreOffences = true;
	let currentPage=1; // No la utilizamos pero nos sirve para saber en que pagina estamos (quizas en un futuro)
	
	//Estas variables son para las busquedas
	let searchCountry= "";
	let searchYear = "";

	//Estas variables son para los errores
	let okayMsg = "";
    let errorMsg = "";
    
    onMount(getDrugOffences);

    async function loadDrugOffences(){
        console.log("Fetching  drug offences...");
		const res = await fetch("/api/v1/drug_offences/loadInitData").then(function(res){
        if (res.ok) {
            console.log("OK");
            okayMsg= "Datos cargados correctamente.";
            getDrugOffences;

        } else if(res.status==409) {
            errorMsg="Ya hay datos cargados, si desea volver a cargarlos deberá primero eliminarlos a través de otra función. Gracias";
            console.log("ALREADY LOADED DATA")
            
        }else{
            Console.log("ERROR");
        }
        });
    }


	async function getDrugOffences(){
	
		console.log("Fetching drug offences...");
		var url = "/api/v1/drug_offences?limit="+limit+"&offset="+(offset*limit);
		var urlAfter = "/api/v1/drug_offences?limit="+limit+"&offset="+(limit*(offset+1));
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
			drug_offences = json;
			if(jsonAfter.length ==0){
				moreOffences=false;
			}
			else{
				moreOffences=true;
			}
			console.log("Received "+ drug_offences.length +" drug offences." );
		}
		else{
			console.log("ERROR");
			errorMsg= "Fallo del servidor en la solicitud"
		}
			
		
	}

async function insertDrugOffence(){

	console.log("Inserting Drug offences...");
		if (newOverdoseDeath.country == "" || newOverdoseDeath.country == null || newOverdoseDeath.year == "" || newOverdoseDeath.year == null) {
		alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
		}
		else{
			const res = await fetch("/api/v1/drug_offences",{

			})
		}
}

	async function deleteDrugOffences() {
		console.log("Deleting drug offences...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all drug offences...");
			const res = await fetch("/api/v1/drug_offences/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
					getDrugOffences();
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
	
	async function deleteDrugOffence(country,year) {
		console.log("Deleting drug offence...");
		if(confirm("¿Está seguro de que desea eliminar esta entrada?")){
			console.log("Deleting drug offence...");
			const res = await fetch("/api/v1/drug_offences/" + country + "/"+year,{
				method:"DELETE"
			}).then(function (res) {
				if(res.ok){
					getDrugOffences();
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
		async function searchOffence(country,year){
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
		getDrugOffences();
	}

</script>

<main>
	{#await drug_offences}
		Loading drug offences...
	{:then drug_offences}

	<form class="form-inline">
	<label for="country" class="mb-2 mr-sm-2">Búsqueda por País: </label>
	<Input type="text" class="form-control mb-2 mr-sm-2" id="country" placeholder="Introduzca un país" name="country" bind:value="{searchCountry}"/>
	<Label for="year" class="mb-2 mr-sm-2">y Año:</Label>
	<Input type="number" class="form-control mb-2 mr-sm-2" id="year" placeholder="Introduzca un año" name="year" bind:value="{searchYear}"/>   
	</form>
	<Button class="button-search" on:click="{getDrugOffences}">Buscar Datos</Button>

	<Button outline Color= "primary" on:click="{loadDrugOffences}">Cargar Datos</Button>
	{#if errorMsg}
	<p style="color: red">ERROR: {errorMsg}</p>
	{/if}
		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Delitos relacionados con el Cannabis</th>
					<th>Delitos relacionados con el uso</th>
					<th>Delitos relacionados con el tráfico</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><Input type="text" placeholder="País" bind:value="{newDrugOffence.country}"/></td>
					<td><Input type="number" placeholder="XxXxX" bind:value="{newDrugOffence.year}"/></td>
					<td><Input type="number" placeholder="XxXxX" bind:value="{newDrugOffence.cannabis_offences}"/></td>
					<td><Input type="number" placeholder="XxXxX" bind:value="{newDrugOffence.offences_use}"/></td>
					<td><Input type="number" placeholder="XxXxX" bind:value="{newDrugOffence.offences_supply}"/></td>
				</tr>
			{#each drug_offences as drug_offence}
				<tr>
					<td>
					<a href = "#/drug_offences/{drug_offence.country}/{drug_offence.year}">{deleteDrugOffence.country}</a>
					</td>
					<td>{drug_offence.year}</td>
					<td>{drug_offence.cannabis_offences}</td>
					<td>{drug_offence.offences_use}</td>
					<td>{drug_offence.offences_supply}</td>
					<td><Button outline color="danget" on:click="{deleteDrugOffence(drug_offence.country,drug_offences.year)}">Eliminar</Button></td>
				</tr>
			{/each}
			</tbody>
		</Table>
		{/await}
		<Pagination ariaLabel ="Web Pagination">
		<PaginationItem class="{currentPage===1? 'disabled' : ''}">
			<PaginationLink previous href="#/drug_offences" on:click="{() =>changePage(-1)}" />
		</PaginationItem>
		{#if moreOffences}
		<PaginationItem>
			<PaginationLink next href="#/drug_offences" on:click="{() => changePage(1)}"/>
		</PaginationItem>
		{/if}
		</Pagination>
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
	<Button block outline on:click="{deleteDrugOffences}" color="danger"> Eliminar Todos los datos</Button>
</main>