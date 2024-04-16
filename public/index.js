// This is index.js

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
