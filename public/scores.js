// This is scores.js

function logout() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  window.location.href = "play.html";
}
//player names
async function update_display() {
  const response = await fetch("/api/getscores");
  leaderboard = await response.json();
  console.log(leaderboard);
  for (const [i, prevScore] of leaderboard.entries()) {
    //user
    document.getElementById([i + 1] + "_name").textContent =
      leaderboard[i].username;
    //scores
    document.getElementById([i + 1] + "_score").textContent =
      leaderboard[i].score;
  }
}
update_display();
