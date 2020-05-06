exports.handle405s = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  const codes = {
    "42703": { status: 400, msg: "Bad request" },
    "22P02": { status: 400, msg: "Incorrect request type" },
    "23503": { status: 404, msg: "Article not found" },
  };
  if (err.code in codes) {
    const { msg, status } = codes[err.code];
    res.status(status).send({ msg });
  }
};

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
