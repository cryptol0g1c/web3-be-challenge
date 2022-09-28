/* istanbul ignore file */

import { inject, injectable } from "inversify";
import {
  ILoggerService,
  ITransactionService,
} from "../services/services.interface";
import SmartContractConfig from "../config/smartContracts.config";
import { ISmartContractService } from "../smartContract/smartContract.interface";
import { IContractConsumer } from "./contractConsumer.interface";
import { ITransactionDto } from "../common/dtos";
import AppConfig from "../config/app.config";

@injectable()
export default class ContractConsumer implements IContractConsumer {
  constructor(
    @inject("ILoggerService")
    private readonly loggerService: ILoggerService,
    @inject("ISmartContractService")
    private readonly smartContractService: ISmartContractService,
    @inject("ITransactionService")
    private readonly transactionService: ITransactionService
  ) {}

  avaxContract: any;

  async start(): Promise<void> {
    if (!AppConfig.EnableConsumer) {
      this.loggerService.warn("Consumer is disabled");
      return;
    }

    try {
      const network = String(SmartContractConfig.AVALANCHE_NETWORK);
      const avaxContractAddress = String(
        SmartContractConfig.AVAX_CONTRACT_ADDRESS
      );
      const joeDoeContractAddress = String(
        SmartContractConfig.JOE_DOE_CONTRACT_ADDRESS
      );

      const provider = await this.smartContractService.startRCPProvider(
        network
      );

      const avaxABIContract = await this.smartContractService.getAbi(
        avaxContractAddress
      );

      this.avaxContract = await this.smartContractService.getContract(
        avaxContractAddress,
        avaxABIContract,
        provider
      );

      await this.registerEventFor(joeDoeContractAddress);
      this.loggerService.info("Consumer Started");
    } catch (error: any) {
      this.loggerService.error("Cannot start Consumer", error);
    }
  }

  async registerEventFor(address: string) {
    try {
      const listenerAbiContract = await this.smartContractService.getAbi(
        address
      );

      const listenerInterface = await this.smartContractService.getInterface(
        listenerAbiContract as unknown as string
      );

      const filter = this.avaxContract.filters.Transfer(null, address);

      this.avaxContract.on(
        filter,
        (from: any, to: any, value: any, event: any) => {
          const { transactionHash } = event;
          event
            .getTransaction(transactionHash)
            .then(async (resp: any) => {
              this.loggerService.info(
                `Listening event for ${address} - ${JSON.stringify(value)}`
              );
              let decodedData = listenerInterface.parseTransaction({
                data: resp.data,
                value: resp.value,
              });

              const transaction: ITransactionDto = {
                from,
                to,
                transactionHash,
                amountIn: decodedData.args.amountIn,
                amountOutMin: decodedData.args.amountOutMin,
                deadline: decodedData.args.deadline,
                path: decodedData.args.path,
              };

              await this.transactionService.create(transaction);
            })
            .catch((error: any) => {
              this.loggerService.error(
                `Cannot parse event for ${address}`,
                error
              );
            });
        }
      );
    } catch (error: any) {
      this.loggerService.error("Cannot register Event", error);
    }
  }
}
