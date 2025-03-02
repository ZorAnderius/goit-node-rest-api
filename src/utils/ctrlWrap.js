import { ValidationError } from "sequelize";

const ctrlWrap = (ctrl) => async (req, res, next) => {
  try {
    await ctrl(req, res);
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      error.status = 409;
    }
    if (error?.name === "SequelizeValidationError" || error instanceof ValidationError) {
      error.status = 400;
    }
    next(error);
  }
};

export default ctrlWrap;
