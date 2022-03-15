const { DataTypes } = require("sequelize");
const departmentModel = require("../models/department.model");
const sequelize = require("../configs/db.config");

const Department = departmentModel(sequelize, DataTypes);

exports.getAll = () => {
  try {
    const departments = Department.findAll();
    return departments;
  } catch (error) {}
};

exports.create = (department) => {
  try {
    const newDepartment = Department.create({
      name: department.name,
      description: department.description,
    });
    return newDepartment;
  } catch (error) {}
};
