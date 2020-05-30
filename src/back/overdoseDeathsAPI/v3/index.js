// -------------------------------------OVERDOSE-DEATHS API-------------------------------------
//-------TO DO: he adherido un PUT Y UN DELETE AL FINAL PARA LAS PRUEBAS DE LA ULTIMA CLASE, DEBERIA DE QUITARLOS Y CONSEGUIR QUE LOS DATOS INTRODUCIDOS POR FRONT QUE SON NUMEROS SE GUARDEN
// COMO NUMEROS Y NO COMO STRING ADEMAS DE ACTUALIZAR LOS METODOS DEL FRONTEND--------
module.exports = function (app) {
	console.log("Registering overdose-deaths API...");
	const dataStore = require("nedb");
	const path = require("path");
	const BASE_API_URL = "/api/v3";
	const dbFileName = path.join(__dirname,"overdoseDeaths.db");
	
	const db = new dataStore({
		filename : dbFileName, 
		autoload : true
});

var initialOverdose_deaths = [
	{
		country: "Austria",
		year: 2016,
		death_male: 127,
		death_female: 38,
		death_total: 165,
		mean_age: 36.1
	},
	{
		country: "Austria",
		year: 2017,
		death_male: 125,
		death_female: 29,
		death_total: 154,
		mean_age: 36.7
	},
	{
		country: "Belgium",
		year: 2005,
		death_male: 77,
		death_female: 28,
		death_total: 105,
		mean_age: 36.2
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
		country: "Czechia",
		year: 2010,
		death_male: 49,
		death_female: 6,
		death_total: 55,
		mean_age: 32.3
	},
	{
		country: "Czechia",
		year: 2016,
		death_male: 23,
		death_female: 9,
		death_total: 32,
		mean_age: 41.2
	},
	{
		country: "Denmark",
		year: 2011,
		death_male: 219,
		death_female: 82,
		death_total: 301,
		mean_age: 44.4
	},
	{
		country: "Denmark",
		year: 2016,
		death_male: 178,
		death_female: 59,
		death_total: 237,
		mean_age: 47
	},
	{
		country: "Finland",
		year: 2009,
		death_male: 130,
		death_female: 45,
		death_total: 175,
		mean_age: 38.7
	},
	{
		country: "Finland",
		year: 2016,
		death_male: 152,
		death_female: 42,
		death_total: 194,
		mean_age: 38.6
	},
	{
		country: "France",
		year: 2010,
		death_male: 44,
		death_female: 12,
		death_total: 392,
		mean_age: 37.1
	},
	{
		country: "France",
		year: 2011,
		death_male: 249,
		death_female: 91,
		death_total: 340,
		mean_age: 45.7
	},
	{
		country: "France",
		year: 2012,
		death_male: 186,
		death_female: 78,
		death_total: 264,
		mean_age: 44.8
	},
	{
		country: "Germany",
		year: 2013,
		death_male: 797,
		death_female: 161,
		death_total: 1002,
		mean_age: 38
	},
	{
		country: "Germany",
		year: 2014,
		death_male: 845,
		death_female: 153,
		death_total: 1032,
		mean_age: 38
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
		country: "Germany",
		year: 2016,
		death_male: 1075,
		death_female: 205,
		death_total: 1333,
		mean_age: 38.3
	},
	{
		country: "Germany",
		year: 2017,
		death_male: 952,
		death_female: 173,
		death_total: 1272,
		mean_age: 38.9
	},
	{
		country: "Hungary",
		year: 2004,
		death_male: 28,
		death_female: 6,
		death_total: 34,
		mean_age: 30.1
	},
	{
		country: "Hungary",
		year: 2016,
		death_male: 26,
		death_female: 3,
		death_total: 29,
		mean_age: 35.8
	},
	{
		country: "Ireland",
		year: 2011,
		death_male: 178,
		death_female: 49,
		death_total: 227,
		mean_age: 36.4
	},
	{
		country: "Italy",
		year: 2013,
		death_male: 313,
		death_female: 36,
		death_total: 349,
		mean_age: 38.2
	},
	{
		country: "Italy",
		year: 2014,
		death_male: 294,
		death_female: 19,
		death_total: 313,
		mean_age: 39.7
	},
	{
		country: "Italy",
		year: 2015,
		death_male: 266,
		death_female: 42,
		death_total: 308,
		mean_age: 39.2
	},
	{
		country: "Italy",
		year: 2016,
		death_male: 241,
		death_female: 27,
		death_total: 268,
		mean_age: 40.1
	},
	{
		country: "Italy",
		year: 2017,
		death_male: 253,
		death_female: 41,
		death_total: 294,
		mean_age: 39.4
	},
	{
		country: "Latvia",
		year: 2016,
		death_male: 11,
		death_female: 7,
		death_total: 18,
		mean_age: 33.7
	},
	{
		country: "Latvia",
		year: 2017,
		death_male: 20,
		death_female: 2,
		death_total: 22,
		mean_age: 35.9
	},
	{
		country: "Netherlands",
		year: 2015,
		death_male: 145,
		death_female: 52,
		death_total: 197,
		mean_age: 42.8
	},
	{
		country: "Netherlands",
		year: 2016,
		death_male: 182,
		death_female: 53,
		death_total: 235,
		mean_age: 41.5
	},
	{
		country: "Norway",
		year: 2013,
		death_male: 179,
		death_female: 55,
		death_total: 234,
		mean_age: 41
	},
	{
		country: "Norway",
		year: 2014,
		death_male: 202,
		death_female: 64,
		death_total: 266,
		mean_age: 42.6
	},
	{
		country: "Norway",
		year: 2015,
		death_male: 206,
		death_female: 83,
		death_total: 289,
		mean_age: 42.7
	},
	{
		country: "Norway",
		year: 2016,
		death_male: 196,
		death_female: 86,
		death_total: 282,
		mean_age: 44
	},
	{
		country: "Poland",
		year: 2016,
		death_male: 147,
		death_female: 57,
		death_total: 204,
		mean_age: 39.4
	},
	{
		country: "Portugal",
		year: 2013,
		death_male: 24,
		death_female: 4,
		death_total: 28,
		mean_age: 42
	},
	{
		country: "Portugal",
		year: 2014,
		death_male: 33,
		death_female: 4,
		death_total: 37,
		mean_age: 42
	},
	{
		country: "Portugal",
		year: 2015,
		death_male: 43,
		death_female: 11,
		death_total: 54,
		mean_age: 44.8
	},
	{
		country: "Portugal",
		year: 2016,
		death_male: 24,
		death_female: 6,
		death_total: 30,
		mean_age: 42.5
	},
	{
		country: "Slovakia",
		year: 2014,
		death_male: 11,
		death_female: 2,
		death_total: 13,
		mean_age: 39.2
	},
	{
		country: "Slovakia",
		year: 2016,
		death_male: 14,
		death_female: 6,
		death_total: 20,
		mean_age: 45.1
	},
	{
		country: "Slovenia",
		year: 2016,
		death_male: 35,
		death_female: 5	,
		death_total: 40,
		mean_age: 37.1
	},
	{
		country: "Slovenia",
		year: 2017,
		death_male: 37,
		death_female: 10,
		death_total: 47,
		mean_age: 40.5
	},
	{
		country: "Turkey",
		year: 2016,
		death_male: 876,
		death_female: 44,
		death_total: 920,
		mean_age: 31
	},
	{
		country: "Turkey",
		year: 2017,
		death_male: 909,
		death_female: 32,
		death_total: 941,
		mean_age: 32
	},
	{
		country: "United_Kingdom",
		year: 2013,
		death_male: 1869,
		death_female: 660,
		death_total: 2529,
		mean_age: 41.5	
	},
	{
		country: "United_Kingdom",
		year: 2014,
		death_male: 1993,
		death_female: 724,
		death_total: 2717,
		mean_age: 41.6
	},
	{
		country: "United_Kingdom",
		year: 2015,
		death_male: 2313,
		death_female: 827,
		death_total: 3140,
		mean_age: 42.1
	},
	{
		country: "United_Kingdom",
		year: 2016,
		death_male: 2318,
		death_female: 938,
		death_total: 3256,
		mean_age: 42.2
	},
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
		res.send(JSON.stringify(initialOverdose_deaths, null, 2));
		console.log("Initial overdose-deaths data loaded"+JSON.stringify(initialOverdose_deaths, null, 2));
	}
});

