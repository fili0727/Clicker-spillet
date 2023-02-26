window.addEventListener("load", start);
function start() {
  console.log("JavaScript kører!");
  points = 0;
  lives = 4;

  // Start animationer
  document
    .querySelector("#tennisball_container")
    .classList.add("tennisball_roll");
  document
    .querySelector("#tennisball_2_container")
    .classList.add("tennisball_2_roll");
  document.querySelector("#football_container").classList.add("football_roll");
  document
    .querySelector("#tennisball_container")
    .addEventListener("click", clickTennisBall);
  document
    .querySelector("#tennisball_2_container")
    .addEventListener("click", clickTennisBall2);
  document
    .querySelector("#football_container")
    .addEventListener("click", clickFootball);
}

function clickTennisBall() {
  console.log("Click Tennis Ball");
  // Forhindr gentagne clicks
  document
    .querySelector("#tennisball_container")
    .removeEventListener("click", clickTennisBall);

  // Stop coin container
  document.querySelector("#tennisball_container").classList.add("paused");

  // sæt forsvind-animation på coin
  document.querySelector("#tennisball_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  document
    .querySelector("#tennisball_container")
    .addEventListener("animationend", TennisBallgone);
  increase();
  if (points >= 10) {
    level_complete();
  }
}
function TennisBallgone() {
  // fjern event der bringer os herind
  document
    .querySelector("#tennisball_container")
    .removeEventListener("animationend", TennisBallgone);

  // fjern forsvind-animation
  document.querySelector("#tennisball_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#tennisball_container").classList.remove("paused");

  // genstart falling animation
  document
    .querySelector("#tennisball_container")
    .classList.remove("tennisball_roll");
  document.querySelector("#tennisball_container").offsetWidth;
  document
    .querySelector("#tennisball_container")
    .classList.add("tennisball_roll");

  // gør det muligt at klikke på coin igen
  document
    .querySelector("#tennisball_container")
    .addEventListener("click", clickTennisBall);
}

function clickTennisBall2() {
  console.log("Click Tennis Ball 2");

  document
    .querySelector("#tennisball_2_container")
    .removeEventListener("click", clickTennisBall2);

  document.querySelector("#tennisball_2_container").classList.add("paused");

  document.querySelector("#tennisball_2_sprite").classList.add("zoom_out");

  document
    .querySelector("#tennisball_2_container")
    .addEventListener("animationend", TennisBallgone2);
  increase();
  if (points >= 10) {
    level_complete();
  }
}
function TennisBallgone2() {
  document
    .querySelector("#tennisball_container")
    .removeEventListener("animationend", TennisBallgone2);
  document.querySelector("#tennisball_2_sprite").classList.remove("zoom_out");
  document.querySelector("#tennisball_2_container").classList.remove("paused");
  document
    .querySelector("#tennisball_2_container")
    .classList.remove("tennisball_2_roll");
  document.querySelector("#tennisball_2_container").offsetWidth;
  document
    .querySelector("#tennisball_2_container")
    .classList.add("tennisball_2_roll");
  document
    .querySelector("#tennisball_2_container")
    .addEventListener("click", clickTennisBall2);
}
function clickFootball() {
  console.log("Click Football");
  document
    .querySelector("#football_container")
    .removeEventListener("click", clickFootball);
  document.querySelector("#football_container").classList.add("paused");
  document.querySelector("#football_sprite").classList.add("zoom_out");
  document
    .querySelector("#football_container")
    .addEventListener("animationend", FootballGone);
  decrementedLives();
  if (lives <= 0) {
    gameover();
  }
}
function FootballGone() {
  document
    .querySelector("#football_container")
    .removeEventListener("animationend", FootballGone);
  document.querySelector("#football_sprite").classList.remove("zoom_out");
  document.querySelector("#football_container").classList.remove("paused");
  document
    .querySelector("#football_container")
    .classList.remove("football_roll");
  document.querySelector("#football_container").offsetWidth;
  document.querySelector("#football_container").classList.add("football_roll");
  document
    .querySelector("#football_container")
    .addEventListener("click", clickFootball);
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
}

function level_complete() {
  document.querySelector("#level_complete").classList.remove("hidden");
}
