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

export const authLogin = async (data) => {
  const { password, email } = data;
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
  return user;
};
