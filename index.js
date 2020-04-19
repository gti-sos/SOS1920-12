const express = require("express");
const back = require("./src/back");
const port = process.env.PORT || 80;

var app = express();

back(app);
app.use("/", express.static("./public"));

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");