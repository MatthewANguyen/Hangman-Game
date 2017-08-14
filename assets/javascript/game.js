function test() {
	console.log("hello");
}

var words = ["airplane", "helicopter", "rainbow", "seagull", "eagle", "hummingbird"];
var correctLetters = [];
var currentWord;
var currentDisplay = "";
var guess;
var isGame = false;
var correctGuess = false;
var lettersRemaining = 0;

function newGame() {
	currentWord = words[Math.floor(Math.random() * words.length)];
	lettersRemaining = currentWord.length;
	for(i = 0; i < currentWord.length; i++) {
		currentDisplay += "_";
		correctLetters.push(currentWord.charAt(i));
	}
	document.getElementById("game").innerHTML = "<p>" + currentDisplay + "</p>";
}

function correctGuess() {
	document.getElementById("game").innerHTML = "whatever";
}

function wrongGuess() {

}

document.onkeyup = function(event) {
	guess = event.key;
	if(!isGame) {
		newGame();
		isGame = true;
	}
	else {
		console.log("guessed");
		var tempDisplay = "";
		for(i = 0; i < currentWord.length; i++){
			if(guess == currentWord.charAt(i)){
				lettersRemaining--;
				tempDisplay += guess;
			}
			else {
				if(currentDisplay.charAt(i) == "_") {
					tempDisplay += "_";
				}
				else {
					tempDisplay += currentDisplay.charAt(i);
				}
			}
		}
		currentDisplay = tempDisplay;
		document.getElementById("game").innerHTML = "<p>" + currentDisplay + "</p>";
	}
}