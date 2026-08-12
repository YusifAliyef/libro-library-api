import express from "express";
import { AppDataSource } from "./config/database";
import { config } from "./config/config";
import apiRouter from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import fs from "fs";
import path from "path";
import { initScheduledTasks } from "./config/scheduler";

const app = express();

app.use(express.json());

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static(uploadDir));

app.use("/api", apiRouter);

app.use(errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

AppDataSource.initialize()
  .then(() => {
    console.log("PostgreSQL bazasına uğurla qoşulduq!");
    initScheduledTasks();
    app.listen(config.port, () => {
      console.log(`Server '${config.nodeEnv}' profilində ${config.port} portunda fəaliyyət göstərir.`);
    });
  })
  .catch((error) => {
    console.error("Bazaya qoşulma zamanı xəta baş verdi:", error);
  });