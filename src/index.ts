import express from "express";
import { AppDataSource } from "./config/database";
import apiRouter from "./routes"; 
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import fs from "fs";
import path from "path";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
    app.listen(PORT, () => {
      console.log(`Serverimiz ${PORT} portunda fəaliyyət göstərir.`);
    });
  })
  .catch((error) => {
    console.error("Bazaya qoşulma zamanı xəta baş verdi:", error);
  });