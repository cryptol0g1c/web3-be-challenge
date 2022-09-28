import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import diContainer from "./src/di-container";
import { IContractConsumer } from "./src/workers/contractConsumer.interface";
import { transactionRoutes } from "./src/api/routes/transaction.routes";
import { initDb } from "./src/db/db";
import errorHandler from "./src/api/middlewares/error-handler.middleware";
import AppConfig from "./src/config/app.config";
import swaggerUi from "swagger-ui-express";

dotenv.config();

var accessLogStream = fs.createWriteStream(
  path.join(path.resolve("./"), "access.log"),
  {
    flags: "a",
  }
);

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());

//Using logger middleware
app.use(morgan("combined", { stream: accessLogStream }));

app.use(transactionRoutes);
app.use(errorHandler);

//Initialize DB
initDb();

app.get("/health", (req: Request, res: Response) => {
  res.send("Server is running ok");
});

const server = app.listen(AppConfig.PORT, () => {
  console.log(`Server is running at https://localhost:${AppConfig.PORT}`);
});

//Start Consumer
diContainer.get<IContractConsumer>("IContractConsumer").start();

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "./swagger.json",
    },
  })
);

//Todo: Move this to termination signals.
process.on("exit", () => {
  console.log("Server is shutting down");
  server.close();
});

process.on("SIGINT", () => {
  console.log("Server is shutting down");
  server.close();
});
