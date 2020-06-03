<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";

// Generales
  let Paises = []
  let DelitosCannabis = []
  let FallecimientosSobredosis = []
  let TasaAbandonoEscolar = []

// Especificas
  let DenunciasTraficoDrogas = []
  let DenunciasConsumoDrogas = []
  let FallecimientosHombres = []
  let FallecimientosMujeres = []
  let TasaAbandonoEscolarHombres = []
  let TasaAbandonoEscolarMujeres = []

  onMount(async () => {renderChart});
  async function renderChart() {
      
    const resdDataDrugs = await fetch("/api/v1/drug_offences?year=2015");
    const DrugsData = await resdDataDrugs.json();

    const resDataOverdose = await fetch("/api/v3/overdose-deaths?year=2015");
    const OverdoseData = await resDataOverdose.json();
    
    const resDataDropouts = await fetch("/api/v1/school-dropouts?year=2015");
    const DropoutsData = await resDataDropouts.json();

//    const resDataDropouts ;
//    const DropoutsData ; 
    
    DrugsData.forEach( (v) => {
        Paises.push(v.country);
        DelitosCannabis.push((v.cannabis_offences)/1000);
        DenunciasConsumoDrogas.push(v.offences_use);
        DenunciasTraficoDrogas.push(v.offences_supply);
    });
    OverdoseData.forEach((v)=>{
      if (Paises.includes(v.pais)) {
      } else {
        Paises.push(v.country);
      }
        FallecimientosSobredosis.push(v.death_total);
        FallecimientosHombres.push(v.death_male);
        FallecimientosMujeres.push(v.death_female);
    });
    DropoutsData.forEach((v)=>{
      if(Paises.includes(v.pais)){

      } else{
        Paises.push(v.country);
      }
      TasaAbandonoEscolar.push((v.sd_all)*35000);
      TasaAbandonoEscolarHombres.push((v.sd_mas)*35000);
      TasaAbandonoEscolarMujeres.push((v.sd_fem)*35000);
    });

    console.log(Paises)
    console.log(DelitosCannabis)
    console.log(FallecimientosSobredosis)
    console.log(TasaAbandonoEscolar)


    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels:  Paises // ["Austria", "Portugal", "Belgium", "Spain", "Croatia"]
        ,
        datasets: [
          {
            label: "Delitos relacionados con las drogas",
            backgroundColor:'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
            borderColor: "rgb(255, 99, 132)",
            data: DelitosCannabis              // [7086, 5140, 6460, 14546, 1620]
          },
          {
              label:"Numero de denuncias por tráfico de drogas",
              backgroundColor:'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
              borderColor: "0000FF",
              data: DenunciasTraficoDrogas  // quiero meter algun dato mas
          },{
              label:"Numero de denuncias por consumo de drogas",
              backgroundColor:'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
              borderColor: "rgb(255, 99, 132)",
              data: DenunciasConsumoDrogas           // hehehehe
          },{
            
            label: "Fallecimientos totales por sobredosis",
            backgroundColor:'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
            borderColor: "rgb(255, 99, 132)",
            data: FallecimientosSobredosis              // [7086, 5140, 6460, 14546, 1620]
          },{
            label: "Fallecimientos por sobredosis en hombres",
            data: FallecimientosHombres,
            backgroundColor:'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
            },{
              label:"Mujeres fallecidas por sobredosis",
              data: FallecimientosMujeres,
              backgroundColor:'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
            },{
              label:"Tasa de abandono escolar generalizada",
              data: TasaAbandonoEscolar,
              backgroundColor:'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
            },{
              label: "Tasa de abandono escolar de Hombres",
              data: TasaAbandonoEscolarHombres,
              backgroundColor:'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
            },{
              label:"Tasa de abandono escolar de Mujeres",
              data: TasaAbandonoEscolarMujeres,
              backgroundColor:'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
            }
        ]
      },
      options: {}
    });
  }
  renderChart();
</script>

<canvas id="myChart"></canvas>