const ErrorHandler = require("../error/errorHandler");

const checkError = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).send({ error: err.message });
  }
  return res.status(500).send({ error: "Серверная ошибка" });
};
module.exports = { checkError };
