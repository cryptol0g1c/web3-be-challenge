import { inject, injectable } from "inversify";
import { ITransactionRepository } from "./repositories.interface";
import Transaction from "../models/transaction.model";
import { ITransactionDto } from "../../common/dtos";

@injectable()
export default class TransactionRepository implements ITransactionRepository {
  constructor() {}

  async create(data: ITransactionDto): Promise<ITransactionDto> {
    const newTransaction = new Transaction(data);
    const response = await newTransaction.save();
    return response;
  }

  async getAll(): Promise<ITransactionDto[]> {
    const response = await Transaction.find();
    return response;
  }

  async getByTransactionHash(hash: string): Promise<ITransactionDto | null> {
    const response = await Transaction.findOne({
      transactionHash: hash,
    });

    return response;
  }
}
