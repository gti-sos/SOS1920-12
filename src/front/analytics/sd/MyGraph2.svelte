<!-- Gráfica de AwesomeChart (Utilizando morris.js)-->

<script type="text/javascript">
import Button from "sveltestrap/src/Button.svelte";
import { pop } from "svelte-spa-router";
async function loadGraph(){
 
    let datos = [];
    let dropouts = [];
    var dic = [];
    const resData = await fetch("/api/v2/school-dropouts");
    const json = await resData.json();

    json.forEach( (v) => {
        dic.push({
            label: v.year,
            value: v.sd_all
        })
    });
    console.log(dic);

	new Morris.Donut({
  
  element: 'AwesomeChart',
  
  data: dic
  
});
}
</script>

<svelte:head>
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js" on:load="{loadGraph}"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
</svelte:head>

<div id="AwesomeChart" style="height: 250px;"></div>

<p></p>
<h1 
	style="
		text-align: center
		  "

		>Esta gráfica ha sido diseñada con Morris.js</h1>