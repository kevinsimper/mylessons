var angular = require('angular');
var app = require('../modules/app');
var moment = require('moment');

app.controller('TutorialCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'User', 'Quiz', function($scope, $rootScope, $routeParams, $location, User, Quiz){
	$scope.page = 1;
	$scope.quiz = {};

	$scope.takeMeAway = function() {
		var user = $rootScope.auth.user;
		var userRef = User.$child(user.uid);
		userRef.$child('tutorial').$set(true);
		$location.path('/lessons');
	};

	$scope.goToPage = function(page) {
		window.scrollTo(0,0);
		$scope.page = page;
	};

	$scope.quizMsg = "";
	$scope.correctMsg = "";
	$scope.failedMsg = "";

	$scope.takeQuiz = function() {
		var correct = false;
		$scope.quizMsg = "";
		$scope.correctMsg = "";
		$scope.failedMsg = "";

		if(!$scope.quiz.one) {
			$scope.quizMsg = "You missed the first question";
			return false;
		}
		if(!$scope.quiz.two) {
			$scope.quizMsg = "You missed the second question";	
			return false;
		}
		if(!$scope.quiz.three) {
			$scope.quizMsg = "You missed the third question";
			return false;
		}

		if($scope.quiz.one == 3){
			if($scope.quiz.two == 2){
				if($scope.quiz.three == 1){
					correct = true;
				}
			}
		}
		if(correct){
			$scope.correctMsg = "Congrats! You got all of the answers right!";
			var user = $rootScope.auth.user;
			var userRef = User.$child(user.uid);
			userRef.$child('tutorial').$set(true);
			Quiz.addCustomPointsToUser(user.uid, 20, 'Took the introduction to Wiser');
		} else {
			$scope.failedMsg =  "You did not get all the answers correct, " +
								"but you can try again";
		}
	};

	$scope.goToHomepage = function() {
		$location.path('/lessons');
	};
}]);