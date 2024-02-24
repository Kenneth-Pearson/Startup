// This is play.js

disableVisibility("rock1");
disableVisibility("rock2");
updatePlayerName();
var counter = 0;
document.getElementById("score").innerText = "Score: -";

function updatePlayerName() {
    const playerNameSpan = document.getElementById("player_name");
    console.log(playerNameSpan);
    const storedUsername = localStorage.getItem("username");
    console.log(storedUsername)
    if (storedUsername) {
      playerNameSpan.textContent = storedUsername;
    }
}

function logout() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  window.location.href = "play.html";
}

async function timer(seconds) {
  if (document.getElementById("start_Button").getAttribute("disabled") === "true") 
  {
    return;
  }
  let i = seconds;
  document.getElementById("start_Button").setAttribute("disabled", true);

  const intervalDuration = 1000; // in milliseconds (1 second in this case)

  const intervalTimer = setInterval(() => {
    document.getElementById("seconds_remaining").innerText = "Time Remaining: " + i;
      i--;
      if (i < 0) {
        document.getElementById("seconds_remaining").innerText = "Time Remaining: -";
        document.getElementById("start_Button").removeAttribute("disabled");
        clearInterval(intervalTimer); // Stop the timer when countdown reaches 0
      }
  }, intervalDuration);
}

function disableVisibility(id) {
  var divElement = document.getElementById(id);
  divElement.style.visibility = 'hidden';
}

function enableVisibility(id) {
  var divElement = document.getElementById(id);
  divElement.style.visibility = 'visible';
}

add_score()
{
  counter++;
  document.getElementById("score").innerText = "Score: " + counter;
}

reset_score()
{
  document.getElementById("score").innerText = "Score: -";
}