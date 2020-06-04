<script>
    import { onMount } from "svelte";
    import chart from "chart.js";


    onMount(async () => {renderChart});
    
    async function renderChart(){

        let numeroExtra = 0;
        let DatosInternos=[];
        let labelInterno = "Delitos relacionados con el cannabis";
        let DatosExternos=[];
        let labelExterno = "Accidentes en el pais";
        let Paises = [];
        const resdDataInt = await fetch("/api/v1/drug_offences?year=2017");
        const intData = await resdDataInt.json();  

        const resDataExt = await fetch("https://sos1920-21.herokuapp.com/api/v2/traffic-injuries");
        const extData = await resDataExt.json();  

        intData.forEach((v) => {
            Paises.push(v.country);
            DatosInternos.push((v.cannabis_offences));
        });

//      cambiar la v
    extData.forEach((v) => {
        numeroExtra = numeroExtra + v.accident
        });
    DatosExternos.push(numeroExtra)
    console.log(DatosExternos)
    console.log(Paises)

        var ctx = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(ctx, {
            type:"bar",
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
