<script>
async function loadGraph(){

    //Data> [{ id: 'Germany', name: 'Germany',color: '#EC9800'}, {name: 'Men',parent: 'Germany',value: death_male}]
    var DataStacked = [];
    var contador = 0;
    var numeroDePaises = 0;
    var colors= [];

    const resData = await fetch("/api/v2/overdose-deaths?year=2016");
    const MyData = await resData.json();  
    
    MyData.sort(GetSortOrder("death_total"));

    console.log(MyData);

    numeroDePaises = MyData.length;
    colors = generarColores(numeroDePaises,95,45);

    MyData.forEach((v) => {
        DataStacked.push(
            {id:v.country,
            name:v.country,
            color:colors[contador]},
            {name:'Hombres',
            parent:v.country,
            value: v.death_male},
            {name:'Mujeres',
            parent:v.country,
            value: v.death_female}
            );

        contador++;
    });
    
    console.log(DataStacked);
    
     Highcharts.chart('container', {
        series: [{
            type: "treemap",
            layoutAlgorithm: 'stripes',
            alternateStartingDirection: true,
            levels: [{
                level: 1,
                layoutAlgorithm: 'sliceAndDice',
                dataLabels: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'top',
                    style: {
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }
                }
            }],
            data: DataStacked
        }],
        title: {
            text: 'Fallecimientos por sobredosis en 2016'
        }
    });
}

function rand(min, max) {
    return min + Math.random() * (max - min);
}

function generarColores(cantidad,saturacion,luminosidad){
    var s = saturacion;
    var l = luminosidad;
    var colores = [];
    var huedelta = Math.trunc(360/cantidad);

    for (var i=0;i<cantidad;i++){
        var hue = i* huedelta;
        colores.push('hsl(' + hue + ',' + s + '%,' + l + '%)');
    }
    return colores;
}
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    


</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Esta gráfica muestra los países europeos en los que hubieron mayor número de fallecimientos por sobredosis en el año 2016. 
            
        </p>
        
    </figure>
   
</main>
