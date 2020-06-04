<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    onMount(loadGraph);
    
async function loadGraph(){

   
    var cards={};
    var cardTypes = [];
    const resData = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
    const myData = await resData.json();  

    console.log(myData);
    
    myData.data.forEach((v) =>{
         if(v.type in cards){
                cards[v.type] += 1;
            }
            else{
                cards[v.type]= 1;
            }
        });
    
    for (var key in cards){
        cardTypes.push([key,cards[key]]);
    }
    
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Tipos de cartas de Yu Gi Oh'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Número de cartas'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
    },
        series: [{
            name: 'Número de cartas',
            colorByPoint: true,
            data: cardTypes
        }]
    });
}
</script>

<main>
  <figure class="highcharts-figure">
  <div id ="container"></div>
  <p class="highcharts-description">
  </p>
  </figure>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>