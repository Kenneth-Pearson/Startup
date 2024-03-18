// This is play.js
let leaderboard = new Array(11);
let rock_1 = document.getElementById("rock_1");
let rock_2 = document.getElementById("rock_2");
disableVisibility("rock_1");
disableVisibility("rock_2");
updatePlayerName();
document.getElementById("start_Button").removeAttribute("disabled");
let score_counter = 0;
let num_clicks = 0;
document.getElementById("score").innerText = "Score: -";
track_clicks_bool = false;

let isFirstVisit = localStorage.getItem("firstVisit");
if (isFirstVisit === null) {
  localStorage.setItem("firstVisit", "false");
  create_board();
} else {
  preJSONleaderboard = localStorage.getItem("leaderboard");
  leaderboard = JSON.parse(preJSONleaderboard);
}

function create_board() {
  leaderboard[0] = ["None", "-1"];
  leaderboard[1] = ["None", "-2"];
  leaderboard[2] = ["None", "-3"];
  leaderboard[3] = ["None", "-4"];
  leaderboard[4] = ["None", "-5"];
  leaderboard[5] = ["None", "-6"];
  leaderboard[6] = ["None", "-7"];
  leaderboard[7] = ["None", "-8"];
  leaderboard[8] = ["None", "-9"];
  leaderboard[9] = ["None", "-10"];
  leaderboard[10] = ["Player_Space", "-100"];
  let leaderboardJSON = JSON.stringify(leaderboard);
  localStorage.setItem("leaderboard", leaderboardJSON);
}

function score_notifcations(new_score, new_lowest_score) {
  if (new_score !== new_lowest_score) {
    let x = document.getElementById("score").innerText.replace("Score: ", "");
    for (let i = 0; i < leaderboard.length; i++) {
      if (
        leaderboard[i][1] === x &&
        leaderboard[i][0] === document.getElementById("player_name").innerText
      ) {
        if (i === 0) {
          //first
          document.getElementById("score_update").innerText =
            document.getElementById("player_name").innerText +
            " took 1st on the leaderboard.";
        } else if (i === 1) {
          //second
          document.getElementById("score_update").innerText =
            document.getElementById("player_name").innerText +
            " took 2nd on the leaderboard.";
        } else if (i === 2) {
          //third
          document.getElementById("score_update").innerText =
            document.getElementById("player_name").innerText +
            " took 3rd on the leaderboard.";
        } //fourth through tenth
        else {
          document.getElementById("score_update").innerText =
            document.getElementById("player_name").innerText +
            " took " +
            (i + 1) +
            "th on the leaderboard.";
        }
      }
    }
  } // You scored ___ points.
  else {
    document.getElementById("score_update").innerText =
      "You scored " +
      document.getElementById("score").innerText.replace("Score: ", "") +
      " points.";
  }
}

// HUGE DEAL
function sort_scores() {
  preJSONleaderboard = localStorage.getItem("leaderboard");
  leaderboard = JSON.parse(preJSONleaderboard);
  //calls score_notifications
  if (
    document.getElementById("player_name").innerText !==
    "Login_To_Track_Your_Score"
  ) {
    let new_score = leaderboard[10][1];
    leaderboard = leaderboard.sort((a, b) => parseInt(b[1]) - parseInt(a[1]));
    let new_lowest_score = leaderboard[10][1];
    let leaderboardJSON = JSON.stringify(leaderboard);
    localStorage.setItem("leaderboard", leaderboardJSON);
    // update_board();
    score_notifcations(new_score, new_lowest_score);
    // console.log("hello");
    fetch("/api/submitscores")
      .then((r) => r.json())
      .then((j) => console.log(j));
  }
}

//display player username
function updatePlayerName() {
  const playerNameSpan = document.getElementById("player_name");
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    playerNameSpan.textContent = storedUsername;
  }
}
//removes player username display
function logout() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  window.location.href = "play.html";
}

//logic for the videogame
function timer(seconds) {
  // calls enableVisibility // calls reset_score
  //prevent button spam
  if (
    document.getElementById("start_Button").getAttribute("disabled") === "true"
  ) {
    return;
  }
  //game start
  document.getElementById("seconds_remaining").innerText =
    "Time Remaining: " + (seconds + 1);
  enableVisibility("rock_1");
  let i = seconds;
  reset_score();
  document.getElementById("start_Button").setAttribute("disabled", true);
  track_clicks_bool = true;
  num_clicks--;

  const intervalDuration = 1000; //1000 milliseconds

  const intervalTimer = setInterval(() => {
    //game time display
    document.getElementById("seconds_remaining").innerText =
      "Time Remaining: " + i;
    i--;
    //game end
    if (i < 0) {
      track_clicks_bool = false;
      document.getElementById("seconds_remaining").innerText =
        "Time Remaining: -";
      document.getElementById("start_Button").removeAttribute("disabled");
      disableVisibility("rock_1");
      disableVisibility("rock_2");
      clearInterval(intervalTimer); // Stop the timer when countdown reaches 0
      leaderboard[10][0] = document.getElementById("player_name").innerText;
      let justNumber = document
        .getElementById("score")
        .innerText.replace("Score: ", "");
      leaderboard[10][1] = justNumber;
      // console.log("hello?");
      sort_scores();
    }
  }, intervalDuration);
}

//hide asteroids
function disableVisibility(id) {
  let divElement = document.getElementById(id);
  divElement.style.visibility = "hidden";
}

//show asteroids
function enableVisibility(id) {
  let divElement = document.getElementById(id);
  divElement.style.visibility = "visible";
}

//change rock location AND rock //calls disableVisiblity //calls enableVisibility
function location_randomizer() {
  disableVisibility("rock_1");
  disableVisibility("rock_2");
  let rock_rng = Math.random();
  let x = Math.random() * 140 - 70; //*162-81; *140-70;
  let y = Math.random() * 14 - 7; //*18-9;   *14-7;
  if (rock_rng > 0.5) {
    rock_1.style.transform =
      "translate(" + x.toString() + "vh, " + y.toString() + "vw)";
    enableVisibility("rock_1");
  } else {
    rock_2.style.transform =
      "translate(" + x.toString() + "vh, " + y.toString() + "vw)";
    enableVisibility("rock_2");
  }
}

//accuracy formula //calls randomizer
function calculate_score() {
  location_randomizer();
  score_counter++;
  if (num_clicks === 0) {
    document.getElementById("score").innerText = "Score: " + score_counter;
  } else {
    document.getElementById("score").innerText =
      "Score: " + Math.floor(score_counter * (score_counter / num_clicks));
  }
}

//track missed and successful clicks
function add_num_clicks() {
  if (track_clicks_bool === true) {
    num_clicks++;
    if (num_clicks === 0) {
      document.getElementById("score").innerText = "Score: -";
    } else {
      document.getElementById("score").innerText =
        "Score: " + Math.floor(score_counter * (score_counter / num_clicks));
    }
  }
}

//reset relevant letiables
function reset_score() {
  score_counter = 0;
  num_clicks = 0;
  document.getElementById("score").innerText = "Score: -";
}
