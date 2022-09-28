import fs from "fs";
import { ITransactionDto } from "../common/dtos";

export interface ITransactionService {
  getTransactionByHash(hash: string): Promise<ITransactionDto>;
  getAll(): Promise<ITransactionDto[]>;
  create(data: ITransactionDto): Promise<void>;
}

export interface IFilesService {
  writeIfNotExists(path: string, content: string): Promise<void>;
}

export interface ILoggerService {
  info(message: string, additionalInfo?: Object | string): void;
  warn(message: string, additionalInfo?: Object | string): void;
  error(message: string, additionalInfo?: Object | string): void;
}
