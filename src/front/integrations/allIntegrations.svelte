<script>


function myFunction() {
  var x = document.getElementById("divOverdoseDeaths");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


</script>

<main>
       <br> 
       <button on:click="{myFunction}"> Integraciones overdose-deaths (Juan Jose Requena Lama) </button>
       
       <div id="divOverdoseDeaths"  style="display:none;" class="list-group"> <br>
              <a href="#/integrations/ejemplo"  class="list-group-item list-group-item-action list-group-item-success"> Integracion con aplicacion ejemplo</a>
              <a href="#/integrations/GeoDb" class="list-group-item list-group-item-action list-group-item-success"> Integracion con GeoDb</a>
              <a href="#/integrations/Quote" class="list-group-item list-group-item-action list-group-item-success"> Integracion con Random Quotes</a>
              <a href="#/integrations/Wikihow" class="list-group-item list-group-item-action list-group-item-success"> Integracion con WikiHow</a>

              <a href="#/integrations/Formula" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con Formula (G22)</a>
              <a href="#/integrations/LifeExpectancy" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con LifeExpectancy (G05) </a>
              <a href="#/integrations/Vehicles" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con Vehicles (G04)</a>
              <a href="#/integrations/VehicleStats" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con VehicleStats (G09)</a>
              <a href="#/integrations/CyclingRoutes" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con CyclingRoutes (G02)</a>
              <a href="#/integrations/LQ" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con LQ (G27)</a>
              <a href="#/integrations/Electricity" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con Electricity (G08) </a>
              <a href="#/integrations/Emigrants" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con Emigrants (G01)</a>
              <a href="#/integrations/NotHospitalized" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con NotHospitalized (G06)</a>
              <a href="#/integrations/HappinessRate" class="list-group-item list-group-item-action list-group-item-primary"> Integracion con HappinessRate (G25)</a>
       </div>
       
       <button on:click=""> Integraciones drug-offences (Adrià León García) </button>
       <button on:click=""> Integraciones school-dropouts (Pascual Requena Lama) </button>
    
</main>
<style>

</style>