<script>
    import { onMount } from "svelte";

    onMount(loadGraph);
    
async function loadGraph(){

    var DataStacked = [];
    var spainData = [];
    var germanyData = [];
    var italyData = [];
    var franceData = [];
    var netherlandsData = [];

    const resData = await fetch("/api/v3/school-dropouts?year=2018");
    const MyData = await resData.json();  
    
    MyData.forEach((c) =>{
        if(c.country == 'Spain'){
            spainData.push(c.sd_all);
        }else if(c.country == 'France'){
            franceData.push(c.sd_all);
        }else if(c.country == 'Germany'){
            germanyData.push(c.sd_all);
        }else if(c.country == 'Italy'){
            italyData.push(c.sd_all);
        }else if(c.country == 'Netherlands'){
            netherlandsData.push(c.sd_all);
        }
    })

    console.log(MyData);
    
Highcharts.chart('container', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: 'Comparativa de abandonos escolares en Europa en el año 2018'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: 100,
            depth: 45
        }
        },
        series: [{
            type: 'pie',
            name: 'Porcentaje de abandono escolar en los jóvenes en el año 2018',
            data: [
                {
                    name: 'Spain',
                    y: spainData[0],
                    sliced: true,
                    selected: true
                },
                {
                    name: 'Germany',
                    y: germanyData[0],
                    sliced: true,
                    selected: true
                },
                {
                    name: 'Italy',
                    y: italyData[0],
                    sliced: true,
                    selected: true
                },
                {
                    name: 'France',
                    y: franceData[0],
                    sliced: true,
                    selected: true
                },
                {
                    name: 'Netherlands',
                    y: netherlandsData[0],
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