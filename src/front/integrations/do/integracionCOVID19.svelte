<script>
    import { onMount } from "svelte";
    import chart from "chart.js";


    onMount(async () => {renderChart});
    
    async function renderChart(){

        let DatosInternos=[];
        let labelInterno = "Delitos relacionados con el cannabis";
        let DatosExternos=[];
        let labelExterno = "Casos de covid por pais";
        let Paises=[];

        const resdDataInt = await fetch("/api/v1/drug_offences?year=2017");
        const intData = await resdDataInt.json();  
        console.log(intData)

        const resDataExt = await fetch("https://coronavirus-19-api.herokuapp.com/countries");
        const extData = await resDataExt.json();  

        console.log(extData)
        intData.forEach((v) => {
            Paises.push(v.country);
        DatosInternos.push((v.cannabis_offences));
        });

console.log(DatosInternos)

//      cambiar la v
   extData.forEach((v) => {
       if(Paises.includes(v.country)){

   DatosExternos.push(v.cases)
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
