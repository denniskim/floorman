// modules
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");


app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(express.static(__dirname + "/public"));

// routes
require("./app/routes")(app, express);


function start(port) {
	app.listen(port);
	console.log("Floorman running on " + port);
}

exports.app = app;
exports.start = start;