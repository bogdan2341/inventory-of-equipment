module.exports = (err, req, res, next) => {
  res.status(500).send({
    status: 500,
    code: err.code || "unknown",
    name: err.name,
    message: err.message,
  });
};
