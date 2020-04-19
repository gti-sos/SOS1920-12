const cool = require("cool-ascii-faces");
const path = require("path");
const overdoseDeathsAPI = require(path.join(__dirname,"overdoseDeathsAPI"));
const drugOffencesAPI = require(path.join(__dirname,"drugOffencesAPI"));
const schoolDropoutsAPI = require(path.join(__dirname,"schoolDropoutsAPI"));
const bodyParser = require("body-parser");


module.exports = function (app){
    //La siguiente linea hace que cada vez que detecte un json, te lo transforme en una variable( necesario para insertar o actualizar en la base de datos )
    app.use(bodyParser.json());

    overdoseDeathsAPI(app);
    drugOffencesAPI(app);
    schoolDropoutsAPI(app);

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
}

    