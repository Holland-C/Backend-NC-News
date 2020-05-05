exports.handle405s = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  console.log(err);
  const codes = { 42703: { status: 400, msg: "Bad request" } };
  if (err.code in codes) {
    const { msg, status } = codes[err.code];
    res.status(status).send({ msg });
  }
};

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
