const express = require("express");
const app = express();

// Creating your own middleware - logging
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Built in middleware - Static file hosting
app.use(express.static("public"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

let scores = [
  ["0", -0],
  ["1", -1],
  ["2", -2],
  ["3", -3],
  ["4", -4],
  ["5", -5],
  ["6", -6],
  ["7", -7],
  ["8", -8],
  ["9", -9],
  ["10", -10],
];
//request is what comes in, response is what you send out
// Get Scores
apiRouter.get("/getscores", (_req, res) => {
  res.send(scores);
});

// Submit Scores
apiRouter.post("/submitscores", (req, res) => {
  scores = req.body;
  res.send(scores);
});

// function updateScores(scores) {
//   return scores;
// }

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Listening to a network port
const port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
