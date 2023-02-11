const { Type } = require("../models/model.js");
const ErrorHandler = require("../error/errorHandler.js");
class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.send(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.send(types);
  }
}
module.exports = new TypeController();
