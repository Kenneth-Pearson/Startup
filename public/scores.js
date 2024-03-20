// This is scores.js

function logout() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  window.location.href = "play.html";
}
//player names
async function update_display() {
  const response = await fetch("/api/getscores");
  leaderboard = response.json();
  document.getElementById("first_name").textContent = leaderboard[0].username;
  document.getElementById("second_name").textContent = leaderboard[1].username;
  document.getElementById("third_name").textContent = leaderboard[2].username;
  document.getElementById("fourth_name").textContent = leaderboard[3].username;
  document.getElementById("fifth_name").textContent = leaderboard[4].username;
  document.getElementById("sixth_name").textContent = leaderboard[5].username;
  document.getElementById("seventh_name").textContent = leaderboard[6].username;
  document.getElementById("eighth_name").textContent = leaderboard[7].username;
  document.getElementById("ninth_name").textContent = leaderboard[8].username;
  document.getElementById("tenth_name").textContent = leaderboard[9].username;
  //scores
  document.getElementById("first_score").textContent = leaderboard[0].score;
  document.getElementById("second_score").textContent = leaderboard[1].score;
  document.getElementById("third_score").textContent = leaderboard[2].score;
  document.getElementById("fourth_score").textContent = leaderboard[3].score;
  document.getElementById("fifth_score").textContent = leaderboard[4].score;
  document.getElementById("sixth_score").textContent = leaderboard[5].score;
  document.getElementById("seventh_score").textContent = leaderboard[6].score;
  document.getElementById("eighth_score").textContent = leaderboard[7].score;
  document.getElementById("ninth_score").textContent = leaderboard[8].score;
  document.getElementById("tenth_score").textContent = leaderboard[9].score;
}
update_display();
