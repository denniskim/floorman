module.exports = function (app) {

	app.get("/api/test", function (req, res) {
		Test.find(function (err, test) {
			if (err) {
				res.send(err);
			}

			res.json(test);
		});
	});

	// frontend routes
	app.get("*", function (req, res) {
		res.sendfile("./public/views/index.html");
	});
};