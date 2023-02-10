const ErrorHandler = require("../error/errorHandler");

class UserController {
  async registration(req, res) {}

  async login(req, res) {}

  async check(req, res, next) {
    try {
      const { id } = req.query;
      if (!id) {
        throw new ErrorHandler(404, "Не задан id");
      }
      res.send(id);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
