const { authService } = require("../services");

exports.register = async (req, res, next) => {
  try {
    const resRegistry = authService.register(
      req.body.userName,
      req.body.passWord
    );
    return res.json({
      httpStatus: 200,
      body: resRegistry.data,
      message: "Registed",
    });
  } catch (error) {
    return res.json({ httpStatus: 500, error: error, message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.userName) {
      return res.json({
        httpStatus: 404,
        body: null,
        message: "User name is required",
      });
    }
    if (!req.body.passWord) {
      return res.json({
        httpStatus: 404,
        body: null,
        message: "Password is required",
      });
    }

    const resLogin = await authService.login(
      req.body.userName,
      req.body.passWord
    );

    if (resLogin.message == "User not found") {
      return res.json({
        httpStatus: 404,
        body: null,
        message: "User not found",
      });
    }

    if (resLogin.message == "Password is incorrect") {
      return res.json({
        httpStatus: 404,
        body: null,
        message: "Password is incorrect",
      });
    }

    req.session.token = resLogin.data;

    return res.json({
      httpStatus: 200,
      body: { token: resLogin.data },
      message: "Login success",
    });
  } catch (error) {
    res.json({ httpStatus: 500, error: error, message: error.message });
  }
};

exports.verifyJWT = async (req, res, next) => {
  try {
    const token = req.session.token;
    if (!token) {
      return res.json({
        httpStatus: 403,
        body: null,
        message: "No token provided",
      });
    }
    jwt.verify(token, JWT_SECRET, async (err, res) => {
      if (err) {
        return res.json({
          httpStatus: 403,
          body: null,
          message: "Invalid token",
        });
      } else {
        await authRepo.findByPk(res.id).then((user) => {
          if (res) {
            next();
          }
        });
      }
    });
  } catch (error) {
    return res.json({ httpStatus: 500, error: error, message: error.message });
  }
};
