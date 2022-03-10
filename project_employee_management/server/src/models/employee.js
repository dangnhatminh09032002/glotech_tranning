"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      department: DataTypes.STRING,
      deleted: { type: DataTypes.BOOLEAN, defaultValue: "false" },
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
