<script>
    import { onMount } from "svelte";
    import chart from "chart.js";


    onMount(async () => {renderChart});
    
    async function renderChart(){

        let counter = 0;
        let numeroExtra = 0;
        let DatosInternos=[];
        let labelInterno = "";
        let DatosExternos=[0];
        let labelExterno = "Como esta grafica no tiene sentido pero hay que enseñar algo esto es la suma de todo forest area en España";
        let Paises = [];
        Paises.push("italy");
        const resdDataInt = await fetch("/api/v1/drug_offences?year=2016");
        const intData = await resdDataInt.json();  

        const resDataExt = await fetch("http://sos1920-23.herokuapp.com/api/v2/fires-stats");
        const extData = await resDataExt.json();  

        intData.forEach((v) => {
            Paises.push(v.country);
            DatosInternos.push((v.cannabis_offences));
        });

//      cambiar la v
    extData.forEach((v) => {
        numeroExtra = numeroExtra + v.total_fire
        });
    Paises.forEach((v)=>{
        DatosExternos.push(0);
        if(!v=="Spain"){
            counter = counter +1;
        }
    })
    console.log(counter);

    DatosExternos[counter+1]=numeroExtra;
    
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
