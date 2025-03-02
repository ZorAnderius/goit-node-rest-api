import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";

const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const authRegister = async (data) => {
  const { password, email } = data;

  const isExist = await findUser({ email });
  if (isExist) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 14);

  const newUser = await User.create({ ...data, password: hashPassword });
  return newUser;
};
