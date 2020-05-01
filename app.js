const express = require("express");
const apiRouter = require("./routes/api.router");
const app = express();
const { handle500s } = require("./controllers/errors.js");
const cors = require("cors");

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  next({ status: 404, msg: "Route not found" });
});
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use(cors());
app.use(handle500s);

module.exports = app;
