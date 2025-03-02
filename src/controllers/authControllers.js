import * as service from "../services/authServices.js";

export const authRegisterController = async (req, res) => {
  const result = await service.authRegister(req.body);
  res.status(201).json({
    status: 201,
    message: "Signup successfully",
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

export const authLoginController = async (req, res) => {
  const result = await service.authLogin(req.body);
  res.json({
    status: 200,
    message: "User successfully log in",
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};
