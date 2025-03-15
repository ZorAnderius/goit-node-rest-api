import nodemailer from "nodemailer";
import env from "../utils/env.js";
import envVariables from "../constants/envVariables.js";

const mailUsername = env(envVariables.MAIL_USER);
const mailPassword = env(envVariables.MAIL_PASSWORD);
const BASE_URL = env(envVariables.BASE_URL);

const nodemailerConfig = {
  host: env(envVariables.MAIL_HOST),
  port: 465,
  secure: true,
  auth: {
    user: mailUsername,
    pass: mailPassword,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (email, verificationToken) => {
  const emailData = {
    from: mailUsername,
    to: email,
    subject: "Verify email",
    html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center;">
              <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 20px;">
                  <div style="text-align: center; background-color: #4CAF50; color: #fff; padding: 20px; border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; font-size: 24px;">Verification Request</h1>
                  </div>
                  <div style="padding: 20px; line-height: 1.6;">
                      <p>Hi,</p>
                      <p>Thank you for signing up for our service. Before starting can you verify your email?</p>
                      <p>Please click the button below to verify your email address:</p>
                      <p>
                      <a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}" style="display: block; margin: 20px auto; max-width: 200px; padding: 12px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 4px; text-align: center; font-size: 16px;">
                        Verify Email
                      </a>
                      </p>
                      <p>If you did not sign up for our service, please ignore this email.</p>
                  </div>
                  <div style="text-align: center; padding: 20px; font-size: 14px; color: #aaa;">
                      <p>Thanks,</p>
                      <p>The Our Team</p>
                      <p>If you have any questions, feel free to <a href="mailto:support@ourservice.com" style="color: #4CAF50; text-decoration: none;">contact us</a>.</p>
                  </div>
              </div>
          </div>`,
  };
  return transport.sendMail(emailData);
};

export default sendEmail;
