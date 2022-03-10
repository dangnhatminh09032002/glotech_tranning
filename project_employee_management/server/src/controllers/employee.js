const { DataTypes } = require("sequelize");
const employee_model = require("../models/employee");
const sequelize = require("../configs/db.config");

const Employee = employee_model(sequelize, DataTypes);

exports.getAllEmployee = async function (req, res, next) {
  try {
    const employees = await Employee.findAll({
      where: { deleted: false },
      orderBy: [["id", "ASC"]],
    });
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOneEmployee = async function (req, res, next) {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      where: { deleted: false },
    });
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOneEmployee = async function (req, res, next) {
  try {
    const EMPLOYEE_MODEL = { deleted: true };
    const employee = await Employee.update(EMPLOYEE_MODEL, {
      where: { id: req.params.id },
    });
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json(error);
  }
  // try {
  //   const employeeId = await Employee.destroy({ where: { id: req.params.id } });
  //   return res.status(200).json(employeeId);
  // } catch (error) {
  //   return res.status(500).json(error);
  // }
};

exports.updateOneEmployee = async function (req, res, next) {
  try {
    const EMPLOYEE_MODEL = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      department: req.body.department,
    };

    try {
      const employee = await Employee.update(EMPLOYEE_MODEL, {
        where: { id: req.params.id },
      });
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {}
};

exports.createOneEmployee = async function (req, res, next) {
  try {
    const EMPLOYEE_MODEL = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      department: req.body.department,
    };

    try {
      const employee = await Employee.create(EMPLOYEE_MODEL);
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
