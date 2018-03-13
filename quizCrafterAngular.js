var app = new angular.module("quizCraft", ["ngRoute"]);

app.controller("colorMod",['$scope', '$compile', '$http', '$window', '$timeout', function ($scope, $compile, $http, $window, $timeout) {
	
	$scope.pbRed = 0;
	$scope.pbBlue = 0;
	$scope.pbGreen = 0;
	$scope.ptRed = 255;
	$scope.ptBlue = 255;
	$scope.ptGreen = 255;
	$scope.abRed = 0;
	$scope.abBlue = 0;
	$scope.abGreen = 0;
	$scope.atRed = 255;
	$scope.atBlue = 255;
	$scope.atGreen = 255;
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
	
	console.log($scope.paragraph);
	
    $scope.page = function (file) {
		$http.get(file).then(function(response) {
		$scope.myWelcome = response.data;
		console.log($scope.myWelcome);
	}).then(function(response) {
        var html = $compile($scope.myWelcome)($scope);
		document.getElementById('quizMakerForeground').innerHTML = "";
        angular.element(document.getElementById("quizMakerForeground")).append(html);
	})};
	
	$scope.colorChange = function () {
		document.getElementsByClassName('test')[0].style.backgroundColor = "rgb(" + $scope.red + "," + $scope.green + "," +
		$scope.blue + ")";
                };
	
	
    var d = document.getElementsByClassName('inputBox'),
	isDown = false,
    isLong = false,
    target,                                         // which element was clicked
    longTID,
	longTimer;                                       // so we can cancel timer
// add listener for elements

// mouseup need to be monitored on a "global" element or we might miss it if
// we move outside the original element.

$scope.toggleColorIncrease = function (color, scopeVal, num, aspect) {
	$window.addEventListener("mouseup", handleMouseUp);
	console.log(aspect);
	
  isDown = true;                                   // button status (any button here)
  isLong = false;                                   // longpress status reset
  target = this;                                    // store this as target element
  clearTimeout(longTID);                            // clear any running timers
  longTID = setTimeout(longPressIncrease(color, scopeVal, num, aspect), 3000);  // create a new timer for this click
  console.log(color);
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
	elem[0].style.backgroundColor = "rgb(" + $scope.pbRed + "," + $scope.pbGreen + "," +
	$scope.pbBlue + ")";
	elem[0].style.color = "rgb(" + $scope.ptRed + "," + $scope.ptGreen + "," +
	$scope.ptBlue + ")";
  } else if (aspect ==='answerArea') {
	elem[0].style.backgroundColor = "rgb(" + $scope.abRed + "," + $scope.abGreen + "," +
	$scope.abBlue + ")";
	elem[0].style.color = "rgb(" + $scope.atRed + "," + $scope.atGreen + "," +
	$scope.atBlue + ")";
  }
  console.log(color);
  }}, 40);
  // throw custom event or call code for long press
}

$scope.toggleColorDecrease = function (color, scopeVal, num, aspect) {
	$window.addEventListener("mouseup", handleMouseUp);
	console.log(aspect);
	
  isDown = true;                                   // button status (any button here)
  isLong = false;                                   // longpress status reset
  target = this;                                    // store this as target element
  clearTimeout(longTID);                            // clear any running timers
  longTID = setTimeout(longPressDecrease(color, scopeVal, num, aspect), 3000);  // create a new timer for this click
  console.log(color);
  if (color === 0) {
  return;
  }
  color -= 1;
  $scope[scopeVal] = color;
  d[num].innerHTML = $scope[scopeVal];
};

function longPressDecrease(color, scopeVal, num, aspect) {
	console.log(color);
   longTimer = setInterval(function () {
  if (color === 0) {
  return;
  } else {
  color -= 1;
  $scope[scopeVal] = color;
  d[num].innerHTML = $scope[scopeVal];
  var elem = document.getElementsByClassName(aspect);
  console.log(aspect);
  if (aspect === 'test') {
  elem[0].style.backgroundColor = "rgb(" + $scope.pbRed + "," + $scope.pbGreen + "," +
		$scope.pbBlue + ")";
		elem[0].style.color = "rgb(" + $scope.ptRed + "," + $scope.ptGreen + "," +
		$scope.ptBlue + ")";
  } else if (aspect === 'answerArea') {
		elem[0].style.backgroundColor = "rgb(" + $scope.abRed + "," + $scope.abGreen + "," +
		$scope.abBlue + ")";
		elem[0].style.color = "rgb(" + $scope.atRed + "," + $scope.atGreen + "," +
		$scope.atBlue + ")";
  }
  console.log(aspect);
  }}, 40);
  // throw custom event or call code for long press
}

function handleMouseUp() {
  if (isDown && isLong) {                           // if a long press, cancel
    isDown = false;                                 // clear in any case
    return;
  }
  if (isDown) {                                     // if we came from down status:
      clearTimeout(longTID);  	  // clear timer to avoid false longpress
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

//Begin pushing quiz information
$scope.answersKey = [];  //stores correct answers
 //holds all answers to print for nest array
$scope.storeAnswersKey = []; //holds all answer values for a question
$scope.questionsKey = []; //holds all question values 
$scope.collectData = function () {
	$scope.printAnswersKey = [];
	var i = 0;
	var answers = document.getElementsByName('answers');
	var answersText = document.getElementsByName('answersText');
	var questions = document.getElementsByName('questionsText');
	for (i; i < answers.length; i++) {
		if (answers[i].checked) {
			$scope.answersKey.push(answersText[i].value);
			console.log($scope.answersKey);
		}
		$scope.printAnswersKey.push(answersText[i].value);
		
	}
	$scope.interim = [$scope.printAnswersKey];
	$scope.questionsKey.push(questions[0].value);
	$scope.storeAnswersKey.push($scope.printAnswersKey);
	
	console.log("questions are " + $scope.storeAnswersKey);
	
};

$scope.possible = function () {
	if (typeof $scope.storeAnswersKey[0] === 'undefined') {
		return;
	}
	$scope.printQuestions();
	console.log($scope.storeAnswersKey[0][0]);
	$scope.page('reviewQuestions.html');
	var comp = ($compile)($scope.printQuestions())($scope);
	console.log('content equals:  ' + comp);
	$timeout(function () {angular.element(document.getElementById("quizMakerForeground")).append(($compile)($scope.printQuestions())($scope))}, 2000);
};

$scope.printQuestions = function () {
	if (typeof $scope.storeAnswersKey[0] === 'undefined') {
		return;
	}
	for (i = 0; i < $scope.storeAnswersKey.length; i++) {
		angular.element(document.getElementById("quizMakerForeground")).append(($compile)(
		"<h3 class = 'test'>" + 
		$scope.questionsKey[i] + "</h3>" + "<h4 class = 'answerArea'>" +
		"<div class = 'sampleAnswers'>" + $scope.storeAnswersKey[i][0] +
		"</div>" + "<div class = 'sampleAnswers'>" + $scope.storeAnswersKey[i][1] 
		+"</div>" + "<div class = 'sampleAnswers'>" + $scope.storeAnswersKey[i][2] 
		+"</div>" + "<div class = 'sampleAnswers'>" + $scope.storeAnswersKey[i][3] 
	+"</div></h4>")($scope));
	console.log($scope.storeAnswersKey[i][0] + " " + $scope.storeAnswersKey[i][1]);
	};
	console.log('successful print');
};


}]);

