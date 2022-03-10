const rootRoutes = require("./router");

//---- origin: "./" ----//
const web = (app) => {
  app.use("/", rootRoutes);
};

module.exports = web;
