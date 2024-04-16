// This is scores.js

async function logout() {
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  await fetch(`/api/logout`, {
    method: "delete",
  });
  window.location.href = "index.html";
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

async function get_image() {
  image = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=GiL09jgswbhtmZ8bsL0Ze07Jm1OjFwfQNJSdfAVk"
  );
  image_json = await image.json();
  image_element = document.getElementById("get_image");
  image_element.setAttribute("src", image_json.url);
}
get_image();
