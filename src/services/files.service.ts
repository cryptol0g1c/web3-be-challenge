import { appendFile, createWriteStream, existsSync, WriteStream } from "fs";

import { inject, injectable } from "inversify";
import { IFilesService, ILoggerService } from "./services.interface";

@injectable()
export default class FilesService implements IFilesService {
  constructor(
    @inject("ILoggerService")
    private readonly loggerService: ILoggerService
  ) {}

  async writeIfNotExists(path: string, content: string): Promise<void> {
    const existsPath = await existsSync(path);
    if (!existsPath) {
      appendFile(path, content, () => {
        this.loggerService.info(`Created and copy new file in: ${path}`);
      });
    } else {
      this.loggerService.info(`File already exists in: ${path}`);
    }
  }
}
