<script>

import{ onMount } from 'svelte';

onMount(loadGraph);

async function loadGraph(){
  var DataStacked = [];
  var Paises = [];
  var CannabisOffence=[]
  var DatoEspaña = [];
  var DatoAlemania = [];

  const resdData = await fetch("/api/v1/drug_offences?year=2015");
  const MyData = await resdData.json();

  MyData.forEach((v)=>{

    if(v.country=='Spain'){
      DatoEspaña.push(v.cannabis_offences);
    }else if(v.country=='Germany'){
      DatoAlemania.push(v.cannabis_offences);
    }
    })


  console.log(Paises);
  console.log(CannabisOffence);
  

Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Comparativa entre España y Alemania en el año 2015 de delitos relacionados con el cannabis'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Porcentaje de personas detenidas por el cannabis',
        colorByPoint: true,
        data:
        [{
            name: 'Spain',
            y: DatoEspaña[0],
            sliced: true,
            selected: true
        },{
          
          name: 'Germany',
            y: DatoAlemania[0],
            sliced: true,
            selected: true
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

</main>


