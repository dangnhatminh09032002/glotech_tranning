const authRouter = require("express").Router();

const { authController } = require("../../../../controllers");

//---- all: "./api/auth" ----//
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
//---------------------------//
module.exports = authRouter;
