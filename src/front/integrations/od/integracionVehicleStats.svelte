<script>
    import { onMount } from "svelte";


    onMount(loadEjemplo);
    
    async function loadEjemplo(){

        var myDataTrans={
            name: 'Fallecimientos por sobredosis en 2016 en Noruega',
            data: []
        };
        var extDataTrans={
            name: 'Ventas acumuladas de coches electricos en 2018',
            data: []
        };

        var allData =[];

        const resData = await fetch("/api/v3/overdose-deaths?country=Norway&year=2016");
        const MyData = await resData.json();  

        const res2Data = await fetch("https://sos1920-09.herokuapp.com/api/v3/plugin-vehicles-stats?country=Norway");
        const extData = await res2Data.json();  
        console.log(extData)

        MyData.forEach((v) => {
        myDataTrans['data'].push(
            {name:v.country,
            value: v.death_total
            }
            );
        });
        extData.forEach((v) => {
        extDataTrans['data'].push(
            {name: v.country,
            value: v["pev-stock"]
            });
        });
        

        allData.push(myDataTrans,extDataTrans);

        Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Coches electricos y muertes por sobredosis en Noruega'
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
            La gráfica muestra datos de Noruega: las ventas acumuladas de coches eléctricos en 2018 y el número de muertes por sobredosis en 2016.
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