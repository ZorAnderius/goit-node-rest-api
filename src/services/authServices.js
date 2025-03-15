import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { createToken } from "../helpers/jwt.js";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import generateAvatar from "../utils/generateAvatar.js";
import sendEmail from "../helpers/sendEmail.js";

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
  const verificationToken = uuid4();

  try {
    await sendEmail(email, verificationToken);
  } catch (error) {
    throw HttpError(500, "Register verify email error");
  }

  const newUser = await User.create({
    ...data,
    avatarURL,
    password: hashPassword,
    verificationToken,
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
  if (!user.verify) throw HttpError(401, "Email is not verify");

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

export const verifyEmail = async (verificationToken) => {
  const user = await findUser({ verificationToken });
  if (!user) return null;
  return user.update(
    { verificationToken: null, verify: true },
    {
      returning: true,
    }
  );
};

export const resendVerify = async (email) => {
  const user = await findUser({ email });
  if (!user) return null;
  if (user.verify) throw HttpError(404, "Verification has already been passed");
  try {
    await sendEmail(email, user.verificationToken);
  } catch (error) {
    throw HttpError(500, "Register verify email error");
  }
  return true;
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
