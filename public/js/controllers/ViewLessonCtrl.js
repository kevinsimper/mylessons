var angular = require('angular');
var app = require('../modules/app');

app.controller('ViewLessonCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Lessons', '$sce', function($scope, $rootScope, $routeParams, $location, Lessons, $sce){
	$rootScope.hideNavigation = true;
	var lessonId = $routeParams.lessonid;
	$scope.lesson = Lessons.choose(lessonId);
	$scope.lesson.$on('loaded', function(){
		var link = '';
		if(typeof $scope.lesson.bookLink !== 'undefined' && $scope.lesson.bookLink) {
			link = $scope.lesson.bookLink;
		}
		if(typeof $scope.lesson.articleLink !== 'undefined' && $scope.lesson.articleLink) {
			link = $scope.lesson.articleLink;
		}
		$scope.iframeUrl = $sce.trustAsResourceUrl(link);
	});

	$scope.goBackToLesson = function() {
		$location.path('/lessons/' + lessonId);
	};

	$scope.frameLoaded = function() {
		console.log('iframe');
	};

	$scope.$on('$destroy', function() {
		$rootScope.hideNavigation = false;
	});

}]);