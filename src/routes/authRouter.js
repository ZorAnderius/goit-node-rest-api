import express from "express";
import ctrlWrap from "../utils/ctrlWrap.js";
import { authSignUpController } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", ctrlWrap(authSignUpController));

export default authRouter;
