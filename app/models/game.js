var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// enums
// todo move to separate file
// todo make user-definable
var GameTypes = "HOLDEM OMAHA 7STUD RAZZ MIX OTHER".split(" ");
var GameVariants = "HI HI_LO NA".split(" ");
var WagerTypes = "NO_LIMIT POT_LIMIT LIMIT".split(" ");

var GameSchema = new Schema({
	gameType: { type: String, enum: GameTypes, required: true },
	gameVariant: { type: String, enum: GameVariants, required: true },
	wagerType: { type: String, enum: WagerTypes, required: true },
	date: { type: Date, required: true },
	dateCreated: { type: Date, "default": Date.now },
	players: {
		signedUp: [String],
		entered: [String],
		eliminated: [String]
	}
});

module.exports = mongoose.model("Game", GameSchema);