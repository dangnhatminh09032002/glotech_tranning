const employeeRouter = require("express").Router();
const employeeController = require("../../../../controllers/employee.controller");
const middlewareWrapper = require("../../../middleware");

//---- all: "./api/employees" ----//
employeeRouter.use("/", middlewareWrapper.verifyJWT);
employeeRouter.get("/", employeeController.getAllEmployee);
employeeRouter.get("/:id", employeeController.getOneEmployee);
employeeRouter.post("/", employeeController.createOneEmployee);
employeeRouter.put("/:id", employeeController.updateOneEmployee);
employeeRouter.delete("/:id", employeeController.deleteOneEmployee);

module.exports = employeeRouter;
