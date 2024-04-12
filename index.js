const express = require("express");
const app = express();
const DB = require("./database.js");
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

apiRouter.post("/authentication", async (req, res) => {
  //look in database if the user alr exists
  sent_information = await req.body.username; //[Username, Password]
  if (await DB.getUser(sent_information[0])) {
    //if password match
    //{
    //....
    //}
  } else {
    DB.createUser(sent_information[0], sent_information[1]);
    //cookies...
  }
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
