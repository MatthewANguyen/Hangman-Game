var game = {	
	words:["airplane", "helicopter", "rainbow", "seagull", 
				"eagle", "hummingbird", "drone", "dragonfly", "kite",
				"rocket", "pelican", "butterfly", "vulture", "sparrow"],
	guessedLetters:[],
	currentWord:"",
	currentDisplay:"",
	guess:"",
	isGame:false,
	correctGuess:false,
	lettersRemaining:0,
	userScore:0,
	guessesLeft:10,

	//Initiates a new game
	newGame: function() {
		this.currentWord = this.words[Math.floor(Math.random() * this.words.length)]; //Randomly chooses word
		this.lettersRemaining = this.currentWord.length; //Initialize the lettersRemaining counter
		//For each letter in the word that was randomly chosen
		for(i = 0; i < this.currentWord.length; i++) {
			this.currentDisplay += "_"; //Display a blank for each letter
			this.leftDisplay(); //Display the score, remaining letters, and letters guessed
		}
		document.getElementById("game").innerHTML = "<p>" + this.currentDisplay + "</p>";
	},

	//The left display holds the score, remaining guesses, and guessed letters
	leftDisplay: function() {
		document.getElementById("stats").innerHTML = "<p>Score: " + this.userScore 
			+ "</p><p>Guesses Remaining: " + this.guessesLeft + "</p><p>Guessed Letters: " 
			+ this.guessedLetters + "</p>";
	},

	//Function to restart the game state if user wins
	restartGameOnWin: function() {
		if(this.lettersRemaining == 0) {
			this.guessedLetters = [];
			this.isGame = false;
			this.userScore++;
			this.guessesLeft = 10;
			document.getElementById("game").innerHTML = "<p>" + this.currentDisplay + "</p><p>You guessed the word! Press any key to play again.</p>";
			this.leftDisplay();
			this.currentDisplay = "";
		}
	},

	restartGameOnLoss: function() {
		if(this.guessesLeft == 0) {
			this.guessedLetters = [];
			this.isGame = false;
			this.guessesLeft = 10;
			document.getElementById("game").innerHTML = "<p>" + this.currentDisplay + "</p><p>You are out of guesses! Press any key to play again.</p>";
			this.leftDisplay();
			this.currentDisplay = "";
		}
	}
}

document.onkeyup = function(event) {
	game.guess = event.key;

	//Starts a new game if a game is not currently in progress
	if(!game.isGame) {
		game.newGame();
		game.isGame = true;
	}
	//If a game is in progress, game runs here
	else {
		var tempDisplay = ""; //Initialize a placeholder that will build the next display screen
		//for loop to check every letter in the current word-to-guess
		for(i = 0; i < game.currentWord.length; i++) {
			//If guessed correctly, add correct letter to the placeholder
			if(game.guess == game.currentWord.charAt(i)) {
				tempDisplay += game.guess;
				game.correctGuess = true;
			}
			//Else will either add an underscore or previously guessed letter to placeholder
			else {
				if(game.currentDisplay.charAt(i) == "_") {
					tempDisplay += "_";
				}
				else {
					tempDisplay += game.currentDisplay.charAt(i);
				}
			}
		}
		//for loop compares the placeholder to the current display. Any differences will adjust the lettersRemaining
		for(i = 0; i < game.currentWord.length; i++) {
			if(game.currentDisplay.charAt(i) != tempDisplay.charAt(i)) {
				game.lettersRemaining--;
			}
		}
		//If incorrect guess AND a novel letter guessed, reduces the guesses allowed to user
		if(!game.correctGuess && !game.guessedLetters.includes(game.guess)) {
			game.guessesLeft--;
			game.guessedLetters.push(game.guess);
		}
		game.currentDisplay = tempDisplay; //Replace the current the screen with the placeholder
		document.getElementById("game").innerHTML = "<p>" + game.currentDisplay + "</p>";
		game.leftDisplay(); //Refreshes the score, guesses, etc.
		game.correctGuess = false; //Revert correctGuess boolean to false
		game.restartGameOnWin(); //Restarts the game on a win
		game.restartGameOnLoss(); //Restarts the game on a loss
	}
}