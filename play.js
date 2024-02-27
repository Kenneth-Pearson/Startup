// This is play.js

var rock_1 = document.getElementById("rock_1");
var rock_2 = document.getElementById("rock_2");
disableVisibility("rock_1");
disableVisibility("rock_2");
updatePlayerName();
document.getElementById("start_Button").removeAttribute("disabled");
var score_counter = 0;
var num_clicks = 0;
document.getElementById("score").innerText = "Score: -";
add_clicks_bool = false;

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
async function timer(seconds) {
  //prevent button spam
  if (document.getElementById("start_Button").getAttribute("disabled") === "true") 
  {
    return; 
  }
  //game start
  document.getElementById("seconds_remaining").innerText = "Time Remaining: " + (seconds+1);
  enableVisibility("rock_1");
  let i = seconds;
  reset_score();
  document.getElementById("start_Button").setAttribute("disabled", true);
  add_clicks_bool = true;
  num_clicks--;

  const intervalDuration = 1000; //1000 milliseconds

  const intervalTimer = setInterval(() => {
    //game time display
    document.getElementById("seconds_remaining").innerText = "Time Remaining: " + i;
      i--;
      //game end
      if (i < 0) {
        add_clicks_bool = false;
        document.getElementById("seconds_remaining").innerText = "Time Remaining: -";
        document.getElementById("start_Button").removeAttribute("disabled");
        disableVisibility("rock_1");
        disableVisibility("rock_2");
        clearInterval(intervalTimer); // Stop the timer when countdown reaches 0
      }
  }, intervalDuration);
}

//hide asteroids
function disableVisibility(id) {
  var divElement = document.getElementById(id);
  divElement.style.visibility = 'hidden';
}

//show asteroids
function enableVisibility(id) {
  var divElement = document.getElementById(id);
  divElement.style.visibility = 'visible';
}

//change rock location 
function location_randomizer()
{
  disableVisibility("rock_1");
  disableVisibility("rock_2");
  var rock_rng = Math.random();
  var x = Math.random()*162-81;
  var y = Math.random()*18-9;
  if (rock_rng > 0.5)
  {
    rock_1.style.transform = "translate(" + x.toString() + "vh, " + y.toString() + "vw)";
    enableVisibility("rock_1");
  }
  else
  {
    rock_2.style.transform = "translate(" + x.toString() + "vh, " + y.toString() + "vw)";  
    enableVisibility("rock_2");
  }
}

//accuracy formula
function calculate_score()
{         
  location_randomizer()       
  score_counter++;
  if (num_clicks === 0)
  {
    document.getElementById("score").innerText = "Score: " + score_counter;
  }
  else
  {  
    document.getElementById("score").innerText = "Score: " + Math.floor(score_counter*(score_counter/num_clicks));
  }
}

//track missed and successful clicks
function add_num_clicks()
{
  if (add_clicks_bool === true)
  {
    num_clicks++;
    if (num_clicks === 0)
    {
      document.getElementById("score").innerText = "Score: -";
    }
    else
    {
    document.getElementById("score").innerText = "Score: " + Math.floor(score_counter*(score_counter/num_clicks));
    }
  }
}

//reset relevant variables
function reset_score()
{
  score_counter = 0;
  num_clicks = 0;
  document.getElementById("score").innerText = "Score: -";
}