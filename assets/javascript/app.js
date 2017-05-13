$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML...this will trigger the start button

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {

		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>TIME'S UP!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/loser.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);    
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  // used to give the user more time to view results of a win  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/loser.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is the largest bone in the human body?", "How many bones are in the human body?", "What approximate percentage of H2O is composed of the human body?", "How fast is the air speed of a cough on average?", "What is the function of the inferior vena cavae?", "How long does it take for a human toe nail take to grow from base to tip?", "Between which two trimesters approximately does a human fetus develop finger prints?", "How many strands of hair does a person lose on average in a day?"];
var answerArray = [["Femur", "Humerus", "Phalange", "Darwin"], ["209","206","215","007"], ["20%", "90%", "70%", "40%"], ["10mph","20mph","40mph","60mph"], ["blood flow to aortic arch", "transport oxygenated blood to the common corotid artery", "Transport lymphatic fluid to the brain", "transport deoxygenated blood to the heart"], ["180 days","4 weeks","1 year","12 days"], ["first only", "first & second", "second & third", "fetus has no finger prints"], ["10","30-50","1,200","40-100"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/femur.jpg'>", "<img class='center-block img-right' src='assets/images/206.jpg'>", "<img class='center-block img-right' src='assets/images/70-percent.jpg'>", "<img class='center-block img-right' src='assets/images/cough-speed.jpg'>", "<img class='center-block img-right' src='assets/images/70-percent.jpg'>", "<img class='center-block img-right' src='assets/images/long-nails-style-funny.jpg'>", "<img class='center-block img-right' src='assets/images/baby-prints.jpg'>", "<img class='center-block img-right' src='assets/images/hair-loss.jpg'>"];
var correctAnswers = ["A. Femur", "B. 206", "C. 70%", "C. 40mph", "D. transport deoxygenated blood to the heart", "A. 180 days", "B. first & second", "D. 40-100"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
