<script>

import{ onMount } from 'svelte';

onMount(loadGraph);

async function loadGraph(){
  var DataStacked = [];
  var Paises = [];

  const resdData = await fetch("/api/v1/drug_offences?year=2015");
  const MyData = await resdData.json();

  console.log(MyData);

  MyData.forEach((v)=>{
    DataStacked.push(
      {name:v.country, y: v.cannabis_offences}
    );
    })

  console.log(DataStacked);
  
  Highcharts.chart('container', {
    
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Drug Offences in the year 2015 in the EU'
    },
    tooltip: {
      pointFormat:'{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accesibility: {
        pint:{valueSuffix:'%'}
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels:{
              enabled:false
            },
            showInLegend: true
        }
    },
    Series: [{
        name: 'Paises',
        colorByPoint: true,
      data: MyData
    }]
    
});
}
</script>


<main>
  <figure class="highcharts-figure">
  <div id ="container"></div>
  <p class="highcharts-description">
    Esta gráfica muestra los países europeos con el
    mayor numero de delitos relacionados con el cannabis
  </p>
  </figure>

</main>