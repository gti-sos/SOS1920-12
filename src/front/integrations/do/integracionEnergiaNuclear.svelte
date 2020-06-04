<script>
    import { onMount } from "svelte";
    import chart from "chart.js";


    onMount(async () => {renderChart});
    
    async function renderChart(){

        let DatosInternos=[];
        let labelInterno = "Delitos relacionados con el cannabis";
        let DatosExternos=[];
        let labelExterno = "Consumo de petroleo";
        let Paises=['Belgium','Romania','United Kingdom','Austria','Spain'];

        const resdDataInt = await fetch("/api/v1/drug_offences?year=2017");
        const intData = await resdDataInt.json();  

        const resDataExt = await fetch("https://sos1920-09.herokuapp.com/api/v2/oil-coal-nuclear-energy-consumption-stats/?year=2017");
        const extData = await resDataExt.json();  

        intData.forEach((v) => {
            if(Paises.includes(v.country)){
        DatosInternos.push((v.cannabis_offences)/1000);
        }});
//      console.log(intData)
//     console.log(DatosInternos)


        let oilconsumption = Array.from(new Set(extData.filter((d => d.year == 2017)&&(d=>Paises.includes(d.country))).map((d) => {return d["oil-consumption"];})));
        console.log(oilconsumption)
//     console.log(oilconsumption)
//      cambiar la v
//    extData.forEach((v) => {
//        if(Paises.includes(v.country)){
//    DatosExternos.push(v.oil-consumption)
//    }});

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
                        data: oilconsumption
                    }
                ]
            },
            options: {}
        });
    }
    renderChart();

</script>

<canvas id="myChart"></canvas>
