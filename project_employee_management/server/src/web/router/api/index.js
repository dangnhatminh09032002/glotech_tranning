const apiRouter = require("express").Router();

//---- all: "./api" ----//
apiRouter.use("/employees", require("./employee"));
apiRouter.use("/auth", require("./auth"));
// apiRouter.use("/departments", require("./department"));
//----------------------//

apiRouter.use(function (err, req, res, next) {});

module.exports = apiRouter;
