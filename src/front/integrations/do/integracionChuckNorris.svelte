<script>
    import { onMount } from "svelte";
    import chart from "chart.js";


    onMount(async () => {renderChart});
    
    async function renderChart(){

        let DatosInternos=[];
        let labelInterno = "";
        let Paises=[];

        const resdDataInt = await fetch("/api/v1/drug_offences?year=2017");
        const intData = await resdDataInt.json();  
        console.log(intData)

// api externa:


        const chisterandomjson = await fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
	            "x-rapidapi-key": "dc25779935mshdcfd03590081056p1ba35fjsn8f7c2d9eae2a"
            }
        });
        console.log(chisterandomjson)
        const extData = await chisterandomjson.json(); 
        const varDef = extData.value;
        
        
       console.log(extData)
       console.log(varDef)
       
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
                    text: varDef
                }
            }
        });
    }
    renderChart();

</script>

<canvas id="myChart"></canvas>
