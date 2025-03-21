import path from "node:path";
import fs from "node:fs/promises";
import HttpError from "../helpers/HttpError.js";
import * as service from "../services/authServices.js";

const avatarPath = path.resolve("public", "avatars");

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

export const verifyEmailController = async (req, res) => {
  const { verificationToken } = req.params;
  const result = await service.verifyEmail(verificationToken);
  if (!result) throw HttpError(404, "User not found");
  res.json({
    status: 200,
    message: "Verification successful",
  });
};

export const resendVerifyController = async (req, res) => {
  const { email } = req.body;
  const result = await service.resendVerify(email);
  if (!result) throw HttpError(404, "User not found");
  res.json({
    status: 200,
    message: "Verification email sent",
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

export const userUpdateSubscriptionController = async (req, res) => {
  const { id } = req.user;
  const result = await service.userUpdateSubscription(id, req.body);
  if (!result) throw HttpError(401, "Not authorized");
  res.json({
    status: 200,
    message: "Subscription updated successfully",
    data: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

export const userAvatarUpdateController = async (req, res) => {
  if (!req.file) throw HttpError(400, "Image is missing");

  const { path: oldPath, filename } = req.file;

  if (!req.file?.mimetype?.includes("image")) {
    await fs.unlink(oldPath);
    throw HttpError(400, "Wrong file type");
  }

  const { id } = req.user;
  const newPath = path.join(avatarPath, filename);
  try {
    await fs.rename(oldPath, newPath);
  } catch (error) {
    await fs.unlink(oldPath);
    throw HttpError(500, "Failed to move the file");
  }

  const avatarUrl = path.join("avatars", filename);

  const result = await service.userAvatarUpdate(id, avatarUrl);
  if (!result) {
    await fs.unlink(newPath);
    throw HttpError(401, "Not authorized");
  }
  res.json({
    status: 200,
    message: "User avatar was successfully updated",
    data: {
      avatarURL: result.avatarURL,
    },
  });
};
