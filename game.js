
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start game on keypress
document.addEventListener("keydown", function () {
  if (!started) {
    document.querySelector("#level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

// User button click
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });
});

// Check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
    startOver();
  }
}

// Next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").textContent = "Level " + level;

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  let button = document.querySelector("#" + randomChosenColor);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 100);

  playSound(randomChosenColor);
}

// Play sound
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Button animation
function animatePress(currentColor) {
  let button = document.querySelector("#" + currentColor);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 100);
}

// Restart game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
