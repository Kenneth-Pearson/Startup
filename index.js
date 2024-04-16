//This is backend index.js
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const DB = require("./database.js");

const authCookieName = "token";

// Built in middleware - Static file hosting
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static("public"));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set("trust proxy", true);

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
apiRouter.delete("/logout", (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.post("/authentication", async (req, res) => {
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
});

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

// Get Scores
secureApiRouter.get("/getscores", async (_req, res) => {
  results = await DB.getHighScores();
  res.send(results);
});

// Submit Scores
secureApiRouter.post("/submitscores", async (req, res) => {
  DB.addScore(req.body);
  res.send(await DB.getHighScores()); //sends back scores
});

// Listening to a network port
const port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
