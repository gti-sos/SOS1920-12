<script>


function displayOverdoseDeaths() {
  var x = document.getElementById("divOverdoseDeaths");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
function displayDrugOffences() {
  var x = document.getElementById("divDrugOffences");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
function displaySchoolDropouts() {
  var x = document.getElementById("divSchoolDropouts");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


</script>

<main>
       <br> 
       <button on:click="{displayOverdoseDeaths}"> Integraciones overdose-deaths (Juan Jose Requena Lama) </button>
       
       <div id="divOverdoseDeaths"  style="display:none;" class="list-group"> <br>
              <a href="#/integrations/Corona"  class="list-group-item list-group-item-action list-group-item-success"> Integracion con Covid19</a>
              <a href="#/integrations/GeoDb" class="list-group-item list-group-item-action list-group-item-success"> Integracion con GeoDb</a>
              <a href="#/integrations/Quote" class="list-group-item list-group-item-action list-group-item-success"> Integracion con Random Quotes</a>
              <a href="#/integrations/Wikihow" class="list-group-item list-group-item-action list-group-item-success"> Integracion con WikiHow</a>

              <a href="#/integrations/LifeExpectancy" class="list-group-item list-group-item-action list-group-item-warning"> Integracion con LifeExpectancy (G05) </a>
              <a href="#/integrations/Formula" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con Formula (G22)</a>
              <a href="#/integrations/Vehicles" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con Vehicles (G04)</a>
              <a href="#/integrations/VehicleStats" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con VehicleStats (G09)</a>
              <a href="#/integrations/CyclingRoutes" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con CyclingRoutes (G02)</a>
              <a href="#/integrations/LQ" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con LQ (G27)</a>
              <a href="#/integrations/Electricity" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con Electricity (G08) </a>
              <a href="#/integrations/Emigrants" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con Emigrants (G01)</a>
              <a href="#/integrations/NotHospitalized" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con NotHospitalized (G06)</a>
              <a href="#/integrations/HappinessRate" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con HappinessRate (G25)</a>
       </div>
       
       <button on:click="{displayDrugOffences}"> Integraciones drug-offences (Adrià León García) </button>

       <div id="divDrugOffences" style="display: none;" class="list-group"><br>
        <a href="#/integrations/Covid19"  class="list-group-item list-group-item-action list-group-item-success"> Integracion con Covid19 api 2</a>
        <br>
        <a href="#/integrations/EnergiaNuclear"  class="list-group-item list-group-item-action list-group-item-success"> Integracion con Energia Nuclear</a>
        <a href="#/integrations/PovertyStats"  class="list-group-item list-group-item-action list-group-item-warning"> Integracion con Estadisticas de Pobreza</a>
        <a href="#/integrations/SwimStats"  class="list-group-item list-group-item-action list-group-item-success"> Integracion con Estadisticas de Nadadores</a>
        <a href="#/integrations/FireStats"  class="list-group-item list-group-item-action list-group-item-warning"> Integracion con Estadisticas de Fuego</a>
        <a href="#/integrations/TrafficInjuries"  class="list-group-item list-group-item-action list-group-item-success"> Integracion con Estadisticas de Accidentes de trafico</a>


      </div>

       <button on:click="{displayOverdoseDeaths}"> Integraciones school-dropouts (Pascual Requena Lama) </button>
       <div id="divSchoolDropouts" style="display: none;" class="list-group"> <br>
        
      </div>


    
</main>
<style>

</style>