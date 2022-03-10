const cookieParser = require("cookie-parser");
const errorhandler = require("errorhandler");
const session = require("express-session");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

require("./src/configs/db.config");

// Create global app object
const app = express();

// Init variable ENV
const {
  HTTP_ONLY = false,
  PORT = 8080,
  SES_NAME = "sid",
  SES_SECRET = "secret",
  NODE_ENV = "development",
  SES_LIFETIME = 1000 * 60 * 60 * 2,
} = process.env;
const IN_PRODUCT = NODE_ENV === "production" || false;
const isProduction = process.env.NODE_ENV === "production";

// Normal express config defaults
if (NODE_ENV === "development") app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    name: SES_NAME,
    secret: SES_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: HTTP_ONLY,
      maxAge: SES_LIFETIME,
      secure: IN_PRODUCT,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));

if (!isProduction) {
  app.use(errorhandler());
}

// Passport
// require("./src/configs/passport.config");

// Router for server
const web = require("./src/web");
web(app);

// Run listening server
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
