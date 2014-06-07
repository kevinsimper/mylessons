var angular = require('angular');
var app = require('../modules/app');

app.directive('resizable', ['$window', function($window) {
  return {
  	link: function($scope) {
      $scope.initializeWindowSize = function() {
        $scope.windowHeight = $window.innerHeight;
        $scope.windowWidth = $window.innerWidth;
      };
      $scope.initializeWindowSize();
      return angular.element($window).bind('resize', function() {
        $scope.initializeWindowSize();
        return $scope.$apply();
      });
    }
  };
}]);