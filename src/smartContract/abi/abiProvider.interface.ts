import { ContractInterface } from "ethers";

export interface IAbiProvider {
  getAbi(address: string): Promise<ContractInterface>;
}

export interface ISnowtraceProvider extends IAbiProvider {}
export interface IEtherscanProvider extends IAbiProvider {}
