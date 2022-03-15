const { employeeService } = require("../services");

exports.getAllEmployee = async function (req, res, next) {
  try {
    const resService = await employeeService.getEmployees();
    return res.json({
      httpStatus: 200,
      body: resService.data,
      message: resService.message,
    });
  } catch (error) {
    return res.json({ httpStatus: 500, error: error, message: error.message });
  }
};

exports.getOneEmployee = async function (req, res, next) {
  try {
    const resService = await employeeService.getEmployee(req.params.id);
    return res.json({
      httpStatus: 200,
      body: resService.data,
      message: resService.message,
    });
  } catch (error) {
    return res.json({ httpStatus: 500, error: error, message: error.message });
  }
};

exports.deleteOneEmployee = async function (req, res, next) {
  try {
    const resService = await employeeService.deleteEmployee(req.params.id);
    return res.json({
      httpStatus: 200,
      body: resService.data,
      message: resService.message,
    });
  } catch (error) {
    return res.json({ httpStatus: 500, error: error, message: error.message });
  }
};

exports.updateOneEmployee = async function (req, res, next) {
  try {
    const resService = await employeeService.updateEmployee(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      department: req.body.department,
    });
    return res.json({
      httpStatus: 200,
      body: resService.data,
      message: resService.message,
    });
  } catch (error) {
    return res.json({ httpStatus: 500, error: error, message: error.message });
  }
};

exports.createOneEmployee = async function (req, res, next) {
  try {
    const resService = await employeeService.createEmployee({
      firstName: req.body.firstName || "",
      lastName: req.body.lastName || "",
      email: req.body.email || "",
      department: req.body.department || "",
    });

    return res.json({
      httpStatus: 200,
      body: resService.data,
      message: resService.message,
    });
  } catch (error) {
    return res.json({ httpStatus: 500, error: error, message: error.message });
  }
};
