module.exports = function (app, router) {

	var playerHandler = require("./handlers/player-handler");
	var gameHandler = require("./handlers/game-handler");

	/**
	 * API routes
	 */

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
		.post(playerHandler.createPlayer)
		// get all players
		.get(playerHandler.getAllPlayers);

	router.route("/players/:player_id")
		.get(playerHandler.getPlayerById)

		.put(playerHandler.updatePlayerById)

		.delete(playerHandler.deletePlayerById);

	router.route("/games")
		// create a game
		.post(gameHandler.createGame);

	app.use("/api", router);

	/**
	 * Frontend routes
	 */

	app.get("*", function (req, res) {
		res.sendFile("./public/views/index.html");
	});
};