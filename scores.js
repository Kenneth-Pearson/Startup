// This is scores.js
preJSONleaderboard = localStorage.getItem("leaderboard");
leaderboard = JSON.parse(preJSONleaderboard);

function logout() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  window.location.href = "play.html";
}
//player names
function update_board() {
  document.getElementById("first_name").textContent = leaderboard[0][0];
  document.getElementById("second_name").textContent = leaderboard[1][0];
  document.getElementById("third_name").textContent = leaderboard[2][0];
  document.getElementById("fourth_name").textContent = leaderboard[3][0];
  document.getElementById("fifth_name").textContent = leaderboard[4][0];
  document.getElementById("sixth_name").textContent = leaderboard[5][0];
  document.getElementById("seventh_name").textContent = leaderboard[6][0];
  document.getElementById("eighth_name").textContent = leaderboard[7][0];
  document.getElementById("ninth_name").textContent = leaderboard[8][0];
  document.getElementById("tenth_name").textContent = leaderboard[9][0];
  //scores
  document.getElementById("first_score").textContent = leaderboard[0][1];
  document.getElementById("second_score").textContent = leaderboard[1][1];
  document.getElementById("third_score").textContent = leaderboard[2][1];
  document.getElementById("fourth_score").textContent = leaderboard[3][1];
  document.getElementById("fifth_score").textContent = leaderboard[4][1];
  document.getElementById("sixth_score").textContent = leaderboard[5][1];
  document.getElementById("seventh_score").textContent = leaderboard[6][1];
  document.getElementById("eighth_score").textContent = leaderboard[7][1];
  document.getElementById("ninth_score").textContent = leaderboard[8][1];
  document.getElementById("tenth_score").textContent = leaderboard[9][1];
}
update_board();
//     var leaderboard = Array(11);
//     var isFirstVisit = localStorage.getItem("firstVisit");

//     if (isFirstVisit === null)
//     {
//         var leaderboard = new Array(11);
//         create_display();
//     }
// function create_display()
// {
// leaderboard[0] = [first_name, first_score];
// leaderboard[1] = [second_name, second_score];
// leaderboard[2] = [third_name, third_score];
// leaderboard[3] = [fourth_name, fourth_score];
// leaderboard[4] = [fifth_name, fifth_score];
// leaderboard[5] = [sixth_name, sixth_score];
// leaderboard[6] = [seventh_name, seventh_score];
// leaderboard[7] = [eighth_name, eighth_score];
// leaderboard[8] = [ninth_name, ninth_score];
// leaderboard[9] = [tenth_name, tenth_score];
// leaderboard[10] = ["Testing", "-1"];
// };

// // HUGE DEAL
// function sort_scores()
// {
// // if name != Login_To_Track_Your_Score

//     leaderboard.sort((a, b) => b[1] - a[1]);
//     // console.log(my_arr);
//     //names
//     document.getElementById("first_name").textContent = leaderboard[0][0];
//     document.getElementById("second_name").textContent = leaderboard[1][0];
//     document.getElementById("third_name").textContent = leaderboard[2][0];
//     document.getElementById("fourth_name").textContent = leaderboard[3][0];
//     document.getElementById("fifth_name").textContent = leaderboard[4][0];
//     document.getElementById("sixth_name").textContent = leaderboard[5][0];
//     document.getElementById("seventh_name").textContent = leaderboard[6][0];
//     document.getElementById("eighth_name").textContent = leaderboard[7][0];
//     document.getElementById("ninth_name").textContent = leaderboard[8][0];
//     document.getElementById("tenth_name").textContent = leaderboard[9][0];
//     //scores
//     document.getElementById("first_score").textContent = leaderboard[0][1];
//     document.getElementById("second_score").textContent = leaderboard[1][1];
//     document.getElementById("third_score").textContent = leaderboard[2][1];
//     document.getElementById("fourth_score").textContent = leaderboard[3][1];
//     document.getElementById("fifth_score").textContent = leaderboard[4][1];
//     document.getElementById("sixth_score").textContent = leaderboard[5][1];
//     document.getElementById("seventh_score").textContent = leaderboard[6][1];
//     document.getElementById("eighth_score").textContent = leaderboard[7][1];
//     document.getElementById("ninth_score").textContent = leaderboard[8][1];
//     document.getElementById("tenth_score").textContent = leaderboard[9][1];
// }
