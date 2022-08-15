import { BigNumber } from "ethers";

export const decodeGas = (transaction: any) => {
  const { gasPrice, maxPriorityFeePerGas, maxFeePerGas, gasLimit, value, ...debt } =
    transaction;
  const decodeTransaction = {
    gasPrice: BigNumber.from(gasPrice._hex).toString(),
    maxPriorityFeePerGas: BigNumber.from(maxPriorityFeePerGas._hex).toString(),
    maxFeePerGas: BigNumber.from(maxFeePerGas._hex).toString(),
    gasLimit: BigNumber.from(gasLimit._hex).toString(),
    value: BigNumber.from(value._hex).toString(),
    ...debt,
  };
  return decodeTransaction;
};
