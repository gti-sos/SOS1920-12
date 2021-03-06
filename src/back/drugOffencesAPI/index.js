module.exports = function (app) {

	console.log("Registering drug_offences API...");
	const dataStore = require("nedb");
	const path = require("path");
	const BASE_API_URL = "/api/v1";
	const dbFileName = path.join(__dirname, "drugOffences.db");

	const db = new dataStore({
		filename: dbFileName,
		autoload: true
	});
	var drug_offences = [];

	var origdata_drug_offences = [
			{
			country: "Italy",
			year: 2015,
			cannabis_offences: 39763,
			offences_use: 26403,
			offences_supply:13360
		},
		{
			country: "Germany",
			year: 2015,
			cannabis_offences: 172724,
			offences_use: 132745,
			offences_supply:39979
		},
		{
			country: "Austria",
			year: 2015,
			cannabis_offences: 27542,
			offences_use: 20456,
			offences_supply:7086
		},
		{
			country: "Portugal",
			year: 2014,
			cannabis_offences: 11836,
			offences_use: 7417,
			offences_supply:4419
		},
		{
			country: "Portugal",
			year: 2015,
			cannabis_offences: 7964,
			offences_use: 14315,
			offences_supply:5140
		},
		{
			country: "Portugal",
			year: 2016,
			cannabis_offences: 7964,
			offences_use: 15387,
			offences_supply:5605
		},
		{
			country: "Portugal",
			year: 2017,
			cannabis_offences: 7964,
			offences_use: 15271,
			offences_supply:4300
		},
		{
			country: "Croatia",
			year: 2017,
			cannabis_offences: 7964,
			offences_use: 6253,
			offences_supply:1711
		},
		{
			country: "Croatia",
			year: 2016,
			cannabis_offences: 7212,
			offences_use: 5493,
			offences_supply: 1719
		},
		{
			country: "Croatia",
			year: 2015,
			cannabis_offences: 5888,
			offences_use: 4268,
			offences_supply: 1620
		},
		{
			country: "Croatia",
			year: 2014,
			cannabis_offences:6849,
			offences_use: 4866,
			offences_supply: 1399
		},
		{
			country: "Bulgaria",
			year: 2014,
			cannabis_offences: 5922,
			offences_use: 3465,
			offences_supply: 790
		},
		{
			country: "Belgium",
			year: 2017,
			cannabis_offences: 37500,
			offences_use: 29916,
			offences_supply: 6561
		},
		{
			country: "Belgium",
			year: 2016,
			cannabis_offences: 31349,
			offences_use: 27080,
			offences_supply: 6316
		},
		{
			country: "Belgium",
			year: 2015,
			cannabis_offences: 36092,
			offences_use: 28237,
			offences_supply:6460
		},
		{
			country: "Belgium",
			year: 2014,
			cannabis_offences: 27977,
			offences_use: 29825,
			offences_supply: 6637
		},
		{
			country: "Austria",
			year: 2017,
			cannabis_offences: 37751,
			offences_use: 28890,
			offences_supply: 8861
		},
		{
			country: "Austria",
			year: 2016,
			cannabis_offences: 31349,
			offences_use: 23977,
			offences_supply: 7372
		},
		{
			country: "Austria",
			year: 2015,
			cannabis_offences: 27542,
			offences_use: 20456,
			offences_supply: 7086
		},
		{
			country: "Austria",
			year: 2014,
			cannabis_offences: 27977,
			offences_use: 21272,
			offences_supply: 6705
		},{
			country: "Spain",
			year: 2015,
			cannabis_offences: 331587,
			offences_use: 317041,
			offences_supply: 14546
		}, {
			country: "UK",
			year: 2016,
			cannabis_offences: 51402,
			offences_use: 39159,
			offences_supply: 12228
		}, {
			country: "Germany",
			year: 2017,
			cannabis_offences: 204904,
			offences_use: 166236,
			offences_supply: 38668

		}, {
			country: "Spain",
			year: 2016,
			cannabis_offences: 335497,
			offences_use: 320335,
			offences_supply: 15162

		}, {
			country: "Spain",
			year: 2014,
			cannabis_offences: 360327,
			offences_use: 34415,
			offences_supply: 15912

		},

	]
	//LOADinitialData
	app.get(BASE_API_URL + "/drug_offences/loadInitData", (request, response) => {

		console.log("New GET .../loadInitialData");
		var drug_offences = db.getAllData();
		
		if (drug_offences.length >= 1) {
			response.sendStatus(409, "CONFLICT(this action would remove the existing data)");
		} else {
			db.insert(origdata_drug_offences);
			drug_offences = origdata_drug_offences;
			response.send(JSON.stringify(drug_offences, null, 2));
		}
	});


	//GET drug_offences
	app.get(BASE_API_URL + "/drug_offences", (req, res) => {

		console.log("New GET .../drug_offences");

		//Esta propiedad es un objeto que contiene una propiedad para cada parametro en la ruta. Si no hubiese query devolvería un objeto vacío, {}.
		//Por ejemplo para /api/v1/drug_offences?country=Spain&year=2016 el resultado sería query = { country: 'Spain', year: '2016'}

		//Podemos acceder a cada valor con query.clave e.g. query.country nos devolveria 'Spain'

		var query = req.query;

		//Obtenemos los offset y limit desde la query, si estan vacios devuelven null (NaN, aka Not a Number) y los quitamos de la query para que no nos molesten (estas no tenemos que parsearlas)
		var offset = query.offset;
		var limit = query.limit

		delete query.offset;
		delete query.limit;

		//Si la query contiene alguno de los atributos numericos, tenemos que pasar estos atributos de string a integer o double
		//Comprobamos primero que la query tiene alguno de esos atributos

		if (query.hasOwnProperty("year")) {
			query.year = parseInt(query.year);
		}
		if (query.hasOwnProperty("cannabis_offences")) {
			query.cannabis_offences = parseInt(query.cannabis_offences);
		}
		if (query.hasOwnProperty("offences_use")) {
			query.offences_use = parseInt(query.offences_use);
		}
		if (query.hasOwnProperty("offences_supply")) {
			query.offences_supply = parseInt(query.offences_supply);
		}

		//arreglar este comentario (y entenderlo)
		//err y overdose_deaths son: el error que devuelve y el array con las muertes que satisfacen la query 
		// por otra parte, .skip nos consigue el offset deseado y .limit pues lo mismo pero con el limit

		db.find(query).skip(offset).limit(limit).exec((err, drug_offences) => {
			//Si no queremos enseñar el id de cada objeto en la base de datos:
			drug_offences.forEach((c) => {
				delete c._id;
			});
				res.send(JSON.stringify(drug_offences, null, 2));
				console.log("Data sent:" + JSON.stringify(drug_offences, null, 2));
		});

	});

	//POST drug_offences
	app.post(BASE_API_URL + "/drug_offences", (req, res) => {
		console.log("New POST .../drug_offences");

		var country = req.body.country;
		var year =req.body.year;
		var newDrug_offences = req.body;

		db.find({"country":country, "year":year}).exec((err,Drug_offences) => {
			if(Drug_offences.length >0) {
				res.sendStatus(409, "There is already a data with that country and year in the database");
				console.log("There is already a data with that country and year in the database");
			} 
			else if((newDrug_offences == null) || (newDrug_offences.country == null) || (newDrug_offences.year == null) || (newDrug_offences.cannabis_offences == null)) {
				res.sendStatus(400, "BAD REQUEST(data not correctly provided )");
				console.log("The data wasnt correctly provided");
			}
			else {
				db.insert(newDrug_offences);
				res.sendStatus(201, "CREATED");
				console.log("Data input:"+JSON.stringify(newDrug_offences, null, 2));
			}
		});	
	});

	//PUT drug_offences
	app.put(BASE_API_URL + "/drug_offences", (req, res) => {
		res.sendStatus(405, "METHOD NOT ALLOWED")
	});

	//DELETE drug_offences
	app.delete(BASE_API_URL + "/drug_offences", (req, res) => {
		console.log("New DELETE .../drug_offences");

		db.remove({}, { multi: true }, function (err, numRemoved) {
		});
		res.sendStatus(200, "OK");
		console.log("Data successfully removed");
	});

	//GET drug_offences/:country/:year
	app.get(BASE_API_URL + "/drug_offences/:country/:year",(req,res)=>{
		console.log("New GET ...drug_offence/:country/:year");

		var country = req.params.country;
		var year = req.params.year;
		var query = {"country": country, "year":parseInt(year)};

		db.find(query).exec((err, drug_offences)=>{
			if (drug_offences.length>=1) {
				delete drug_offences[0]._id;
				res.send(JSON.stringify(drug_offences[0], null, 2));
				console.log("Data sent: " + JSON.stringify(drug_offences[0], null, 2))
			} else {
				res.sendStatus(404, "NOT FOUND");
				console.log("The data requested is empty");
			}

		})
	});

	//GET drug_offences/:country
	app.get(BASE_API_URL + "/drug_offences/:country", (req, res) => {
		console.log("New GET .../drug_offences/:country");

		//Podriamos hacer que este codigo tambien valiese para un GET drug_offences/:year pero para year tendriamos que mirar si en la query 
		//se ha introducido un numero o un string y a partir de ahi realizar la query introducida

		var country = req.params.country;
		var query = { "country": country };

		db.find(query).exec((err, drug_offences) => {
			if (drug_offences.length >= 1) {
				delete drug_offences[0]._id;
				res.send(JSON.stringify(drug_offences[0], null, 2));
				console.log("Data sent:" + JSON.stringify(drug_offences[0], null, 2));
			} else {
				res.sendStatus(404, "NOT FOUND");
				console.log("The data requested is empty");
			}
		});
	});


	//PUT Drug_offences/:country/:year

	app.put(BASE_API_URL + "/drug_offences/:country/:year", (request, response) => {
		var country = request.params.country;
		var year = request.params.year;
		var newDrugOffence = request.body;
		var query = {"country":country, "year":parseInt(year)};

		if (country != newDrugOffence.country || year != newDrugOffence.year) {
			response.sendStatus(400, "BAD REQUEST, (Data does not match)");
		} else {
			db.update(query,newDrugOffence,(err,numReplaced) =>{
			if(numReplaced == 0){
				response.sendStatus(400, "BAD REQUEST(there is no such data in the database)");
				console.log("There is no such data in the database");

			}
			else{
				response.sendStatus(200, "OK");
				console.log("Database updated");
			}
		});
		}
	});

	//DELETE drug_offences/:country/:year

	app.delete(BASE_API_URL + "/drug_offences/:country/:year", (request, response) => {

		var country = request.params.country;
		var year = request.params.year;
		var query = {"country":country, "year":parseInt(year)};

		db.remove(query, {multi :true}, (err, numRemoved) =>{
			if(numRemoved == 0){
				response.sendStatus(404, "NOT FOUND");
				console.log("There is no such data in the database");
			}
			else{
				response.sendStatus(200, "OK");
				console.log("Object removed");
			}
		});
	})

	//POST drug_offences/:param
	app.post(BASE_API_URL + "/drug_offences/:param", (req, res) => {
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});


	//POST drug_offences/:param1/:param2
	app.post(BASE_API_URL + "/drug_offences/:param1/:param2", (req, res) => {
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});

	//PUT drug_offences/:country/:year
	app.put(BASE_API_URL + "/drug_offences/:country/:year", (req, res) => {
		console.log("New PUT .../drug_offences/:country/:year");

		var country = req.params.country;
		var year = req.params.year;
		var newDrugOffences = req.body;
		var query = { "country": country, "year": parseInt(year) };

		if (country != newDrugOffences.country ||
			year != newDrugOffences.year) {
			res.sendStatus(400, "BAD REQUEST(data does not match)");
			console.log("Data does not match");
		} else {
			db.update(query, newDrugOffences, (err, numReplaced) => {
				if (numReplaced == 0) {
					res.sendStatus(400, "BAD REQUEST(there is no such data in the database)");
					console.log("There is no such data in the database");

				}
				else {
					res.sendStatus(200, "OK");
					console.log("Database updated");
				}
			});
		}
	});

	//DELETE drug_offences/:country/:year
	app.delete(BASE_API_URL + "/drug_offences/:country/:year", (req, res) => {
		console.log("New DELETE .../drug_offencess/:country/:year");

		var country = req.params.country;
		var year = req.params.year;
		var query = { "country": country, "year": parseInt(year) };

		db.remove(query, { multi: true }, (err, numRemoved) => {
			if (numRemoved == 0) {
				res.sendStatus(404, "NOT FOUND");
				console.log("There is no such data in the database");
			}
			else {
				res.sendStatus(200, "OK");
				console.log("Object removed");
			}
		});
	});
};

//-------------------------------------------------------- End Drug_Offences api  --------------------------------------------------------