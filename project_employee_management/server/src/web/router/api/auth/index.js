const authRouter = require("express").Router();
const middleware = require("../../../middleware");

//---- all: "./api/auth" ----//
authRouter.get("/verify", middleware.verifyJWT, (req, res, next) => {
  res.status(200).json({ auth: true, message: "Token is valid" });
});
authRouter.use("/", require("./auth"));

module.exports = authRouter;
