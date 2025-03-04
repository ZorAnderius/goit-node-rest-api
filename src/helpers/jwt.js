import jwt from "jsonwebtoken";
import env from "../utils/env.js";
import envVariables from "../constants/envVariables.js";

const JWT_SECRET = env(envVariables.JWT_SECRET);

export const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

export const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return { data };
  } catch (error) {
    return { error };
  }
};
