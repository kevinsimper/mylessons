var angular = require('angular');
var app = require('../modules/app');

app.controller('ProfileCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'User', function($scope, $rootScope, $routeParams, $location, User){
	var userId = $routeParams.user;
	$scope.profilePicture = userId.split(':')[1];
	$scope.user = User.$child(userId);

}]);