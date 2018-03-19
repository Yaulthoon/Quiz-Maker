var app = new angular.module("quizCraft", ["ngRoute"]);

app.controller("colorMod",['$scope', '$compile', '$http', '$window', '$timeout', 
function ($scope, $compile, $http, $window, $timeout) {
	
	$scope.pbRed = 255;
	$scope.pbBlue = 255;
	$scope.pbGreen = 255;
	$scope.ptRed = 0;
	$scope.ptBlue = 0;
	$scope.ptGreen = 0;
	$scope.abRed = 255;
	$scope.abBlue = 255;
	$scope.abGreen = 255;
	$scope.atRed = 0;
	$scope.atBlue = 0;
	$scope.atGreen = 0;
	$scope.savedPara = function () {
		var elem = document.querySelectorAll('.test');
		var elem2 = document.querySelectorAll('.answerArea');
		for (i = 0; i < elem.length; i++) {
		elem[i].style.backgroundColor = "rgb(" + $scope.pbRed + "," + $scope.pbGreen + "," +
		$scope.pbBlue + ")";
		elem[i].style.color = "rgb(" + $scope.ptRed + "," + $scope.ptGreen + "," +
		$scope.ptBlue + ")";
		elem2[i].style.backgroundColor = "rgb(" + $scope.abRed + "," + $scope.abGreen + "," +
		$scope.pbBlue + ")";
		elem2[i].style.color = "rgb(" + $scope.atRed + "," + $scope.atGreen + "," +
		$scope.atBlue + ")";
		}
	};
	
    $scope.page = function (file) {
		$http.get(file).then(function(response) {
		$scope.myWelcome = response.data;
		console.log($scope.myWelcome);
	}).then(function(response) {
        var html = $compile($scope.myWelcome)($scope);
		document.getElementById('quizMakerForeground').innerHTML = "";
        angular.element(document.getElementById("quizMakerForeground")).append(html);
	})
	};
	
    var d = document.getElementsByClassName('inputBox'),
	isDown = false,
    isLong = false,
    target,                                        
    longTID,
	longTimer;                                     

	$scope.toggleColorIncrease = function (color, scopeVal, num, aspect) {
		$window.addEventListener("mouseup", handleMouseUp);
		isDown = true;                                  
		isLong = false;                                   
		target = this;                                   
		clearTimeout(longTID);                           
		longTID = setTimeout(longPressIncrease(color, scopeVal, num, aspect), 3000);  
		if (color === 255) {
			return;
		}
		color += 1;
		$scope[scopeVal] = color;
		d[num].innerHTML = $scope[scopeVal];
	};

	function longPressIncrease(color, scopeVal, num, aspect) {
	console.log(color);
	longTimer = setInterval(function () {
	if (color === 255) {
		return;
	} else {
		color += 1;
		$scope[scopeVal] = color;
		d[num].innerHTML = $scope[scopeVal];
		var elem = document.getElementsByClassName(aspect);
		if (aspect === 'test') {
			elem[0].style.backgroundColor = "rgb(" + $scope.pbRed + "," + 
			$scope.pbGreen + "," + $scope.pbBlue + ")";
			elem[0].style.color = "rgb(" + $scope.ptRed + "," + $scope.ptGreen + "," +
			$scope.ptBlue + ")";
		} else if (aspect ==='answerArea') {
			elem[0].style.backgroundColor = "rgb(" + $scope.abRed + "," + 
			$scope.abGreen + "," + $scope.abBlue + ")";
			elem[0].style.color = "rgb(" + $scope.atRed + "," + $scope.atGreen + "," +
			$scope.atBlue + ")";
				}
			}
		}, 40);
	}

	$scope.toggleColorDecrease = function (color, scopeVal, num, aspect) {
		$window.addEventListener("mouseup", handleMouseUp);
		isDown = true;                               
		isLong = false;                                   
		target = this;                                   
		clearTimeout(longTID);                           
		longTID = setTimeout(longPressDecrease(color, scopeVal, num, aspect), 3000);  
		if (color === 0) {
			return;
		}
		color -= 1;
		$scope[scopeVal] = color;
		d[num].innerHTML = $scope[scopeVal];
	};

	function longPressDecrease(color, scopeVal, num, aspect) {
		longTimer = setInterval(function () {
		if (color === 0) {
			return;
		} else {
			color -= 1;
			$scope[scopeVal] = color;
			d[num].innerHTML = $scope[scopeVal];
			var elem = document.getElementsByClassName(aspect);
			if (aspect === 'test') {
				elem[0].style.backgroundColor = "rgb(" + $scope.pbRed + "," + 
				$scope.pbGreen + "," + $scope.pbBlue + ")";
				elem[0].style.color = "rgb(" + $scope.ptRed + "," + 
				$scope.ptGreen + "," + $scope.ptBlue + ")";
			} else if (aspect === 'answerArea') {
				elem[0].style.backgroundColor = "rgb(" + $scope.abRed + "," + 
				$scope.abGreen + "," + $scope.abBlue + ")";
				elem[0].style.color = "rgb(" + $scope.atRed + "," + 
				$scope.atGreen + "," + $scope.atBlue + ")";
				}
			}
		}, 40);
	}

	function handleMouseUp() {
		if (isDown && isLong) {                         
			isDown = false;                                 
			return;
		}
		if (isDown) {                                     
			clearTimeout(longTID);  	  
			clearInterval(longTimer);
			isDown = false;
			target = null;
		}
		if (isLong) {
		clearInterval(longTimer);
		isLong = false;
		return;
		}
	};

	$scope.answersKey = [];  
	$scope.storeAnswersKey = []; 
	$scope.questionsKey = [];

	$scope.collectData = function () {
		var i = 0;
		var j = 0;
		var answers = document.getElementsByName('answers');
		var answersText = document.getElementsByName('answersText');
		var questions = document.getElementsByName('questionsText');
		if (questions[0].value === "" || answersText[0].value === "") {
			questions[0].value = "Be sure to fill your questions out completely." +
			"  You need to fill out the question area and at least one answer area.";
			return;
		}
		if ($scope.questionsKey.length !== $scope.storeAnswersKey.length ||
			$scope.storeAnswersKey.length !== $scope.answersKey.length ||
			$scope.questionsKey.length !== $scope.answersKey.length) {
				questions[0].value = "There was an error with the " +
				"last question.  Please review and delete it before continuing.";
				return;
		}
		$scope.printAnswersKey = [];
		for (i; i < answers.length; i++) {
			if (answers[i].checked) {
				$scope.answersKey.push(answers[i].value);
			}
			$scope.printAnswersKey.push(answersText[i].value);	
		}
		$scope.questionsKey.push(questions[0].value);
		$scope.storeAnswersKey.push($scope.printAnswersKey);
		questions[0].value = "";
		for (j; j < answersText.length; j++) {
			answersText[j].value = "";
		}		
	};

	$scope.possible = function () {
		if (typeof $scope.storeAnswersKey[0] === 'undefined') {
			return;
		}
		$scope.printQuestions();
		$scope.page('reviewQuestions.html');
		var comp = ($compile)($scope.printQuestions())($scope);
		$timeout(function () {angular.element
		(document.getElementById("quizMakerForeground")).
		append(($compile)($scope.printQuestions())($scope))}, 500);
	};

	$scope.deleteQuestions = function ($event, $index) {
		var num = $event.target.value;
		var quest = document.querySelectorAll('.test');
		var answe = document.querySelectorAll('.answerArea');
		$scope.storeAnswersKey.splice($index, 1);
		$scope.answersKey.splice($index, 1);
		$scope.questionsKey.splice($index, 1);
		quest[num].innerHTML = "The question has been removed.";
		answe[num].style.visibility = 'hidden';
		answe[num].style.height = "0px";
		$event.target.parentNode.removeChild($event.target);
	};

	$scope.printQuestions = function () {
		if (typeof $scope.storeAnswersKey[0] === 'undefined') {
			return;
		}
		for (i = 0; i < $scope.storeAnswersKey.length; i++) {
			angular.element(document.getElementById("quizMakerForeground")).
			append(($compile)("<h3 class = 'test'>" + 
			$scope.questionsKey[i] + "</h3>" + "<h4 class = 'answerArea'>" +
			"<div class = 'sampleAnswers'>" + $scope.storeAnswersKey[i][0] +
			"</div>" + "<div class = 'sampleAnswers'>" + 
			$scope.storeAnswersKey[i][1] + "</div>" + 
			"<div class = 'sampleAnswers'>" + $scope.storeAnswersKey[i][2] + 
			"</div>" + "<div class = 'sampleAnswers'>" + 
			$scope.storeAnswersKey[i][3] + "</div></h4>" + 
			"<div class = 'buttonRightRelative' " + 
			"ng-click = 'deleteQuestions($event, $index)' ng-value = " + 
			i + ">Delete</div>")($scope));
		};
	console.log('successful print');
	};
}]);
