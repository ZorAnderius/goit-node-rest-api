import { Sequelize } from "sequelize";
import env from "../utils/env.js";
import variablesDB from "../utils/constants/variablesDB.js";

const sequelize = new Sequelize({
  dialect: env(variablesDB.POSTGRES.DB_DIALECT),
  username: env(variablesDB.POSTGRES.DB_USERNAME),
  password: env(variablesDB.POSTGRES.DB_PASSWORD),
  host: env(variablesDB.POSTGRES.DB_HOST),
  database: env(variablesDB.POSTGRES.DB_DATABASE),
  port: env(variablesDB.PORT),
  dialectOptions: {
    ssl: true,
  },
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
    process.exit(1);
  }
};

connectToDB();

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

export default sequelize;
