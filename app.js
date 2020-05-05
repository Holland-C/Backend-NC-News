const express = require("express");
const apiRouter = require("./routes/api.router");
const app = express();
const {
  handleCustomErrors,
  handle500s,
  handlePSQLErrors,
} = require("./errors");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  next({ status: 404, msg: "Route not found" });
});
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500s);

module.exports = app;
