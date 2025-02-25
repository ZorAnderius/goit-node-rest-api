import { validate } from "uuid";
import HttpError from "./HttpError.js";

const isValidID =
  (idName = "id") =>
  (req, _, next) => {
    const id = req.params[idName];
    const isCustomID = /^[a-zA-Z0-9\-_]{10,30}$/.test(id);
    const isUuidID = validate(id);

    if (isCustomID || isUuidID) return next();

    return next(HttpError(400, "Invalid ID"));
  };

export default isValidID;
