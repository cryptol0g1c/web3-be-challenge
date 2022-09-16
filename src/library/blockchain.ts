/* eslint-disable import/prefer-default-export */
import { ethers } from 'ethers';
import config from '../config/config';
import Logging from './logging';

export const getTransactionInfo = async (transactionAddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider(config.ethers.rpcUrl);
  const transaction = await provider.getTransaction(transactionAddress);
  Logging.info(`Transaction info: ${JSON.stringify(transaction)}`);
  return transaction;
};
