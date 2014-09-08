// Helpers for GameHandler

var Game = require("../models/game");
var Q = require("q");

var GameHelper = function GameHelper() {

	this.createGame = function createGame(gameNumber, gameType, gameVariant, wagerType, date) {
		var deferred = Q.defer();
		var game = new Game({
			gameNumber: gameNumber,
			gameType: gameType,
			gameVariant: gameVariant,
			wagerType: wagerType,
			date: date
		});

		game.save(function (err, game) {
			if (err) {
				deferred.reject(new Error(err));
			}
			else {
				deferred.resolve(game);
			}
		});

		return deferred.promise;
	};

	this.updateGame = function updateGame(gameId, game) {
		var deferred = Q.defer();

		var updateObj = {};

		if (typeof game.gameNumber === "string") {
			updateObj["gameNumber"] = parseInt(game.gameNumber, 10);
		}
		if (typeof game.gameType === "string") {
			updateObj["gameType"] = game.gameType;
		}
		if (typeof game.gameVariant === "string") {
			updateObj["gameVariant"] = game.gameVariant;
		}
		if (typeof game.wagerType === "string") {
			updateObj["wagerType"] = game.wagerType;
		}
		if (typeof game.date === "string") {
			updateObj["date"] = game.date;
		}

		Game.findOneAndUpdate(
			{ _id: gameId },
			updateObj,
			{ "new": true },
			function (err, game) {
				if (err) {
					deferred.reject(new Error(err));
				}
				else {
					deferred.resolve(player);
				}
			}
		);

		return deferred.promise;
	};

	this.findGameById = function findGameById(gameId) {
		var deferred = Q.defer();

		Game.findOne(
			{ _id: gameId },
			function (err, foundGame) {
				if (err) {
					deferred.reject(new Error(err));
				}
				else {
					deferred.resolve(foundGame);
				}
			}
		);

		return deferred.promise;
	}
};

module.exports = GameHelper;