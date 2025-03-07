import app from "./src/app.js";
import envVariables from "./src/constants/envVariables.js";
import env from "./src/utils/env.js";

const PORT = env(envVariables.PORT);

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
