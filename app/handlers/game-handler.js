// handlers for games

var Game = require("../models/game.js");
var GameHelper = require("../helpers/game-helper.js")
var validator = require("validator");

var GameHandler = {
	// POST create a game
	createGame: function (req, res) {
		var gameNumber = req.body.gameNumber || null;
		var gameType = req.body.gameType || null;
		var gameVariant = req.body.gameVariant || null;
		var wagerType = req.body.wagerType || null;
		var date = req.body.date || null;

		var gameHelper = new GameHelper();

		gameHelper.createGame(gameNumber, gameType, gameVariant, wagerType, date).then(
			function (game) {
				console.log("Game created.");
				res.status(201).json(game);
			},
			function (err) {
				console.log("Error creating game. Stack trace: " + err.stack);
				res.status(400).json({ error: err.message });
			}
		);
	}

	// PUT update game

	// GET get all games

	// GET find a game

	// PUT add players to game

	//
};

module.exports = GameHandler;