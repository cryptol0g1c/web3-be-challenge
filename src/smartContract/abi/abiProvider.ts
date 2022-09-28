import { ContractInterface } from "ethers";
import { inject, injectable } from "inversify";
import { ILoggerService } from "../../services/services.interface";
import { IAbiProvider } from "./abiProvider.interface";

@injectable()
export default class AbiProvider implements IAbiProvider {
  constructor(
    @inject("ILoggerService")
    private readonly loggerService: ILoggerService,
    @inject("ISnowtraceProvider")
    private readonly snowTraceProvider: IAbiProvider
  ) {}

  async getAbi(address: string): Promise<ContractInterface> {
    try {
      //Todo: If snowtrace fails, try to initialize etherscan and get abi
      const abi = await this.snowTraceProvider.getAbi(address);
      this.loggerService.info(
        `Abi for address ${address} obtained from Snowtrace`
      );
      return abi;
    } catch (error: any) {
      this.loggerService.error("Snow trace provider fails", error);
      throw error;
    }
  }
}
