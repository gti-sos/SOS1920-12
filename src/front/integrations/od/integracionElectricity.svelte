<script>
    import { onMount } from "svelte";


    onMount(loadEjemplo);

    async function loadEjemplo(){
        const resData = await fetch("/proxyLifeExpectancy");
        const MyData = await resData.json();  
        console.log(MyData);
    }
</script>


<main>
    vaya integracion mas guapa
</main>