//GET overdose-deaths
app.get(BASE_API_URL + "/overdose-deaths", (req, res) => {
	
	console.log("New GET .../overdose-deaths");
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

	//err y overdose_deaths son: el error que devuelve y el array con las muertes que satisfacen la query 
	// por otra parte, .skip nos consigue el offset deseado y .limit pues lo mismo pero con el limit

	db.find(query).skip(offset).limit(limit).exec((err,overdose_deaths) => {
		//Si no queremos enseñar el id de cada objeto en la base de datos:
		overdose_deaths.forEach( (c) =>{
			delete c._id;
		});	

	/* ESTO NO NOS SIRVE MUCHO EN EL FRONT,DA MAS PROBLEMAS QUE LOS QUE QUITA
	if (overdose_deaths.length < 1) {
		res.sendStatus(400, "BAD REQUEST(data is empty)");
		console.log("The requested data is empty");
	}
	else{
		res.send(JSON.stringify(overdose_deaths, null, 2));
		console.log("Data sent:"+JSON.stringify(overdose_deaths, null, 2));
	}});
	si queremos ponerlo como antes tenemos que quitar esto de abajo*/
		res.send(JSON.stringify(overdose_deaths, null, 2));
		console.log("Data sent:"+JSON.stringify(overdose_deaths, null, 2));
	});
});

