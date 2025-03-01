import * as service from "../services/authServices.js";

export const authSignUpController = (req, res) => {
  service.authSignUp({ id: 1 });
};
