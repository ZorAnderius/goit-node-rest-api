import nodemailer from "nodemailer";
import env from "../utils/env.js";
import envVariables from "../constants/envVariables.js";

const mailUsername = env(envVariables.MAIL_USER);
const mailPassword = env(envVariables.MAIL_PASSWORD);

const nodemailerConfig = {
  host: env(envVariables.MAIL_HOST),
  port: env(envVariables.MAIL_PORT),
  secure: env(envVariables.MAIL_SECURE),
  auth: {
    user: mailUsername,
    password: mailPassword,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: mailUsername };
  return transport.sendMail(email);
};

export default sendEmail;
