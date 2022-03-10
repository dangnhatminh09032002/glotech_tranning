const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "jwtSecret";
const { DataTypes } = require("sequelize");

const user_model = require("../../models/User");
const sequelize = require("../../configs/db.config");

const User = user_model(sequelize, DataTypes);

exports.verifyJWT = (req, res, next) => {
  try {
    const token = req.session.token;
    console.log(token);
    if (!token) {
      res.send("You need a token to access this");
    } else {
      jwt.verify(token, JWT_SECRET, async (err, res) => {
        if (err) {
          res.json({ auth: false, message: "Token is not valid" });
        } else {
          await User.findByPk(res.id).then((user) => {
            if (res) {
              next();
            }
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
