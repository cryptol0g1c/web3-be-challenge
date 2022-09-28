import "reflect-metadata";
import { Container } from "inversify";
import { IContractConsumer } from "./workers/contractConsumer.interface";
import ContractConsumer from "./workers/contractConsumer";
import { ISmartContractService } from "./smartContract/smartContract.interface";
import SmartContractService from "./smartContract/smartContract.service";
import {
  IAbiProvider,
  IEtherscanProvider,
  ISnowtraceProvider,
} from "./smartContract/abi/abiProvider.interface";
import SnowTraceProvider from "./smartContract/abi/snowtraceProvider";
import AbiProvider from "./smartContract/abi/abiProvider";
import EtherScanProvider from "./smartContract/abi/etherscanProvider";
import TransactionRepository from "./db/repositories/transaction.repository";
import {
  IAbiRepository,
  ITransactionRepository,
} from "./db/repositories/repositories.interface";
import TransactionService from "./services/transaction.service";
import {
  IFilesService,
  ILoggerService,
  ITransactionService,
} from "./services/services.interface";
import AbiRepository from "./db/repositories/abi.repository";
import LoggerService from "./services/logger.service";
import FilesService from "./services/files.service";

export class DiContainer {
  public diContainer: Container;

  public configure(): void {
    this.diContainer = new Container();

    //Register Repositories
    this.diContainer
      .bind<ITransactionRepository>("ITransactionRepository")
      .to(TransactionRepository)
      .inSingletonScope();

    this.diContainer
      .bind<IAbiRepository>("IAbiRepository")
      .to(AbiRepository)
      .inSingletonScope();

    //Register Services
    this.diContainer
      .bind<ISmartContractService>("ISmartContractService")
      .to(SmartContractService)
      .inSingletonScope();

    this.diContainer
      .bind<ITransactionService>("ITransactionService")
      .to(TransactionService)
      .inSingletonScope();

    this.diContainer
      .bind<ILoggerService>("ILoggerService")
      .to(LoggerService)
      .inSingletonScope();

    this.diContainer
      .bind<IFilesService>("IFilesService")
      .to(FilesService)
      .inSingletonScope();

    //Register Worker
    this.diContainer
      .bind<IContractConsumer>("IContractConsumer")
      .to(ContractConsumer)
      .inSingletonScope();

    //Register External Providers
    this.diContainer
      .bind<IAbiProvider>("IAbiProvider")
      .to(AbiProvider)
      .inSingletonScope();

    this.diContainer
      .bind<ISnowtraceProvider>("ISnowtraceProvider")
      .to(SnowTraceProvider)
      .inSingletonScope();

    this.diContainer
      .bind<IEtherscanProvider>("IEtherscanProvider")
      .to(EtherScanProvider)
      .inSingletonScope();
  }
}

const diContainer = new DiContainer();
diContainer.configure();

export default diContainer.diContainer;
