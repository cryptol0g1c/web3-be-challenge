import fs from "fs";
import path from "path";

import { injectable } from "inversify";
import { ILoggerService } from "./services.interface";
import AppConfig from "../config/app.config";

@injectable()
export default class LoggerService implements ILoggerService {
  logStream: fs.WriteStream;
  constructor() {
    this.logStream = fs.createWriteStream(
      path.join(path.resolve("./"), AppConfig.InternalLogFile),
      {
        flags: "a",
      }
    );
  }

  async info(message: string, data?: Object | string): Promise<void> {
    try {
      const sdata = data ? JSON.stringify(data) : "";
      console.log(message, sdata);
    } catch {
      console.log(message, data);
    }
  }

  async warn(message: string, data?: Object | string): Promise<void> {
    try {
      const sdata = data ? JSON.stringify(data) : "";
      console.warn(message, sdata);
    } catch {
      console.log(message, data);
    }
  }

  async error(message: string, data?: Object | string): Promise<void> {
    try {
      const sdata = data ? JSON.stringify(data) : "";
      console.error(message, sdata);
      const logDate = new Date().toISOString();
      const chunk = `${logDate} - ${sdata} \n`;
      this.logStream.write(chunk);
    } catch {
      console.error(data);
      console.error("Cannot write log to file", data);
    }
  }
}
