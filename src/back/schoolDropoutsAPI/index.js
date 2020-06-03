// -------------------------------------SCHOOL-DROPOUTS API-------------------------------------
module.exports = function (app) {
	console.log("Registering school-dropouts API...");
	const dataStore = require("nedb");
	const path = require("path");
	const BASE_API_URL = "/api/v3";
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
	},
	{
		country: "Germany",
		year: 2005,
		sd_all: 13.5,
		sd_mas: 13.3,
		sd_fem: 13.7
	},
	{
		country: "Germany",
		year: 2015,
		sd_all: 10.1,
		sd_mas: 10.4,
		sd_fem: 9.8
	},
	{
		country: "Germany",
		year: 2018,
		sd_all: 10.3,
		sd_mas: 11.5,
		sd_fem: 9.1
	},
	{
		country: "United Kingdom",
		year: 2011,
		sd_all: 14.9,
		sd_mas: 16.1,
		sd_fem: 13.8
	},
	{
		country: "United Kingdom",
		year: 2000,
		sd_all: 18.2,
		sd_mas: 18.8,
		sd_fem: 17.5
	},
	{
		country: "Spain",
		year: 2018,
		sd_all: 17.9,
		sd_mas: 21.7,
		sd_fem: 14
	},
	{
		country: "Spain",
		year: 2017,
		sd_all: 18.3,
		sd_mas: 21.8,
		sd_fem: 14.5
	},
	{
		country: "Spain",
		year: 2010,
		sd_all: 28.2,
		sd_mas: 33.6,
		sd_fem: 22.6
	},
	{
		country: "Spain",
		year: 1995,
		sd_all: 33.8,
		sd_mas: 38.4,
		sd_fem: 29.2
	},
	{
		country: "United Kingdom",
		year: 2017,
		sd_all: 10.6,
		sd_mas: 12.1,
		sd_fem: 9
	},
	{
		country: "United Kingdom",
		year: 2001,
		sd_all: 17.8,
		sd_mas: 18.6,
		sd_fem: 17
	},
	{
		country: "United Kingdom",
		year: 2014,
		sd_all: 11.8,
		sd_mas: 12.9,
		sd_fem: 10.8
	},
	{
		country: "Portugal",
		year: 1994,
		sd_all: 44.3,
		sd_mas: 49.4,
		sd_fem: 39.2
	},
	{
		country: "Portugal",
		year: 1999,
		sd_all: 44.9,
		sd_mas: 50.8,
		sd_fem: 38.9
	},
	{
		country: "Portugal",
		year: 2002,
		sd_all: 44.3,
		sd_mas: 52.7,
		sd_fem: 37.3
	},
	{
		country: "Portugal",
		year: 2007,
		sd_all: 36.5,
		sd_mas: 42.8,
		sd_fem: 30.0
	},
	{
		country: "Portugal",
		year: 2011,
		sd_all: 23,
		sd_mas: 28.1,
		sd_fem: 17.7
	},
	{
		country: "Italy",
		year: 1996,
		sd_all: 31.7,
		sd_mas: 34.5,
		sd_fem: 27.3
	},
	{
		country: "Italy",
		year: 2010,
		sd_all: 18.6,
		sd_mas: 21.8,
		sd_fem: 15.3
	},
	{
		country: "Italy",
		year: 2015,
		sd_all: 14.7,
		sd_mas: 17.5,
		sd_fem: 11.8
	},
	{
		country: "Italy",
		year: 2018,
		sd_all: 14.5,
		sd_mas: 16.5,
		sd_fem: 12.3
	},
	{
		country: "Finland",
		year: 1999,
		sd_all: 9.9,
		sd_mas: 12.0,
		sd_fem: 7.9
	},
	{
		country: "Finland",
		year: 2008,
		sd_all: 9.8,
		sd_mas: 12.1,
		sd_fem: 7.7
	},
	{
		country: "Finland",
		year: 2013,
		sd_all: 9.3,
		sd_mas: 10.4,
		sd_fem: 8.3
	},
	{
		country: "Finland",
		year: 2016,
		sd_all: 7.9,
		sd_mas: 9.0,
		sd_fem: 6.9
	},
	{
		country: "France",
		year: 1994,
		sd_all: 16.4,
		sd_mas: 18.2,
		sd_fem: 14.8
	},
	{
		country: "France",
		year: 2000,
		sd_all: 13.3,
		sd_mas: 15.0,
		sd_fem: 11.9
	},
	{
		country: "France",
		year: 2004,
		sd_all: 12.3,
		sd_mas: 14.2,
		sd_fem: 10.5
	},
	{
		country: "France",
		year: 2009,
		sd_all: 12.4,
		sd_mas: 14.5,
		sd_fem: 10.3
	},
	{
		country: "France",
		year: 2018,
		sd_all: 8.9,
		sd_mas: 10.8,
		sd_fem: 6.9
	},
	{
		country: "Ireland",
		year: 1995,
		sd_all: 21.4,
		sd_mas: 25.7,
		sd_fem: 17.1
	},
	{
		country: "Ireland",
		year: 2004,
		sd_all: 13.1,
		sd_mas: 16.0,
		sd_fem: 10
	},
	{
		country: "Ireland",
		year: 2009,
		sd_all: 11.8,
		sd_mas: 15.7,
		sd_fem: 7.9
	},
	{
		country: "Ireland",
		year: 2015,
		sd_all: 6.8,
		sd_mas: 8.6,
		sd_fem: 4.9
	},
	{
		country: "Ireland",
		year: 2016,
		sd_all: 6,
		sd_mas: 7.7,
		sd_fem: 4.3
	},
	{
		country: "Netherlands",
		year: 1996,
		sd_all: 17.6,
		sd_mas: 18.1,
		sd_fem: 17.1
	},
	{
		country: "Netherlands",
		year: 2001,
		sd_all: 15.1,
		sd_mas: 16.3,
		sd_fem: 13.8
	},
	{
		country: "Netherlands",
		year: 2007,
		sd_all: 11.9,
		sd_mas: 14.5,
		sd_fem: 9.2
	},
	{
		country: "Netherlands",
		year: 2012,
		sd_all: 8.9,
		sd_mas: 10.5,
		sd_fem: 7.2
	},
	{
		country: "Netherlands",
		year: 2018,
		sd_all: 7.3,
		sd_mas: 9.3,
		sd_fem: 5.3
	},
	{
		country: "Greece",
		year: 1998,
		sd_all: 20.7,
		sd_mas: 25.5,
		sd_fem: 16.1
	},
	{
		country: "Greece",
		year: 2000,
		sd_all: 18.2,
		sd_mas: 22.9,
		sd_fem: 13.6
	},
	{
		country: "Greece",
		year: 2005,
		sd_all: 13.3,
		sd_mas: 17.1,
		sd_fem: 9.5
	},
	{
		country: "Greece",
		year: 2015,
		sd_all: 7.9,
		sd_mas: 9.4,
		sd_fem: 6.4
	},
	{
		country: "Austria",
		year: 2009,
		sd_all: 8.8,
		sd_mas: 8.6,
		sd_fem: 8.9
	},
	{
		country: "Austria",
		year: 2015,
		sd_all: 7.3,
		sd_mas: 7.8,
		sd_fem: 6.8
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
		query.sd_all = parseFloat(query.sd_all);
	}
	if(query.hasOwnProperty("sd_mas")){
		query.sd_mas = parseFloat(query.sd_mas);
	}
	if(query.hasOwnProperty("sd_fem")){
		query.sd_fem = parseFloat(query.sd_fem);
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
	var country = req.body.country;
	var year = req.body.year;

	db.find({"country":country, "year":year}).exec((err,school_dropouts) => {
		if(school_dropouts.length > 0){
			console.log
			res.sendStatus(409, "There is already data with that country and year in the database.");
			console.log("There is already data with that country and year in the database.");
		}
		else if ((newSchoolDroupouts == null) || (newSchoolDroupouts.country == null) || (newSchoolDroupouts.year == null) || (newSchoolDroupouts.sd_all == null)) {
			res.sendStatus(400, "BAD REQUEST(data not correctly provided )");
			console.log("The data wasnt correctly provided");
		}
		else {
			db.insert(newSchoolDroupouts);
			res.sendStatus(201, "CREATED");
			console.log("Data input:"+JSON.stringify(newSchoolDroupouts, null, 2));
		}
	});
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