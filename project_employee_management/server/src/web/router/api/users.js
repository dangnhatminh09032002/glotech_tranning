const usersRouter = require("express").Router();
const userController = require("../../../controllers/user");

//---- all: "./api/users" ----//
usersRouter
  .get("/", userController.getAll)
  .get("/:id", userController.getOne)
  .post("/", userController.createOne)
  .put("/:id", userController.updateOne)
  .delete("/:id", userController.deleteOne);

usersRouter.use("/", (req, res, next) => {
  next();
});
//---------------------------//

usersRouter.use((err, req, res, next) => {});

module.exports = usersRouter;
