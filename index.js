const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
const BASE_API_URL = "/api/v1";

var app = express();
var port = process.env.PORT || 80;

//La siguiente linea hace que cada vez que detecte un json, te lo transforme en una variable
app.use(bodyParser.json());
app.use("/", express.static("./public"));


app.get("/cool", (request, response) => {
	response.send("<html>" + cool() + "</html>");
});


app.get("/time", (request, response) => {

	//lo ponemos dentro del bucle de app, asi cada vez que refresquemos, iremos obteniendo la hora en cada momento
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + ' ' + time;

	response.send("<html>" + dateTime + "</html>");
});

// -------------------------------------OVERDOSE_DEATHS API-------------------------------------

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


// load initial overdose_deaths

app.get(BASE_API_URL + "/overdose-deaths/loadInitialData", (request, response) => {
	if (overdose_deaths.length >= 1) {
		response.sendStatus(409, "CONFLICT(this action would remove the existing data)");
	}
	else {
		overdose_deaths = initialOverdose_deaths;
		response.send(JSON.stringify(overdose_deaths, null, 2));
	}
});

//POST overdose_deaths
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

//GET overdose_deaths
app.get(BASE_API_URL + "/overdose-deaths", (request, response) => {

	if (overdose_deaths.length < 1) {
		response.sendStatus(400, "BAD REQUEST(data is empty)");
	} else {
		response.send(JSON.stringify(overdose_deaths, null, 2));
	}
});

//PUT overdose_deaths
app.put(BASE_API_URL + "/overdose-deaths", (request, response) => {
	response.sendStatus(405, "METHOD NOT ALLOWED")
});

//DELETE overdose_deaths
app.delete(BASE_API_URL + "/overdose-deaths", (request, response) => {
	overdose_deaths = [];
	response.sendStatus(200, "OK");
});

//POST overdose_deaths/XXX
app.post(BASE_API_URL + "/overdose-deaths/:country", (request, response) => {
	response.sendStatus(405, "METHOD NOT ALLOWED")
});

//GET overdose_deaths/XXX
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

//PUT overdose_deaths/XXX
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

//DELETE overdose_deaths/XXX
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
// -------------------------------------END_OVERDOSE_DEATHS API-------------------------------------
// -------------------------------------drugg_offences_eu API-------------------------------------
var drug_offences = [];

var origdata_drug_offences = [
	{
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

	drug_offences = [];

	if (drug_offences.length >= 1) {
		response.sendStatus(409, "CONFLICT(this action would remove the existing data)");
	} else {
		drug_offences = origdata_drug_offences;
		response.send(JSON.stringify(drug_offences, null, 2));
	}
});

//POST drug_offences
app.post(BASE_API_URL + "/drug_offences", (request, response) => {

	var newDrugOffence = request.body;

	if ((newDrugOffence == null) || (newDrugOffence.country == null) || (newDrugOffence.year == null) || 
	(newDrugOffence.cannabis_offences == null) || (newDrugOffence.offences_use == null) || (newDrugOffence.offences_supply == null)){
		response.sendStatus(400, "BAD REQUEST(data provided not correctly)");
	}else {
		drug_offences.push(newDrugOffence);
		response.sendStatus(201, "CREATED");
	}
});

//GET Drug_Offences
app.get(BASE_API_URL + "/drug_offences", (request, response) => {

	if(drug_offences.length <1){
		response.sendStatus(400,"BAD REQUEST(data is empty)");
	}else{
		response.send(JSON.stringify(drug_offences,null,2));
	}
});

//PUT Drug_Offences

app.put(BASE_API_URL + "/drug_offences", (request, response) =>{

	response.sendStatus(405, "METHOD NOT ALLOWED")

});

//DELETE Drug_Offences

app.delete(BASE_API_URL + "/drug_offences", (request, response) =>{
	drug_offences = [];
	response.sendStatus(200, "OK");

});

//POST Drug_Offences/XXX
app.post(BASE_API_URL + "/drug_offences/:country", (request, response) =>{

	response.sendStatus(405, "METHOD NOT ALLOWED")
});


//GET Drug_Offences/XXX
app.get(BASE_API_URL + "/drug_offences/:country", (request, response)=> {

	var country = request.params.country;
	var filteredDrug_offences = drug_offences.filter( (c) =>{

		return (c.country==country);
	});

if(filteredDrug_offences.length>=1){

	response.send(filteredDrug_offences[0]);
	}else{

	response.sendStatus(404, "NOT FOUND");

}});

//PUT Drugg_offences/XXX

