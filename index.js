const express = require("express");
const app = express();

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
apiRouter.get("/getscores", (_req, res) => {
  res.send(scores);
});

// Submit Scores
apiRouter.post("/submitscores", (req, res) => {
  console.log("submitscores reached");
  //console.log(req.body.score);
  scores = updateScores(req.body, scores);
  //console.log(req.body);
  console.log(scores);
  res.send(scores); //sends back scores
});

// Listening to a network port
const port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
function updateScores(newScore, scores) {
  console.log("updateScores reached");
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    console.log("found");
    if (parseInt(newScore.score) > parseInt(prevScore.score)) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }
  if (!found) {
    console.log("not_found");
    scores.push(newScore);
  }

  if (scores.length > 10) {
    console.log("adjusted_size");
    scores.length = 10;
  }

  return scores;
}
