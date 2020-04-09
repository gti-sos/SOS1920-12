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
	
// antes: var overdose_deaths = [];

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


// GET load initial overdose-deaths

app.get(BASE_API_URL + "/overdose-deaths/loadInitialData", (req, res) => {
	
	/*
	ANTES SIN LA BASE DE DATOS TENIA EL AVISO 409 PERO NO SE COMO PONERLO JUNTO, TAMPOCO ES MUY NECESARIO 
	NO PERMITIR QUE SE PUEDA CARGAR INFINITAMENTE LOS DATOS 

	if (overdose_deaths.length >= 1) {
		res.sendStatus(409, "CONFLICT(this action would remove the existing data)");
	}
	else {
		overdose_deaths = initialOverdose_deaths;
		res.send(JSON.stringify(overdose_deaths, null, 2));
		}
		*/

	console.log("New GET .../loadInitialData");
	db.insert(initialOverdose_deaths);
	res.sendStatus(200);
	console.log("Initial overdose-deaths loaded"+JSON.stringify(initialOverdose_deaths, null, 2));
});

//GET overdose-deaths
app.get(BASE_API_URL + "/overdose-deaths", (req, res) => {
	
	//This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.
	// For example  for /api/v1/overdose-deaths?country=Germany&year=2015 the result would be query = { country: 'Germany', year: '2015' }
	//Podemos acceder a cada valor con query.clave  e.g. query.country nos devolveria 'Germany'

	var query = req.query;

	//Obtenemos los offset y limit desde la query, si estan vacios devuelven null (NaN, aka Not a Number) y los quitamos de la query para que no nos molesten (estas no tenemos que parsearlas)
	var offset = query.offset;
	var limit = query.limit

	delete query.offset;
	delete query.limit;

	//Si la query contiene alguno de los atributos numericos, tenemos que pasar estos atributos de string a integer o double
	//Comprobamos primero que la query tiene alguno de esos atributos
	
	if(query.hasOwnProperty("year")){
		query.year = parseInt(query.year);	
	}
	if(query.hasOwnProperty("death_male")){
		query.death_male = parseInt(query.death_male);
	}
	if(query.hasOwnProperty("death_female")){
		query.death_female = parseInt(query.death_female);
	}
	if(query.hasOwnProperty("death_total")){
		query.death_total = parseInt(query.death_total);
	}
	if(query.hasOwnProperty("mean_age")){
		query.mean_age = parseFloat(query.mean_age);
	}

	console.log("New GET .../overdose-deaths");

	//err y overdose_deaths son: el error que devuelve y el array con las muertes que satisfacen la query 
	// por otra parte, .skip nos consigue el offset deseado y .limit pues lo mismo pero con el limit

	db.find(query).skip(offset).limit(limit).exec((err,overdose_deaths) => {
		//Si no queremos enseñar el id de cada objeto en la base de datos:
		overdose_deaths.forEach( (c) =>{
			delete c._id;
	});	

	if (overdose_deaths.length < 1) {
		res.sendStatus(400, "BAD REQUEST(data is empty)");}
	else{
		res.send(JSON.stringify(overdose_deaths, null, 2));
		console.log("Data sent:"+JSON.stringify(overdose_deaths, null, 2));
	}});
});

//POST overdose-deaths
app.post(BASE_API_URL + "/overdose-deaths", (req, res) => {
 
	var newOverdoseDeaths = request.body;

	if ((newOverdoseDeaths == null) || (newOverdoseDeaths.country == null) || (newOverdoseDeaths.year == null) || (newOverdoseDeaths.death_total == null)) {
		response.sendStatus(400, "BAD REQUEST(data provided not correctly)");
	}
	else {
		overdose_deaths.push(newOverdoseDeaths);
		response.sendStatus(201, "CREATED");
	}
	

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

//POST overdose-deaths/XXX
app.post(BASE_API_URL + "/overdose-deaths/:country", (request, response) => {
	response.sendStatus(405, "METHOD NOT ALLOWED")
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