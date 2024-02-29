// This is play.js
create_board();

let rock_1 = document.getElementById("rock_1");
let rock_2 = document.getElementById("rock_2");
disableVisibility("rock_1");
disableVisibility("rock_2");
updatePlayerName();
document.getElementById("start_Button").removeAttribute("disabled");
var score_counter = 0;
var num_clicks = 0;
document.getElementById("score").innerText = "Score: -";
track_clicks_bool = false;

var isFirstVisit = localStorage.getItem("firstVisit");
if (isFirstVisit === null) {
  localStorage.setItem("firstVisit", "false");
  var leaderboard = new Array(11);
  create_board();
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
  // console.log("hello");
  if (new_score !== new_lowest_score) {
    // console.log("hello");
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
  if (
    document.getElementById("player_name").innerText !==
    "Login_To_Track_Your_Score"
  ) {
    var new_score = leaderboard[10][1];
    leaderboard = leaderboard.sort((a, b) => parseInt(b[1]) - parseInt(a[1]));
    var new_lowest_score = leaderboard[10][1];
    let leaderboardJSON = JSON.stringify(leaderboard);
    localStorage.setItem("leaderboard", leaderboardJSON);
    // update_board();
    score_notifcations(new_score, new_lowest_score);
    // console.log(my_arr);
    //names
    // document.getElementById("first_name").textContent = leaderboard[0][0];
    // document.getElementById("second_name").textContent = leaderboard[1][0];
    // document.getElementById("third_name").textContent = leaderboard[2][0];
    // document.getElementById("fourth_name").textContent = leaderboard[3][0];
    // document.getElementById("fifth_name").textContent = leaderboard[4][0];
    // document.getElementById("sixth_name").textContent = leaderboard[5][0];
    // document.getElementById("seventh_name").textContent = leaderboard[6][0];
    // document.getElementById("eighth_name").textContent = leaderboard[7][0];
    // document.getElementById("ninth_name").textContent = leaderboard[8][0];
    // document.getElementById("tenth_name").textContent = leaderboard[9][0];
    // //scores
    // document.getElementById("first_score").textContent = leaderboard[0][1];
    // document.getElementById("second_score").textContent = leaderboard[1][1];
    // document.getElementById("third_score").textContent = leaderboard[2][1];
    // document.getElementById("fourth_score").textContent = leaderboard[3][1];
    // document.getElementById("fifth_score").textContent = leaderboard[4][1];
    // document.getElementById("sixth_score").textContent = leaderboard[5][1];
    // document.getElementById("seventh_score").textContent = leaderboard[6][1];
    // document.getElementById("eighth_score").textContent = leaderboard[7][1];
    // document.getElementById("ninth_score").textContent = leaderboard[8][1];
    // document.getElementById("tenth_score").textContent = leaderboard[9][1];
  }
}

//display player username
function updatePlayerName() {
  const playerNameSpan = document.getElementById("player_name");
  //console.log(playerNameSpan);
  const storedUsername = localStorage.getItem("username");
  //console.log(storedUsername)
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
      sort_scores();
    }
  }, intervalDuration);
}

//hide asteroids
function disableVisibility(id) {
  var divElement = document.getElementById(id);
  divElement.style.visibility = "hidden";
}

//show asteroids
function enableVisibility(id) {
  var divElement = document.getElementById(id);
  divElement.style.visibility = "visible";
}

//change rock location AND rock
function location_randomizer() {
  disableVisibility("rock_1");
  disableVisibility("rock_2");
  var rock_rng = Math.random();
  var x = Math.random() * 140 - 70; //*162-81; *140-70;
  var y = Math.random() * 14 - 7; //*18-9;   *14-7;
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

//accuracy formula
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

//reset relevant variables
function reset_score() {
  score_counter = 0;
  num_clicks = 0;
  document.getElementById("score").innerText = "Score: -";
}
