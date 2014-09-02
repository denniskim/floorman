var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	email: { type: String, required: true },
	givenName: { type: String, required: true },
	surname: { type: String, required: true },
	creationDate: { type: Date, "default": Date.now },
	active: { type: Boolean, "default": true }
});

PlayerSchema.methods.getFullName = function () {
	return (this.givenName + " " + this.surname);
};

PlayerSchema.methods.isActive = function () {
	return this.active;
};

module.exports = mongoose.model("Player", PlayerSchema);