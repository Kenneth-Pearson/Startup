// This is frontend index.js

function disableWarningVisiblity() {
  let divElement = document.getElementById("warning");
  divElement.style.visibility = "hidden"; //or visible
}
disableWarningVisiblity();

async function login() {
  const nameEl = document.querySelector("#name").value;
  const passEl = document.querySelector("#password").value;
  passedInfo = { username: nameEl, password: passEl };
  // if user exists, login protocol
  const response = await fetch("/api/authentication", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(passedInfo),
  });

  if (response.ok) {
    localStorage.setItem("username", nameEl);
    window.location.href = "play.html";
  } else {
    let divElement = document.getElementById("warning");
    divElement.style.visibility = "visible";
  }
}

function logout() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  window.location.href = "play.html";
}
