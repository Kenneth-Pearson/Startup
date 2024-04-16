// This is index.js
async function login() {
  const nameEl = document.querySelector("#name");
  const passEl = document.querySelector("#password");
  passedInfo = { username: nameEl, password: passEl };
  // if user exists, login protocol
  // // check that username and password match
  // // token
  // // set username local storage
  // // move to play.html

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

  localStorage.setItem("username", nameEl.value);
  window.location.href = "play.html";
}

function logout() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("username", "Login_To_Track_Your_Score");
  window.location.href = "play.html";
}

const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const DB = require("./database.js");

const authCookieName = "token";

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
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

// CreateAuth token for a new user
// apiRouter.post('/auth/create', async (req, res) => {
//   if (await DB.getUser(req.body.email)) {
//     res.status(409).send({ msg: 'Existing user' });
//   } else {
//     const user = await DB.createUser(req.body.email, req.body.password);

//     // Set the cookie
//     setAuthCookie(res, user.token);

//     res.send({
//       id: user._id,
//     });
//   }
// });

// // GetAuth token for the provided credentials
// apiRouter.post('/auth/login', async (req, res) => {
//   const user = await DB.getUser(req.body.email);
//   if (user) {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       setAuthCookie(res, user.token);
//       res.send({ id: user._id });
//       return;
//     }
//   }
//   res.status(401).send({ msg: 'Unauthorized' });
// });

// // DeleteAuth token if stored in cookie
// apiRouter.delete('/auth/logout', (_req, res) => {
//   res.clearCookie(authCookieName);
//   res.status(204).end();
// });

// // GetUser returns information about a user
// apiRouter.get('/user/:email', async (req, res) => {
//   const user = await DB.getUser(req.params.email);
//   if (user) {
//     const token = req?.cookies.token;
//     res.send({ email: user.email, authenticated: token === user.token });
//     return;
//   }
//   res.status(404).send({ msg: 'Unknown' });
// });

// // secureApiRouter verifies credentials for endpoints
// var secureApiRouter = express.Router();
// apiRouter.use(secureApiRouter);

// secureApiRouter.use(async (req, res, next) => {
//   authToken = req.cookies[authCookieName];
//   const user = await DB.getUserByToken(authToken);
//   if (user) {
//     next();
//   } else {
//     res.status(401).send({ msg: 'Unauthorized' });
//   }
// });

// // GetScores
// secureApiRouter.get('/scores', async (req, res) => {
//   const scores = await DB.getHighScores();
//   res.send(scores);
// });

// // SubmitScore
// secureApiRouter.post('/score', async (req, res) => {
//   const score = { ...req.body, ip: req.ip };
//   await DB.addScore(score);
//   const scores = await DB.getHighScores();
//   res.send(scores);
// });

// // Default error handler
// app.use(function (err, req, res, next) {
//   res.status(500).send({ type: err.name, message: err.message });
// });

// // Return the application's default page if the path is unknown
// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

// // setAuthCookie in the HTTP response
// function setAuthCookie(res, authToken) {
//   res.cookie(authCookieName, authToken, {
//     secure: true,
//     httpOnly: true,
//     sameSite: 'strict',
//   });
// }

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });
