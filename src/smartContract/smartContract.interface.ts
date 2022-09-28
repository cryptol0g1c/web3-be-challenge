import { Contract, ContractInterface, providers } from "ethers";
import { Interface } from "ethers/lib/utils";
import { ITransactionDto } from "../common/dtos";

//Create transaction details
export interface ISmartContractService {
  startRCPProvider(address: string): Promise<providers.Provider>;
  getAbi(address: string): Promise<ContractInterface>;
  getContract(
    address: string,
    contractInterface: ContractInterface,
    provider: providers.Provider
  ): Promise<Contract>;
  getInterface(fragments: string): Promise<Interface>;
  getAvaxTransaction(
    addressContract: string,
    trxHash: string
  ): Promise<ITransactionDto>;
}

export interface ITransactionResponse {
  data: any;
  value: any;
}
