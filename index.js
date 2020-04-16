const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cool = require("cool-ascii-faces");
const overdoseDeathsAPI = require(path.join(__dirname,"overdoseDeathsAPI"));
const drugOffencesAPI = require(path.join(__dirname,"drugOffencesAPI"));
const schoolDropoutsAPI = require(path.join(__dirname,"schoolDropoutsAPI"));

const port = process.env.PORT || 80;
const app = express();

//La siguiente linea hace que cada vez que detecte un json, te lo transforme en una variable
app.use(bodyParser.json());
app.use("/", express.static("./public"));

//Lo siguiente debemos de añadirlo al index.js de cada modulo
const BASE_API_URL = "/api/v1";

//INICIO DE DE TODAS LAS APIs

overdoseDeathsAPI(app);
drugOffencesAPI(app);
schoolDropoutsAPI(app);

// -------------------------------------END APIS-------------------------------------

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

app.listen(port, () => {
	console.log("Server ready");
});


console.log("Starting server...");