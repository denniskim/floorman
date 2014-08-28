angular.module("TestService", []).factory("Test", ["$http", function ($http) {
	return {
		get: function () {
			return $http.get("/api/test");
		},

		create: function (testData) {
			return $http.post("/api/test", testData);
		},

		delete: function (id) {
			return $http.delete("api/test/" + id);
		}
	}
}]);
