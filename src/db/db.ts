import mongoose from "mongoose";
import DbConfig from "../config/db.config";
import diContainer from "../../src/di-container";
import { ILoggerService } from "../services/services.interface";

export const initDb = () => {
  return mongoose
    .connect(String(DbConfig.DB_HOST), {
      user: DbConfig.DB_USER,
      pass: DbConfig.DB_PASSWORD,
    })
    .then(() => {
      diContainer.get<ILoggerService>("ILoggerService").info("Connected to DB");
    })
    .catch((error) => {
      diContainer
        .get<ILoggerService>("ILoggerService")
        .error("Error connecting to DB");
      process.exit(1);
    });
};