//POST overdose-deaths
app.post(BASE_API_URL + "/overdose-deaths", (req, res) => {
	console.log("New POST .../overdose-deaths");
	//Aqui estaria bien conseguir que no se puedan meter parametros extras 
	var country = req.body.country;
	var year =req.body.year;

	var newOverdoseDeaths = req.body;
	

	db.find({"country":country, "year":year}).exec((err,overdose_deaths) => {
		if(overdose_deaths.length >0) {
			console.log
			res.sendStatus(409, "There is already a data with that country and year in the database");
			console.log("There is already a data with that country and year in the database");
		} 
		else if((newOverdoseDeaths == null) || (newOverdoseDeaths.country == null) || (newOverdoseDeaths.year == null) || (newOverdoseDeaths.death_total == null)) {
			res.sendStatus(400, "BAD REQUEST(data not correctly provided )");
			console.log("The data wasnt correctly provided");
		}
		else {
			db.insert(newOverdoseDeaths);
			res.sendStatus(201, "CREATED");
			console.log("Data input:"+JSON.stringify(newOverdoseDeaths, null, 2));
		}
	});	
});

//PUT overdose-deaths
app.put(BASE_API_URL + "/overdose-deaths", (req, res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED")
});

//DELETE overdose-deaths
app.delete(BASE_API_URL + "/overdose-deaths", (req, res) => {
	console.log("New DELETE .../overdose-deaths");

	db.remove({}, { multi: true }, function (err, numRemoved) {
	});
	res.sendStatus(200, "OK");
	console.log("Data successfully removed");
});

//GET overdose-deaths/:country
app.get(BASE_API_URL + "/overdose-deaths/:country", (req, res) => {
	console.log("New GET .../overdose-deaths/:country");

	//Podriamos hacer que este codigo tambien valiese para un GET overdose-deaths/:year pero para ayer tendriamos que mirar si en la query 
	//se ha introducido un numero o un string y a partir de ahi realizar la query introducida

	var country = req.params.country;
	var query = {"country":country};

	db.find(query).exec((err,overdose_deaths) => {
		if (overdose_deaths.length >= 1) {
			delete overdose_deaths[0]._id;
			res.send(JSON.stringify(overdose_deaths[0], null, 2));
			console.log("Data sent:"+JSON.stringify(overdose_deaths[0], null, 2));
		} else {
			res.sendStatus(404, "NOT FOUND");
			console.log("The data requested is empty");
		}
	});
});

