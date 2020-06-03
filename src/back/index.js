const cool = require("cool-ascii-faces");
const path = require("path");
const overdoseDeathsAPIv2 = require(path.join(__dirname,"overdoseDeathsAPI/v2"));
const overdoseDeathsAPIv3 = require(path.join(__dirname,"overdoseDeathsAPI/v3"));
const drugOffencesAPI = require(path.join(__dirname,"drugOffencesAPI"));
const schoolDropoutsAPI = require(path.join(__dirname,"schoolDropoutsAPI"));
const bodyParser = require("body-parser");
const request = require("request");

var remoteAPI1 = "https://sos1920-05.herokuapp.com/api/v1/life_expectancies";
var remoteAPI2 = "https://sos1920-27.herokuapp.com/api/v2/poverty-stats";



module.exports = function (app){
    //La siguiente linea hace que cada vez que detecte un json, te lo transforme en una variable( necesario para insertar o actualizar en la base de datos )
    app.use(bodyParser.json());

    overdoseDeathsAPIv2(app);
    overdoseDeathsAPIv3(app);
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
    app.use('/proxyLifeExpectancy', function(req, res) {
        console.log('piped: '+req.baseUrl + req.url);
        req.pipe(request(remoteAPI1)).pipe(res);
      });
    app.use('/proxyPovertyStats',function(req, res){
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(remoteAPI2)).pipe(res);
    });
}

    