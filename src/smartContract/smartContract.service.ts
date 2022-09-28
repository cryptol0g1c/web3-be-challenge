import { Contract, ContractInterface, ethers, providers } from "ethers";
import { Interface } from "ethers/lib/utils";
import { inject, injectable } from "inversify";
import path from "path";
import { ITransactionDto } from "../common/dtos";
import SmartContractConfig from "../config/smartContracts.config";
import { IAbiRepository } from "../db/repositories/repositories.interface";
import { IFilesService, ILoggerService } from "../services/services.interface";
import { IAbiProvider } from "./abi/abiProvider.interface";
import { ISmartContractService } from "./smartContract.interface";

@injectable()
export default class SmartContractService implements ISmartContractService {
  avaxProvider: providers.Provider;

  constructor(
    @inject("ILoggerService")
    private readonly loggerService: ILoggerService,
    @inject("IFilesService")
    private readonly filesService: IFilesService,
    @inject("IAbiProvider")
    private readonly abiProvider: IAbiProvider,
    @inject("IAbiRepository")
    private readonly abiRepository: IAbiRepository
  ) {}

  async startRCPProvider(address: string): Promise<providers.Provider> {
    try {
      if (!this.avaxProvider) {
        this.avaxProvider = new ethers.providers.JsonRpcProvider(address);
        this.loggerService.info(`RCP Provider for address ${address} Created`);
      }

      this.loggerService.info(
        `RCP Provider for address ${address} Obtained from Memory`
      );
      return this.avaxProvider;
    } catch (error: any) {
      this.loggerService.error("Can not startRCPProvider", error);
      throw error;
    }
  }

  async getAbi(address: string): Promise<ContractInterface> {
    try {
      const abi = await this.abiRepository.getAbi(address);
      this.loggerService.info(`Abi for address ${address} Obtained from DB`);
      if (!abi) {
        const abiFromProvider = await this.abiProvider.getAbi(address);
        this.loggerService.info(
          `Abi for address ${address} Obtained from Provider`
        );

        const content = JSON.stringify(abiFromProvider);

        await this.abiRepository.create({
          address,
          content,
        });

        const newFilePath = path.join(path.resolve("./"), address);
        await this.filesService.writeIfNotExists(`${newFilePath}.txt`, content);

        return abiFromProvider;
      } else {
        return JSON.parse(String(abi.content));
      }
    } catch (error: any) {
      this.loggerService.error("Can not get Abi", error);
      throw error;
    }
  }

  async getContract(
    address: string,
    contractInterface: ContractInterface,
    provider: providers.Provider
  ): Promise<Contract> {
    try {
      return new ethers.Contract(address, contractInterface, provider);
    } catch (error: any) {
      this.loggerService.error("Can not get Contract", error);
      throw error;
    }
  }

  async getInterface(fragments: string): Promise<Interface> {
    try {
      return new ethers.utils.Interface(fragments);
    } catch (error: any) {
      this.loggerService.error("Can not get Interface", error);
      throw error;
    }
  }

  async getAvaxTransaction(
    contractAddress: string,
    trxHash: string
  ): Promise<ITransactionDto> {
    try {
      const provider = await this.startRCPProvider(
        SmartContractConfig.AVALANCHE_NETWORK
      );

      //check if transaction fails after querying.
      const trx = await provider.getTransaction(trxHash);

      const avaxABIContract = await this.getAbi(contractAddress);

      const avaxContract = await this.getContract(
        contractAddress,
        avaxABIContract,
        provider
      );

      let decodedData: any = avaxContract.interface.parseTransaction({
        data: trx.data,
        value: trx.value,
      });

      //gather data and create a transaction object.
      const transaction: ITransactionDto = {
        transactionHash: trxHash,
        from: trx.from,
        to: trx.to || "",
        amountIn: decodedData.args.amountIn,
        amountOutMin: decodedData.args.amountOutMin,
        deadline: decodedData.args.deadline,
        path: decodedData.args.path,
      };

      return transaction;
    } catch (error: any) {
      this.loggerService.error("Can not get Avax transaction", error);
      throw error;
    }
  }
}
