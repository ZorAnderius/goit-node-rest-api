import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import generateAvatar from "../utils/generateAvatar.js";

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const authRegister = async (data) => {
  const { password, email } = data;

  const isExist = await findUser({ email });
  if (isExist) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 14);

  const avatarURL = generateAvatar(email);
  console.log(avatarURL);

  const newUser = await User.create({
    ...data,
    avatarURL,
    password: hashPassword,
  });
  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  };
};

export const authLogin = async (data) => {
  const { password, email } = data;
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
  const token = createToken({ email });

  await user.update(
    { token },
    {
      returning: true,
    }
  );
  return {
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  };
};

export const authLogout = async (id) => {
  const user = await findUser({ id });
  if (!user) return null;
  const token = null;
  await user.update({ token });
  return true;
};

export const userUpdateSubscription = async (query, newSubscription) => {
  const user = await findUser(query);
  if (!user) return null;
  return user.update(newSubscription, {
    returning: true,
  });
};

export const userAvatarUpdate = async (id, avatarURL) => {
  const user = await findUser({ id });
  if (!user) return null;
  return user.update({ avatarURL }, { returning: true });
};
