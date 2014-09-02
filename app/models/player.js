var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	email: { type: String, required: true },
	givenName: String,
	surname: String,
	active: Boolean
});

module.exports = mongoose.model("Player", PlayerSchema);