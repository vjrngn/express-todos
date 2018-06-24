let express = require("express");
let router = express.Router();
let todosController = require("../controllers/todos");

router.get("/", todosController.index);
router.post("/", todosController.store);
router.put("/:id", todosController.update);
router.delete("/:id", todosController.destroy);

module.exports = router;
