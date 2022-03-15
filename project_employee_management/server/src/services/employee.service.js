const { employeeRepo } = require("../repository");

exports.getEmployees = async () => {
  try {
    const employees = await employeeRepo.findAll();
    return { data: employees, message: "success" };
  } catch (error) {
    return { error: error, message: error.message };
  }
};

exports.getEmployee = async (id) => {
  try {
    const employee = await employeeRepo.findByPk(id);
    return { data: employee, message: "success" };
  } catch (error) {
    return { error: error, message: error.message };
  }
};

exports.deleteEmployee = async (id) => {
  try {
    const employeeId = await employeeRepo.deleteOne(id);
    return { data: employeeId, message: "success" };
  } catch (error) {
    return { error: error, message: error.message };
  }
};

exports.updateEmployee = async (id, employee) => {
  try {
    const newEmployee = await employeeRepo.update(id, employee);
    return { data: newEmployee, message: "success" };
  } catch (error) {
    return { error: error, message: error.message };
  }
};

exports.createEmployee = async (employee) => {
  try {
    const newEmployee = await employeeRepo.create(employee);
    return { data: newEmployee, message: "success" };
  } catch (error) {
    return { error: error, message: error.message };
  }
};
