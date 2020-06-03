<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    onMount(loadDigimons);

    async function loadDigimons(){

        var proporcionDigimons={};
        const res2Data = await fetch("https://digimon-api.herokuapp.com/api/digimon");
        const extData = await res2Data.json();  
        console.log(extData);
        var clasesDigimons = [];
        extData.forEach((v) => {

            if(v.level in proporcionDigimons){
                proporcionDigimons[v.level] += 1;
            }
            else{
                proporcionDigimons[v.level]= 1;
            }
        });

        for (var key in proporcionDigimons) {
        // check if the property/key is defined in the object itself, not in parent
            clasesDigimons.push([key,proporcionDigimons[key]]);
        }

        Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Cantidad de <br>digimons<br>segun nivel',
                align: 'center',
                verticalAlign: 'middle',
                y: 100
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%'],
                    size: '110%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Cantidad en porcentaje',
                innerSize: '50%',
                data: clasesDigimons
            }]
        });
    }

</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Grafico que muestra la cantidad de digimons segun su nivel.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>
<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 2000px;
    margin: 1em auto;
}

#container {
    height: 700px;
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