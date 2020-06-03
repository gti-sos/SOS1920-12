<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    onMount(loadCovid19);

    async function loadCovid19(){
        var pais;
        var odDeaths;
        var confirmados;
        var fallecidos;
        var recuperados;

        const resData1 = await fetch("https://covid-19-data.p.rapidapi.com/country?format=json&name=germany", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key": "15f4056b92mshce2e627ff99101dp16fe2ajsn4bc9dff05513"
            }
        })
        const covidData1 = await resData1.json(); 
        const miApi1 = await fetch("/api/v3/overdose-deaths?country=Germany&year=2017");
        const myData1 = await miApi1.json(); 

        console.log(myData1);
        console.log(covidData1);
        pais = myData1[0].country;
        odDeaths = myData1[0].death_total;
        confirmados = covidData1[0].confirmed;
        recuperados = covidData1[0].recovered;
        fallecidos = covidData1[0].deaths;
        console.log(odDeaths);
        
        
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Coronavirus y sobredosis'
            },
            subtitle: {
                text: 'Source: COVID-19data'
            },
            xAxis: {
                categories: [pais
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Numero de casos'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.0f} casos</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Fallecimientos por sobredosis en 2017',
                data: [odDeaths]

            }, {
                name: 'Casos de coronavirus confirmados',
                data: [confirmados]

            }, {
                name: 'Casos de coronavirus recuperados',
                data: [recuperados]

            }, {
                name: 'Fallecimientos por coronavirus',
                data: [fallecidos]

            }]
        });

};

</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           Un grafico basico que compara los fallecimientos por sobredosis registrados en 2017 del pais indicado y los ultimos datos obtenidos sobre coronavirus de ese mismo pais.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>