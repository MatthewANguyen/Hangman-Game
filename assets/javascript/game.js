var words = ["airplane", "helicopter", "rainbow", "seagull", 
			"eagle", "hummingbird", "drone", "dragonfly", "kite",
			"rocket", "pelican", "butterfly", "vulture", "sparrow"];
var guessedLetters = [];
var currentWord;
var currentDisplay = "";
var guess;
var isGame = false;
var correctGuess = false;
var lettersRemaining = 0;
var userScore = 0;
var guessesLeft = 10;

//Initiates a new game
function newGame() {
	currentWord = words[Math.floor(Math.random() * words.length)]; //Randomly chooses word
	lettersRemaining = currentWord.length; //Initialize the lettersRemaining counter
	//For each letter in the word that was randomly chosen
	for(i = 0; i < currentWord.length; i++) {
		currentDisplay += "_"; //Display a blank for each letter
		leftDisplay(); //Display the score, remaining letters, and letters guessed
	}
	document.getElementById("game").innerHTML = "<p>" + currentDisplay + "</p>";
}

//The left display holds the score, remaining guesses, and guessed letters
function leftDisplay() {
	document.getElementById("stats").innerHTML = "<p>Score: " + userScore 
		+ "</p><p>Guesses Remaining: " + guessesLeft + "</p><p>Guessed Letters: " 
		+ guessedLetters + "</p>";
}

//Function to restart the game state if user wins
function restartGameOnWin() {
	if(lettersRemaining == 0) {
		guessedLetters = [];
		isGame = false;
		userScore++;
		guessesLeft = 10;
		document.getElementById("game").innerHTML = "<p>" + currentDisplay + "</p><p>You guessed the word! Press any key to play again.</p>";
		leftDisplay();
		currentDisplay = "";
	}
}

function restartGameOnLoss() {
	if(guessesLeft == 0) {
		guessedLetters = [];
		isGame = false;
		guessesLeft = 10;
		document.getElementById("game").innerHTML = "<p>" + currentDisplay + "</p><p>You are out of guesses! Press any key to play again.</p>";
		leftDisplay();
		currentDisplay = "";
	}
}

document.onkeyup = function(event) {
	guess = event.key;

	//Starts a new game if a game is not currently in progress
	if(!isGame) {
		newGame();
		isGame = true;
	}
	//If a game is in progress, game runs here
	else {
		var tempDisplay = ""; //Initialize a placeholder that will build the next display screen
		//for loop to check every letter in the current word-to-guess
		for(i = 0; i < currentWord.length; i++) {
			//If guessed correctly, add correct letter to the placeholder
			if(guess == currentWord.charAt(i)) {
				tempDisplay += guess;
				correctGuess = true;
			}
			//Else will either add an underscore or previously guessed letter to placeholder
			else {
				if(currentDisplay.charAt(i) == "_") {
					tempDisplay += "_";
				}
				else {
					tempDisplay += currentDisplay.charAt(i);
				}
			}
		}
		//for loop compares the placeholder to the current display. Any differences will adjust the lettersRemaining
		for(i = 0; i < currentWord.length; i++) {
			if(currentDisplay.charAt(i) != tempDisplay.charAt(i)) {
				lettersRemaining--;
			}
		}
		//If incorrect guess AND a novel letter guessed, reduces the guesses allowed to user
		if(!correctGuess && !guessedLetters.includes(guess)) {
			guessesLeft--;
			guessedLetters.push(guess);
		}
		currentDisplay = tempDisplay; //Replace the current the screen with the placeholder
		document.getElementById("game").innerHTML = "<p>" + currentDisplay + "</p>";
		leftDisplay(); //Refreshes the score, guesses, etc.
		correctGuess = false; //Revert correctGuess boolean to false
		restartGameOnWin(); //Restarts the game on a win
		restartGameOnLoss(); //Restarts the game on a loss
	}
}