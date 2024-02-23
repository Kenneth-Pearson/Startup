// This is play.js
function updatePlayerName() {
    const playerNameSpan = document.getElementById("player_name");
    console.log(playerNameSpan);
    const storedUsername = localStorage.getItem("username");
    console.log(storedUsername)
    if (storedUsername) {
      playerNameSpan.textContent = storedUsername;
    }
}

updatePlayerName();

function logout() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  window.location.href = "play.html";
}