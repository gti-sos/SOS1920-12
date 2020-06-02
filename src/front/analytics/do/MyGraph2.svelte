<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";

  let Paises = []
  let DelitosSuministro = []
  let DelitosConsumo = []

  onMount(async () => {renderChart});
  async function renderChart() {
      
    const resdData = await fetch("/api/v1/drug_offences?year=2015");
    const MyData = await resdData.json();
    console.log(MyData);

    MyData.forEach( (v) => {
        Paises.push(v.country);
        DelitosConsumo.push((v.offences_use)/10);
        DelitosSuministro.push(v.offences_supply);
    });
    console.log(Paises)
    console.log(DelitosSuministro)
    console.log(DelitosConsumo)

 

    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "radar",
      data: {
        labels:  Paises, // ["Austria", "Portugal", "Belgium", "Spain", "Croatia"]
        datasets: [
          {
            label: "Supply related drug offences",
            backgroundColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
            borderColor: "rgb(255, 99, 132)",
            data: DelitosSuministro              // [7086, 5140, 6460, 14546, 1620]
          },
          {
              label:"Consume related drug offences divided by 10",
              backgroundColor:"rgb(240, 16, 53)",
              borderColor: "rgb(255, 99, 132)",
              data: DelitosConsumo // [20456, 14315, 28237, 317041, 4268]
          }
        ]
      },
      options: {}
    });
  }
  renderChart();
</script>

<canvas id="myChart"></canvas>