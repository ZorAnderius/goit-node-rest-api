import { findUser } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.header;
  if (!authorization)
    return next(HttpError(401, "Authorization header missing"));
  
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") return next(HttpError(401, "Bearer is missing"));

  const { data, error } = verifyToken(token);
  if (error) return next(HttpError(401, error.message));

  const isExist = await findUser({ email: data.email });
  if (!isExist) return next(HttpError(401, "User not found"));
  next();
};

export default authenticate;
