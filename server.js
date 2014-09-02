// modules
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// config
var config = require("./config/dev");

var port = process.env.PORT || 8080;

mongoose.connect(config.db.url);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(express.static(__dirname + "/public"));

// routes
require("./app/routes")(app, express);

// start app
app.listen(port);
console.log("Floorman running on " + port);
exports = module.exports = app;