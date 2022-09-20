/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { ethers, BigNumber } from 'ethers';
import fs from 'fs';
import config from '../config/config';
import Logging from './logging';
import { TransactionEvent } from '../models/transactionModel';

const fsPromises = fs.promises;

const provider = new ethers.providers.JsonRpcProvider(config.ethers.rpcUrl);

async function getAbi(contractAddress: string) {
  try {
    const filePath = `${config.ethers.abiFilePath + contractAddress}.json`;
    const abi = await fsPromises.readFile(filePath, 'utf8');
    return abi;
  } catch (error) {
    Logging.error(error);
    throw error;
  }
}

export const getContract = async (contractAddress: string) => {
  try {
    const abi = await getAbi(contractAddress);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return contract;
  } catch (error) {
    Logging.error(error);
    throw error;
  }
};

export const parseArguments = (args: any) => args.map((arg: any) => {
  if (Object.keys(arg)[1] === '_isBigNumber') {
    return ethers.utils.formatEther(Object.values(arg)[0] as BigNumber);
  }
  return arg;
});

export const getTransactionInfo = async (transactionAddress: string) => {
  // Get transaction info
  const transaction = await provider.getTransaction(transactionAddress);
  Logging.info(`Transaction hash: ${transaction.hash}`);
  Logging.info(`Transaction from: ${transaction.from}`);
  Logging.info(`Contract address: ${transaction.to}\n`);

  // Get transaction logs
  const receipt = await provider.getTransactionReceipt(transactionAddress);
  Logging.info(`Events count: ${receipt.logs.length}\n`);
  const { logs } = receipt;

  // Get logs details
  const events:TransactionEvent[] = await Promise.all(logs.map(async (log) => {
    const contractAddress = log.address;
    const contract = await getContract(contractAddress);
    const event = contract.interface.parseLog(log);
    Logging.info(`Event name: ${event.name}`);
    Logging.info(`Event signature: ${event.signature}\n`);
    return {
      name: event.name,
      signature: event.signature,
      arguments: parseArguments(event.args as any),
    };
  }));

  return { transaction, events };
};
