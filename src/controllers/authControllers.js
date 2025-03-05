import HttpError from "../helpers/HttpError.js";
import * as service from "../services/authServices.js";

export const authRegisterController = async (req, res) => {
  const result = await service.authRegister(req.body);
  res.status(201).json({
    status: 201,
    message: "Signup successfully",
    data: result,
  });
};

export const authLoginController = async (req, res) => {
  const result = await service.authLogin(req.body);
  res.json({
    status: 200,
    message: "User successfully log in",
    data: result,
  });
};

export const authLogoutController = async (req, res) => {
  const { id } = req.user;
  const result = await service.authLogout(id);
  if (!result) throw HttpError(401, "Not authorized");
  res.status(204).send();
};

export const authCurrentUser = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: 200,
    message: "Successfully found current user",
    data: {
      email,
      subscription,
    },
  });
};
