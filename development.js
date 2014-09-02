// start dev server

var config = require("./config/dev");
var mongoose = require("mongoose");
var server = require("./server");

// start DB
mongoose.connect(config.db.url);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

server.start(config.port);
console.log("Started server: DEVELOPMENT");