const envVariables = Object.freeze({
  PORT: "PORT",
  JWT_SECRET: "JWT_SECRET",
  POSTGRES_DB: {
    DB_DIALECT: "DB_DIALECT",
    DB_USERNAME: "DB_USERNAME",
    DB_PASSWORD: "DB_PASSWORD",
    DB_DATABASE: "DB_DATABASE",
    DB_HOST: "DB_HOST",
    DB_PORT: "DB_PORT",
  },
});

export default envVariables;
