<script>
    import { onMount } from "svelte";
    import chart from "chart.js";

    onMount(async () => {renderChart});
    
    async function renderChart(){

        let DatosInternos=[];
        let labelInterno = "Delitos relacionados con el cannabis";
        let Paises=[];

        const resdDataInt = await fetch("/api/v1/drug_offences?year=2017");
        const intData = await resdDataInt.json();  
        console.log(intData)

// api externa:


        const extfetch = await fetch("http://api.ipify.org/?format=json");
        const ipaddr = await extfetch.json();
        var ipfin = ipaddr.ip;
        console.log(ipfin)
        
       
        intData.forEach((v) => {
            Paises.push(v.country);
        DatosInternos.push((v.cannabis_offences)/1000);
        });

console.log(DatosInternos)


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
                    }
                ]
            },
            options: {
                title:{
                    display: true,
                    text: ipfin
                }
            }
        });
    }
    renderChart();

</script>

<canvas id="myChart"></canvas>
