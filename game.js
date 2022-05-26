var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  for (var i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      level = 0;
      started = false;
      gamePattern = [];
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("#level-title").html("Game Over, Press A Key To Restart");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      break;
    }
  }
  userClickedPattern = [];
  if (level != 0) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

$(".btn").click(function () {
  var userChosenColour = this.id;
  if (level > 0) {
    userClickedPattern.push(userChosenColour);
  }
  console.log(userClickedPattern);
  animatePress(this.id);
  playSound(this.id);
  if (level > 0 && userClickedPattern.length === gamePattern.length) {
    checkAnswer();
  }
});
