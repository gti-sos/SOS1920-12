// -------------------------------------OVERDOSE-DEATHS API-------------------------------------
module.exports = function (app) {
	console.log("Registering overdose-deaths API...");
	const dataStore = require("nedb");
	const path = require("path");
	const BASE_API_URL = "/api/v1";
	
	const dbFileName = path.join(__dirname,"overdoseDeaths.db");
	
	const db = new dataStore({
		filename : dbFileName, 
		autoload : true
});
	
var overdose_deaths = [];

var initialOverdose_deaths = [
	{
		country: "Austria",
		year: 2017,
		death_male: 125,
		death_female: 29,
		death_total: 154,
		mean_age: 36.7
	},
	{
		country: "Croatia",
		year: 2016,
		death_male: 44,
		death_female: 12,
		death_total: 56,
		mean_age: 37.1
	},
	{
		country: "Germany",
		year: 2015,
		death_male: 1001,
		death_female: 191,
		death_total: 1226,
		mean_age: 38.1
	},
	{
		country: "Italy",
		year: 2017,
		death_male: 253,
		death_female: 41,
		death_total: 294,
		mean_age: 39.4
	}
];


// load initial overdose-deaths

app.get(BASE_API_URL + "/overdose-deaths/loadInitialData", (request, response) => {
	
	/*
	CAMBIAR CODIGO PARA QUE HAGA LO MISMO PERO CON LA BASE DE DATOS
	if (overdose_deaths.length >= 1) {
		response.sendStatus(409, "CONFLICT(this action would remove the existing data)");
	}
	else {
		overdose_deaths = initialOverdose_deaths;
		response.send(JSON.stringify(overdose_deaths, null, 2));
		}
		*/
	console.log("New GET .../loadInitialData");
	db.insert(initialOverdose_deaths);
	response.sendStatus(200);
	console.log("Initial Overdose-deaths loaded"+JSON.stringify(initialOverdose_deaths, null, 2));
	
	
});

//POST overdose-deaths
app.post(BASE_API_URL + "/overdose-deaths", (request, response) => {
 
	var newOverdoseDeaths = request.body;

	if ((newOverdoseDeaths == null) || (newOverdoseDeaths.country == null) || (newOverdoseDeaths.year == null) || (newOverdoseDeaths.death_total == null)) {
		response.sendStatus(400, "BAD REQUEST(data provided not correctly)");
	}
	else {
		overdose_deaths.push(newOverdoseDeaths);
		response.sendStatus(201, "CREATED");
	}
	

});

//GET overdose-deaths
app.get(BASE_API_URL + "/overdose-deaths", (request, response) => {
	
	/* IGUAL, ADAPTAR CODIGO
	if (overdose_deaths.length < 1) {
		response.sendStatus(400, "BAD REQUEST(data is empty)");
	} else {
		response.send(JSON.stringify(overdose_deaths, null, 2));
	}
	*/
	
	console.log("New GET .../overdose-deaths");
	//err y deaths son el error que devuelve y el array con las muertes que satisfacen la query 
	db.find({}, (err,deaths) =>{
		
		//Si no queremos enseñar el id de cada objeto en la base de datos:
		deaths.forEach( (c) =>{
			delete c._id;
			});	
		
	response.send(JSON.stringify(deaths, null, 2));
	console.log("Data sent:"+JSON.stringify(deaths, null, 2));
	});
	
});

//PUT overdose-deaths
app.put(BASE_API_URL + "/overdose-deaths", (request, response) => {
	response.sendStatus(405, "METHOD NOT ALLOWED")
});

//DELETE overdose-deaths
app.delete(BASE_API_URL + "/overdose-deaths", (request, response) => {
	overdose_deaths = [];
	response.sendStatus(200, "OK");
});

//POST overdose-deaths/XXX
app.post(BASE_API_URL + "/overdose-deaths/:country", (request, response) => {
	response.sendStatus(405, "METHOD NOT ALLOWED")
});

//GET overdose-deaths/XXX
app.get(BASE_API_URL + "/overdose-deaths/:country", (request, response) => {

	var country = request.params.country;
	var filteredOverdose_deaths = overdose_deaths.filter((c) => {
		return (c.country == country);
	});

	if (filteredOverdose_deaths.length >= 1) {
		response.send(filteredOverdose_deaths[0]);
	} else {
		response.sendStatus(404, "NOT FOUND");
	}
});

//PUT overdose-deaths/XXX
app.put(BASE_API_URL + "/overdose-deaths/:country/:year", (request, response) => {
	var country = request.params.country;
	var year = request.params.year;

	var newOverdoseDeaths = request.body;

	if (country != newOverdoseDeaths.country || year != newOverdoseDeaths.year) {
		response.sendStatus(400, "BAD REQUEST(data does not match)");
	} else {
		var filteredOverdose_deaths = overdose_deaths.filter((c) => {
			return (!((c.country == country) && (c.year == year)));
		});
		overdose_deaths = filteredOverdose_deaths;
		overdose_deaths.push(newOverdoseDeaths);
		response.sendStatus(200, "OK");
	}
});

//DELETE overdose-deaths/XXX
app.delete(BASE_API_URL + "/overdose-deaths/:country/:year", (request, response) => {
	var country = request.params.country;
	var year = request.params.year;

	var filteredOverdose_deaths = overdose_deaths.filter((c) => {
		return (!((c.country == country) && (c.year == year)));
	});

	if (filteredOverdose_deaths.length < overdose_deaths.length) {
		overdose_deaths = filteredOverdose_deaths;
		response.sendStatus(200, "OK");
	} else {
		response.sendStatus(404, "NOT FOUND");
	}

});

}
// -------------------------------------END-OVERDOSE-DEATHS API-------------------------------------