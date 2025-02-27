import { validate } from "uuid";
import HttpError from "./HttpError.js";

const isValidID =
  (idName = "id") =>
  (req, _, next) => {
    const id = req.params[idName];
    const isNumber = /^\d+$/.test(id);
    const isUuidID = validate(id);

    if (isNumber || isUuidID) return next();

    return next(HttpError(400, "Invalid ID"));
  };

export default isValidID;
