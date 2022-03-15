const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "jwtSecret";

const { authRepo } = require("../repository");

exports.login = async (username, password) => {
  try {
    const user = await authRepo.findByUsername(username);
    if (!user) {
      return {
        data: null,
        message: "User not found",
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const vaildPassword = bcrypt.compare(hashedPassword, user.hash);

    if (!vaildPassword) {
      return {
        data: null,
        message: "Password is incorrect",
      };
    }
    var token = jwt.sign({ id: user.id, passWord: user.passWord }, JWT_SECRET, {
      expiresIn: 300,
    });
    return { data: token, message: "Login success" };
  } catch (error) {
    return { data: null, message: error.message };
  }
};

exports.register = async (username, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await authRepo.create(username, hashedPassword);
    if (!user) {
      return {
        data: null,
        message: "User not found",
      };
    }

    return { data: user, message: "Registed" };
  } catch (error) {
    return { data: null, message: error.message };
  }
};
