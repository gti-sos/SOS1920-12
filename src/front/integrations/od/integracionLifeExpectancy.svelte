<script>
    import { onMount } from "svelte";


    onMount(loadEjemplo);
    
    async function loadEjemplo(){

        var myDataMen={
            name: 'Edad media de hombres fallecidos por sobredosis en años',
            data: []
        };
        var myDataWomen={
            name: 'Edad media de mujeres fallecidas por sobredosis en años',
            data: []
        };
        var extDataMen={
            name: 'Esperanza de vida de hombres en años',
            data: []
        };
        var extDataWomen={
            name: 'Esperanza de vida de mujeres en años',
            data: []
        };

        var allData =[];

        const resData = await fetch("/api/v3/overdose-deaths");
        const MyData = await resData.json();  

        const res2Data = await fetch("https://sos1920-05.herokuapp.com/api/v1/life_expectancies");
        const extData = await res2Data.json();  

        MyData.forEach((v) => {
            myDataMen['data'].push(
                {name:v.country +" " + v.year,
                value: v.death_male
                });
            myDataWomen['data'].push(
                {name:v.country +" " + v.year,
                value: v.death_female
                });
        });
        extData.forEach((v) => {
            extDataMen['data'].push(
                {name: v.country +" " + v.year,
                value: v.men_life_expectancy
                });
            extDataWomen['data'].push(
                {name: v.country +" " + v.year,
                value: v.women_life_expectancy
                });
        });
        

        allData.push(myDataMen,myDataWomen,extDataMen,extDataWomen);

        Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Fallecidos por sobredosis y esperanza de vida en hombres y mujeres'
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
                        value: 80
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
            Esta grafica muestra la edad media la esperanza de vida y edad media de fallecimientos por sobredosis divididos en hombres y mujeres.
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