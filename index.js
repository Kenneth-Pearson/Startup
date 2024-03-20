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

//request is what comes in, response is what you send out
// Get Scores
apiRouter.get("/getscores", (_req, res) => {
  res.send(scores);
});

// Submit Scores
apiRouter.post("/submitscores", (req, res) => {
  console.log("submitscores reached");
  console.log(req.body.score);
  scores = updateScores(req.body, scores);
  console.log(req.body);
  res.send(scores); //sends back scores
});

// Listening to a network port
const port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

let scores = [];
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }
  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}
