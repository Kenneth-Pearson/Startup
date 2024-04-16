const express = require("express");
const app = express();
const DB = require("./database.js");
const bcrypt = require("bcrypt");

const authCookieName = "token";

// Creating your own middleware - logging
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Built in middleware - Static file hosting
app.use(express.static("public"));

app.use(express.json());
// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//initializing scores
let scores = [];

//request is what comes in, response is what you send out
// Get Scores

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

apiRouter.post("/authentication", async (req, res) => {
  //look in database if the user alr exists
  // sent_information = await req.body.username; //[Username, Password]
  // if (await DB.getUser(sent_information[0])) {
  //   //if password match
  //   //{
  //   //....
  //   //}
  // } else {
  //   DB.createUser(sent_information[0], sent_information[1]);
  //   //cookies...
  // }
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.status(200).send({ id: user._id });
      return;
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);

    setAuthCookie(res, user.token);

    res.status(201).send({
      id: user._id,
    });
  }

  // const sent_information = await req.body;
  // const user = await DB.getUser(sent_information.username);
  // if (user) {
  //   if (await bcrypt.compare(sent_information.password, user.password)) {
  //     localStorage.setItem("username", nameEl.value);
  //     window.location.href = "play.html";
  //     res.send(true);
  //   } else {
  //     let divElement = document.getElementById("warning");
  //     divElement.style.visibility = "visible";
  //     res.send(false);
  //   }
  // }
  // // check that username and password match
  // // token
  // // set username local storage
  // // move to play.html
  // else {
  // }
  // if user does not yet exist, sign up protocol
  // // username and password put into DB, assuming password is atleast 1 long
  // // token given
  // // set username local storage
  // // move to play.html
  // const result = await fetch("/api/authentication", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(passedInfo),
  // });
});

apiRouter.get("/getscores", async (_req, res) => {
  results = await DB.getHighScores();
  console.log(results);
  res.send(results);
});

// Submit Scores
apiRouter.post("/submitscores", async (req, res) => {
  console.log("submitscores reached");
  //console.log(req.body.score);
  DB.addScore(req.body);
  // //scores = updateScores(req.body, scores);
  // //console.log(req.body);
  // //console.log(scores);
  res.send(await DB.getHighScores()); //sends back scores
});

// Listening to a network port
const port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
// function updateScores(newScore, scores) {
//   console.log("updateScores reached");
//   let found = false;
//   for (const [i, prevScore] of scores.entries()) {
//     console.log("found");
//     if (parseInt(newScore.score) > parseInt(prevScore.score)) {
//       scores.splice(i, 0, newScore);
//       found = true;
//       break;
//     }
//   }
//   if (!found) {
//     console.log("not_found");
//     scores.push(newScore);
//   }

//   if (scores.length > 10) {
//     console.log("adjusted_size");
//     scores.length = 10;
//   }

//   return scores;
// }

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});
