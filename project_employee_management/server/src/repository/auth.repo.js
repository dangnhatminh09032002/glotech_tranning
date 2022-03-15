const { DataTypes } = require("sequelize");
const departmentModel = require("../models/user.model");
const sequelize = require("../configs/db.config");

const User = departmentModel(sequelize, DataTypes);

exports.findByUsername = async (username) => {
  try {
    const res = await User.findOne({ where: { userName: username } });
    return res.dataValues;
  } catch (error) {
    return error;
  }
};

exports.findByPk = async (id) => {
  try {
    const res = await User.findByPk(id);
    return res.dataValues;
  } catch (error) {
    return error;
  }
};

exports.create = async (username, hash) => {
  try {
    const res = await User.create({
      userName: username,
      hash: hash,
    });
    return res.dataValues;
  } catch (error) {
    return error;
  }
};
