/* istanbul ignore file */

import axios from "axios";
import { ContractInterface } from "ethers";
import { inject, injectable } from "inversify";
import SmartContractConfig from "../../config/smartContracts.config";
import { IAbiProvider } from "./abiProvider.interface";

@injectable()
export default class SnowTraceProvider implements IAbiProvider {
  constructor() {}

  async getAbi(address: string): Promise<ContractInterface> {
    try {
      const url = `${SmartContractConfig.SNOWTRACE_API}?module=contract&action=getabi&address=${address}&apikey=${SmartContractConfig.SNOWTRACE_API_KEY}`;
      const { data } = await axios.get<any>(url);

      const jsonResponse = JSON.parse(data.result);
      return jsonResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        throw error.message;
      } else {
        console.log("unexpected error: ", error);
        throw "An unexpected error occurred";
      }
    }
  }
}
