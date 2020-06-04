<script>
    import { onMount } from "svelte";
    import chart from "chart.js";


    onMount(async () => {renderChart});
    
    async function renderChart(){

        let DatosInternos=[];
        let labelInterno = "Delitos relacionados con el cannabis /1000";
        let DatosExternos=[];
        let labelExterno = "Estadisticas de suicidios";
        let Paises = [];

        const resdDataInt = await fetch("/api/v1/drug_offences?year=2017");
        const intData = await resdDataInt.json();  

        const resDataExt = await fetch("http://sos1819-04.herokuapp.com/api/v1/suicide-rates");
        const extData = await resDataExt.json();  
        console.log(extData)

        intData.forEach((v) => {
            Paises.push(v.country);
            DatosInternos.push((v.cannabis_offences)/1000);
        });

//      cambiar la v
    extData.forEach((v) => {
        if((v.country=="hungria")){
    DatosExternos.push(v.noSuicidesMan)
    }});
    console.log(DatosExternos)

        var ctx = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(ctx, {
            type:"radar",
            data: {
                labels: Paises,
                datasets:[
                    {
                        label: labelInterno,
                        backgroundColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
                        borderColor: "rgb(255, 99, 132)",
                        data: DatosInternos
                    },{
                        label: labelExterno,
                        backgroundColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
                        borderColor: "rgb(255, 99, 132)",
                        data: DatosExternos
                    }
                ]
            },
            options: {}
        });
    }
    renderChart();

</script>

<canvas id="myChart"></canvas>
