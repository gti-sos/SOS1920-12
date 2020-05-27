<script>
import { onMount } from "svelte";
    
let cita;
let autor;
    onMount(loadQuote);

    async function loadQuote(){
        const resData = await fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=es", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "x-rapidapi-key": "15f4056b92mshce2e627ff99101dp16fe2ajsn4bc9dff05513"
            }
        })
        const quoteData = await resData.json(); 
        cita = quoteData["content"];
        autor = quoteData["originator"]["name"];
    }
</script>



<main>

<br>
<blockquote class="blockquote text-center">
    
    <h1 class="display-4">{cita}</h1>
    <footer class="blockquote-footer"> <cite title="Source Title">{autor}</cite></footer>
  </blockquote>

</main>