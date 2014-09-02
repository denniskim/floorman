// handlers for /api/players

var Player = require("../models/player");
var PlayerHelper = require("../helpers/player-helper");
var validator = require("validator");

var PlayerHandler = {
	// POST create a player
	createPlayer: function (req, res) {

		var playerId = req.body.playerId || null;
		var email = req.body.email || null;
		var givenName = req.body.givenName || null;
		var surname = req.body.surname || null;

		var playerHelper = new PlayerHelper();

		if (validator.isEmail(email)) {
			email = validator.normalizeEmail(email);
		}
		else {
			res.status(400).json({ error: "Email must be valid." });
		}

		playerHelper.createPlayer(playerId, email, givenName, surname).then(
			function (player) {
				console.log("Player " + playerId + " created");
				res.status(201).json(player);
			},
			function (err) {
				console.log("Error creating player " + playerId + ". Stack trace: " + err.stack);
				res.status(400).json({ error: err.message });
			}
		);
	},

	// GET all players
	getAllPlayers: function (req, res) {
		Player.find(function (err, players) {
			if (err) res.send(err);

			res.json(players);
		});
	},

	// GET a specific player by id
	getPlayerById: function (req, res) {
		var playerId = req.params.player_id || null;

		var playerHelper = new PlayerHelper();

		playerHelper.findPlayerById(playerId).then(
			function (player) {
				console.log(player);

				if (player && player.active === true) {
					console.log("Player " + playerId + " retrieved.");
					res.status(200).json(player);
				}
				else {
					console.log("Player not found.");
					console.log("No such player ID " + playerId + "exists.");
					res.status(404).json({ error: "No such player ID " + playerId + " exists."});
				}
			},
			function (err) {
				console.log("Error during player retrieval: " + playerId + ". Stack trace: " + err.stack);
				res.status(500).json({ error: err.message });
			}
		)
	},

	// PUT update a specific player by id
	updatePlayerById: function (req, res) {

		var playerId = req.params.player_id || null;
		var updatedPlayer = req.body || null;

		if (validator.isEmail(req.body.email)) {
			updatedPlayer.email = validator.normalizeEmail(req.body.email);
		}
		else {
			res.status(400).json({ error: "Email must be valid" });
		}
		updatedPlayer.playerId = playerId;

		var playerHelper = new PlayerHelper();

		playerHelper.updatePlayer(updatedPlayer).then(
			function (player) {
				if (player) {
					console.log("Player " + player.playerId + " updated.");
					res.status(200).json(player);
				}
				else {
					console.log("Could not update player " + player.playerId + ".");
					res.status(404).json({ error: "No player " + player.playerId + " found." });
				}
			},
			function (err) {
				console.log("Error updating player " + player.playerId + ". Stack trace: " + err.stack);
				res.status(500).json({ error: err.message });
			}
		);
	},

	// DELETE a specific player by id
	deletePlayerById: function (req, res) {
		var playerId = req.params.playerId || null;

		var playerHelper = new PlayerHelper();

		playerHelper.disablePlayer(playerId).then(
			function (player) {
				if (player) {
					console.log("Player " + playerId + " disabled.");
					res.status(204).json(null);
				}
				else {
					console.log("Could not disable player " + playerId + ".");
					res.status(404).json({ error: "No player found " + playerId + "." });
				}
			},
			function (err) {
				console.log("Error disabling player " + playerId + ". Stack trace: " + err.stack);
				res.status(500).json({ error: err.message });
			}
		);
	}
};

module.exports = PlayerHandler;