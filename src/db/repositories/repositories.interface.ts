import { IAbiDto, ITransactionDto } from "../../common/dtos";

export interface ITransactionRepository {
  create(data: ITransactionDto): Promise<ITransactionDto>;
  getByTransactionHash(hash: string): Promise<ITransactionDto | null>;
  getAll(): Promise<ITransactionDto[]>;
}

export interface IAbiRepository {
  create(data: IAbiDto): Promise<void>;
  getAbi(address: string): Promise<IAbiDto | null>;
}
