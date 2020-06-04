<script>
    import { onMount } from "svelte";

    onMount(loadGraph);
    
async function loadGraph(){

   
    var ghibliFilms={};
    var producerFilms = [];
    const resData = await fetch("https://ghibliapi.herokuapp.com/films");
    const myData = await resData.json();  
    
    myData.forEach((v) =>{
         if(v.producer in ghibliFilms){
                ghibliFilms[v.producer] += 1;
            }
            else{
                ghibliFilms[v.producer]= 1;
            }
        });
    
    for (var key in ghibliFilms){
        producerFilms.push([key,ghibliFilms[key]]);
    }
    
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Productores de películas de Ghibli'
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
            text: 'Número de películas'
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
            name: 'Número de películas de Ghibli',
            colorByPoint: true,
            data: producerFilms
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