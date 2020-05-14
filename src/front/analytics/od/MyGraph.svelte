<script>

async function loadGraph(){

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}
    //Data> [{ id: 'Germany', name: 'Germany',color: '#EC9800'}, {name: 'Men',parent: 'Germany',value: death_male}]
    let MyData =[];

    const resData = await fetch("/api/v2/overdose-deaths?year=2016");
    MyData = await resData.json();
    let DataStacked = [];
    MyData.forEach((v) => {
        DataStacked.push(
            {id:v.country,
            name:v.country,
            color:random_rgba()},
            {name:'Hombres',
            parent:v.country,
            value: v.death_male},
            {name:'Mujeres',
            parent:v.country,
            value: v.death_female}
            );
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
