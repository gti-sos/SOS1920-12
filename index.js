

const cool = require("cool-ascii-faces");
const express = require("express");

var app = express();

var port = process.env.PORT || 8080;

app.use("/",express.static("./public"));

app.get("/cool",(request, response) => {
	response.send("<html>"+cool()+"</html>");
});


app.get("/time",(request, response) => {
	
	//lo ponemos dentro del bucle de app, asi cada vez que refresquemos, iremos obteniendo la hora en cada momento
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	
	response.send("<html>"+dateTime+"</html>");
});

app.listen(port, () =>{
	console.log("Servidor preparado y listo");	
});

console.log("Iniciando servidor...");