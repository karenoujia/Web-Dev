var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Start the game on first keyboard press
$(document).on("keydown", function() {
  if(!started) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
})

// Randomly generate a color and add to game sequence
function nextSequence() {
  userClickedPattern = [];
  //Increase the level and update heading
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  // Flash the button and play the corresponding sound
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//Detect which button is clicked and add to user clicked pattern
$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  // Play sound and display shadow effect
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
})

// Check user clicked pattern against game pattern
function checkAnswer(lastIndex) {
  if (gamePattern[lastIndex] === userClickedPattern[lastIndex]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("You Lost! Press Any Key to Restart");
    startOver();
  }
}

// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//Play sound for the pressed button
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// Produce shading effect on pressed button for 100ms
function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
