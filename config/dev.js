// dev config

module.exports = {
	port: process.env.PORT || 8080,

	db: {
			url: "mongodb://localhost:27017/floorman-dev"
		}
};
