import request from "supertest";
import bcrypt from "bcrypt";
import app from "../src/app.js";
import envVariables from "../src/constants/envVariables.js";
import env from "../src/utils/env.js";
import User from "../src/db/models/User.js";
import { subscribeList } from "../src/constants/authVar.js";

const PORT = env(envVariables.PORT);

const loginData = {
  email: "john@gmail.com",
  password: "123456",
};

const loginWrongEmail = {
  email: "wrangemail@gmail.com",
  password: "123456",
};

const loginWrongPassword = {
  email: "john@gmail.com",
  password: "wrongpassword",
};

describe("test /api/auth/login", () => {
  let server = null;
  beforeAll(() => {
    server = app.listen(PORT);
  });

  afterAll(() => {
    server.close();
  });

  test("login with correct data", async () => {
    const {
      status,
      body: { data },
    } = await request(app).post("/api/auth/login").send(loginData);

    expect(status).toBe(200);

    expect(data).toHaveProperty("token");
    expect(typeof data.token).toBe("string");
    expect(data.token).toBeTruthy();
    expect(data.token).not.toBe("");

    expect(data).toHaveProperty("user");
    expect(typeof data.user.email).toBe("string");
    expect(data.user).toHaveProperty("email", loginData.email);

    expect(data.user).toHaveProperty("subscription");
    expect(typeof data.user.subscription).toBe("string");
    expect(subscribeList.includes(data.user.subscription)).toBe(true);

    const user = await User.findOne({
      where: {
        email: loginData.email,
      },
    });

    expect(user).toBeTruthy();
  });

  test("error when email is wrong'Email or password is wrong'", async () => {
    const { status, body } = await request(app)
      .post("/api/auth/login")
      .send(loginWrongEmail);
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Email or password is wrong");
  });

  test("error when password is wrong 'Email or password is wrong'", async () => {
    const { status, body } = await request(app)
      .post("/api/auth/login")
      .send(loginWrongPassword);

    const user = await User.findOne({
      where: { email: loginWrongPassword.email },
    });
      
      expect(user).toBeTruthy();
      
    const passwordCompare = await bcrypt.compare(
      loginWrongPassword.password,
      user.password
    );

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Email or password is wrong");
    expect(passwordCompare).toBe(false);
  });
});
