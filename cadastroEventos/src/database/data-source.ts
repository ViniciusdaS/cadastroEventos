import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql", // ✅ troca de "mysql" para "sqlite"
  database: process.env.DATABASE, // ✅ nome do arquivo SQLite
  synchronize: true,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});