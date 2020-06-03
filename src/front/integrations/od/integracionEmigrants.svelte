<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    onMount(loadEjemplo);
    
    async function loadEjemplo(){

        var myDataTransMen={
            name: 'Hombres fallecidos por sobredosis en Italia',
            data: []
        };
        var myDataTransWomen={
            name: 'Mujeres fallecidas por sobredosis en Italia',
            data: []
        };
        var extDataTransMen={
            name: 'Numero de hombres que emigraron en Italia',
            data: []
        };
        var extDataTransWomen={
            name: 'Numero de mujeres que emigraron en Italia',
            data: []
        };

        var allData =[];

        const resData = await fetch("/api/v3/overdose-deaths?country=Italy");
        const MyData = await resData.json();  

        const res2Data = await fetch("https://sos1920-01.herokuapp.com/api/v2/emigrants-stats?country=italy");
        const extData = await res2Data.json();  
        console.log(extData);

        MyData.forEach((v) => {
        myDataTransMen['data'].push(
            {name:v.year,
            value: v.death_male
            }
            );
        myDataTransWomen['data'].push(
            {name:v.year,
            value: v.death_female
            }
            );
        });

        extData.forEach((v) => {
        extDataTransMen['data'].push(
            {name: v.year,
            value: v.em_man
            }
            );
        extDataTransWomen['data'].push(
            {name: v.year,
            value: v.em_woman
            }
            );
        });
        

        allData.push(myDataTransMen,myDataTransWomen,extDataTransMen,extDataTransMen);

        Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Emigraciones y fallecimientos por sobredosis en Italia'
        },
        tooltip: {
            useHTML: true
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '70%',
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
                        value: 0
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
            Gráfica que muestra los datos de numeros de emigrantes y muertes por sobredosis durante los últimos años en Italia. Estos datos estan divididos en hombres y mujeres. 
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
    

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