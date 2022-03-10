const rootRoutes = require("express").Router();
const apiRouter = require("./api");

//---- all: "./" ----//
rootRoutes.use("/api", apiRouter);
rootRoutes.use("/", (req, res, next) => {
  next();
});
//------------------//

rootRoutes.use((err, req, res, next) => {});
module.exports = rootRoutes;
