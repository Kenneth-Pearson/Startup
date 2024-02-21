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