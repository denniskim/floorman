module.exports = function (app, express) {

	var router = express.Router();

	/**
	 * API routes
	 */

	var Player = require("./models/player");

	// global router
	router.use(function (req, res, next) {
		// todo user authentication
		console.log("Request made.");
		next();
	});

	router.get("/", function (req, res) {
		res.json({ message: "test route success" });
	});

	router.route("/players")
		// create a player
		.post(function (req, res) {

			var player = new Player();

			player.givenName = req.body.givenName;
			player.surname = req.body.surname;

			player.save(function (err) {
				if (err) res.send(err);

				res.json({ message: "Player created!" });
			});
		})
		// get all players
		.get(function (req, res) {
			Player.find(function (err, players) {
				if (err) res.send(err);

				res.json(players);
			});
		});
	// route("/players")

	router.route("/players/:player_id")
		.get(function (req, res) {
			Player.findById(req.params.player_id, function (err, player) {
				if (err) res.send(err);

				res.json(player);
			});
		})

		.put(function (req, res) {
			// todo use update or findByIdAndUpdate
			Player.findById(req.params.player_id, function (err, player) {
				if (err) res.send(err);

				player.givenName = req.body.givenName;
				player.surname = req.body.surname;

				player.save(function (err) {
					if (err) res.send(err);

					res.json({ message: "Player " + req.params.player_id + " updated!" });
				});
			});
		})

		.delete(function (req, res) {
			Player.remove({
				_id: req.params.player_id
			}, function (err, player) {
				if (err) res.send(err);

				res.json({ message: "Deleted player " + req.params.player_id + "." });
			});
		});

	app.use("/api", router);

	/**
	 * Frontend routes
	 */

	app.get("*", function (req, res) {
		res.sendFile("./public/views/index.html");
	});
};