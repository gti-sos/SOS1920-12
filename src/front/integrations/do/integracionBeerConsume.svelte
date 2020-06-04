<script>
    import { onMount } from "svelte";
    import chart from "chart.js";


    onMount(async () => {renderChart});
    
    async function renderChart(){

        let numeroExtra = 0;
        let DatosInternos=[];
        let labelInterno = "Delitos relacionados con el cannabis";
        let DatosExternos=[];
        let labelExterno = "Consumicion de cerveza por pais";
        let Paises = [];
        const resdDataInt = await fetch("/api/v1/drug_offences?year=2016");
        const intData = await resdDataInt.json();  

        const resDataExt = await fetch("https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats");
        const extData = await resDataExt.json();  

        intData.forEach((v) => {
            Paises.push(v.country);
            DatosInternos.push((v.cannabis_offences));
        });

    extData.forEach((v) => {
        if(Paises.includes(v.country) ){
            DatosExternos.push(v.countryConsumition);
        }
        });
        
    console.log(DatosExternos)
    console.log(Paises)

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
