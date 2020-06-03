<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    onMount(loadEjemplo);
    
    async function loadEjemplo(){

        var myDataTrans={
            name: 'Fallecimientos por sobredosis en Portugal',
            data: []
        };
        var extDataTrans={
            name: 'Calidad de vida total en Portugal ',
            data: []
        };

        var allData =[];

        const resData = await fetch("/api/v3/overdose-deaths?country=Portugal");
        const MyData = await resData.json();  

        const res2Data = await fetch("https://sos1920-27.herokuapp.com/api/v2/lq-stats?country=portugal");
        const extData = await res2Data.json();  

        MyData.forEach((v) => {
        myDataTrans['data'].push(
            {name:v.country + " "+ v.year,
            value: v.death_total
            }
            );
        });
        extData.forEach((v) => {
        extDataTrans['data'].push(
            {name: v.country + " "+ v.year,
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
            text: 'Calidad de vida y fallecidos por sobredosis'
        },
        tooltip: {
            useHTML: true
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '100%',
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
            Gráfica sobre datos de Portugal de diferentes años de los fallecidos por sobredosis  y la puntuación de calidad de vida total en el país.
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