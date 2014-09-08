var should = require("should");
var assert = require("assert");
var request = require("supertest");

describe("apiTest", function () {
	var url = "http://localhost:8080";
	var playerApiUrl = "/api/players";

	describe("Player", function () {
		var testPlayer = {
			playerId: "testPlayer",
			email: "test@test.com",
			givenName: "Test",
			surname: "Player"
		};

		var testPlayerA = {
			playerId: "alice",
			email: "alice@test.com",
			givenName: "Alice",
			surname: "Tester"
		};

		var testPlayerB = {
			playerId: "bob",
			email: "bob@test.com",
			givenName: "Bob",
			surname: "Tester"
		};

		it("should add player A", function (done) {
			// add test players
			request(url)
				.post(playerApiUrl)
				.send(testPlayerA)
				.end(function (err, res) {
					if (err) return done(err);
					done();
				});
		});

		it("should add player B", function (done) {
			request(url)
				.post(playerApiUrl)
				.send(testPlayerB)
				.end(function (err, res) {
					if (err) return done(err);
					done();
				});
		});

		it("should save a new player", function (done) {
			request(url)
				.post(playerApiUrl)
				.send(testPlayer)
				.expect(201)
				.end(function (err, res) {
					if (err) return done(err);
					done();
				});
		});

		it("should return an error trying to save a duplicate username", function (done) {
			request(url)
				.post(playerApiUrl)
				.send(testPlayer)
				.expect(400)
				.end(function (err, res) {
					if (err) return done(err);
					done();
				});
		});

		it("should update an existing account", function (done) {
			var playerUpdate = {
				email: "test2@test.com",
				givenName: "Test2",
				surname: "Player2"
			};

			request(url)
				.put(playerApiUrl + "/testPlayer")
				.send(playerUpdate)
				.expect("Content-Type", /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);

					res.body.should.have.property("playerId");
					res.body.email.should.equal("test2@test.com");
					res.body.givenName.should.equal("Test2");
					res.body.surname.should.equal("Player2");
					res.body.creationDate.should.not.equal(null);
					done();
				});
		});

		it("should return all players", function (done) {
			request(url)
				.get(playerApiUrl)
				.expect("Content-Type", /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					done();
				});
		});
	});
});