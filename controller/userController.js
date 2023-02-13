const ErrorHandler = require("../error/errorHandler");
const { Basket, User } = require("../models/model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
};
class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler(404, "Не заданны данные"));
    }
    const condidate = await User.findOne({ where: { email } });
    if (condidate) {
      return next(
        new ErrorHandler(404, `Пользователь с таким ${email} уже существует`)
      );
    }
    const hashPass = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPass });
    const basket = await Basket.create({ userId: user.id });
    const token = generateToken(user);
    return res.send({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(new ErrorHandler(404, "Пользователь не найден"));
    }
    const decodePass = await bcrypt.compare(password, user.password);
    if (!decodePass) {
      return next(new ErrorHandler(404, "Не верный пароль"));
    }
    const token = generateToken(user);
    return res.send({ token });
  }

  async check(req, res, next) {
    try {
      const { id } = req.query;
      if (!id) {
        throw new ErrorHandler(404, "Не задан id");
      }
      res.send({id});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
