const apiRouter = require("express").Router();

//---- all: "./api" ----//
apiRouter.use("/employees", require("./employees"));
apiRouter.use("/auth", require("./auth"));
//----------------------//

apiRouter.use(function (err, req, res, next) {});

module.exports = apiRouter;
