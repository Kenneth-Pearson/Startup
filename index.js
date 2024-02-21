// This is index.js
function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("username", nameEl.value);
    window.location.href = "play.html";
  }


