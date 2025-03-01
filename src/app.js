import express from "express";
import morgan from "./helpers/morganConfig.js";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import env from "./utils/env.js";
import envVariables from "./constants/envVariables.js";

const app = express();
const PORT = env(envVariables.PORT);

app.use(morgan("tiny-colored"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
