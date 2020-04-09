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

	console.log("New GET .../loadInitialData");
	var overdose_deaths = db.getAllData();

	if (overdose_deaths.length >= 1) {
		res.sendStatus(409, "CONFLICT(this action would remove the existing data)");
		console.log("There is already loaded data");
	}else{
		db.insert(initialOverdose_deaths);
		res.sendStatus(200);
		console.log("Initial overdose-deaths data loaded"+JSON.stringify(initialOverdose_deaths, null, 2));
	}
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
 
	var newOverdoseDeaths = req.body;

	if ((newOverdoseDeaths == null) || (newOverdoseDeaths.country == null) || (newOverdoseDeaths.year == null) || (newOverdoseDeaths.death_total == null)) {
		res.sendStatus(400, "BAD REQUEST(data not correctly provided )");
	}
	else {
		db.insert(newOverdoseDeaths);
		res.sendStatus(201, "CREATED");
		console.log("Data input:"+JSON.stringify(newOverdoseDeaths, null, 2));
	}
});

//PUT overdose-deaths
app.put(BASE_API_URL + "/overdose-deaths", (req, res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED")
});

//DELETE overdose-deaths
app.delete(BASE_API_URL + "/overdose-deaths", (req, res) => {
	db.remove({}, { multi: true }, function (err, numRemoved) {
	});
	res.sendStatus(200, "OK");
});

//GET overdose-deaths/:country
app.get(BASE_API_URL + "/overdose-deaths/:country", (req, res) => {

	var country = req.params.country;
	var query = {"country":country};

	db.find(query).exec((err,overdose_deaths) => {
		if (overdose_deaths.length >= 1) {
			delete overdose_deaths[0]._id;
			res.send(JSON.stringify(overdose_deaths[0], null, 2));
			console.log("Data sent:"+JSON.stringify(overdose_deaths[0], null, 2));
		} else {
			res.sendStatus(404, "NOT FOUND");
		}
	});
});
//---------------------------------------------------------------------------ME HE QUEDADO AQUI---------------------------------------------------------------------------------
//CONSEGUIR BUENOS CONSOLE LOGS
//CONSEGUIR QUE CADA PETICION LO PUEDA HACER DE AL MENOS DOS PARAMETROS, COUNTRY Y YEAR



//GET overdose-deaths/:country/:year
app.get(BASE_API_URL + "/overdose-deaths/:country/:year", (req, res) => {

	var country = req.params.country;
	var year = req.params.year;
	var query = {"country":country, "year":parseInt(year)};

	db.find(query).exec((err,overdose_deaths) => {
		if (overdose_deaths.length >= 1) {
			delete overdose_deaths[0]._id;
			res.send(JSON.stringify(overdose_deaths[0], null, 2));
			console.log("Data sent:"+JSON.stringify(overdose_deaths[0], null, 2));
		} else {
			res.sendStatus(404, "NOT FOUND");
		}
	});
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