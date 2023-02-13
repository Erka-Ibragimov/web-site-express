const { decode } = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method == "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).send({ message: "Не имеется токен" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decode.role !== role) {
        return res.status(403).send({ message: "Нет доступа" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).send({ message: "Пользователь не авторизован" });
    }
  };
};
