const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "jwtSecret";
const { DataTypes } = require("sequelize");

const user_model = require("../../models/user.model");
const sequelize = require("../../configs/db.config");

const User = user_model(sequelize, DataTypes);

exports.verifyJWT = (req, res, next) => {
  try {
    const token = req.session.token;
    if (!token) {
      res.status(403).json({ message: "No token provided", body: false });
    } else {
      jwt.verify(token, JWT_SECRET, async (err, res) => {
        if (err) {
          res.status(403).json({ message: "Invalid token", body: false });
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
    return res.json({ error: error, message: error.message, body: false });
  }
};
