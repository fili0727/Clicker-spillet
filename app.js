"use strict";
let points;
let lives;

window.addEventListener("load", ready);

function ready() {
  console.log("JavaScript kører!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document
    .querySelector("#btn_go_to_start")
    .addEventListener("click", showStartScreen);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
}
function startGame() {
  points = 0;
  lives = 4;
  resetLives();
  resetPoints();
  showGameScreen();
  //Skjul startskærm
  document.querySelector("#start").classList.add("hidden");
  // Start tid
  startTimer();
  // Start animationer
  startAnimation();
  startPositioner();

  registrerClick();
  animationRepeat();
}
function startTimer() {
  document.querySelector("#time_sprite").classList.add("shrink");

  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", timeIsUp);
}
function resetLives() {
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");
  document.querySelector("#heart4").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
  document.querySelector("#heart3").classList.add("active_heart");
  document.querySelector("#heart4").classList.add("active_heart");
}
function resetPoints() {
  // Nulstil point
  points = 0;
  // Nustil visning af point
  displayScore();
}
function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function registrerClick() {
  document
    .querySelector("#tennisball_container")
    .addEventListener("click", clickTennisBall);
  document
    .querySelector("#tennisball_2_container")
    .addEventListener("click", clickTennisBall);
  document
    .querySelector("#football_container")
    .addEventListener("click", clickFootball);
  document
    .querySelector("#football_2_container")
    .addEventListener("click", clickFootball);
}
function startPositioner() {
  document.querySelector("#tennisball_container").classList.add("position1");
  document.querySelector("#tennisball_2_container").classList.add("position2");
  document.querySelector("#football_container").classList.add("position3");
  document.querySelector("#football_2_container").classList.add("position4");
}
function startAnimation() {
  document.querySelector("#tennisball_container").classList.add("roll");
  document.querySelector("#tennisball_2_container").classList.add("roll");
  document.querySelector("#football_container").classList.add("roll");
  document.querySelector("#football_2_container").classList.add("roll");
}
function clickTennisBall() {
  console.log("Click Tennis Ball");
  // Forhindr gentagne clicks
  let tennisball = this;
  tennisball.removeEventListener("click", clickTennisBall);

  // Stop tennisball container
  tennisball.classList.add("paused");

  // sæt forsvind-animation på coin
  tennisball.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  tennisball.addEventListener("animationend", TennisBallgone);
  increase();
  if (points >= 10) {
    level_complete();
  }
}
function TennisBallgone() {
  // fjern event der bringer os herind
  let tennisball = this;
  tennisball.removeEventListener("animationend", TennisBallgone);

  // fjern forsvind-animation
  tennisball.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  tennisball.classList.remove("paused");

  // genstart falling animation
  tennisball.classList.remove("roll");
  tennisball.offsetWidth;
  tennisball.classList.add("roll");

  // gør det muligt at klikke på coin igen
  tennisball.addEventListener("click", clickTennisBall);
}
function animationRepeat() {
  console.log("hej");
  document
    .querySelector("#tennisball_container")
    .addEventListener("animationend", ballRestart);
  document
    .querySelector("#tennisball_2_container")
    .addEventListener("animationend", ballRestart);
  document
    .querySelector("#football_container")
    .addEventListener("animationend", ballRestart);
  document
    .querySelector("#football_2_container")
    .addEventListener("animationend", ballRestart);
}
function ballRestart() {
  let ball = this;
  ball.classList.remove("roll");
  ball.offsetWidth;
  ball.classList.add("roll");
  ball.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );
  let pos = Math.floor(Math.random() * 5) + 1;
  ball.classList.add("position" + pos);
  ball.classList.remove("speed1", "speed2", "speed3", "speed4");
  let speed = Math.floor(Math.random() * 4) + 1;
  ball.classList.add("speed" + speed);
}

function clickFootball() {
  console.log("Click Football");
  let football = this;
  football.removeEventListener("click", clickFootball);
  football.classList.add("paused");
  football.querySelector("img").classList.add("zoom_out");
  football.addEventListener("animationend", FootballGone);
  decrementedLives();
  if (lives <= 0) {
    gameover();
  }
}
function FootballGone() {
  let football = this;
  football.removeEventListener("animationend", FootballGone);
  football.querySelector("img").classList.remove("zoom_out");
  football.classList.remove("paused");
  football.classList.remove("football_roll");
  football.offsetWidth;
  football.classList.add("football_roll");
  football.addEventListener("click", clickFootball);
}

function displayScore() {
  console.log("display");
  document.querySelector("#tennisball_score").textContent = points;
}
function increase() {
  console.log("increase");
  points = points + 1;
  displayScore();
}

function decrementedLives() {
  console.log("decrementedLives");
  displayDecrementedLives();
  lives--;
}
function displayDecrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}
function gameover() {
  document.querySelector("#game_over").classList.remove("hidden");
  stopGame();
}

function level_complete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  stopGame();
}
function showStartScreen() {
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}
function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 10) {
    levelComplete();
  } else {
    gameover();
  }
}

function stopGame() {
  //Stop Animation
  document.querySelector("#tennisball_container").classList.remove("roll");
  document.querySelector("#tennisball_2_container").classList.remove("roll");
  document.querySelector("#football_container").classList.remove("roll");
  document.querySelector("#football_2_container").classList.remove("roll");
  //Fjern click
  document
    .querySelector("#tennisball_container")
    .removeEventListener("click", clickTennisBall);
  document
    .querySelector("#tennisball_2_container")
    .removeEventListener("click", clickTennisBall);
  document
    .querySelector("#football_container")
    .removeEventListener("click", clickFootball);
  document
    .querySelector("#football_2_container")
    .removeEventListener("click", clickFootball);
}
