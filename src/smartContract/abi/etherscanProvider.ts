/* istanbul ignore file */

import { ContractInterface } from "ethers";
import { inject, injectable } from "inversify";
import { InternalError } from "../../common/errors";
import { IAbiProvider } from "./abiProvider.interface";

@injectable()
export default class EtherScanProvider implements IAbiProvider {
  constructor() {}

  async getAbi(address: string): Promise<ContractInterface> {
    //Service not implemented
    throw new InternalError("Service not implemented");
  }
}
