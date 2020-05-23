<script>
  //HECHO CON PLOTLY
  
  async function loadGraph(){

    const resData = await fetch("/api/v2/overdose-deaths");
    const MyData = await resData.json();  
    console.log(MyData);
    var deathsPerYear = {};
    var x = [];
    var y = [];

    MyData.forEach((v) => {

        if(v.year in deathsPerYear){
          deathsPerYear[v.year] += v.death_total
        }
        else{
          deathsPerYear[v.year]= v.death_total;
        }
    });

    for( var key in deathsPerYear){
      x.push(key);
      y.push(deathsPerYear[key]);
     
    }
    var trace1 = {
        y: y,
        x: x,
        name: "deaths",
        mode: 'lines+markers',
        marker: {
          color: '#5e24ff',
          size: 16  
        },
        line: {
          color: '#5e24ff',
          width: 9
        }
      }
    

    var data = [trace1];
    var layout = { title:'Muertes por sobredosis en toda Europa registradas en los ultimos años'};
  
    Plotly.newPlot('myDiv', data, layout)

  }
  
  
  </script>
  
  <svelte:head>
      <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
  </svelte:head>
  <main>
    <body>
      <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
    </body>
      
     
  </main>
  