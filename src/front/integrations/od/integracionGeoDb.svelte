<script>
    import { onMount } from "svelte";
    
    onMount(loadGeoDB);

    async function loadGeoDB(){
        const resData = await fetch("https://restcountries-v1.p.rapidapi.com/all", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
                "x-rapidapi-key": "15f4056b92mshce2e627ff99101dp16fe2ajsn4bc9dff05513"
            }
        })
        const miApi = await fetch("/api/v2/overdose-deaths?year=2017");
        
        const countryData = await resData.json(); 
        const myData = await miApi.json(); 

        myData.sort(GetSortOrder("mean_age"));
        console.log(myData); 

        //Estos son los 3 paises elegidos
        var theGreat3 =[myData[0]["country"],myData[1]["country"],myData[2]["country"]];
        //Son los paises que en 2017 la edad media de la poblacion que murio por sobredosis fue la menor
        var theGreat3Ages =[myData[0]["mean_age"],myData[1]["mean_age"],myData[2]["mean_age"]];
        
        var theGreat3Together=[theGreat3[0]+", Mean age: "+theGreat3Ages[0] + " years",theGreat3[1]+", Mean age: "+theGreat3Ages[1] + " years",theGreat3[2]+", Mean age: "+theGreat3Ages[2] + " years",]
        
        console.log(theGreat3);
        console.log(theGreat3Ages);

        var totalPopulation = [];
        
        for (var i=0 ; i < countryData.length ; i++)
        {
            if (countryData[i]["name"] == theGreat3[0]) {
                totalPopulation[0]=(countryData[i]["population"]);
            }
            else if(countryData[i]["name"] == theGreat3[1]) {
                totalPopulation[1]=(countryData[i]["population"]);
            }
            else if(countryData[i]["name"] == theGreat3[2]) {
                totalPopulation[2]=(countryData[i]["population"]);
            }
        }
        ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)']

        console.log(countryData);
        console.log(countryData.length);
        console.log(totalPopulation);

        var data = [{
        values: totalPopulation,
        labels: theGreat3Together,
        type: 'pie',
        textinfo: "percent",
        marker: { colors: ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)']}
}];

var layout = {
  title: "Número de habitantes en los paises que en 2017 los fallecidos por sobredosis tuvieron menor edad media" ,
  height: 600,
  width: 1400
};

Plotly.newPlot('myDiv', data, layout);
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
      <script src='https://cdn.plot.ly/plotly-latest.min.js' on:load="{loadGeoDB}"></script>
  </svelte:head>

<main>
    <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
</main>