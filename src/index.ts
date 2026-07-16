import express from "express";
import { AppDataSource } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

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