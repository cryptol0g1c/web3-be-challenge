import { ethers } from "ethers";
import { config } from "../config/environment";

export const provider = new ethers.providers.JsonRpcProvider(config.RPC);