import express from "express";
import ctrlWrap from "../utils/ctrlWrap.js";
import { authRegisterController } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema } from "../schemas/userSchemas.js";
import isEmptyBody from "../helpers/isEmptyBody.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authRegisterSchema),
  ctrlWrap(authRegisterController)
);

export default authRouter;
