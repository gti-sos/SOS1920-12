<script>

//Falta hacer que los datos sean dinámicos y arreglar la duplicidad de los datos

import{ onMount } from 'svelte';
let mounted = false;
onMount( () =>{
 
 
  mounted = true;

  loadgraph();
});

async function loadgraph(){

  let MyData = [];

  const resdata = await fetch("/api/v1/drug_offences?year=2015");

  MyData = await resdata.json();

  if(mounted){
     console.log("Graph");
    Highcharts.chart('container', {
  chart: {
    type: 'spline',
    scrollablePlotArea: {
      minWidth: 600,
      scrollPositionX: 1
    }
  },
  title: {
    text: 'Comparativa de denuncias por delitos relacionados con el cannabis entre Croacia y Austria',
    align: 'left'
  },
  subtitle: {
    text: '',
    align: 'left'
  },
  xAxis: {
    type: 'date',
    labels: {
      overflow: 'justify'
    }
  },
  yAxis: {
    title: {
      text: 'Drug Offences'
    },
    minorGridLineWidth: 0,
    gridLineWidth: 0,
    alternateGridColor: null,

    plotBands: [{ // Light air
      from: 0,
      to: 1000,
      color: 'rgba(68, 170, 213, 0.1)',
      label: {
        text: '',
        style: {
          color: '#606060'
        }
      }
    }, { // Light breeze
      from: 1000,
      to: 10000,
      color: 'rgba(0, 0, 0, 0)',
      label: {
        text: '',
        style: {
          color: '#606060'
        }
      }
    }, { // Gentle breeze
      from: 10000,
      to: 25000,
      color: 'rgba(68, 170, 213, 0.1)',
      label: {
        text: '',
        style: {
          color: '#606060'
        }
      }
    }, { // Moderate breeze
      from: 25000,
      to: 90000,
      color: 'rgba(0, 0, 0, 0)',
      label: {
        text: '',
        style: {
          color: '#606060'
        }
      }
    }, { // Fresh breeze
      from: 90000,
      to: 15000,
      color: 'rgba(68, 170, 213, 0.1)',
      label: {
        text: '',
        style: {
          color: '#606060'
        }
      }
    }]
  },
  tooltip: {
    valueSuffix: ' Denuncias'
  },
  plotOptions: {
    spline: {
      lineWidth: 4,
      states: {
        hover: {
          lineWidth: 5
        }
      },
      marker: {
        enabled: false
      },
      pointInterval: 31536000, // one year 
      pointStart: 2014
    }
  },
  series: [{
    name: 'Croatia',
    data: [
      11715, 10156, 11715, 14217]

  } ,{
    name: 'Austria',
    data: [
     6705,7086,7372,8861]
     }
  ],
  navigation: {
    menuItemStyle: {
      fontSize: '10px'
    }
  }
});
  }


};


</script>

<svelte:head>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" onload="{loadgraph}"></script>

</svelte:head>

<main>
<figure class="highcharts-figure">
<div id="container">
<p class="highcharts-description">
WOLOLOOOO
</p>
</div>

</figure>
</main>