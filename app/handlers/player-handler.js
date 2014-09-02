// handlers for /api/players

var Player = require("../models/player");

var PlayerHandler = {
	// POST create a player
	createPlayer: function (req, res) {

		var player = new Player();

		player.givenName = req.body.givenName;
		player.surname = req.body.surname;
		player.email = req.body.email;

		player.save(function (err) {
			if (err) res.send(err);

			res.json({ message: "Player created!" });
		});
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
		Player.findById(req.params.player_id, function (err, player) {
			if (err) res.send(err);

			res.json(player);
		});
	},

	// PUT update a specific player by id
	updatePlayerById: function (req, res) {
		// todo use update or findByIdAndUpdate
		Player.findById(req.params.player_id, function (err, player) {
			if (err) res.send(err);

			player.givenName = req.body.givenName;
			player.surname = req.body.surname;
			player.email = req.body.email;

			player.save(function (err) {
				if (err) res.send(err);

				res.json({ message: "Player " + req.params.player_id + " updated!" });
			});
		});
	},

	// DELETE a specific player by id
	deletePlayerById: function (req, res) {
		Player.remove({
			_id: req.params.player_id
		}, function (err, player) {
			if (err) res.send(err);

			res.json({ message: "Deleted player " + req.params.player_id + "." });
		});
	}
};

module.exports = PlayerHandler;