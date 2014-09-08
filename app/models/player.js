var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	playerId: {
		type: String,
		index: { unique: true },
		required: true,
		match: /\w+/
	},
	email: { type: String, required: true },
	givenName: { type: String, required: true, match: /\w+/ },
	surname: { type: String, required: true, match: /\w+/ },
	creationDate: { type: Date, "default": Date.now },
	active: { type: Boolean, "default": true }
});

PlayerSchema.methods.getFullName = function () {
	return (this.givenName + " " + this.surname);
};

PlayerSchema.methods.isActive = function () {
	return this.active;
};

PlayerSchema.plugin(uniqueValidator);

// todo move validation here

module.exports = mongoose.model("Player", PlayerSchema);