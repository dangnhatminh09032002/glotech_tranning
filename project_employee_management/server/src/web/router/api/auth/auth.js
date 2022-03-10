const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

const user_model = require("../../../../models/User");
const sequelize = require("../../../../configs/db.config");
const User = user_model(sequelize, DataTypes);
const JWT_SECRET = process.env.JWT_SECRET || "jwtSecret";

//---- all: "./api/auth" ----//
authRouter.post("/register", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.passWord, salt);

    try {
      const user = await User.create({
        userName: req.body.userName,
        passWord: req.body.passWord,
        hash: hashedPassword,
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (err) {
    res.status(505).json(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    if (!req.body.userName) {
      return res.send("You have not entered your email");
    }
    if (!req.body.passWord) {
      return res.send("You have not entered your password");
    }
    const user = await User.findOne({ where: { userName: req.body.userName } });
    if (!user) {
      return res.status(404).send("Email or password is incorrect");
    }

    const vaildPassword = await bcrypt.compare(req.body.passWord, user.hash);

    if (!vaildPassword) {
      return res.status(404).send("Email or password is incorrect");
    }
    var token = jwt.sign({ id: user.id, passWord: user.passWord }, JWT_SECRET, {
      expiresIn: 300,
    });

    req.session.token = token;

    res.status(200).json({ auth: true, token: token });
  } catch (error) {
    res.status(500).json({ auth: false });
  }
});
//---------------------------//
module.exports = authRouter;
