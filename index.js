const express = require("express");
const cors = require("cors");
const back = require("./src/back");
const port = process.env.PORT || 8080;

var app = express();
app.use(cors());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

back(app);
app.use("/", express.static("./public"));

app.listen(port, () => {
	console.log("Server ready on port "+port);
});

console.log("Starting server...");