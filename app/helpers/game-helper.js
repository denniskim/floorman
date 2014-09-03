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
	}
};

module.exports = GameHelper;