import { BigNumber } from "ethers";
export interface Transaction {
    hash: string;
    type: number;
    blockNumber: number;
    confirmations: number;
    from: string;
    gasPrice: BigNumber;
    maxPriorityFeePerGas: BigNumber;
    maxFeePerGas: BigNumber;
    gasLimit: BigNumber;
    to: string;
    nonce: number;
    data: string;
    r:string;
    s: string;
    v: number | null;
    chainId: number | null;
}

