import { DataSource } from "typeorm";
import "reflect-metadata";
import { Author } from "../entities/Author";
import { Book } from "../entities/Book";
import { Member } from "../entities/Member";
import { User } from "../entities/User";
import { Category } from "../entities/Category";
import { config } from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.nodeEnv === "development", 
  logging: config.nodeEnv === "development",
  entities: [Author, Book, Member, User, Category],
  subscribers: [],
  migrations: [],
});