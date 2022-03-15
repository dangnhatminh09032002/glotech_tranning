const { DataTypes } = require("sequelize");
const departmentModel = require("../models/employee.models");
const sequelize = require("../configs/db.config");

const Employee = departmentModel(sequelize, DataTypes);

exports.findAll = async () => {
  try {
    const employees = await Employee.findAll({
      where: { deleted: false },
      orderBy: [["id", "ASC"]],
    });
    return employees;
  } catch (error) {
    return error;
  }
};

exports.findByPk = async (id) => {
  try {
    const employee = await Employee.findByPk(id, {
      where: { deleted: false },
    });
    return employee;
  } catch (error) {
    return error;
  }
};

exports.deleteOne = async (id) => {
  try {
    const employee = await Employee.update(
      { deleted: true },
      {
        where: { id: id },
      }
    );
    return employee;
  } catch (error) {
    return error;
  }
};

exports.update = async (id, employee) => {
  try {
    const employeeId = await Employee.update(
      {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        department: employee.department,
      },
      {
        where: { id: id },
      }
    );
    return employeeId;
  } catch (error) {
    return error;
  }
};

exports.create = async (employee) => {
  try {
    const newEmployee = await Employee.create({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
    });
    return newEmployee;
  } catch (error) {
    return error;
  }
};
