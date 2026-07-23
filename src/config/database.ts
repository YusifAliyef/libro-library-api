import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
import { Author } from "../entities/Author";
import { Book } from "../entities/Book";
import { Member } from "../entities/Member";
import { User } from "../entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5000,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Author, Book, Member, User],
  subscribers: [],
  migrations: [],
});
