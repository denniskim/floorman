// start dev server

var mongoose = require("mongoose");
var server = require("./server");

// start DB. use static strings here to prevent accidental deletion
mongoose.connect("mongodb://localhost:27017/floorman-test");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

// clear collections for testing
db.collections["players"].drop(function (err) {
	console.log("floorman-test.players collection dropped.");
});
db.collections["games"].drop(function (err) {
	console.log("floorman-test.games collection dropped.");
});

server.start(8080);
console.log("Started server: TEST");