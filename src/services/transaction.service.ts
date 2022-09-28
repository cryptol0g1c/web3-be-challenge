import { inject, injectable } from "inversify";
import { ILoggerService, ITransactionService } from "./services.interface";
import { ISmartContractService } from "../smartContract/smartContract.interface";
import { ITransactionRepository } from "../db/repositories/repositories.interface";
import SmartContractConfig from "../config/smartContracts.config";
import { ITransactionDto } from "../common/dtos";
import { InternalError, NotFoundError } from "../common/errors";

@injectable()
export default class TransactionService implements ITransactionService {
  constructor(
    @inject("ILoggerService")
    private readonly loggerService: ILoggerService,
    @inject("ISmartContractService")
    private readonly smartContractService: ISmartContractService,
    @inject("ITransactionRepository")
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async create(data: ITransactionDto): Promise<void> {
    try {
      this.transactionRepository.create(data);
      this.loggerService.info("Transaction created");
    } catch (error) {
      throw new InternalError("Cannot create transaction", error);
    }

    return;
  }

  async getAll(): Promise<ITransactionDto[]> {
    try {
      return this.transactionRepository.getAll();
    } catch (error) {
      throw new InternalError("Cannot getall transactions", error);
    }
  }

  async getTransactionByHash(hash: string): Promise<ITransactionDto> {
    try {
      const trx = await this.transactionRepository.getByTransactionHash(hash);
      if (trx) {
        return trx;
      } else {
        const transaction = await this.smartContractService.getAvaxTransaction(
          SmartContractConfig.JOE_DOE_CONTRACT_ADDRESS,
          hash
        );

        if (!transaction) {
          throw new NotFoundError({ hash });
        }

        return await this.transactionRepository.create(transaction);
      }
    } catch (error) {
      const msg = "Cannot Get Transaction By Hash";
      this.loggerService.error(msg);
      throw new InternalError(msg, error);
    }
  }
}
