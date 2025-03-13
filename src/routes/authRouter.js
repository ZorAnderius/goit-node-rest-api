import express from "express";
import {
  authCurrentUser,
  authLoginController,
  authLogoutController,
  authRegisterController,
  userAvatarUpdateController,
  userUpdateSubscriptionController,
} from "../controllers/authControllers.js";
import {
  authRegisterSchema,
  authLoginSchema,
  userUpdateSubscriptionSchema,
} from "../schemas/userSchemas.js";
import ctrlWrap from "../utils/ctrlWrap.js";
import validateBody from "../middlewares/validateBody.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  isEmptyBody,
  validateBody(authRegisterSchema),
  ctrlWrap(authRegisterController)
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authLoginSchema),
  ctrlWrap(authLoginController)
);

authRouter.get("/current", authenticate, ctrlWrap(authCurrentUser));

authRouter.patch(
  "/subscription",
  authenticate,
  isEmptyBody,
  validateBody(userUpdateSubscriptionSchema),
  ctrlWrap(userUpdateSubscriptionController)
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrap(userAvatarUpdateController)
);

authRouter.get("/verify/:verificationToken", );

authRouter.post("/logout", authenticate, ctrlWrap(authLogoutController));

export default authRouter;
