const authRouter = require("express").Router();
const middleware = require("../../../middleware");

//---- all: "./api/auth" ----//
authRouter.get("/verify", middleware.verifyJWT, (req, res, next) => {
  res.json({ httpStatus: 200, body: true, message: "Verified" });
});
authRouter.use("/", require("./auth.router"));

module.exports = authRouter;
