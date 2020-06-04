<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    onMount(loadGraph);
    
async function loadGraph(){

    var DataStacked = [];
    var spainData = [];
    var germanyData = [];
    var italyData = [];
    var franceData = [];
    var unitedKingdomData = [];

    const resData = await fetch("https://sos1920-25.herokuapp.com/api/v2/countries_for_equality_stats?year=2019");
    const MyData = await resData.json();  
    
    MyData.forEach((c) =>{
        if(c.country == 'spain'){
            spainData.push(c.global_peace_index);
        }else if(c.country == 'france'){
            franceData.push(c.global_peace_index);
        }else if(c.country == 'germany'){
            germanyData.push(c.global_peace_index);
        }else if(c.country == 'italy'){
            italyData.push(c.global_peace_index);
        }else if(c.country == 'united_kingdom'){
            unitedKingdomData.push(c.global_peace_index);
        }
    })

    console.log(MyData);
    
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Indice de paz mundial por País principal de la UE. Año 2019'
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
            text: 'Indice de paz mundial'
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
                format: '{point.y:.1f}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
    },
        series: [{
            name: 'Índice de paz mundial en el año 2019',
            colorByPoint: true,
            data: [
                {
                    name: 'Spain',
                    y: spainData[0]
                },
                {
                    name: 'Germany',
                    y: germanyData[0]
                },
                {
                    name: 'Italy',
                    y: italyData[0]
                },
                {
                    name: 'France',
                    y: franceData[0]
                },
                {
                    name: 'United Kingdom',
                    y: unitedKingdomData[0]
                }]
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