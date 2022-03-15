const departmentRouter = require("express").Router();
const departmentController = require("../../../../controllers/department.controller");

departmentRouter.get("/", departmentController.getAll);
departmentRouter.post("/", departmentController.create);
departmentRouter.delete("/:id", departmentController.delete);

module.exports = departmentRouter;
