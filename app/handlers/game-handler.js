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
	},

	// PUT update game
	updateGameById: function (req, res) {
		var gameId = req.params.game_id || null;
		var updatedGame = req.body || null;

		var gameHelper = new GameHelper();

		gameHelper.updateGame(gameId, updatedGame).then(
			function (game) {
				if (game) {
					console.log("Game " + game._id + " updated.");
					res.status(200).json(game);
				}
				else {
					console.log("Could no update game " + game._id + ".");
					res.status(404).json({ error: "No game " + game._id + " found."});
				}
			},
			function (err) {
				console.log("Error updating game " + game._id + ". Stack trace: " + err.stack);
				res.status(500).json({ error: err.message });
			}
		);
	},

	// GET get all games
	getAllGames: function (req, res) {
		Game.find(function (err, games) {
			if (err) res.send(err);

			res.json(games);
		});
	},

	// GET find a game by id
	getGameById: function (req, res) {
		var gameId = req.params.game_id || null;

		var gameHelper = new GameHelper();

		gameHelper.findGameById(gameId).then(
			function (game) {

				if (game) {
					console.log("Game " + game._id + " retrieved.");
					res.status(200).json(game);
				}
				else {
					console.log("Game not found.");
					console.log("No such game ID " + gameId + " exists.");
					res.status(404).json({ error: "No such game ID " + gameId + " exists."});
				}
			},
			function (err) {
				console.log("Error during game retrieval: " + gameId + ". Stack trace: " + err.stack);
				res.status(500).json({ error: err.message });
			}
		)
	}

	// PUT add players to game

	//
};

module.exports = GameHandler;