// This is index.js
function login() {
  const nameEl = document.querySelector("#name");
  const passEl = document.querySelector("#password");

  localStorage.setItem("username", nameEl.value);
  window.location.href = "play.html";
}

function logout() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  window.location.href = "play.html";
}
