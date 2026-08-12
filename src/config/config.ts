import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";

dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });
dotenv.config();
export const config = {
  port: Number(process.env.PORT) || 5050,
  nodeEnv: env,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "libro_db",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "default_jwt_secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
};
