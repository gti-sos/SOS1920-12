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
			offences_supply: 
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
        console.log("loading drug offences...");
		const res = await fetch("/api/v2/drug_offences/loadInitData").then(function(res){
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
        console.log("Fetching Drug offences...");
        var url = "/api/v2/drug_offences?limit="+limit+"&offset="+(offset*limit);
		var urlAfter = "/api/v2/overdose-deaths?limit="+limit+"&offset="+(limit*(offset+1));
        }


</script>

<main>



</main>