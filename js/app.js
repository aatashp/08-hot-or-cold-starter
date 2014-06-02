
$(document).ready(function(){
	
	// VARIABLES
		var fadeSpeed = 1000,
				feedbackReset = "Make your Guess!",
				feedbackSuccess = "Congratulations, you guessed it!",
				feedback = $("#feedback"),
				count = $("#count"),
				guessList = $("#guessList"),
				guessListItems = "#guessList li",
				userGuess = $("#userGuess"),
				guessButton = $("#guessButton"),
				numGuesses = 0,
				secret = getRandomInt(1, 100),
				previousGuess = 0;


	// FUNCTIONS
		var newGame = function() {
			feedback.text(feedbackReset);
			count.text('0');
			guessList.empty();
			userGuess.val('');
			numGuesses = 0;
			previousGuess = 0;
			secret = getRandomInt(1, 100);
		}


		/*--- Returns a random integer between min and max ---*/
		function getRandomInt(min, max) {
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		var checkGuess = function(event) {
			var userGuessNo = userGuess.val(),
					feedbackText = "";

			event.preventDefault();
			userGuess.val('');

			if (feedback.text() == feedbackSuccess) {
				alert("Start a new game!");
				return;
			}

			feedback.text(feedbackReset);

			feedbackText = validateGuess(userGuessNo);
			if(feedbackText.length > 0) {
				feedback.text(feedbackText);
				return;
			}

			count.text(++numGuesses);
			userGuessNo = parseInt(userGuessNo, 10);
			guessList.append("<li>" + userGuessNo + "</li>");
			feedbackText = compareUserGuess(userGuessNo);
			feedback.text(feedbackText);
			previousGuess = userGuessNo;
		}


		var compareUserGuess = function(currentGuess) {
			var arr = $(guessListItems),
					deltaCurrent = Math.abs(secret - currentGuess),
					deltaPrevious = Math.abs(secret - previousGuess),
					outputText = "";

			if (currentGuess == previousGuess) {
				return "Don't repeat yourself, try a new number!";
			}

			/*--- Loop to check if this was already guessed ---*/
			for(i=0;i<arr.length-1;i++) {
				//console.log(parseInt($(arr[i]).text(), 10) + ":" + currentGuess);
				if(parseInt($(arr[i]).text(), 10) == currentGuess) {
					return "Oops! You already guessed this one before. Try a different number.";
				}
			}

			/*--- Absolute and Relative Feedback ---*/
			if (deltaCurrent >= 50) {
				outputText = "It's Freezing" + relativeFeedback(deltaCurrent, deltaPrevious);
			} else if (deltaCurrent < 50 && deltaCurrent >= 30) {
				outputText = "It's Cold" + relativeFeedback(deltaCurrent, deltaPrevious);
			} else if (deltaCurrent < 30 && deltaCurrent >= 20) {
				outputText = "It's Warm" + relativeFeedback(deltaCurrent, deltaPrevious);
			} else if (deltaCurrent < 20 && deltaCurrent >= 10) {
				outputText = "It's Hot" + relativeFeedback(deltaCurrent, deltaPrevious);
			} else if (deltaCurrent < 10 && deltaCurrent >= 1) {
				outputText = "It's very Hot" + relativeFeedback(deltaCurrent, deltaPrevious);
			} else if (deltaCurrent == 0) {
				outputText = feedbackSuccess;
			}

			return outputText;
		}

		var relativeFeedback = function(deltaCurrent, deltaPrevious) {
			if (previousGuess > 0) {
				if (deltaCurrent > deltaPrevious) {
					return " and you're getting colder.";
				} else if (deltaCurrent < deltaPrevious) {
					return " and you're getting warmer.";
				}
			}

			return "";
		}

		var validateGuess = function(userGuess) {
			if (userGuess.trim().length == 0 || isNaN(userGuess) || parseInt(userGuess, 10) < 1 || parseInt(userGuess, 10) > 100) {
				return "Enter a number between 1 and 100";
			} else if (userGuess%1 != 0) {
				return "Enter a whole number";
			}

			return "";
		}


	// EVENT HANDLER
		/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(fadeSpeed);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(fadeSpeed);
  	});

  	/*--- Start a new game ---*/
  	$(".new").on("click", newGame);

  	$("form").on("submit", checkGuess);


  // INITIALIZE

});


/*
			if (deltaCurrent > deltaPrevious && previousGuess > 0) {
				outputText = "It's Colder";
			} else if (deltaCurrent < deltaPrevious && previousGuess > 0) {
				outputText = "It's Warmer";
			} else if (deltaCurrent == deltaPrevious && previousGuess > 0) {
				outputText = "Neither Colder nor Warmer!";
			} else if (deltaCurrent >= 50 && previousGuess == 0) {
				outputText = "It's Freezing!";
			} else if (deltaCurrent < 50 && deltaCurrent >= 30 && previousGuess == 0) {
				outputText = "It's Cold!";
			} else if (deltaCurrent < 30 && deltaCurrent >= 20 && previousGuess == 0) {
				outputText = "It's Warm!";
			} else if (deltaCurrent < 20 && deltaCurrent >= 10 && previousGuess == 0) {
				outputText = "It's Hot!";
			} else if (deltaCurrent < 10 && deltaCurrent >= 1 && previousGuess == 0) {
				outputText = "It's very Hot!";
			} else {
				outputText = "Congratulations, you guessed it!";
			}
*/