app.put(BASE_API_URL + "/drug_offences/:country/:year", (request, response) =>{
	var country = request.params.country;
	var year = request.params.year;

	var newDruggOffence = request.body;

	if(country != newDruggOffence.country || year != newDrugOffence.year){
		response.sendStatus(400, "BAD REQUEST, (Data does not match)");
	}else{
		var filteredDrug_offences = drug_offences.filter( (c) =>{
			return (!((c.country == country)&& (c.year == year)));
		});
		drug_offences = filteredDrug_offences;
		drug_offences.push(newDruggOffence);
		response.sendStatus(200,"OK");
	}
});

//DELETE overdose_deaths

app.delete(BASE_API_URL + "/drug_offences/:country/:year",(request, response)=> {

	var country = request.params.country;
	var year = request.params.year;
	var filteredDrug_offences = drug_offences.filter ( (c) => {
		return(!((c.country == country) && (c.year == year)));
	});

	if(filteredDrug_offences.length < drug_offences.length){
		drug_offences = filteredDrug_offences;
		response.sendStatus(200, "OK");
	}else{
		response.sendStatus(404, "NOT FOUND");
	}
})



// -------------------------------------END drug_offences API-------------------------------------

// -------- -------------------------- school-dropouts AP start ------------------------ ----------
var school_dropouts = [];
var school_dropouts_sample = [
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
	}
];


// load initial school_dropouts_sample

app.get(BASE_API_URL + "/school-dropouts/loadInitialData", (request, response) => {
	if (school_dropouts.length >= 1) {
		response.sendStatus(409, "CONFLICT(this action would remove the existing data)");
	}
	else {
		school_dropouts = school_dropouts_sample;
		response.send(JSON.stringify(school_dropouts, null, 2));
	}
});

//POST school_dropouts
app.post(BASE_API_URL + "/school-dropouts", (request, response) => {
	var auxSchoolDropouts = request.body;

	if ((auxSchoolDropouts == null) || (auxSchoolDropouts.country == null) || (auxSchoolDropouts.year == null) || (auxSchoolDropouts.sd_all == null)) {
		response.sendStatus(400, "BAD REQUEST(data provided not correctly)");
	}
	else {
		school_dropouts.push(auxSchoolDropouts);
		response.sendStatus(201, "CREATED");
	}

});

//GET school_dropouts
app.get(BASE_API_URL + "/school-dropouts", (request, response) => {

	if (school_dropouts.length < 1) {
		response.sendStatus(400, "BAD REQUEST(data is empty)");
	} else {
		response.send(JSON.stringify(school_dropouts, null, 2));
	}
});

//PUT school_dropouts
app.put(BASE_API_URL + "/school-dropouts", (request, response) => {
	response.sendStatus(405, "METHOD NOT ALLOWED")
});

//DELETE school_dropouts
app.delete(BASE_API_URL + "/school-dropouts", (request, response) => {
	school_dropouts = [];
	response.sendStatus(200, "OK");
});

//POST school_dropouts/country
app.post(BASE_API_URL + "/school-dropouts/:country", (request, response) => {
	response.sendStatus(405, "METHOD NOT ALLOWED")
});

//GET school_dropouts/country
app.get(BASE_API_URL + "/school-dropouts/:country", (request, response) => {
	var country = request.params.country;
	var school_dropouts_filtered = school_dropouts.filter((c) => {
		return (c.country == country);
	});

	if (school_dropouts_filtered.length >= 1) {
		response.send(school_dropouts_filtered[0]);
	} else {
		response.sendStatus(404, "NOT FOUND");
	}
});

//PUT school_dropouts/country/year
app.put(BASE_API_URL + "/school-dropouts/:country/:year", (request, response) => {
	var country = request.params.country;
	var year = request.params.year;

	var aux_school_dropout = request.body;

	if (country != aux_school_dropout.country || year != aux_school_dropout.year) {
		response.sendStatus(400, "BAD REQUEST(data does not match)");
	} else {
		var school_dropouts_filtered = school_dropouts.filter((s) => {
			return (!((s.country == country) && (s.year == year)));
		});
		school_dropouts = school_dropouts_filtered;
		school_dropouts.push(aux_school_dropout);
		response.sendStatus(200, "OK");
	}
});


//DELETE school_dropouts/country/year
app.delete(BASE_API_URL + "/school-dropouts/:country/:year", (request, response) => {
	var country = request.params.country;
	var year = request.params.year;

	var school_dropouts_filtered = school_dropouts.filter((c) => {
		return (!((c.country == country) && (c.year == year)));
	});

	if (school_dropouts_filtered.length < school_dropouts.length) {
		school_dropouts = school_dropouts_filtered;
		response.sendStatus(200, "OK");
	} else {
		response.sendStatus(404, "NOT FOUND");
	}

});
// -------------------------------------END_OVERDOSE_DEATHS API-------------------------------------

app.listen(port, () => {
	console.log("Server ready");
});


console.log("Starting server...");