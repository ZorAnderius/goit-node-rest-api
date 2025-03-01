import { Sequelize } from "sequelize";
import env from "../utils/env.js";
import envVariables from "../constants/envVariables.js";

const sequelize = new Sequelize({
  dialect: env(envVariables.POSTGRES_DB.DB_DIALECT),
  username: env(envVariables.POSTGRES_DB.DB_USERNAME),
  password: env(envVariables.POSTGRES_DB.DB_PASSWORD),
  host: env(envVariables.POSTGRES_DB.DB_HOST),
  database: env(envVariables.POSTGRES_DB.DB_DATABASE),
  port: env(envVariables.POSTGRES_DB.DB_PORT),
  dialectOptions: {
    ssl: true,
  },
});

try {
  await sequelize.authenticate();
  console.log("Database connection successful");
} catch (error) {
  console.error("Unable to connect to the database: ", error);
  process.exit(1);
}

export default sequelize;
