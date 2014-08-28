angular.module("appRoutes", []).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

	$routeProvider
		.when("/", {
			templateUrl: "views/home.html",
			controller: "MainController"
		})

		.when("/test", {
			templateUrl: "views/test.html",
			controller: "TestController"
		});

	$locationProvider.html5Mode(true);
}]);