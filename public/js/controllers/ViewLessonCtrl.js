var angular = require('angular');
var app = require('../modules/app');

app.controller('ViewLessonCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Lessons', '$sce', function($scope, $rootScope, $routeParams, $location, Lessons, $sce){
	$rootScope.hideNavigation = true;
	var lessonId = $routeParams.lessonid;
	$scope.lesson = Lessons.choose(lessonId);
	$scope.lesson.$on('loaded', function(){
		$scope.iframeUrl = $sce.trustAsResourceUrl($scope.lesson.articleLink);
	});

	$scope.goBackToLesson = function() {
		$location.path('/lessons/' + lessonId);
	};

	$scope.$on('$destroy', function() {
		$rootScope.hideNavigation = false;
	});

}])