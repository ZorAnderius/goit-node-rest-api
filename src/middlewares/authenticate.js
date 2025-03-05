import { findUser } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return next(HttpError(401, "Not authorized"));
  
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") return next(HttpError(401, "Not authorized"));

  const { data, error } = verifyToken(token);
  if (error) return next(HttpError(401, error.message));

  const user = await findUser({ email: data.email });
  if (!user) return next(HttpError(401, "Not authorized"));
  req.owner_id = user.id;
  next();
};

export default authenticate;
