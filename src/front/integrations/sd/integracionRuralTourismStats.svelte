<script>
    import { onMount } from "svelte";

    onMount(loadGraph);
    
async function loadGraph(){

    var DataStacked = [];
    var sevillaData = [];
    var almeriaData = [];
    var cadizData = [];
    var cordobaData = [];
    var JaenData = [];
    var malagaData = [];
    var huelvaData = [];
    var granadaData = [];

    const resData = await fetch("/proxyRuralTourism?year=2016");
    const MyData = await resData.json();  
    
    MyData.forEach((c) =>{
        if(c.province == 'sevilla'){
            sevillaData.push(c.traveller);
        }else if(c.province == 'almeria'){
            almeriaData.push(c.traveller);
        }else if(c.province == 'cadiz'){
            cadizData.push(c.traveller);
        }else if(c.province == 'cordoba'){
            cordobaData.push(c.traveller);
        }else if(c.province == 'jaen'){
            JaenData.push(c.traveller);
        }else if(c.province == 'malaga'){
            malagaData.push(c.traveller);
        }else if(c.province == 'huelva'){
            huelvaData.push(c.traveller);
        }else if(c.province == 'granada'){
            granadaData.push(c.traveller);
        }
    })

    console.log(MyData);
    
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Turismo rural de las provincias de Andalucía. 2016'
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
            text: 'Turistas'
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
            name: 'Turistas en el año 2016',
            colorByPoint: true,
            data: [
                {
                    name: 'Sevilla',
                    y: sevillaData[0]
                },
                {
                    name: 'Almeria',
                    y: almeriaData[0]
                },
                {
                    name: 'Cádiz',
                    y: cadizData[0]
                },
                {
                    name: 'Huelva',
                    y: huelvaData[0]
                },
                {
                    name: 'Granada',
                    y: granadaData[0]
                },
                {
                    name: 'Córdoba',
                    y: cordobaData[0]
                },
                {
                    name: 'Málaga',
                    y: malagaData[0]
                },
                {
                    name: 'Jaen',
                    y: JaenData[0]
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