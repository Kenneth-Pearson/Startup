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

let scores = [];

// GetScores
apiRouter.get("/scores", (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post("/score", (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

function updateScores(scores) {
  return scores;
}

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Listening to a network port
const port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
