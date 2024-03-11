const express = require("express");
const app = express();

// Creating your own middleware - logging
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Built in middleware - Static file hosting
app.use(express.static("public"));

// Routing middleware
app.get("/store/:storeName", (req, res) => {
  res.send({ name: req.params.storeName });
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Listening to a network port
const port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
