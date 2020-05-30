<script>
    import { onMount } from "svelte";


    onMount(loadEjemplo);
    
    async function loadEjemplo(){

        var myDataTrans={
            name: 'Fallecimientos por sobredosis en 2017',
            data: []
        };
        var extDataTrans={
            name: 'Numero total de motos en 2018',
            data: []
        };

        var allData =[];

        const resData = await fetch("/api/v3/overdose-deaths?year=2017");
        const MyData = await resData.json();  

        const res2Data = await fetch("https://sos1920-04.herokuapp.com/api/v1/vehicles?year=2018");
        const extData = await res2Data.json();  

        MyData.forEach((v) => {
        myDataTrans['data'].push(
            {name:v.country,
            value: v.death_total
            }
            );
        });
        extData.forEach((v) => {
        extDataTrans['data'].push(
            {name: v.province,
            value: v.total
            }
            );
        });
        

        allData.push(myDataTrans,extDataTrans);

        Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Motos en Andalucía y fallecidos por sobredosis'
        },
        tooltip: {
            useHTML: true
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '60%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 250
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: allData
    });
}

</script>


<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Relacion entre los fallecidos por sobredosis en 2017 en diferentes paises y la cantidad de motos en diferentes provincias de Andalucía en 2018
        </p>
    </figure>
    

</main>

<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 800px;
    margin: 1em auto;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #EBEBEB;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
</style>