//GET overdose-deaths/:country/:year
app.get(BASE_API_URL + "/overdose-deaths/:country/:year", (req, res) => {
	console.log("New GET .../overdose-deaths/:country/:year");

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
			console.log("The data requested is empty");
		}
	});
});

//POST overdose-deaths/:param
app.post(BASE_API_URL + "/overdose-deaths/:param", (req, res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

//POST overdose-deaths/:param1/:param2
app.post(BASE_API_URL + "/overdose-deaths/:param1/:param2", (req, res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

//PUT overdose-deaths/:country/:year
app.put(BASE_API_URL + "/overdose-deaths/:country/:year", (req, res) => {
	console.log("New PUT .../overdose-deaths/:country/:year");

	var country = req.params.country;
	var year = req.params.year;
	var newOverdoseDeaths = req.body;
	var query = {"country":country, "year":parseInt(year)};

	if (country != newOverdoseDeaths.country || year != newOverdoseDeaths.year) {
		res.sendStatus(400, "BAD REQUEST(data does not match)");
		console.log("Data does not match");
	} else {
		db.update(query,newOverdoseDeaths,(err,numReplaced) =>{
			if(numReplaced == 0){
				res.sendStatus(400, "BAD REQUEST(there is no such data in the database)");
				console.log("There is no such data in the database");

			}
			else{
				res.sendStatus(200, "OK");
				console.log("Database updated");
			}
		});
	}
});
//ADHERIDO EN LA ULTIMA CLASE
//PUT overdose-deaths/:country
/*
app.put(BASE_API_URL + "/overdose-deaths/:country", (req, res) => {
	console.log("New PUT .../overdose-deaths/:country");

	var country = req.params.country;
	var newOverdoseDeaths = req.body;
	var query = {"country":country};

	if (country != newOverdoseDeaths.country) {
		res.sendStatus(400, "BAD REQUEST(data does not match)");
		console.log("Data does not match");
	} else {
		db.update(query,newOverdoseDeaths,(err,numReplaced) =>{
			if(numReplaced == 0){
				res.sendStatus(400, "BAD REQUEST(there is no such data in the database)");
				console.log("There is no such data in the database");

			}
			else{
				res.sendStatus(200, "OK");
				console.log("Database updated");
			}
		});
	}
}); */

//DELETE overdose-deaths/:country/:year
app.delete(BASE_API_URL + "/overdose-deaths/:country/:year", (req, res) => {
	console.log("New DELETE .../overdose-deaths/:country/:year");

	var country = req.params.country;
	var year = req.params.year;
	var query = {"country":country, "year":parseInt(year)};

	db.remove(query, {multi:true}, (err, numRemoved) =>{
		if(numRemoved == 0){
			res.sendStatus(404, "NOT FOUND");
			console.log("There is no such data in the database");
		}
		else{
			res.sendStatus(200, "OK");
			console.log("Object removed");
		}
	});
});
//ADHERIDO EN LA ULTIMA CLASE
//DELETE overdose-deaths/:country
/*
app.delete(BASE_API_URL + "/overdose-deaths/:country", (req, res) => {
	console.log("New DELETE .../overdose-deaths/:country");

	var country = req.params.country;
	var query = {"country":country};

	db.remove(query, {multi:true}, (err, numRemoved) =>{
		if(numRemoved == 0){
			res.sendStatus(404, "NOT FOUND");
			console.log("There is no such data in the database");
		}
		else{
			res.sendStatus(200, "OK");
			console.log("Object removed");
		}
	});
}); */

};
// -------------------------------------END-OVERDOSE-DEATHS API-------------------------------------