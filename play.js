// This is play.js
function updatePlayerName() {
    const playerNameSpan = document.getElementById("playerName");
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      playerNameSpan.textContent = storedUsername;
    }
}

updatePlayerName();