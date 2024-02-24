// This is index.js
function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("username", nameEl.value);
    window.location.href = "play.html";
  }

function logout() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("username", "Login_To_Track_Your_Score");
    window.location.href = "play.html";
}
// let player;

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     videoId: '9DcjaoYkAXU', // Replace with your actual video ID
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

// function onPlayerReady(event) {
//   // Player is ready, you can perform actions here
//   event.target.playVideo(); // Use event.target to refer to the player
//   document.getElementById('player').style.display = 'none';
// }


