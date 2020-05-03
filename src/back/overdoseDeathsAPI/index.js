// -------------------------------------OVERDOSE-DEATHS API-------------------------------------
//-------TO DO: he adherido un PUT Y UN DELETE AL FINAL PARA LAS PRUEBAS DE LA ULTIMA CLASE, DEBERIA DE QUITARLOS Y CONSEGUIR QUE LOS DATOS INTRODUCIDOS POR FRONT QUE SON NUMEROS SE GUARDEN
// COMO NUMEROS Y NO COMO STRING ADEMAS DE ACTUALIZAR LOS METODOS DEL FRONTEND--------
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

	if (overdose_deaths.length < 1) {
		res.sendStatus(400, "BAD REQUEST(data is empty)");
		console.log("The requested data is empty");
	}
	else{
		res.send(JSON.stringify(overdose_deaths, null, 2));
		console.log("Data sent:"+JSON.stringify(overdose_deaths, null, 2));
	}});
	
});

//POST overdose-deaths
app.post(BASE_API_URL + "/overdose-deaths", (req, res) => {
	console.log("New POST .../overdose-deaths");
	//Aqui estaria bien conseguir que no se puedan meter parametros extras 

	var newOverdoseDeaths = req.body;

	if ((newOverdoseDeaths == null) || (newOverdoseDeaths.country == null) || (newOverdoseDeaths.year == null) || (newOverdoseDeaths.death_total == null)) {
		res.sendStatus(400, "BAD REQUEST(data not correctly provided )");
		console.log("The data wasnt correctly provided");
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
//PUT overdose-deaths/:country/:year
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
});

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
});

};
// -------------------------------------END-OVERDOSE-DEATHS API-------------------------------------