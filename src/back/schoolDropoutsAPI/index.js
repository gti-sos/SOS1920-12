// -------------------------------------SCHOOL-DROPOUTS API-------------------------------------
module.exports = function (app) {
	console.log("Registering school-dropouts API...");
	const dataStore = require("nedb");
	const path = require("path");
	const BASE_API_URL = "/api/v2";
	const dbFileName = path.join(__dirname,"schoolDroupouts.db");
	
	const db = new dataStore({
		filename : dbFileName, 
		autoload : true
});

var initialSchool_dropouts = [
	{
		country: "Austria",
		year: 2002,
		sd_all: 9.5,
		sd_mas: 8.7,
		sd_fem: 10.2
	},
	{
		country: "Spain",
		year: 2002,
		sd_all: 30.9,
		sd_mas: 37.2,
		sd_fem: 24.3
	},
	{
		country: "Finland",
		year: 2003,
		sd_all: 10.1,
		sd_mas: 12,
		sd_fem: 8.2
	},
	{
		country: "Italy",
		year: 2003,
		sd_all: 23,
		sd_mas: 26.5,
		sd_fem: 19.3
	},
	{
		country: "Spain",
		year: 2016,
		sd_all: 19,
		sd_mas: 22.7,
		sd_fem: 15.1
	},
	{
		country: "Germany",
		year: 1990,
		sd_all: 11,
		sd_mas: 9.3,
		sd_fem: 6.1
	},
	{
		country: "Austria",
		year: 2013,
		sd_all: 15,
		sd_mas: 7.7,
		sd_fem: 5.1
	},
	{
		country: "Portugal",
		year: 2016,
		sd_all: 11.2,
		sd_mas: 19.9,
		sd_fem: 7.1
	},
	{
		country: "Denmark",
		year: 2004,
		sd_all: 18,
		sd_mas: 23.7,
		sd_fem: 16.2
	},
	{
		country: "Greece",
		year: 1995,
		sd_all: 19,
		sd_mas: 22.7,
		sd_fem: 15.1
	},
	{
		country: "Croatia",
		year: 2001,
		sd_all: 13,
		sd_mas: 16.5,
		sd_fem: 9
	}
];


// GET load initial school-dropouts

app.get(BASE_API_URL + "/school-dropouts/loadInitialData", (req, res) => {

	console.log("New GET .../loadInitialData");
	var school_dropouts = db.getAllData();
	
	if (school_dropouts.length >= 1) {
		res.sendStatus(409, "CONFLICT(this action would remove the existing data)");
		console.log("There is already loaded data");
	}else{
		db.insert(initialSchool_dropouts);
		res.send(JSON.stringify(initialSchool_dropouts, null, 2));
		console.log("Initial school-dropouts data loaded"+JSON.stringify(initialSchool_dropouts, null, 2));
	}
});

//GET school-dropouts
app.get(BASE_API_URL + "/school-dropouts", (req, res) => {
	
	console.log("New GET .../school-dropouts");

	var query = req.query;

	var offset = query.offset;
	var limit = query.limit

	delete query.offset;
	delete query.limit;

	
	if(query.hasOwnProperty("year")){
		query.year = parseInt(query.year);	
	}
	if(query.hasOwnProperty("sd_all")){
		query.sd_all = parseInt(query.sd_all);
	}
	if(query.hasOwnProperty("sd_mas")){
		query.sd_mas = parseInt(query.sd_mas);
	}
	if(query.hasOwnProperty("sd_fem")){
		query.sd_fem = parseInt(query.sd_fem);
	}


	db.find(query).skip(offset).limit(limit).exec((err,school_dropouts) => {
		school_dropouts.forEach( (c) =>{
			delete c._id;
	});	
		res.send(JSON.stringify(school_dropouts, null, 2));
		console.log("Data sent:"+JSON.stringify(school_dropouts, null, 2));
	});
	
});

//POST school-dropouts
app.post(BASE_API_URL + "/school-dropouts", (req, res) => {
	console.log("New POST .../school-dropouts");

	var newSchoolDroupouts = req.body;

	if ((newSchoolDroupouts == null) || (newSchoolDroupouts.country == null) || (newSchoolDroupouts.year == null) || (newSchoolDroupouts.sd_all == null)) {
		res.sendStatus(400, "BAD REQUEST(data not correctly provided )");
		console.log("The data wasnt correctly provided");
	}
	else {
		db.insert(newSchoolDroupouts);
		res.sendStatus(201, "CREATED");
		console.log("Data input:"+JSON.stringify(newSchoolDroupouts, null, 2));
	}
});

//PUT school-dropouts
app.put(BASE_API_URL + "/school-dropouts", (req, res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED")
});

//DELETE school-dropouts
app.delete(BASE_API_URL + "/school-dropouts", (req, res) => {
	console.log("New DELETE .../school-dropouts");

	db.remove({}, { multi: true }, function (err, numRemoved) {
	});
	res.sendStatus(200, "OK");
	console.log("Data successfully removed");
});

//GET school-dropouts/:country
app.get(BASE_API_URL + "/school-dropouts/:country", (req, res) => {
	console.log("New GET .../school-dropouts/:country");

	var country = req.params.country;
	var query = {"country":country};

	db.find(query).exec((err,school_dropouts) => {
		if (school_dropouts.length >= 1) {
			delete school_dropouts[0]._id;
			res.send(JSON.stringify(school_dropouts[0], null, 2));
			console.log("Data sent:"+JSON.stringify(school_dropouts[0], null, 2));
		} else {
			res.sendStatus(404, "NOT FOUND");
			console.log("The data requested is empty");
		}
	});
});

//GET school-dropouts/:country/:year
app.get(BASE_API_URL + "/school-dropouts/:country/:year", (req, res) => {
	console.log("New GET .../school-dropouts/:country/:year");

	var country = req.params.country;
	var year = req.params.year;
	var query = {"country":country, "year":parseInt(year)};

	db.find(query).exec((err,school_dropouts) => {
		if (school_dropouts.length >= 1) {
			delete school_dropouts[0]._id;
			res.send(JSON.stringify(school_dropouts[0], null, 2));
			console.log("Data sent:"+JSON.stringify(school_dropouts[0], null, 2));
		} else {
			res.sendStatus(404, "NOT FOUND");
			console.log("The data requested is empty");
		}
	});
});

//POST school-dropouts/:param
app.post(BASE_API_URL + "/school-dropouts/:param", (req, res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

//POST school-dropouts/:param1/:param2
app.post(BASE_API_URL + "/school-dropouts/:param1/:param2", (req, res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

//PUT school-dropouts/:country/:year
app.put(BASE_API_URL + "/school-dropouts/:country/:year", (req, res) => {
	console.log("New PUT .../school-dropouts/:country/:year");

	var country = req.params.country;
	var year = req.params.year;
	var newSchoolDroupouts = req.body;
	var query = {"country":country, "year":parseInt(year)};

	if (country != newSchoolDroupouts.country || year != newSchoolDroupouts.year) {
		res.sendStatus(400, "BAD REQUEST(data does not match)");
		console.log("Data does not match");
	} else {
		db.update(query,newSchoolDroupouts,(err,numReplaced) =>{
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

//DELETE school-dropouts/:country/:year
app.delete(BASE_API_URL + "/school-dropouts/:country/:year", (req, res) => {
	console.log("New DELETE .../school-dropouts/:country/:year");

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
};
// -------------------------------------END-SCHOOL-DROPOUTS API-------------------------------------