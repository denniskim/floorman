// Helpers for PlayerHandler

var Player = require("../models/player");
var Q = require("q");

var PlayerHelper = function PlayerHelper() {

	this.createPlayer = function createPlayer(playerId, email, givenName, surname) {
		var deferred = Q.defer();
		var player = new Player({
			playerId: playerId,
			email: email,
			givenName: givenName,
			surname: surname
		});

		player.save(function (err, player) {
			if (err) {
				deferred.reject(new Error(err));
			}
			else {
				deferred.resolve(player);
			}
		});

		return deferred.promise;
	};

	this.findPlayerById = function findPlayerById(playerId) {
		var deferred = Q.defer();

		Player.findOne({
			playerId: playerId
		}, function (err, foundPlayer) {
			if (err) {
				deferred.reject(new Error(err));
			}
			else {
				deferred.resolve(foundPlayer);
			}
		});

		return deferred.promise;
	};

	this.updatePlayer = function updatePlayer(player) {
		var deferred = Q.defer();

		var updateObj = {};

		if (typeof player.email === "string") {
			updateObj["email"] = player.email;
		}
		if (typeof player.givenName === "string") {
			updateObj["givenName"] = player.givenName;
		}
		if (typeof player.surname === "string") {
			updateObj["surname"] = player.surname;
		}

		Player.findOneAndUpdate(
			{ playerId: player.playerId },
			updateObj,
			{ "new": true },
			function (err, player) {
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

	this.disablePlayer = function disablePlayer(playerId) {
		var deferred = Q.defer();

		Account.findOneAndUpdate({
			playerId: playerId
		}, {
			active: false
		}, {
			"new": true
		},
		function (err, player) {
			if (err) {
				deferred.reject(new Error(err));
			}
			else {
				deferred.resolve(player);
			}

		});

		return deferred.promise;
	}
};

module.exports = PlayerHelper;