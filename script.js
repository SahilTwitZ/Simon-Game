// Array holding the button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to hold the game and user click patterns
var gamePattern = [];
var userClickedPattern = [];

// Variables to track game start status and level
var started = false;
var level = 0;

// Start the game on keypress
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Capture button clicks and check user's answer
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Check user's answer against the game pattern
function checkAnswer(currentLevel) {
  // If user's choice matches game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user completed the sequence, move to the next level
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play wrong sound, show game over effect, and restart game
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// Generate the next sequence in the game
function nextSequence() {
  userClickedPattern = []; // Reset user pattern for the new level
  level++;
  $("#level-title").text("Level " + level);
  
  // Pick a random color and add it to the game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Show and play sound for the chosen color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Play sound for the provided color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reset game variables to start a new game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
