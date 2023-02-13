const Router = require("express");
const router = new Router();
const typeController = require("../controller/typeController");
const roleMiddleware = require("../middleware/roleMiddleware.js");

router.post("/", roleMiddleware("ADMIN"), typeController.create);
router.get("/", typeController.getAll);

module.exports = router;
