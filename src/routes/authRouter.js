import express from "express";
import {
  authLoginController,
  authRegisterController,
} from "../controllers/authControllers.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/userSchemas.js";
import ctrlWrap from "../utils/ctrlWrap.js";
import validateBody from "../helpers/validateBody.js";
import isEmptyBody from "../helpers/isEmptyBody.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
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

export default authRouter;
